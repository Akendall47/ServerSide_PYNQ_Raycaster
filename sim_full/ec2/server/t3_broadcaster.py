# t3_broadcaster.py — T3 Broadcaster: broadcast_queue → UDP sendto all nodes.
#
# Role in the SEDA pipeline:
#   Drains broadcast_queue and sends each state packet to every registered node.
#   Passing T1's shared_transport is critical: it ensures replies leave from EC2:9000
#   so WSL NAT can match the port and deliver packets to nodes behind NAT.
#   Without it, packets come from a random ephemeral port and are silently dropped.
#
# Threading model:
#   Runs as an asyncio coroutine (same thread as T1/T2). sendto() is non-blocking.

import asyncio


# Minimal send-only asyncio UDP protocol — only instantiated when no shared socket
class BroadcasterProtocol(asyncio.DatagramProtocol):

    def error_received(self, exc):
        print(f"[Broadcaster] send error: {exc}")


# Dequeues broadcast messages and fan-outs each one to all target addresses
class Broadcaster:

    def __init__(self, broadcast_queue: asyncio.Queue, shared_transport=None):
        self.queue     = broadcast_queue
        self.transport = None
        self._shared   = shared_transport  # T1's port-9000 socket, if provided

    # Resolve the transport then spin on the queue; always prefer the shared socket
    async def run(self):
        loop = asyncio.get_running_loop()

        if self._shared is not None:
            # Preferred path: reuse T1's socket so source port is always 9000
            self.transport = self._shared
            print("[T3 Broadcaster] reusing T1 socket (port 9000)")
        else:
            # Fallback: open a new socket (source port will be random — use with care)
            self.transport, _ = await loop.create_datagram_endpoint(
                BroadcasterProtocol,
                family=2,   # AF_INET
            )
            print("[T3 Broadcaster] opened own socket (no shared transport)")

        print("[T3 Broadcaster] ready")

        while True:
            msg = await self.queue.get()
            await self._send_udp(msg)

    # Send msg["data"] to every address in msg["targets"]
    async def _send_udp(self, msg: dict):
        data    = msg["data"]
        targets = msg["targets"]
        for addr in targets:
            try:
                self.transport.sendto(data, addr)
            except Exception as e:
                print(f"[T3] sendto {addr} failed: {e}")
