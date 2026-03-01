# Interfacing

## Quick Notes

**Flags: **

FLAG_SHOOTING = 0x01 (bit 0)
FLAG_TAGGED   = 0x02 (bit 1)
That gives you these possibilities in one byte:

0x00 — neither shooting nor tagged
0x01 — shooting only
0x02 — tagged only
0x03 — both shooting and tagged (both bits set)

## Tasks

Two tasks here, both are good starting points for anyone wanting to contribute without touching the server code.

---

## 1. protocol.py

**Task: implement the Python packet encoder/decoder.**

`protocol.py` is the single source of truth for the wire format. The Python server (`ec2/server/game_tick.py`) unpacks the same bytes using the same `struct` format strings. If you change a field, size, or order here you must update the server-side unpack logic to match : and vice versa. The `assert` size checks at the top of this file catch mismatches at startup.

### Packet format

**Node → Server (24 bytes, little-endian)**
```
offset  size  field
0       2     type       (uint16)  packet type : see types below
2       2     seq        (uint16)  incrementing sequence number
4       4     timestamp  (uint32)  milliseconds since epoch
8       4     x          (float)   world-space X position
12      4     y          (float)   world-space Y position
16      4     angle      (float)   view angle in radians
20      1     flags      (uint8)   bit flags (shooting, tagged, etc.)
21      3     pad        (zero)
```

**Server → Node (8-byte header + 14 bytes per player)**
```
offset  size  field
0       2     type       (uint16)
2       2     seq        (uint16)
4       4     timestamp  (uint32)

per player entry:
+0      1     player_id  (uint8)
+1      4     x          (float)
+5      4     y          (float)
+9      4     angle      (float)
+13     1     flags      (uint8)
```

**Packet types**
```
0x0001  STATE_UPDATE   node → server  (position update each tick)
0x0002  GAME_STATE     server → node  (full state broadcast)
0x0010  HEARTBEAT      node → server
0x0020  REGISTER       node → server  (first contact)
0x0030  ACK            server → node
```

### What to build

Create `protocol.py` using Python's `struct` module with little-endian format strings:

```python
import struct

NODE_FMT   = '<HHIfffB3x'  # 24 bytes : verify with struct.calcsize()
HEADER_FMT = '<HHI'        # 8 bytes
PLAYER_FMT = '<BfffB'      # 14 bytes

def pack_node_packet(pkt_type, seq, timestamp, x, y, angle, flags=0): ...
def unpack_node_packet(data): ...
def pack_server_packet(pkt_type, seq, timestamp, players): ...
def unpack_server_packet(data): ...
```

Add `assert struct.calcsize(NODE_FMT) == 24` etc. to catch mistakes early.

---

## 2. node_simulator.py

**Task: build a fake PYNQ node for testing the server without hardware.**

**Runs on your laptop : not on EC2.** This is a client, not a server component. It impersonates a PYNQ board by sending the same UDP packets a real node would send, across the internet to the EC2 server.

```
Your laptop
  node_simulator.py  →  UDP  →  EC2 (Python server)

Eventually replaced by:
  PYNQ board         →  UDP  →  EC2 (Python server)
```

### What to build

A script that:
1. Sends a `REGISTER` packet on startup
2. Loops at 20 Hz sending `STATE_UPDATE` packets with incrementing position
3. Prints any `GAME_STATE` packets received back from the server

```python
import socket, time
from protocol import pack_node_packet, STATE_UPDATE, REGISTER

SERVER = ("your-ec2-ip", 9000)  # point at the real EC2 instance
# ... send loop at 1/20s intervals
```

Start with one node. Add a `--nodes N` argument later to simulate both players from one machine.

### Dependency

Needs `protocol.py` to exist first : build that one before this.
