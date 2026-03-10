#!/usr/bin/env python3
# Manual protocol smoke checks — pack/unpack round-trip and basic performance numbers.

import importlib.util
import struct
import time
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


# Load the sim_full protocol module dynamically so this test doesn't need an install
def _load_protocol():
    path = ROOT / "sim_full/ec2/../interfacing_+_sim/protocol.py"
    spec = importlib.util.spec_from_file_location("sim_protocol", path.resolve())
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module

# Pack and unpack a node packet, printing each field to verify correctness
def test_node_packet_roundtrip():
    protocol = _load_protocol()
    print("=" * 60)
    print("TEST: Node Packet Round-trip")
    print("=" * 60)
    
    pkt_type = protocol.PKT_STATE_UPDATE
    seq = 42
    x = 123.45
    y = 67.89
    angle = 1.5708  # radians (90 degrees)
    flags = protocol.FLAG_INPUT_SHOOT
    
    start = time.perf_counter()
    packet = protocol.pack_node_packet(pkt_type, seq, x, y, angle, flags)
    pack_time = time.perf_counter() - start
    
    print(f"✓ Packed {len(packet)} bytes in {pack_time*1e6:.2f} µs")
    print(f"  Packet hex: {packet.hex()}")
    
    start = time.perf_counter()
    unpacked = protocol.unpack_node_packet(packet)
    unpack_time = time.perf_counter() - start

    print(f"✓ Unpacked in {unpack_time*1e6:.2f} µs")
    print(f"  Type:      {unpacked['pkt_type']} (expected {pkt_type}) ✓" if unpacked["pkt_type"] == pkt_type else f"  Type:      {unpacked['pkt_type']} (expected {pkt_type}) ✗")
    print(f"  Seq:       {unpacked['seq']} (expected {seq}) ✓" if unpacked["seq"] == seq else f"  Seq:       {unpacked['seq']} (expected {seq}) ✗")
    print(f"  Timestamp: {unpacked['timestamp']}")
    print(f"  X:         {unpacked['x']} (expected {x}) ✓" if abs(unpacked["x"] - x) < 0.001 else f"  X:         {unpacked['x']} (expected {x}) ✗")
    print(f"  Y:         {unpacked['y']} (expected {y}) ✓" if abs(unpacked["y"] - y) < 0.001 else f"  Y:         {unpacked['y']} (expected {y}) ✗")
    print(f"  Angle:     {unpacked['angle']} (expected {angle}) ✓" if abs(unpacked["angle"] - angle) < 0.001 else f"  Angle:     {unpacked['angle']} (expected {angle}) ✗")
    print(f"  Input:     {unpacked['input_flags']} (expected {flags}) ✓" if unpacked["input_flags"] == flags else f"  Input:     {unpacked['input_flags']} (expected {flags}) ✗")
    print(f"  MoveMode:  {unpacked['movement_mode']} ({protocol.decode_movement_mode(unpacked['movement_mode'])})")
    print(f"  Version:   {unpacked['protocol_version']}")
    print(f"  Round-trip time: {pack_time*1e6 + unpack_time*1e6:.2f} µs")
    

# Build a two-player server packet by hand and verify unpack produces correct entries
def test_server_packet_roundtrip():
    protocol = _load_protocol()
    print("\n" + "=" * 60)
    print("TEST: Server Packet (Game State) Round-trip")
    print("=" * 60)
    
    pkt_type = protocol.PKT_GAME_STATE
    seq = 100
    timestamp = int(time.time() * 1000) & 0xFFFFFFFF
    
    header  = struct.pack('<HHI', pkt_type, seq, timestamp)
    ext     = struct.pack('<BBH', protocol.GAME_MODE_CHASE, 2, 0)
    player1 = struct.pack('<BfffB', 1, 10.5, 20.3, 0.5, 0)
    player2 = struct.pack('<BfffB', 2, 50.0, 75.5, 2.5, protocol.FLAG_INPUT_SHOOT)
    packet = header + ext + player1 + player2

    start = time.perf_counter()
    pkt_type_out, seq_out, timestamp_out, game_mode_out, players, bits_mask_out = protocol.unpack_server_packet(packet)
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


# Measure pack/unpack throughput over many iterations to catch regressions
def test_performance():
    protocol = _load_protocol()
    print("\n" + "=" * 60)
    print("TEST: Performance (1000 iterations)")
    print("=" * 60)
    
    iterations = 1000
    
    start = time.perf_counter()
    for i in range(iterations):
        packet = protocol.pack_node_packet(protocol.PKT_STATE_UPDATE, i, 1.0, 2.0, 3.0)
    pack_elapsed = time.perf_counter() - start
    
    start = time.perf_counter()
    for i in range(iterations):
        protocol.unpack_node_packet(packet)
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
