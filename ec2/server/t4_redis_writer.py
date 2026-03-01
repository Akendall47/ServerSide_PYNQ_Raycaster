# ec2/server/t4_redis_writer.py
#
# T4 : RedisWriter  —  runs as a dedicated OS thread, NOT an asyncio coroutine.
#
# Why a thread here?
#   Redis HSET/LPUSH calls take 1-5ms over the network. Inside the asyncio event
#   loop that latency would briefly stall T2 and T3 on every await. Moving T4 to
#   its own thread means Redis latency is fully isolated — the event loop never
#   waits for it. This is the one stage where threading beats asyncio.
#
# Thread-safety:
#   asyncio.Queue is NOT thread-safe for get()/put() from a thread directly.
#   Instead we use queue.SimpleQueue (stdlib, fully thread-safe) as the hand-off.
#   T2 puts items onto write_queue (a SimpleQueue) from the event loop;
#   T4's thread blocks on write_queue.get() — zero CPU while idle.
#
# Pipeline batching:
#   Every tick T2 pushes one HSET per player. Rather than executing each as a
#   separate round-trip, _drain() collects everything currently on the queue,
#   batches all HSETs into a single redis.pipeline().execute() call, then handles
#   any LPUSHes individually (rare events — no benefit batching them).
#   On localhost this saves ~0.05ms per extra player; on ElastiCache (~0.5ms RTT)
#   it becomes meaningful immediately.
#
# Queue input (from T2):
#   {"op": "hset",  "key": str, "mapping": dict}  : player position, every tick
#   {"op": "lpush", "key": str, "value":   str}   : match event (match_start etc.)
#
# Requires: pip install redis

import threading
import queue

REDIS_HOST = "127.0.0.1"   # change to ElastiCache endpoint on real EC2
REDIS_PORT = 6379

class RedisWriter:
    def __init__(self, write_queue: queue.SimpleQueue):
        # write_queue is a stdlib SimpleQueue — thread-safe, no asyncio needed
        self.queue  = write_queue
        self.client = None
        self._thread = threading.Thread(target=self._run, daemon=True,
                                        name="T4-RedisWriter")

    def start(self):
        """Start the T4 thread. Called from server.py instead of await writer.run()."""
        self._thread.start()
        print("[T4 RedisWriter] thread started")

    def _run(self):
        """Thread entry point. Connects to Redis then processes queue in batches."""
        try:
            import redis as redislib
            self.client = redislib.Redis(host=REDIS_HOST, port=REDIS_PORT,
                                         decode_responses=True)
            self.client.ping()
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

    def _flush(self, msgs: list):
        """Batch all HSETs into one pipeline; execute LPUSHes individually."""
        hsets  = [m for m in msgs if m.get("op") == "hset"]
        lpushs = [m for m in msgs if m.get("op") == "lpush"]
        other  = [m for m in msgs if m.get("op") not in ("hset", "lpush")]

        for m in other:
            print(f"[T4] unknown op: {m}")

        # Pipeline: bundle all per-tick player position writes into one round-trip
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

        # Events are rare — execute individually so errors are visible per-event
        for m in lpushs:
            if self.client:
                try:
                    self.client.lpush(m["key"], m["value"])
                    print(f"[T4] event: {m['value']}")
                except Exception as e:
                    print(f"[T4] LPUSH {m['key']} failed: {e}")
            else:
                print(f"[T4] would LPUSH {m['key']} {m['value']}")
