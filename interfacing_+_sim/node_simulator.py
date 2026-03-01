#!/usr/bin/env python3
"""
node_simulator.py

Fake PYNQ node for testing the server without hardware.

Runs on your laptop and sends UDP packets to the EC2 server, impersonating
a real PYNQ board. 

The nodes have different movements depending on node index. 

Useful for:
  - Testing server code before deploying to hardware
  - Debugging packet format issues
  - Load testing with multiple simulated nodes

Usage:
    python3 node_simulator.py <server_ip> [port] [max_ticks] --nodes [number of nodes]

Example:
    python3 node_simulator.py 52.1.2.3 9000 100 --nodes 2


"""

import socket
import time
import sys
import math
import argparse
import threading
from protocol import (
    pack_node_packet,
    unpack_server_packet,
    PKT_STATE_UPDATE,
    PKT_REGISTER,
    PKT_GAME_STATE,
    FLAG_SHOOTING,
    FLAG_TAGGED
)


class NodeSimulator:
    def __init__(self, server_ip, server_port=9000, player_id=1, node_index=0):
        """
        Initialise the node simulator.
        
        Args:
            server_ip: IP address of the EC2 server
            server_port: UDP port the server listens on (default: 9000)
            player_id: This node's player ID (default: 1)
            node_index: Index of this node (0, 1, 2, ...) for varied behavior
        """
        self.server_addr = (server_ip, server_port)
        self.player_id = player_id
        self.node_index = node_index
        self.seq = 0
        self.tag_after = None  # if set to int, force a local tag after N ticks
        self.tick = 0
        self.running = False
        
        # Vary behavior based on node index
        self.x = 0.0
        self.y = 0.0
        self.angle = 0.0
        
        # All nodes share the same radius so their paths intersect and tag fires.
        # Different rotation speeds mean they lap each other repeatedly.
        self.radius          = 50.0
        self.rotation_speed  = 0.05 + (node_index * 0.03)  # node 0: 0.05, node 1: 0.08
        self.shoot_frequency = 20 + (node_index * 10)

        # Spread starting angles so they don't begin on top of each other
        self.angle = (node_index * math.pi * 2 / 4)
        
        # Socket
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.sock.settimeout(0.05)  
        
        print(f"[NODE {self.player_id}] Initialised (index={node_index}). "
              f"Radius={self.radius:.1f}, Speed={self.rotation_speed:.3f}, "
              f"Shoot frequency={self.shoot_frequency}. Server: {server_ip}:{server_port}")
    
    def register(self):
        """Send REGISTER packet to server."""
        packet = pack_node_packet(PKT_REGISTER, seq=0, x=0, y=0, angle=0, flags=0)
        self.sock.sendto(packet, self.server_addr)
        print(f"[NODE {self.player_id}] REGISTER sent")
        self.seq = 1
    
    def send_state_update(self):
        """Send STATE_UPDATE packet with current position."""
        # Update position (walk in a circle)
        self.angle += self.rotation_speed
        self.x = self.radius * math.cos(self.angle)
        self.y = self.radius * math.sin(self.angle)
        
        # Occasionally shoot (based on node's shooting frequency)
        flags = FLAG_SHOOTING if (self.tick % self.shoot_frequency == 0) else 0

        # If we've been forced to tag ourselves locally, send tagged flag
        if self.tag_after is not None and self.tick >= self.tag_after:
            flags = flags | FLAG_TAGGED
        
        packet = pack_node_packet(
            PKT_STATE_UPDATE,
            seq=self.seq,
            x=self.x,
            y=self.y,
            angle=self.angle,
            flags=flags
        )
        
        self.sock.sendto(packet, self.server_addr)
        
        if self.tick % 20 == 0:  # Print every 20 ticks (1 second at 20 Hz)
            print(f"[NODE {self.player_id}] Tick {self.tick:4d} | "
                  f"Seq {self.seq:5d} | "
                  f"Pos ({self.x:7.2f}, {self.y:7.2f}) | "
                  f"Angle {self.angle:7.3f} | "
                  f"Flags {flags}")
        
        self.seq = (self.seq + 1) & 0xFFFF  # Wrap at 65535
    
    def receive_game_state(self):
        """Try to receive and print a GAME_STATE packet."""
        try:
            data, addr = self.sock.recvfrom(1024)
            pkt_type, seq, timestamp, players = unpack_server_packet(data)
            
            if pkt_type == PKT_GAME_STATE:
                print(f"[NODE {self.player_id}] ← GAME_STATE: "
                      f"seq={seq}, {len(players)} players, "
                      f"timestamp={timestamp}")
                for player in players:
                    print(f"    Player {player['player_id']}: "
                          f"({player['x']:.2f}, {player['y']:.2f}) "
                          f"angle={player['angle']:.3f} "
                          f"flags=0x{player['flags']:02x}")
                    # If this player entry is for us and we're flagged TAGGED, end the game
                    if player['player_id'] == self.player_id and (player['flags'] & FLAG_TAGGED):
                        print(f"[NODE {self.player_id}] GAME OVER: you have been tagged (flags=0x{player['flags']:02x})")
                        # Stop the simulator gracefully
                        self.close()
                        return
        except socket.timeout:
            pass  
        except Exception as e:
            print(f"[NODE {self.player_id}] Error receiving: {e}")
    
    def run(self, duration_seconds=None, max_ticks=None):
        """
        Run the simulation.
        
        Args:
            duration_seconds: Run for this many seconds (None = infinite)
            max_ticks: Stop after this many ticks (None = infinite)
        """
        self.running = True
        
        # Send registration packet
        self.register()
        time.sleep(0.1)  # Wait a bit for ACK before starting
        
        # Run at 20 Hz (50ms per tick)
        tick_interval = 1.0 / 20.0
        start_time = time.time()
        
        try:
            while self.running:
                tick_start = time.time()
                
                # Check if we should stop
                if duration_seconds and (time.time() - start_time) > duration_seconds:
                    break
                if max_ticks and self.tick >= max_ticks:
                    break
                
                # Send state update
                self.send_state_update()
                # If tag_after is set, check and trigger local game over
                if self.tag_after is not None and self.tick >= self.tag_after:
                    print(f"[NODE {self.player_id}] (local) GAME OVER: forced tag after {self.tag_after} ticks")
                    break
                
                # Try to receive incoming packets
                self.receive_game_state()
                
                # Maintain 20 Hz tick rate
                elapsed = time.time() - tick_start
                sleep_time = max(0, tick_interval - elapsed)
                if sleep_time > 0:
                    time.sleep(sleep_time)
                
                self.tick += 1
        
        except KeyboardInterrupt:
            print(f"\n[NODE {self.player_id}] Interrupted by user")
        finally:
            self.close()
    
    def close(self):
        """Clean up and close socket."""
        self.running = False
        self.sock.close()
        print(f"[NODE {self.player_id}] Closed after {self.tick} ticks")


