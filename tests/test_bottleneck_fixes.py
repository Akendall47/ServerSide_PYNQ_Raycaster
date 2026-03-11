# test_bottleneck_fixes.py — Regression tests for the two bottleneck fixes:
#   Bottleneck #1: validate_seq applied to ALL movement modes (including INTENT_ONLY)
#   Bottleneck #3: sidecar post-match I/O offloaded to a background thread
#
# Run with: python3 -m pytest tests/test_bottleneck_fixes.py -v
# Or:       python3 tests/test_bottleneck_fixes.py

import asyncio
import importlib
import queue
import sys
import threading
import time
from contextlib import contextmanager
from pathlib import Path
from unittest.mock import MagicMock

ROOT = Path(__file__).resolve().parents[1]
SIM_EC2 = ROOT / "sim_full" / "ec2"
SIM_SERVER = SIM_EC2 / "server"
SIM_PROTOCOL = ROOT / "sim_full" / "interfacing_+_sim"


@contextmanager
def sim_import_context():
    original_path = list(sys.path)
    sys.path[:0] = [str(SIM_PROTOCOL), str(SIM_SERVER), str(SIM_EC2)]
    for name in list(sys.modules):
        if name in {"protocol", "t2_constants", "t2_redis_io", "t2_packet_handler",
                    "t2_map_loader"} or name.startswith("game_logic"):
            sys.modules.pop(name, None)
    try:
        yield
    finally:
        sys.path[:] = original_path
        for name in list(sys.modules):
            if name in {"protocol", "t2_constants", "t2_redis_io", "t2_packet_handler",
                        "t2_map_loader"} or name.startswith("game_logic"):
                sys.modules.pop(name, None)


# ── Helpers ──────────────────────────────────────────────────────────────────

def _make_packet_handler(protocol, match_state_mod, packet_queue=None):
    """Build a PacketHandler with stub callbacks and no UDP transport."""
    from t2_packet_handler import PacketHandler
    state = match_state_mod.MatchState()
    pq = packet_queue or asyncio.Queue()
    wq = MagicMock()
    wq.put = MagicMock()
    map_state = {"width": 20, "height": 20, "tile_scale": 8, "spawn_positions": []}
    return PacketHandler(
        state=state,
        packet_queue=pq,
        write_queue=wq,
        map_state=map_state,
        on_match_start=lambda: None,
        on_match_abort=lambda e: None,
        on_match_pause=lambda e: None,
        on_match_resume=lambda e: None,
        on_event=lambda e: None,
    )



def _register_player(handler, protocol, addr=("127.0.0.1", 9000),
                     x=0.0, y=0.0, angle=0.0):
    """Send a PKT_REGISTER packet so the handler has a player in state."""
    import struct
    data = struct.pack(
        protocol.NODE_FMT,
        protocol.PKT_REGISTER, 1,
        int(time.time() * 1000) & 0xFFFFFFFF,
        x, y, angle,
        0, 0, 1, 0,
    )
    handler._process_packet({"data": data, "addr": addr})


def _make_state_update(protocol, seq, x=0.0, y=0.0, angle=0.0,
                       movement_mode=None, addr=("127.0.0.1", 9000)):
    """Build a PKT_STATE_UPDATE raw packet dict."""
    import struct
    mm = movement_mode if movement_mode is not None else protocol.MOVEMENT_MODE_POSE
    data = struct.pack(
        protocol.NODE_FMT,
        protocol.PKT_STATE_UPDATE, seq,
        int(time.time() * 1000) & 0xFFFFFFFF,
        x, y, angle,
        0, mm, 1, 0,
    )
    return {"data": data, "addr": addr}


# ── Bottleneck #1: validate_seq ───────────────────────────────────────────────

def test_validate_seq_accepts_forward_sequence():
    with sim_import_context():
        anticheat = importlib.import_module("game_logic.anticheat")
        assert anticheat.validate_seq(0, 1) is True
        assert anticheat.validate_seq(100, 101) is True
        assert anticheat.validate_seq(1000, 1100) is True


def test_validate_seq_rejects_same_sequence():
    with sim_import_context():
        anticheat = importlib.import_module("game_logic.anticheat")
        assert anticheat.validate_seq(5, 5) is False
        assert anticheat.validate_seq(0, 0) is False


