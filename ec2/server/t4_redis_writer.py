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
# Queue input (from T2):
#   {"op": "hset",  "key": str, "mapping": dict}  : player position, every tick
#   {"op": "lpush", "key": str, "value":   str}   : match event (match_start etc.)
#
# Requires: pip install redis

import threading
import queue
import json

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
        """Thread entry point. Connects to Redis then blocks on write_queue.get()."""
        try:
            import redis as redislib
            self.client = redislib.Redis(host=REDIS_HOST, port=REDIS_PORT,
                                         decode_responses=True)
            self.client.ping()
            print(f"[T4 RedisWriter] connected to Redis at {REDIS_HOST}:{REDIS_PORT}")
        except Exception as e:
            print(f"[T4 RedisWriter] Redis not available ({e}) : writes logged only")
            self.client = None

        # Block on queue — zero CPU while T2 has nothing to write
        while True:
            msg = self.queue.get()   # blocks here until T2 puts something
            self._write(msg)

    def _write(self, msg: dict):
        op = msg.get("op")
        if op == "hset":
            self._hset(msg["key"], msg["mapping"])
        elif op == "lpush":
            self._lpush(msg["key"], msg["value"])
        else:
            print(f"[T4] unknown op: {msg}")

    def _hset(self, key: str, mapping: dict):
        if not self.client:
            print(f"[T4] would HSET {key} {mapping}")
            return
        try:
            self.client.hset(key, mapping=mapping)
        except Exception as e:
            print(f"[T4] HSET {key} failed: {e}")

    def _lpush(self, key: str, value: str):
        if not self.client:
            print(f"[T4] would LPUSH {key} {value}")
            return
        try:
            self.client.lpush(key, value)
            print(f"[T4] event: {value}")
        except Exception as e:
            print(f"[T4] LPUSH {key} failed: {e}")
