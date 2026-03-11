# MVP Plan

This is the original build-order document for the early MVP.

For the current live architecture and next steps, use:

- [README.md](/home/akendall/Documents/ServerSide_PYNQ_Raycaster/README.md)
- [TODO.md](/home/akendall/Documents/ServerSide_PYNQ_Raycaster/TODO.md)

Goal: two PYNQ nodes connect to the server, send positions, receive each other's state back. No persistence, no dashboard : just the game loop working end to end.

---

### Python SEDA server
**Track: `ec2/server/`**

Work through the 4 asyncio tasks in order. Each can be tested before the next is built.

- [ ] **T1** : implement `UDPReceiver.run()` in `udp_receiver.py`
  - asyncio DatagramProtocol, `datagram_received` puts raw bytes onto `packet_queue`
  - test: run server, `echo "hello" | nc -u localhost 9000`, confirm packet received

- [ ] **T2** : implement `GameTick._process_packet()` and `_tick()` in `game_tick.py`
  - `struct.unpack_from` to deserialise `NodePacket`
  - store in `players` dict keyed by addr (temporary : proper registration later)
  - test: print received x/y to stdout each tick

- [ ] **T3** : implement `GameTick._push_broadcast()` and `Broadcaster.run()` in `broadcaster.py`
  - serialise all player positions into a `GameState` packet
  - T3 sends it back to all known node addrs via UDP
  - test: run node simulator (Person B), confirm state echoed back

- [ ] **T4** : implement `RedisWriter.run()` in `redis_writer.py`
  - `redis.asyncio` HSET player state each tick
  - LPUSH `game:events` when a match event is detected in T2
  - test: `redis-cli HGETALL player:0` shows live position data

- [ ] **Registration** : handle `REGISTER` packet type in T2
  - assign `player_id`, store addr properly
  - replace the temporary addr-keyed dict

---

###  Python interfacing
**Track: `interfacing_+_sim/`**

Completely independent of the server work. Runs on your own laptop.

- [ ] **Step 1** : implement `protocol.py`
  - write `pack_node_packet()` and `unpack_node_packet()` using `struct`
  - add `assert struct.calcsize(...) == 24` guards
  - test: pack a packet, unpack it, check fields round-trip correctly (no server needed)

- [ ] **Step 2** : implement `node_simulator.py`
  - send `REGISTER` then loop sending `STATE_UPDATE` at 20 Hz
  - print anything received back from the server
  - test locally: point at `127.0.0.1:9000` while Person A runs the server

- [ ] **Step 3** : point simulator at EC2 once server is deployed
  - update `SERVER = ("ec2-ip", 9000)`
  - confirm packets arrive (Person A sees them in stdout)

- [ ] **Step 4** : run two simulator instances simultaneously
  - two terminals, two "players", confirm server echoes both states to both clients

---

## MVP milestone: done when

Both simulators running → server receives both → echoes combined state back to both → both simulators print the other's position.

No Redis. No DynamoDB. No dashboard. No C++ game logic. Just UDP in, UDP out, game state merged.

---

## After MVP (next steps, in order)

1. Deploy to EC2, test with real PYNQ nodes instead of simulator
2. Implement `RedisWriter` : `redis.asyncio` writes state to ElastiCache each tick
3. Implement sidecar : watch Redis, write match result to DynamoDB on match end
4. Build `ec2/game_logic/` C++ module : compile raycaster, anticheat, node_manager
   - `validate_move()` : speed/wall-penetration check called from T2
   - `check_proximity()` : distance between players, caller decides meaning
   - `ray_intersects_wall()` : core raycaster primitive (DDA algorithm)
   - `is_visible()` : line-of-sight check through the map
5. Hook C++ game_logic into T2 tick : call via ctypes or compiled .so
6. DynamoDB writes (sidecar: match results, player stats)
7. S3 replay upload (sidecar: event log per match)
8. Dashboard (WebSocket from T3)

---

## Quick start : basic/ first

`basic/` is the simplified but complete version of the full stack. Same data flow (PYNQ → EC2 → Redis → DynamoDB), no SEDA pipeline, no C++, no asyncio : just blocking Python so you can verify every integration point before building the full `ec2/` version.

```
basic/
├── protocol/protocol.py   : shared packet format (NodePacket, GameState, PlayerEntry)
├── server/server.py       : blocking UDP server; merges state, broadcasts back, writes Redis
├── client/sender.py       : PYNQ node simulator; sends at 20 Hz, prints received game state
└── sidecar/sidecar.py     : BRPOP game:events, writes match record to DynamoDB
```

Full data flow:

```
PYNQ / simulator
      │  UDP (24 bytes)
      ▼
  server.py  ── HSET player:N x y angle ──►  Redis (ElastiCache)
      │                                            │
      │  UDP game state back                       │  BRPOP game:events
      ▼                                            ▼
PYNQ / simulator                            sidecar.py ── put_item() ──► DynamoDB
```

```bash
# On EC2 : start sidecar first (blocks waiting for events)
python basic/sidecar/sidecar.py

# On EC2 : start server
python basic/server/server.py

# On laptop / PYNQ : two terminals, two players
python basic/client/sender.py
python basic/client/sender.py
```

Once this works end-to-end, move to `ec2/` : the full SEDA pipeline with asyncio queues and C++ game logic.

---
