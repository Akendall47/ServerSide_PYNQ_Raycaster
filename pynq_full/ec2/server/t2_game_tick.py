# ec2/server/t2_game_tick.py — T2 GameTick: authoritative game loop at 20 Hz.
#
# Queues:
#   in:  packet_queue    {"data": bytes, "addr": (ip, port)}
#   out: broadcast_queue {"data": bytes, "targets": [(ip,port),...]}
#   out: write_queue     {"op": "hset"|"lpush"|"del", "key": str, ...}

import asyncio
import time
import math
import json
import sys
import os
import struct

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'interfacing'))
from protocol import (
    NODE_SIZE,
    PKT_REGISTER,
    PKT_ACK,
    HEADER_FMT,
    FLAG_TAGGED,
    FLAG_MATCH_END,
    pack_map_packet,
)

MAP_PATH         = os.path.join(os.path.dirname(__file__), '..', '..', 'maps', 'level1.txt')
MAP_TILE_SCALE   = 8     # world units per tile — must match monitor TILE_SCALE

def _load_map(path):
    """Load a text map file into (width, height, tile_scale, flat bytearray)."""
    rows = []
    try:
        with open(path) as f:
            for line in f:
                line = line.rstrip('\r\n')
                if not line:
                    continue
                rows.append(bytes(1 if c == '#' else 0 for c in line))
        width  = len(rows[0]) if rows else 0
        height = len(rows)
        tiles  = bytearray(b''.join(rows))
        print(f"[T2] map loaded: {path}  {width}x{height}")
        return width, height, tiles
    except Exception as e:
        print(f"[T2] WARNING: could not load map {path}: {e}")
        return 0, 0, bytearray()

_MAP_WIDTH, _MAP_HEIGHT, _MAP_TILES = _load_map(MAP_PATH)
_MAP_NAME = "level1"   # track which map is active (for logging)

TAG_RADIUS       = 20.0  # units
MATCH_PLAYERS    = 2
MAX_PLAYERS      = 2
TAGS_TO_WIN      = 2     # two tags end the match
TAG_FLASH_S      = 0.3   # keep FLAG_TAGGED visible for 0.3s (enough for nodes to see it)
MATCH_END_HOLD_S = 0.5   # broadcast FLAG_TAGGED for 0.5s on final tag
LOCKOUT_S        = 0.5   # reject re-registration for 0.5s after match ends
NODE_TIMEOUT_S   = 3.0   # evict a node that sends nothing for this long
# Grace period after each tag reset — players are teleported to spawn so need
# a moment before proximity detection resumes.
GRACE_TICKS      = 30    # 0.5s at 60 Hz
# Roles: player 1 = RUNNER (speed 0.05 rad/tick), player 2 = TAGGER (speed 0.11 rad/tick)
# Spawn positions mirror node_simulator.py: angle = player_id-1 * π/2, radius = 50
ORBIT_RADIUS     = 50.0
SPAWN_ANGLES     = [0.0, math.pi / 2]   # player_id 1 → angle 0, player_id 2 → angle π/2
REPLAY_KEY       = "game:seda-replay"

