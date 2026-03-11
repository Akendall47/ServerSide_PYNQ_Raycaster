# anticheat.py — Server-side authoritative validation: position anti-cheat and proximity.
#
# This is the server's trust boundary for player state: every incoming position
# update is checked here before T2 accepts it. The sim node does its own physics
# locally, but the server must re-validate to catch corrupt/lagged/cheated packets.
#
# Two checks:
#   validate_position — reject implausible speed or out-of-bounds moves
#   distance_between  — Euclidean distance used by CoreLogic for tag detection

import math

DEFAULT_MAX_SPEED_PER_TICK = 12.0


# Reject a packet whose sequence number is stale or replayed.
# Uses 16-bit wraparound arithmetic: delta > 0x7FFF means the seq went backwards.
# Returns True if seq is newer than prev_seq, False if it should be dropped.
def validate_seq(prev_seq, seq):
    delta = (seq - prev_seq) & 0xFFFF
    return delta != 0 and delta <= 0x7FFF


# Reject a position update if the move is faster than max_speed_per_tick or out of bounds.
# Returns True if the new position is plausible, False if it should be dropped.
def validate_position(prev_seq, prev_x, prev_y, prev_angle,
                      new_x, new_y, new_angle, seq,
                      min_x, min_y, max_x, max_y,
                      max_speed_per_tick=DEFAULT_MAX_SPEED_PER_TICK):
    del prev_angle, new_angle
    delta = (seq - prev_seq) & 0xFFFF
    if delta == 0 or delta > 0x7FFF:
        return False
    if new_x < min_x or new_x > max_x or new_y < min_y or new_y > max_y:
        return False
    dx = new_x - prev_x
    dy = new_y - prev_y
    allowed_distance = max_speed_per_tick * max(1, delta)
    return (dx * dx) + (dy * dy) <= (allowed_distance * allowed_distance)


# Euclidean distance between two world-space points — used for tag detection
def distance_between(ax, ay, bx, by):
    return math.hypot(ax - bx, ay - by)
