import math

# ── Tag / match rules ─────────────────────────────────────────────────────────

TAG_RADIUS       = 20.0
MATCH_PLAYERS    = 2
MAX_PLAYERS      = 2
TAGS_TO_WIN      = 2

# ── Timing (seconds) ──────────────────────────────────────────────────────────

TAG_FLASH_S      = 0.3
MATCH_END_HOLD_S = 0.5
LOCKOUT_S        = 0.5    # reject re-registration for this long after match end
NODE_TIMEOUT_S   = 3.0

# ── Grace period after tag reset ─────────────────────────────────────────────

GRACE_TICKS      = 30     # 0.5 s at 60 Hz

# ── Spawn geometry ────────────────────────────────────────────────────────────
# Player 1 = RUNNER, Player 2 = TAGGER.
# Spawn angles mirror the node firmware: π/2 apart on a circle of radius 50.

ORBIT_RADIUS     = 50.0
SPAWN_ANGLES     = [0.0, math.pi / 2]   # player_id 1 → 0 rad, player_id 2 → π/2 rad

# ── Map ───────────────────────────────────────────────────────────────────────

MAP_TILE_SCALE   = 8      # world units per tile — must match monitor TILE_SCALE

# ── Redis keys / channels ─────────────────────────────────────────────────────

REPLAY_KEY       = "game:seda-replay"
EVENTS_KEY       = "game:seda-events"
CONTROL_CHANNEL  = "game:control"
