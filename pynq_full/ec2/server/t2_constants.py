# t2_constants.py — Tunable game and server constants for T2 GameTick.
import math

# ── Tag / match rules ─────────────────────────────────────────────────────────

TAG_RADIUS       = 20.0
MATCH_PLAYERS    = 2
MAX_PLAYERS      = 4      # raised to 2 humans + up to 3 ghosts (tagger slots)
TAGS_TO_WIN      = 2

# ── Ghost tagger (server-controlled AI) ──────────────────────────────────────
# Spawned when both humans declare RUNNER — max 3 to keep the match fair.

MAX_GHOSTS       = 3
GHOST_SPEED      = 0.2    # world units per tick (~12 wu/s at 60 Hz — matches sim-side ghost pressure)

# ── Bits (GAME_MODE_CHASE_BITS) ───────────────────────────────────────────────
# Bit positions are defined in the map file ('B' tile type).
# Runner collects bits by proximity; all collected = runner wins.

BIT_COLLECT_RADIUS = 10.0   # world units — smaller than TAG_RADIUS so collecting is precise
PLAYER_COLLISION_RADIUS = 2.5
SPAWN_CLEARANCE_RADIUS = 3.25

# ── Timing (seconds) ──────────────────────────────────────────────────────────

TAG_FLASH_S      = 0.3
MATCH_END_HOLD_S = 0.5
LOCKOUT_S        = 0.5    # reject re-registration for this long after match end
NODE_TIMEOUT_S   = 60.0   # pause the match after this long with no packets from a human node
PAUSE_ABORT_S    = 60.0   # abort only if a paused match stays disconnected this much longer

# ── Grace period after tag reset ─────────────────────────────────────────────

GRACE_TICKS      = 30     # 0.5 s at 60 Hz

# ── Spawn geometry ────────────────────────────────────────────────────────────
# Map-relative spawn points for a 32×32 tile map at MAP_TILE_SCALE=8 (256×256 wu).
# Runner and tagger start in opposite quadrants; ghosts spread to other corners.
# All points are inside open corridors of the default chase.txt map.
SPAWN_POSITIONS  = [
    (-56.0, -56.0),   # player_id 1 — runner   (upper-left quadrant)
    ( 56.0,  56.0),   # player_id 2 — tagger   (lower-right quadrant)
    (-56.0,  56.0),   # player_id 3 — ghost 1  (lower-left)
    ( 56.0, -56.0),   # player_id 4 — ghost 2  (upper-right)
    (  0.0,   0.0),   # player_id 5 — ghost 3  (centre)
]
SPAWN_ANGLES     = [0.0, math.pi, math.pi / 2, 3 * math.pi / 2, math.pi / 4]

# ── Map ───────────────────────────────────────────────────────────────────────

MAP_TILE_SCALE   = 8      # world units per tile — must match monitor TILE_SCALE

# ── Redis keys / channels ─────────────────────────────────────────────────────

REPLAY_KEY       = "game:seda-replay"
EVENTS_KEY       = "game:seda-events"
CONTROL_CHANNEL  = "game:control"
