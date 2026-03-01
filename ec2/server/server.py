# ec2/server/server.py
#
# Python SEDA game server : entry point.
#
# 4-stage pipeline: T1 → T2 → T3 (asyncio), T4 (thread)
#
#   T1 UDPReceiver   asyncio  → packet_queue (asyncio.Queue)   → T2 GameTick
#   T2 GameTick      asyncio  → broadcast_queue (asyncio.Queue) → T3 Broadcaster
#   T2 GameTick      asyncio  → write_queue (SimpleQueue)       → T4 RedisWriter
#   T4 RedisWriter   thread   → Redis (blocking calls, isolated from event loop)
#
# T1/T2/T3 run as asyncio coroutines in a single event loop — cooperative,
# no locks needed on shared state (self.players in T2).
# T4 runs as a dedicated OS thread — Redis latency never stalls T2/T3.
# The SimpleQueue between T2 and T4 is the thread-safe SEDA stage boundary.
#
# Run on EC2:
#   python3 ec2/server/server.py
# Requires: pip install redis

import asyncio
import queue
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'interfacing'))

from t1_udp_receiver import UDPReceiver
from t2_game_tick    import GameTick
from t3_broadcaster  import Broadcaster
from t4_redis_writer import RedisWriter

UDP_PORT  = 9000
TICK_RATE = 20   # Hz

async def main():
    packet_queue    = asyncio.Queue()    # T1 → T2 : raw UDP packets
    broadcast_queue = asyncio.Queue()    # T2 → T3 : game state to broadcast
    write_queue     = queue.SimpleQueue() # T2 → T4 : Redis writes (thread-safe)

    receiver    = UDPReceiver(packet_queue)
    ticker      = GameTick(packet_queue, broadcast_queue, write_queue, TICK_RATE)
    broadcaster = Broadcaster(broadcast_queue)
    writer      = RedisWriter(write_queue)

    # T4 starts as a thread — runs independently of the event loop
    writer.start()

    print(f"[server] SEDA pipeline starting on UDP port {UDP_PORT}")
    print(f"[server] T1/T2/T3: asyncio event loop  |  T4: OS thread")

    # T1, T2, T3 run as asyncio coroutines
    await asyncio.gather(
        receiver.run(UDP_PORT),
        ticker.run(),
        broadcaster.run(),
    )

if __name__ == "__main__":
    asyncio.run(main())