class GameTick:
    def __init__(self, packet_queue, broadcast_queue, write_queue, tick_rate=20,
                 udp_transport=None):
        self.packet_queue    = packet_queue
        self.broadcast_queue = broadcast_queue
        self.write_queue     = write_queue
        self.interval        = 1.0 / tick_rate
        self.udp_transport   = udp_transport  # T1 socket — used to send PKT_ACK

        self.players       = {}
        self.next_id       = 1
        self.match_started = False
        self.match_ended   = False
        self.match_end_at  = None
        self.lockout_until = None
        self.tag_count     = 0
        self.tag_flash_at  = None
        self.tick_count      = 0
        self.match_tick      = 0      # ticks since match started (for grace period)
        self._force_end_flag = False  # set by force_end game:control command

    async def run(self):
        print(f"[T2 GameTick] running at {1/self.interval:.0f} Hz")
        asyncio.ensure_future(self._listen_control())
        while True:
            tick_start = time.monotonic()

            await self._drain_packets()
            await self._evict_timed_out_nodes()
            await self._tick()
            await self._push_broadcast()
            await self._push_redis_writes()

            elapsed   = time.monotonic() - tick_start
            sleep_for = max(0.0, self.interval - elapsed)

            if self.tick_count % 60 == 0:
                self._print_metrics(elapsed)

            self.tick_count += 1
            await asyncio.sleep(sleep_for)

    # ── Redis control channel ─────────────────────────────────────────────────

    async def _listen_control(self):
        """Subscribe to game:control; handles set_map (reloads map for next registration)."""
        try:
            import redis as redislib

            def _blocking_subscribe():
                global _MAP_WIDTH, _MAP_HEIGHT, _MAP_TILES, _MAP_NAME
                rc  = redislib.Redis(host="127.0.0.1", port=6379, decode_responses=True)
                pub = rc.pubsub()
                pub.subscribe("game:control")
                for msg in pub.listen():
                    if msg["type"] != "message":
                        continue
                    try:
                        data = json.loads(msg["data"])
                    except Exception:
                        continue
                    cmd = data.get("cmd")
                    if cmd == "force_end":
                        self._force_end_flag = True
                    elif cmd == "set_map":
                        map_name = data.get("map", "level1")
                        maps_dir = os.path.join(os.path.dirname(__file__), '..', '..', 'maps')
                        path     = os.path.join(maps_dir, f"{map_name}.txt")
                        w, h, tiles = _load_map(path)
                        if w > 0:
                            _MAP_WIDTH, _MAP_HEIGHT, _MAP_TILES = w, h, tiles
                            _MAP_NAME = map_name
                            print(f"[T2] map changed to '{map_name}' — "
                                  f"takes effect on next player registration")

            await asyncio.to_thread(_blocking_subscribe)
        except Exception as e:
            print(f"[T2] control listener error: {e}")

    # ── Metrics ───────────────────────────────────────────────────────────────

    def _print_metrics(self, elapsed_s: float):
        print(
            f"[T2] tick={self.tick_count:5d} | "
            f"players={len(self.players)} | "
            f"tick={elapsed_s*1000:.2f}ms | "
            f"pkt_q={self.packet_queue.qsize():3d} | "
            f"bcast_q={self.broadcast_queue.qsize():3d} | "
            f"write_q={self.write_queue.qsize():3d}"
        )

    # ── Packet drain ──────────────────────────────────────────────────────────

    async def _drain_packets(self):
        while True:
            try:
                raw = self.packet_queue.get_nowait()
            except asyncio.QueueEmpty:
                break
            self._process_packet(raw)

    def _process_packet(self, raw: dict):
        data = raw["data"]
        addr = raw["addr"]

        if len(data) < NODE_SIZE:
            return

        pkt_type, seq, timestamp, x, y, angle, flags = struct.unpack_from('<HHIfffB', data)

        # Register new players (on REGISTER packet or first STATE_UPDATE)
        if addr not in self.players:
            self._register_player(addr, x, y, angle)

        if addr not in self.players:
            return  # registration was rejected (lockout or full) — drop packet

        p = self.players[addr]
        p["last_seen"] = time.monotonic()  # heartbeat — updated on every packet

        if pkt_type == PKT_REGISTER:
            # Accept starting position from REGISTER so player doesn't sit at (0,0)
            # until the first STATE_UPDATE arrives.
            p["x"], p["y"], p["angle"] = x, y, angle
            p["last_seq"] = seq   # reset sequence baseline on (re-)registration
            return

        # Sequence validation: reject stale, replayed, or out-of-order packets.
        # 16-bit half-window: delta in [1, 0x7FFF] means newer; handles wraparound.
        last = p["last_seq"]
        if last is not None:
            delta = (seq - last) & 0xFFFF
            if delta == 0 or delta > 0x7FFF:
                return  # duplicate or older than last accepted
        p["last_seq"] = seq

        p["x"]     = x
        p["y"]     = y
        p["angle"] = angle
        # Client cannot set server-owned flag bits
        SERVER_FLAGS = FLAG_TAGGED | FLAG_MATCH_END
        p["flags"] = (p["flags"] & SERVER_FLAGS) | (flags & ~SERVER_FLAGS)

    def _register_player(self, addr, x=0.0, y=0.0, angle=0.0):
        if self.lockout_until and time.monotonic() < self.lockout_until:
            return  # silently drop — nodes are still winding down after match end
        if len(self.players) >= MAX_PLAYERS:
            print(f"[T2] rejected connection from {addr} — already at {MAX_PLAYERS} players")
            return
        self.lockout_until = None  # first registration after lockout clears it
        player_id = self.next_id
        self.next_id += 1
        self.players[addr] = {
            "player_id": player_id,
            "x": x, "y": y, "angle": angle, "flags": 0,
            "last_seen": time.monotonic(),
            "last_seq": None,   # set on first packet; used for sequence validation
        }
        print(f"[T2] registered player {player_id} from {addr} "
              f"(total: {len(self.players)})")

        # ACK tells the node its player_id (1=RUNNER, 2=TAGGER) — boards must wait for
        # this before sending STATE_UPDATEs and use it to determine their role.
        self._send_ack(addr, player_id)
        # MAP follows immediately — node stores tiles in DRAM for FPGA raycaster.
        self._send_map(addr)

        if len(self.players) == MATCH_PLAYERS and not self.match_started:
            self.match_started = True
            self.match_tick    = 0
            asyncio.ensure_future(self._push_event(
                {"event": "match_start", "players": MATCH_PLAYERS}
            ))

    def _send_map(self, addr):
        """Send PKT_MAP to a newly registered node."""
        if self.udp_transport is None or not _MAP_TILES:
            return
        pkt = pack_map_packet(self.tick_count, _MAP_WIDTH, _MAP_HEIGHT,
                              MAP_TILE_SCALE, _MAP_TILES)
        try:
            self.udp_transport.sendto(pkt, addr)
            print(f"[T2] sent PKT_MAP to {addr} ({len(pkt)} bytes)")
        except Exception as e:
            print(f"[T2] failed to send PKT_MAP to {addr}: {e}")

    def _send_ack(self, addr, player_id: int):
        """Send PKT_ACK to a newly registered node. Contains the assigned player_id."""
        if self.udp_transport is None:
            return
        ts  = int(time.time() * 1000) & 0xFFFFFFFF
        pkt = struct.pack(HEADER_FMT, PKT_ACK, player_id, ts) + struct.pack('<B', player_id)
        try:
            self.udp_transport.sendto(pkt, addr)
        except Exception as e:
            print(f"[T2] failed to send ACK to {addr}: {e}")

    async def _evict_timed_out_nodes(self):
        """Remove any node that has sent no packets for NODE_TIMEOUT_S seconds."""
        now     = time.monotonic()
        evicted = [addr for addr, p in self.players.items()
                   if now - p["last_seen"] > NODE_TIMEOUT_S]
        for addr in evicted:
            p = self.players.pop(addr)
            print(f"[T2] evicted player {p['player_id']} from {addr} "
                  f"— no packets for {NODE_TIMEOUT_S}s")
            self.write_queue.put({"op": "del", "key": f"player:{p['player_id']}"})
        if evicted and self.match_started and not self.match_ended:
            # Match can't continue with fewer than MATCH_PLAYERS — reset
            print(f"[T2] match aborted — not enough players after eviction")
            self.match_started = False
            self.match_ended   = False
            self.match_end_at  = None
            self.tag_count     = 0
            self.tag_flash_at  = None
            self.match_tick    = 0
            self.lockout_until = now + LOCKOUT_S
            asyncio.ensure_future(self._push_event({"event": "match_aborted"}))

    # ── Game logic ────────────────────────────────────────────────────────────

    async def _tick(self):
        await self._check_match_end_hold()
        await self._check_proximity()
        await self._check_match_end()
        self._clear_tag_flash()
        if self.match_started and not self.match_ended:
            self.match_tick += 1

    def _reset_positions(self):
        """Teleport all players back to spawn and restart grace period."""
        for p in self.players.values():
            idx   = p["player_id"] - 1          # player_id 1→0, 2→1
            angle = SPAWN_ANGLES[idx] if idx < len(SPAWN_ANGLES) else 0.0
            p["x"]     = ORBIT_RADIUS * math.cos(angle)
            p["y"]     = ORBIT_RADIUS * math.sin(angle)
            p["angle"] = angle
        self.match_tick = 0   # restart grace period so proximity check pauses
        print(f"[T2] positions reset to spawn, grace period restarted")

    def _clear_tag_flash(self):
        """Clear FLAG_TAGGED after TAG_FLASH_S so the runner can be tagged again."""
        if self.tag_flash_at is None or self.match_ended:
            return
        if time.monotonic() >= self.tag_flash_at:
            for p in self.players.values():
                if p["flags"] & FLAG_TAGGED:
                    p["flags"] &= ~FLAG_TAGGED
                    print(f"[T2] P{p['player_id']} tag flash cleared "
                          f"({self.tag_count}/{TAGS_TO_WIN} tags)")
            self.tag_flash_at = None

    async def _check_match_end_hold(self):
        """After final tag: keep broadcasting FLAG_TAGGED for MATCH_END_HOLD_S
        so nodes are guaranteed to see it, then clear players and go idle."""
        if self.match_end_at is None:
            return
        if time.monotonic() >= self.match_end_at:
            print(f"[T2] match end hold expired — clearing players, lockout {LOCKOUT_S}s")
            # Delete stale player HSET keys from Redis so monitor goes idle cleanly
            for p in self.players.values():
                self.write_queue.put({"op": "del", "key": f"player:{p['player_id']}"})
            self.players       = {}
            self.next_id       = 1
            self.tag_count     = 0
            self.tag_flash_at  = None
            self.match_end_at  = None
            self.match_started = False
            self.match_ended   = False
            self.lockout_until = time.monotonic() + LOCKOUT_S

    async def _check_proximity(self):
        """Pairwise tag check. Skipped during grace period so nodes can
        reach their orbits before proximity detection starts."""
        players = list(self.players.values())
        if len(players) < 2:
            return
        if self.match_tick < GRACE_TICKS:
            return

        for i in range(len(players)):
            for j in range(i + 1, len(players)):
                p1, p2 = players[i], players[j]

                dist = math.sqrt((p1["x"] - p2["x"])**2 + (p1["y"] - p2["y"])**2)
                if dist < TAG_RADIUS:
                    tagged = p1 if p1["player_id"] < p2["player_id"] else p2
                    # Only register a new tag if flash has cleared (no double-counting)
                    if not (tagged["flags"] & FLAG_TAGGED) and self.tag_flash_at is None:
                        tagged["flags"] |= FLAG_TAGGED
                        self.tag_count   += 1
                        self.tag_flash_at = time.monotonic() + TAG_FLASH_S
                        print(f"[T2] P{tagged['player_id']} tagged (dist={dist:.2f}) "
                              f"— tag {self.tag_count}/{TAGS_TO_WIN}")
                        # Reset all players to spawn so they aren't still in contact
                        # after the flash clears — prevents instant double-tag.
                        self._reset_positions()
                        await self._push_event({
                            "event":     "player_tagged",
                            "player_id": tagged["player_id"],
                            "dist":      round(dist, 2),
                            "tag_count": self.tag_count,
                            "tags_to_win": TAGS_TO_WIN,
                        })

    async def _check_match_end(self):
        """Match ends when runner has been tagged TAGS_TO_WIN times.
        Fires match_end event and schedules player clear after MATCH_END_HOLD_S,
        giving nodes time to receive the final FLAG_TAGGED broadcast before going idle.
        """
        if not self.match_started or self.match_ended:
            self._force_end_flag = False
            return
        forced = self._force_end_flag
        self._force_end_flag = False
        if forced or self.tag_count >= TAGS_TO_WIN:
            self.match_ended  = True
            self.match_end_at = time.monotonic() + MATCH_END_HOLD_S
            # Set FLAG_MATCH_END on all players so nodes know this is the final tag
            for p in self.players.values():
                p["flags"] |= FLAG_MATCH_END
            reason = "force_end" if forced else f"runner tagged {self.tag_count}x"
            print(f"[T2] match ended — {reason} (clearing players in {MATCH_END_HOLD_S}s)")
            await self._push_event({
                "event": "match_end", "winner": "tagger",
                "tag_count": self.tag_count,
            })

    # ── Broadcast ─────────────────────────────────────────────────────────────

    async def _push_broadcast(self):
        if not self.players:
            return

        header  = struct.pack('<HHI', 0x0002, self.tick_count & 0xFFFF,
                              int(time.time() * 1000) & 0xFFFFFFFF)
        entries = b""
        for p in self.players.values():
            entries += struct.pack('<BfffB',
                                   p["player_id"], p["x"], p["y"],
                                   p["angle"], p["flags"])

        await self.broadcast_queue.put({
            "data":    header + entries,
            "targets": list(self.players.keys()),
        })

    # ── Redis writes ──────────────────────────────────────────────────────────

    async def _push_redis_writes(self):
        for p in self.players.values():
            self.write_queue.put({          # SimpleQueue.put() — no await
                "op": "hset", "key": f"player:{p['player_id']}",
                "mapping": {"x": round(p["x"], 4), "y": round(p["y"], 4),
                            "angle": round(p["angle"], 4), "flags": p["flags"]},
            })
        if self.match_started and self.players:
            self.write_queue.put({
                "op": "lpush",
                "key": REPLAY_KEY,
                "value": json.dumps(self._build_state_snapshot()),
            })

    def _build_state_snapshot(self):
        players = []
        for p in sorted(self.players.values(), key=lambda item: item["player_id"]):
            players.append({
                "player_id": p["player_id"],
                "x": round(p["x"], 4),
                "y": round(p["y"], 4),
                "angle": round(p["angle"], 4),
                "flags": p["flags"],
            })
        return {
            "event": "state_snapshot",
            "server_tick": self.tick_count,
            "match_tick": self.match_tick,
            "match_ended": self.match_ended,
            "players": players,
        }

    async def _push_event(self, event: dict):
        self.write_queue.put({              # SimpleQueue.put() — no await
            "op": "lpush", "key": "game:seda-events", "value": json.dumps(event),
        })