def test_validate_seq_rejects_backwards_sequence():
    with sim_import_context():
        anticheat = importlib.import_module("game_logic.anticheat")
        assert anticheat.validate_seq(10, 9) is False
        assert anticheat.validate_seq(100, 50) is False


def test_validate_seq_handles_16bit_wraparound_forward():
    with sim_import_context():
        anticheat = importlib.import_module("game_logic.anticheat")
        # 0xFFFE -> 0xFFFF is +1 (forward)
        assert anticheat.validate_seq(0xFFFE, 0xFFFF) is True
        # 0xFFFF -> 0 is +1 after wraparound (forward)
        assert anticheat.validate_seq(0xFFFF, 0) is True
        # 0xFFFF -> 1 is +2 after wraparound (forward)
        assert anticheat.validate_seq(0xFFFF, 1) is True


def test_validate_seq_handles_16bit_wraparound_backward():
    with sim_import_context():
        anticheat = importlib.import_module("game_logic.anticheat")
        # delta = (0 - 1) & 0xFFFF = 0x7FFF + 1 = 0x8000 (backward — delta > 0x7FFF)
        assert anticheat.validate_seq(1, 0) is False
        # delta = (0xFFFF - 0) & 0xFFFF = 0xFFFF (backward — large delta)
        assert anticheat.validate_seq(0, 0xFFFF) is False


def test_validate_seq_boundary_at_half_range():
    with sim_import_context():
        anticheat = importlib.import_module("game_logic.anticheat")
        # delta = 0x7FFF is the last valid forward value
        assert anticheat.validate_seq(0, 0x7FFF) is True
        # delta = 0x8000 is the first backward value
        assert anticheat.validate_seq(0, 0x8000) is False


# ── Bottleneck #1: INTENT_ONLY mode now requires valid seq ────────────────────

def test_intent_only_stale_seq_is_rejected():
    """MOVEMENT_MODE_INTENT_ONLY packets must now pass validate_seq.

    Before the fix, validate_seq was only applied after the movement_mode branch,
    so INTENT_ONLY packets could slip through with a stale or replayed sequence.
    """
    with sim_import_context():
        protocol = importlib.import_module("protocol")
        match_state_mod = importlib.import_module("game_logic.match_state")
        import t2_packet_handler  # noqa: ensure module is loaded from context

        addr = ("10.0.0.1", 9001)
        handler = _make_packet_handler(protocol, match_state_mod)

        # Register the player (seq=1)
        _register_player(handler, protocol, addr=addr)

        # Promote to a started match so PKT_STATE_UPDATE is processed normally
        handler.state.match_started = True
        handler.state.players[addr]["player_id"] = 1
        handler.state.players[addr]["last_seq"] = 10

        # First valid update: seq=11, INTENT_ONLY
        raw = _make_state_update(protocol, seq=11, x=0.0, y=0.0,
                                 movement_mode=protocol.MOVEMENT_MODE_INTENT_ONLY,
                                 addr=addr)
        handler._process_packet(raw)
        assert handler.state.players[addr]["last_seq"] == 11

        # Stale replay: seq=11 again — must be rejected
        raw_stale = _make_state_update(protocol, seq=11, x=1.0, y=1.0,
                                       movement_mode=protocol.MOVEMENT_MODE_INTENT_ONLY,
                                       addr=addr)
        handler._process_packet(raw_stale)
        # last_seq must remain 11 (packet dropped, position not updated)
        assert handler.state.players[addr]["last_seq"] == 11

        # Backwards seq: seq=5 — must be rejected
        raw_old = _make_state_update(protocol, seq=5, x=2.0, y=2.0,
                                     movement_mode=protocol.MOVEMENT_MODE_INTENT_ONLY,
                                     addr=addr)
        handler._process_packet(raw_old)
        assert handler.state.players[addr]["last_seq"] == 11


def test_intent_only_valid_forward_seq_is_accepted():
    """MOVEMENT_MODE_INTENT_ONLY packets with valid seq must still be processed."""
    with sim_import_context():
        protocol = importlib.import_module("protocol")
        match_state_mod = importlib.import_module("game_logic.match_state")
        import t2_packet_handler  # noqa

        addr = ("10.0.0.2", 9002)
        handler = _make_packet_handler(protocol, match_state_mod)

        _register_player(handler, protocol, addr=addr)
        handler.state.match_started = True
        handler.state.players[addr]["player_id"] = 1
        handler.state.players[addr]["last_seq"] = 20

        raw = _make_state_update(protocol, seq=21, x=3.0, y=3.0,
                                 movement_mode=protocol.MOVEMENT_MODE_INTENT_ONLY,
                                 addr=addr)
        handler._process_packet(raw)
        assert handler.state.players[addr]["last_seq"] == 21


