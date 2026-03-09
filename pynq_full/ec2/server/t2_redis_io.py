# t2_redis_io.py — Broadcast packet builder and Redis write helpers.
#
# Owns: push_broadcast, push_redis_writes, _build_state_snapshot, push_event
#
# Why a separate module: serialisation details (struct layout, JSON schema) are
# stable but verbose. Keeping them here prevents t2_game_tick.py from being
# cluttered with wire-format code.

import json
import struct
import time

from t2_constants import REPLAY_KEY, EVENTS_KEY
from game_logic.match_state import MatchState


# Serialises game state for UDP broadcast and Redis persistence
class RedisIO:

    def __init__(self, state: MatchState, broadcast_queue, write_queue):
        self.state           = state
        self.broadcast_queue = broadcast_queue
        self.write_queue     = write_queue

    # ── UDP broadcast ─────────────────────────────────────────────────────────
    # Build one state packet per tick and enqueue it for T3 Broadcaster
    #
    # Wire format:
    #   header:     <HHI  — pkt_type=0x0002, tick_seq (16-bit), timestamp_ms (32-bit)
    #   per-player: <BfffB — player_id, x, y, angle, flags

    async def push_broadcast(self, tick_count: int):
        if not self.state.players:
            return

        header  = struct.pack('<HHI', 0x0002, tick_count & 0xFFFF,
                              int(time.time() * 1000) & 0xFFFFFFFF)
        entries = b"".join(
            struct.pack('<BfffB', p["player_id"], p["x"], p["y"], p["angle"], p["flags"])
            for p in self.state.players.values()
        )
        await self.broadcast_queue.put({
            "data":    header + entries,
            "targets": list(self.state.players.keys()),
        })

    # ── Redis persistence ─────────────────────────────────────────────────────
    # Write player positions to hashes and append a replay frame each tick

    def push_redis_writes(self, tick_count: int, match_tick: int):
        for p in self.state.players.values():
            self.write_queue.put({
                "op": "hset", "key": f"player:{p['player_id']}",
                "mapping": {
                    "x":     round(p["x"], 4),
                    "y":     round(p["y"], 4),
                    "angle": round(p["angle"], 4),
                    "flags": p["flags"],
                },
            })
        if self.state.match_started and self.state.players:
            self.write_queue.put({
                "op":    "lpush",
                "key":   REPLAY_KEY,
                "value": json.dumps(
                    self._build_state_snapshot(tick_count, match_tick)
                ),
            })

    # Append a JSON event to the seda-events Redis list for sidecar/monitor
    def push_event(self, event: dict):
        self.write_queue.put({
            "op": "lpush", "key": EVENTS_KEY, "value": json.dumps(event),
        })

    # ── Snapshot builder ──────────────────────────────────────────────────────
    # Build a full-state JSON dict for replay — sorted by player_id for consistency

    def _build_state_snapshot(self, tick_count: int, match_tick: int) -> dict:
        players = [
            {
                "player_id": p["player_id"],
                "x":         round(p["x"], 4),
                "y":         round(p["y"], 4),
                "angle":     round(p["angle"], 4),
                "flags":     p["flags"],
            }
            for p in sorted(self.state.players.values(), key=lambda q: q["player_id"])
        ]
        return {
            "event":        "state_snapshot",
            "server_tick":  tick_count,
            "match_tick":   match_tick,
            "match_ended":  self.state.match_ended,
            "players":      players,
        }
