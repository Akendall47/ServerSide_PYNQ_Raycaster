# t2_constants.py — Tunable game and server constants for T2 GameTick.
import math

# ── Tag / match rules ─────────────────────────────────────────────────────────

TAG_RADIUS       = 20.0   # world-unit proximity that counts as a tag
MATCH_PLAYERS    = 2      # players required to start a match
MAX_PLAYERS      = 2      # hard cap — extra registrations are rejected
TAGS_TO_WIN      = 2      # runner must be tagged this many times to end the match

# ── Timing (seconds) ──────────────────────────────────────────────────────────

TAG_FLASH_S      = 0.3    # how long FLAG_TAGGED stays set so all nodes can see it
MATCH_END_HOLD_S = 0.5    # extra hold after final tag before clearing players
LOCKOUT_S        = 0.5    # reject re-registration for this long after match end
NODE_TIMEOUT_S   = 3.0    # evict node that sends no packets for this long

# ── Grace period after tag reset ─────────────────────────────────────────────
# Players are teleported to spawn after each tag, so proximity detection is
# paused for GRACE_TICKS to let them reach their orbits.
GRACE_TICKS      = 10     # 0.5 s at 20 Hz

# ── Spawn geometry ────────────────────────────────────────────────────────────
# Player 1 = RUNNER, Player 2 = TAGGER.
# Spawn angles mirror node_simulator.py (π/2 apart on a circle of radius 50).
ORBIT_RADIUS     = 50.0
SPAWN_ANGLES     = [0.0, math.pi / 2]   # player_id 1 → 0 rad, player_id 2 → π/2 rad

# ── Redis keys ────────────────────────────────────────────────────────────────

REPLAY_KEY       = "game:seda-replay"
EVENTS_KEY       = "game:seda-events"
CONTROL_CHANNEL  = "game:control"
