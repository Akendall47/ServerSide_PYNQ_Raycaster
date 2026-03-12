# t4_redis_writer.py — T4 RedisWriter: write_queue → Redis, runs as an OS thread.
#
# Role in the SEDA pipeline:
#   Consumes write_queue entries (hset / lpush / del) and persists them to Redis.
#   Running in its own thread keeps Redis latency from blocking the asyncio loop.
#
# Batching strategy:
#   Block on queue.get() until at least one item arrives, then drain everything
#   available with get_nowait(). All HSETs in the batch go through one pipeline
#   round-trip; LPUSHes (events) are executed individually for clear error visibility.

import threading
import queue

REDIS_HOST = "127.0.0.1"   # change to ElastiCache endpoint on real EC2
REDIS_PORT = 6379
RUNTIME_KEYS = (
    "game:state",
    "game:monitor-events",
    "game:seda-events",
    "game:seda-replay",
)


# Owns the Redis connection and the drain/flush loop; started as a daemon thread
class RedisWriter:

    def __init__(self, write_queue: queue.SimpleQueue):
        # write_queue is a stdlib SimpleQueue — thread-safe, no asyncio needed
        self.queue   = write_queue
        self.client  = None
        self._thread = threading.Thread(target=self._run, daemon=True,
                                        name="T4-RedisWriter")

    # Start the T4 thread — called from server.py before the event loop starts
    def start(self):
        self._thread.start()
        print("[T4 RedisWriter] thread started")

    # Thread entry point: connect to Redis then loop forever processing batches
    def _run(self):
        try:
            import redis as redislib
            self.client = redislib.Redis(host=REDIS_HOST, port=REDIS_PORT,
                                         decode_responses=True)
            self.client.ping()
            self._clear_runtime_state()
            print(f"[T4 RedisWriter] connected to Redis at {REDIS_HOST}:{REDIS_PORT}")
        except Exception as e:
            print(f"[T4 RedisWriter] Redis not available ({e}) : writes logged only")
            self.client = None

        while True:
            # Block until at least one message is ready, then drain the rest
            first = self.queue.get()
            msgs  = [first]
            while True:
                try:
                    msgs.append(self.queue.get_nowait())
                except queue.Empty:
                    break
            self._flush(msgs)

    def _clear_runtime_state(self):
        if not self.client:
            return
        try:
            stale_player_keys = list(self.client.scan_iter(match="player:*"))
            keys = [*RUNTIME_KEYS, *stale_player_keys]
            if keys:
                self.client.delete(*keys)
                print(f"[T4 RedisWriter] cleared stale runtime keys ({len(keys)})")
        except Exception as e:
            print(f"[T4 RedisWriter] startup clear failed: {e}")

    # Separate msgs by op-type, then execute DELs → HSET pipeline → LPUSHes
    def _flush(self, msgs: list):
        hsets  = [m for m in msgs if m.get("op") == "hset"]
        lpushs = [m for m in msgs if m.get("op") == "lpush"]
        dels   = [m for m in msgs if m.get("op") == "del"]
        other  = [m for m in msgs if m.get("op") not in ("hset", "lpush", "del")]

        for m in other:
            print(f"[T4] unknown op: {m}")

        # DELs: clean up stale player keys when a node disconnects
        if dels and self.client:
            try:
                self.client.delete(*[m["key"] for m in dels])
                print(f"[T4] DEL {[m['key'] for m in dels]}")
            except Exception as e:
                print(f"[T4] DEL failed: {e}")

        # HSETs: bundle all per-tick player position writes into one round-trip
        if hsets and self.client:
            try:
                pipe = self.client.pipeline(transaction=False)
                for m in hsets:
                    pipe.hset(m["key"], mapping=m["mapping"])
                pipe.execute()
            except Exception as e:
                print(f"[T4] pipeline HSET failed: {e}")
        elif hsets:
            for m in hsets:
                print(f"[T4] would HSET {m['key']} {m['mapping']}")

        # LPUSHes: events are rare — execute individually so errors are visible per-event
        for m in lpushs:
            if self.client:
                try:
                    self.client.lpush(m["key"], m["value"])
                    print(f"[T4] event: {m['value']}")
                    # Mirror to monitor-events list (never drained by sidecar)
                    # so monitor.py sees every event regardless of BRPOP timing.
                    if m["key"] == "game:seda-events":
                        pipe = self.client.pipeline(transaction=False)
                        pipe.lpush("game:monitor-events", m["value"])
                        pipe.ltrim("game:monitor-events", 0, 99)  # keep last 100
                        pipe.execute()
                except Exception as e:
                    print(f"[T4] LPUSH {m['key']} failed: {e}")
            else:
                print(f"[T4] would LPUSH {m['key']} {m['value']}")
