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

from protocol import GAME_STATE_EXT_FMT
from t2_constants import REPLAY_KEY, EVENTS_KEY
from game_logic.match_state import MatchState


# Serialises game state for UDP broadcast and Redis persistence
class RedisIO:

    def __init__(self, state: MatchState, map_state, broadcast_queue, write_queue):
        self.state           = state
        self.map_state       = map_state
        self.broadcast_queue = broadcast_queue
        self.write_queue     = write_queue

    # ── UDP broadcast ─────────────────────────────────────────────────────────
    # Build one state packet per tick and enqueue it for T3 Broadcaster
    #
    # Wire format:
    #   header:     <HHI  — pkt_type=0x0002, tick_seq (16-bit), timestamp_ms (32-bit)
    #   ext header: <BBH  — game_mode (B), player_count (B), bits_mask (H)
    #   per-player: <BfffB — player_id, x, y, angle, flags
    #
    # Broadcasts go to human nodes only (ghost addresses are server-internal).

    async def push_broadcast(self, tick_count: int):
        if not self.state.players:
            return

        players     = list(self.state.players.values())
        human_addrs = [a for a in self.state.players if not str(a).startswith("ghost:")]
        header  = struct.pack('<HHI', 0x0002, tick_count & 0xFFFF,
                              int(time.time() * 1000) & 0xFFFFFFFF)
        ext     = struct.pack(GAME_STATE_EXT_FMT,
                              self.state.game_mode, len(players), self.state.bits_mask & 0xFFFF)
        entries = b"".join(
            struct.pack('<BfffB', p["player_id"], p["x"], p["y"], p["angle"], p["flags"])
            for p in players
        )
        await self.broadcast_queue.put({
            "data":    header + ext + entries,
            "targets": human_addrs,
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
        pause_remaining_s = None
        if self.state.pause_abort_at is not None:
            pause_remaining_s = max(0.0, self.state.pause_abort_at - time.monotonic())
        # Write match-level state so monitor can read bits_mask and positions per tick
        mapping = {
            "game_mode":         self.state.game_mode,
            "bits_mask":         self.state.bits_mask,
            "match_tick":        match_tick,
            "match_started":     int(self.state.match_started),
            "match_ended":       int(self.state.match_ended),
            "match_paused":      int(self.state.match_paused),
            "sim_view_mode":     getattr(self.state, "sim_view_mode", "map"),
            "selected_map":      getattr(self.state, "selected_map_name", self.map_state.get("name", "")),
            "pause_reason":      self.state.pause_reason or "",
            "paused_player_ids": json.dumps(self.state.paused_player_ids),
            "pause_remaining_s": "" if pause_remaining_s is None else round(pause_remaining_s, 2),
            "map":               self.map_state.get("name", ""),
            "bits": json.dumps([[round(b[0], 2), round(b[1], 2)]
                                 for b in self.state.bits]),
        }
        self.write_queue.put({"op": "hset", "key": "game:state", "mapping": mapping})
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
            "match_paused": self.state.match_paused,
            "pause_reason": self.state.pause_reason,
            "paused_player_ids": list(self.state.paused_player_ids),
            "game_mode":    self.state.game_mode,
            "map":          self.map_state.get("name", ""),
            "bits_mask":    self.state.bits_mask,
            "bits": [
                [round(bit[0], 2), round(bit[1], 2)]
                for bit in self.state.bits
            ],
            "players":      players,
        }
