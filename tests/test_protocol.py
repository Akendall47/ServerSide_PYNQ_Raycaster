#!/usr/bin/env python3
"""
Test script: Pack a packet, unpack it, and verify round-trip integrity.
"""

import sys
import os
import time

# Add parent directory to path so we can import interfacing module
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from interfacing_+_sim.protocol import (
    pack_node_packet,
    unpack_header,
    unpack_player_entries,
    unpack_server_packet,
    PKT_STATE_UPDATE,
    PKT_GAME_STATE,
    FLAG_SHOOTING,
    HEADER_SIZE,
    PLAYER_SIZE,
)
import struct

def test_node_packet_roundtrip():
    """Test packing and unpacking a node packet."""
    print("=" * 60)
    print("TEST: Node Packet Round-trip")
    print("=" * 60)
    
    # Test data
    pkt_type = PKT_STATE_UPDATE
    seq = 42
    x = 123.45
    y = 67.89
    angle = 1.5708  # radians (90 degrees)
    flags = FLAG_SHOOTING
    
    # Pack the packet
    start = time.perf_counter()
    packet = pack_node_packet(pkt_type, seq, x, y, angle, flags)
    pack_time = time.perf_counter() - start
    
    print(f"✓ Packed {len(packet)} bytes in {pack_time*1e6:.2f} µs")
    print(f"  Packet hex: {packet.hex()}")
    
    # Manually unpack to verify fields
    start = time.perf_counter()
    unpacked = struct.unpack('<HHIfffB3x', packet)
    unpack_time = time.perf_counter() - start
    
    unpack_type, unpack_seq, timestamp, unpack_x, unpack_y, unpack_angle, unpack_flags = unpacked
    
    print(f"✓ Unpacked in {unpack_time*1e6:.2f} µs")
    print(f"  Type:      {unpack_type} (expected {pkt_type}) ✓" if unpack_type == pkt_type else f"  Type:      {unpack_type} (expected {pkt_type}) ✗")
    print(f"  Seq:       {unpack_seq} (expected {seq}) ✓" if unpack_seq == seq else f"  Seq:       {unpack_seq} (expected {seq}) ✗")
    print(f"  Timestamp: {timestamp}")
    print(f"  X:         {unpack_x} (expected {x}) ✓" if abs(unpack_x - x) < 0.001 else f"  X:         {unpack_x} (expected {x}) ✗")
    print(f"  Y:         {unpack_y} (expected {y}) ✓" if abs(unpack_y - y) < 0.001 else f"  Y:         {unpack_y} (expected {y}) ✗")
    print(f"  Angle:     {unpack_angle} (expected {angle}) ✓" if abs(unpack_angle - angle) < 0.001 else f"  Angle:     {unpack_angle} (expected {angle}) ✗")
    print(f"  Flags:     {unpack_flags} (expected {flags}) ✓" if unpack_flags == flags else f"  Flags:     {unpack_flags} (expected {flags}) ✗")
    print(f"  Round-trip time: {pack_time*1e6 + unpack_time*1e6:.2f} µs")
    

def test_server_packet_roundtrip():
    """Test packing and unpacking a server (game state) packet."""
    print("\n" + "=" * 60)
    print("TEST: Server Packet (Game State) Round-trip")
    print("=" * 60)
    
    # Build a server packet with header + 2 player entries
    pkt_type = PKT_GAME_STATE
    seq = 100
    timestamp = int(time.time() * 1000) & 0xFFFFFFFF
    
    # Header
    header = struct.pack('<HHI', pkt_type, seq, timestamp)
    
    # Two player entries
    player1 = struct.pack('<BfffB', 1, 10.5, 20.3, 0.5, 0)  # player_id, x, y, angle, flags
    player2 = struct.pack('<BfffB', 2, 50.0, 75.5, 2.5, FLAG_SHOOTING)
    
    packet = header + player1 + player2
    
    start = time.perf_counter()
    pkt_type_out, seq_out, timestamp_out, players = unpack_server_packet(packet)
    unpack_time = time.perf_counter() - start
    
    print(f"✓ Unpacked in {unpack_time*1e6:.2f} µs")
    print(f"  Type:      {pkt_type_out} (expected {pkt_type}) ✓" if pkt_type_out == pkt_type else f"  Type:      ✗")
    print(f"  Seq:       {seq_out} (expected {seq}) ✓" if seq_out == seq else f"  Seq:       ✗")
    print(f"  Players:   {len(players)}")
    for i, player in enumerate(players, 1):
        print(f"    Player {i}:")
        print(f"      ID:    {player['player_id']}")
        print(f"      Pos:   ({player['x']:.2f}, {player['y']:.2f})")
        print(f"      Angle: {player['angle']:.2f}")
        print(f"      Flags: {player['flags']}")


def test_performance():
    """Measure performance over many iterations."""
    print("\n" + "=" * 60)
    print("TEST: Performance (1000 iterations)")
    print("=" * 60)
    
    iterations = 1000
    
    # Pack performance
    start = time.perf_counter()
    for i in range(iterations):
        packet = pack_node_packet(PKT_STATE_UPDATE, i, 1.0, 2.0, 3.0)
    pack_elapsed = time.perf_counter() - start
    
    # Unpack performance
    start = time.perf_counter()
    for i in range(iterations):
        struct.unpack('<HHIfffB3x', packet)
    unpack_elapsed = time.perf_counter() - start
    
    print(f"Pack:   {pack_elapsed*1000:.2f} ms ({pack_elapsed/iterations*1e6:.2f} µs/iter)")
    print(f"Unpack: {unpack_elapsed*1000:.2f} ms ({unpack_elapsed/iterations*1e6:.2f} µs/iter)")
    print(f"Total:  {(pack_elapsed + unpack_elapsed)*1000:.2f} ms")


if __name__ == '__main__':
    test_node_packet_roundtrip()
    test_server_packet_roundtrip()
    test_performance()
    print("\n" + "=" * 60)
    print("All tests completed!")
    print("=" * 60)
