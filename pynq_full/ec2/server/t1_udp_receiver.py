# t1_udp_receiver.py — T1 UDPReceiver: raw UDP -> packet_queue.
#
# Role in the SEDA pipeline:
#   Receives every inbound datagram on port 9000 and enqueues it for T2 GameTick.
#   The socket is shared with T3 Broadcaster so all outbound broadcasts also leave
#   from EC2:9000 — required for WSL NAT to route return packets to nodes correctly.
#
# Threading model:
#   Runs inside the asyncio event loop via DatagramProtocol callbacks.
#   datagram_received() is a sync callback; put_nowait() never blocks.
#
# pynq_full extra: sets SO_RCVBUF to 4 MB to prevent kernel-level drops under
#   burst traffic from multiple PYNQ boards.

import asyncio
import socket

RECV_BUF = 4 * 1024 * 1024  # 4 MB receive buffer,  prevents kernel drops under burst


# Called by asyncio event loop on each inbound datagram; enqueues for T2
class UDPReceiverProtocol(asyncio.DatagramProtocol):

    def __init__(self, queue: asyncio.Queue):
        self.queue = queue
        self._debug_seen = 0

    # Enqueue raw bytes + sender address for T2 to process on the next tick
    def datagram_received(self, data: bytes, addr: tuple):
        if self._debug_seen < 12:
            print(f"[T1] udp from {addr} len={len(data)}")
            self._debug_seen += 1
        self.queue.put_nowait({"data": data, "addr": addr})

    def error_received(self, exc: Exception):
        print(f"[UDPReceiver] error: {exc}")


# Opens and owns the port-9000 UDP socket; exposes transport for T3 and T2 to reuse
class UDPReceiver:

    def __init__(self, packet_queue: asyncio.Queue):
        self.queue     = packet_queue
        self.transport = None   # set by bind(); shared with T3 Broadcaster and T2 (for ACK/MAP)


    # Create the UDP socket, grow the receive buffer, then start receiving
    async def bind(self, port: int):
        loop = asyncio.get_running_loop()
        self.transport, _ = await loop.create_datagram_endpoint(
            lambda: UDPReceiverProtocol(self.queue),
            local_addr=("0.0.0.0", port),
        )
        sock = self.transport.get_extra_info('socket')
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_RCVBUF, RECV_BUF)
        actual = sock.getsockopt(socket.SOL_SOCKET, socket.SO_RCVBUF)
        print(f"[T1 UDPReceiver] listening on UDP :{port}  recv_buf={actual//1024}KB")


    # Keep the coroutine (and therefore the socket) alive indefinitely
    async def run(self):
        try:
            await asyncio.sleep(float("inf"))
        finally:
            if self.transport:
                self.transport.close()
