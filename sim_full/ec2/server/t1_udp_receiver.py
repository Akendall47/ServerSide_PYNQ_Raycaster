# t1_udp_receiver.py — T1 UDPReceiver: raw UDP → packet_queue.
#
# Role in the SEDA pipeline:
#   Receives every inbound datagram on port 9000 and enqueues it for T2 GameTick.
#   The socket is shared with T3 Broadcaster so all outbound broadcasts also leave
#   from EC2:9000 — required for WSL NAT to route return packets to nodes correctly.
#
# Threading model:
#   Runs inside the asyncio event loop via DatagramProtocol callbacks.
#   datagram_received() is a sync callback; put_nowait() never blocks.

import asyncio


# Called by asyncio event loop on each inbound datagram; enqueues for T2
class UDPReceiverProtocol(asyncio.DatagramProtocol):

    def __init__(self, queue: asyncio.Queue):
        self.queue = queue

    # Enqueue raw bytes + sender address for T2 to process on the next tick.
    # put_nowait() is safe here because this is a synchronous callback.
    # TODO: add per-IP rate limiting here if flood protection is needed.
    def datagram_received(self, data: bytes, addr: tuple):
        self.queue.put_nowait({"data": data, "addr": addr})

    def error_received(self, exc: Exception):
        print(f"[UDPReceiver] error: {exc}")


# Opens and owns the port-9000 UDP socket; exposes transport for T3 to reuse
class UDPReceiver:

    def __init__(self, packet_queue: asyncio.Queue):
        self.queue     = packet_queue
        self.transport = None   # set by bind(); passed to T3 Broadcaster in server.py

    # Create the UDP socket and start receiving — must be called before run()
    async def bind(self, port: int):
        loop = asyncio.get_running_loop()
        self.transport, _ = await loop.create_datagram_endpoint(
            lambda: UDPReceiverProtocol(self.queue),
            local_addr=("0.0.0.0", port),
        )
        print(f"[T1 UDPReceiver] listening on UDP :{port}")

    # Keep the coroutine (and therefore the socket) alive indefinitely
    async def run(self):
        try:
            await asyncio.sleep(float("inf"))
        finally:
            if self.transport:
                self.transport.close()
