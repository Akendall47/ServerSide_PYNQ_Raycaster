# t2_constants.py — Tunable game and server constants for T2 GameTick.
import math

# ── Tag / match rules ─────────────────────────────────────────────────────────

TAG_RADIUS       = 20.0   # world-unit proximity that counts as a tag
MATCH_PLAYERS    = 2      # players required to start a match
MAX_PLAYERS      = 4      # raised to 2 humans + up to 3 ghosts (tagger slots)
TAGS_TO_WIN      = 2      # runner must be tagged this many times to end the match

# ── Ghost tagger (server-controlled AI) ──────────────────────────────────────
# Spawned when both humans declare RUNNER — max 3 to keep the match fair.

MAX_GHOSTS       = 3
GHOST_SPEED      = 0.6    # world units per tick (~12 wu/s at 20 Hz — intentionally slow early-game pressure)

# ── Bits (GAME_MODE_CHASE_BITS) ───────────────────────────────────────────────

BIT_COLLECT_RADIUS = 10.0   # world units — smaller than TAG_RADIUS
PLAYER_COLLISION_RADIUS = 2.5
SPAWN_CLEARANCE_RADIUS = 3.25

# ── Timing (seconds) ──────────────────────────────────────────────────────────

TAG_FLASH_S      = 0.3    # how long FLAG_TAGGED stays set so all nodes can see it
MATCH_END_HOLD_S = 0.5    # extra hold after final tag before clearing players
LOCKOUT_S        = 0.5    # reject re-registration for this long after match end
NODE_TIMEOUT_S   = 60.0   # pause the match after this long with no packets from a human node
PAUSE_ABORT_S    = 60.0   # abort only if a paused match stays disconnected this much longer

# ── Grace period after tag reset ─────────────────────────────────────────────
# Players are teleported to spawn after each tag, so proximity detection is
# paused for GRACE_TICKS to let them reach their orbits.
GRACE_TICKS      = 10     # 0.5 s at 20 Hz

# ── Spawn geometry ────────────────────────────────────────────────────────────
# Map-relative spawn points for a 32×32 tile map at MAP_TILE_SCALE=8 (256×256 wu).
# Runner and tagger start in opposite quadrants; ghosts spread to other corners.
# All points are inside open corridors of the default chase.txt map.
ORBIT_RADIUS     = 50.0   # kept for node_simulator orbit mode (legacy)
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

# ── Redis keys ────────────────────────────────────────────────────────────────

REPLAY_KEY       = "game:seda-replay"
EVENTS_KEY       = "game:seda-events"
CONTROL_CHANNEL  = "game:control"