def main():
    parser = argparse.ArgumentParser(description='Simulate PYNQ nodes (UDP clients)')
    parser.add_argument('server_ip', help='EC2 server IP or hostname')
    parser.add_argument('port', nargs='?', type=int, default=9000, help='UDP port (default: 9000)')
    parser.add_argument('max_ticks', nargs='?', type=int, default=None, help='Stop after N ticks (optional)')
    parser.add_argument('--tag-after', '-t', type=int, default=None,
                        help='Force a local TAG after N ticks (prints GAME OVER and stops)')
    parser.add_argument('--player-id', '-p', type=int, default=1,
                        help='Local label only — NOT sent on the wire. Server assigns real IDs by connection order.')
    parser.add_argument('--nodes', '-n', type=int, default=1, help='Number of nodes to simulate (default: 1)')
    parser.add_argument('--node-index', type=int, default=None,
                        help='Override node_index for orbit speed/start angle (default: 0,1,2... per node)')
    args = parser.parse_args()

    server_ip = args.server_ip
    server_port = args.port
    max_ticks = args.max_ticks
    num_nodes = args.nodes

    print(f"Starting node simulator...")
    print(f"Server: {server_ip}:{server_port}")
    print(f"Number of nodes: {num_nodes}")
    print(f"Max ticks: {max_ticks if max_ticks else 'unlimited'}")
    if args.tag_after is not None:
        print(f"Will force local TAG after {args.tag_after} ticks")
    print()

    # Create and start all nodes
    nodes = []
    threads = []
    
    for i in range(num_nodes):
        player_id = args.player_id + i
        node_index = args.node_index if args.node_index is not None else i
        node = NodeSimulator(server_ip, server_port, player_id=player_id, node_index=node_index)
        if args.tag_after is not None:
            node.tag_after = args.tag_after
        nodes.append(node)
        
        # Run each node in its own thread
        thread = threading.Thread(target=node.run, kwargs={'max_ticks': max_ticks})
        thread.daemon = False
        threads.append(thread)
        thread.start()
    
    # Wait for all threads to complete
    try:
        for thread in threads:
            thread.join()
    except KeyboardInterrupt:
        print("\nInterrupted by user, shutting down all nodes...")
        for node in nodes:
            node.close()


if __name__ == '__main__':
    main()

