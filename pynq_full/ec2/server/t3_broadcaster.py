# ec2/server/t3_broadcaster.py — T3 Broadcaster: broadcast_queue → UDP sendto all nodes.

import asyncio

class BroadcasterProtocol(asyncio.DatagramProtocol):
    """Minimal send-only UDP transport for outgoing broadcasts."""
    def error_received(self, exc):
        print(f"[Broadcaster] send error: {exc}")


class Broadcaster:
    def __init__(self, broadcast_queue: asyncio.Queue, shared_transport=None):
        self.queue            = broadcast_queue
        self.transport        = None
        self._shared          = shared_transport   # T1's port-9000 socket if provided

    async def run(self):
        loop = asyncio.get_running_loop()

        if self._shared is not None:
            self.transport = self._shared  # reuse T1's socket — replies from EC2:9000
            print("[T3 Broadcaster] reusing T1 socket (port 9000)")
        else:
            # Fallback: open a separate UDP socket for sending
            self.transport, _ = await loop.create_datagram_endpoint(
                BroadcasterProtocol,
                family=2,   # AF_INET
            )
            print("[T3 Broadcaster] opened own socket (no shared transport)")

        print("[T3 Broadcaster] ready")

        while True:
            msg = await self.queue.get()
            await self._send_udp(msg)

    async def _send_udp(self, msg: dict):
        data    = msg["data"]
        targets = msg["targets"]
        for addr in targets:
            try:
                self.transport.sendto(data, addr)
            except Exception as e:
                print(f"[T3] sendto {addr} failed: {e}")