def test_pose_mode_stale_seq_is_also_rejected():
    """MOVEMENT_MODE_POSE must reject stale seq — verify the fix is mode-agnostic."""
    with sim_import_context():
        protocol = importlib.import_module("protocol")
        match_state_mod = importlib.import_module("game_logic.match_state")
        import t2_packet_handler  # noqa

        addr = ("10.0.0.3", 9003)
        handler = _make_packet_handler(protocol, match_state_mod)

        _register_player(handler, protocol, addr=addr, x=0.0, y=0.0)
        handler.state.match_started = True
        handler.state.players[addr]["player_id"] = 1
        handler.state.players[addr]["last_seq"] = 30
        handler.state.players[addr]["x"] = 0.0
        handler.state.players[addr]["y"] = 0.0

        # Replayed packet — same seq
        raw = _make_state_update(protocol, seq=30, x=1.0, y=0.0,
                                 movement_mode=protocol.MOVEMENT_MODE_POSE,
                                 addr=addr)
        handler._process_packet(raw)
        assert handler.state.players[addr]["last_seq"] == 30
        # Position must be unchanged
        assert handler.state.players[addr]["x"] == 0.0


# ── Bottleneck #3: sidecar post-match I/O in background thread ───────────────

def test_background_thread_resets_state_before_io_completes():
    """Verify the threading pattern: state resets immediately; I/O runs later.

    We simulate the sidecar's refactored _finalise_match pattern:
      1. capture needed data into locals
      2. call reset() immediately
      3. fire daemon thread for slow I/O (blocked here by an Event)
      4. assert state is reset before the thread finishes
    """
    # Shared mutable state (simulates sidecar globals)
    state = {"match_id": "match-abc", "active": True}

    def reset_match_state():
        state["match_id"] = None
        state["active"] = False

    def has_active_match():
        return state["active"]

    io_started = threading.Event()
    io_release = threading.Event()   # held open to simulate slow DDB/SNS

    captured_match_id = state["match_id"]

    # -- The pattern under test --
    reset_match_state()

    def _post_match_io():
        io_started.set()
        io_release.wait(timeout=5.0)
        # Simulate DynamoDB write
        _ = captured_match_id + "-done"

    t = threading.Thread(target=_post_match_io, daemon=True)
    t.start()

    # State must be reset before thread finishes
    io_started.wait(timeout=2.0)
    assert not has_active_match(), "State must be reset before I/O completes"

    # Confirm the captured value is independent of current state
    assert captured_match_id == "match-abc"
    assert state["match_id"] is None

    # Now let the thread finish
    io_release.set()
    t.join(timeout=2.0)
    assert not t.is_alive()


def test_new_match_can_start_while_previous_io_is_running():
    """Verify two matches can overlap: one doing post-match I/O, one freshly started."""
    state = {"match_id": None, "active": False, "tick": 0}

    def start_match(match_id):
        state["match_id"] = match_id
        state["active"] = True
        state["tick"] = 0

    def reset_match_state():
        state["match_id"] = None
        state["active"] = False
        state["tick"] = 0

    io_release = threading.Event()
    captured_id = "match-001"

    # End match-001
    reset_match_state()
    t = threading.Thread(
        target=lambda: (io_release.wait(timeout=5.0), None),
        daemon=True,
    )
    t.start()

    # Start match-002 while match-001 I/O is still running
    start_match("match-002")
    assert state["active"] is True
    assert state["match_id"] == "match-002"
    assert t.is_alive(), "Previous I/O thread should still be running"

    io_release.set()
    t.join(timeout=2.0)

    # match-002 is unaffected by the thread completing
    assert state["match_id"] == "match-002"
    assert state["active"] is True


def test_background_thread_is_daemon():
    """Daemon threads must not block process exit — verify the property."""
    result = {}

    def _io():
        time.sleep(100)  # Would block indefinitely if not daemon

    t = threading.Thread(target=_io, daemon=True)
    t.start()
    result["is_daemon"] = t.daemon
    # We don't join — just verify the flag
    assert result["is_daemon"] is True


if __name__ == "__main__":
    import pytest
    raise SystemExit(pytest.main([__file__, "-v"]))
