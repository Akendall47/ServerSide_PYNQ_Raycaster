#pragma once
#include <cstdint>

// Packet type constants — must match protocol.py exactly.
static constexpr uint16_t PKT_STATE_UPDATE = 0x0001;
static constexpr uint16_t PKT_GAME_STATE   = 0x0002;
static constexpr uint16_t PKT_HEARTBEAT    = 0x0010;
static constexpr uint16_t PKT_REGISTER     = 0x0020;
static constexpr uint16_t PKT_ACK          = 0x0030;
static constexpr uint16_t PKT_MAP          = 0x0040;

// Flag bits (uint8 flags field).
static constexpr uint8_t FLAG_SHOOTING  = 0x01;
static constexpr uint8_t FLAG_TAGGED    = 0x02;
static constexpr uint8_t FLAG_MATCH_END = 0x04;

// Wire structs (little-endian, packed — use __attribute__((packed)) or memcpy).
#pragma pack(push, 1)

struct NodePacket {
    uint16_t type;
    uint16_t seq;
    uint32_t timestamp;
    float    x, y, angle;
    uint8_t  flags;
    uint8_t  pad[3];
};  // 24 bytes

struct ServerHeader {
    uint16_t type;
    uint16_t seq;
    uint32_t timestamp;
};  // 8 bytes

struct PlayerEntry {
    uint8_t player_id;
    float   x, y, angle;
    uint8_t flags;
};  // 14 bytes

struct MapHeader {
    uint8_t width;
    uint8_t height;
    uint8_t tile_scale;
    uint8_t pad;
};  // 4 bytes

#pragma pack(pop)

static_assert(sizeof(NodePacket)   == 24, "NodePacket size mismatch");
static_assert(sizeof(ServerHeader) == 8,  "ServerHeader size mismatch");
static_assert(sizeof(PlayerEntry)  == 14, "PlayerEntry size mismatch");
static_assert(sizeof(MapHeader)    == 4,  "MapHeader size mismatch");
