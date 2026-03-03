# ec2/server/t1_udp_receiver.py — T1 UDPReceiver: raw UDP → packet_queue.
# Shares port-9000 socket with T3 so broadcasts come from EC2:9000 (matches NAT).

import asyncio
import socket

RECV_BUF = 4 * 1024 * 1024  # 4 MB — prevents kernel-level drops under burst traffic

class UDPReceiverProtocol(asyncio.DatagramProtocol):
    """asyncio UDP transport : called by the event loop on each incoming datagram."""

    def __init__(self, queue: asyncio.Queue):
        self.queue = queue

    def datagram_received(self, data: bytes, addr: tuple):
        self.queue.put_nowait({"data": data, "addr": addr})

    def error_received(self, exc: Exception):
        print(f"[UDPReceiver] error: {exc}")


class UDPReceiver:
    def __init__(self, packet_queue: asyncio.Queue):
        self.queue     = packet_queue
        self.transport = None   # set by bind(); shared with T3 Broadcaster

    async def bind(self, port: int):
        """Bind the UDP socket. Must be called before run()."""
        loop = asyncio.get_running_loop()
        self.transport, _ = await loop.create_datagram_endpoint(
            lambda: UDPReceiverProtocol(self.queue),
            local_addr=("0.0.0.0", port),
        )
        sock = self.transport.get_extra_info('socket')
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_RCVBUF, RECV_BUF)
        actual = sock.getsockopt(socket.SOL_SOCKET, socket.SO_RCVBUF)
        print(f"[T1 UDPReceiver] listening on UDP :{port}  recv_buf={actual//1024}KB")

    async def run(self):
        """Keep the socket alive. bind() must have been called first."""
        try:
            await asyncio.sleep(float("inf"))   # run forever
        finally:
            if self.transport:
                self.transport.close()
