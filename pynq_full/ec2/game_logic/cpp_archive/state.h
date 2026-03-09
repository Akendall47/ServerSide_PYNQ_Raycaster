#pragma once
#include <cstdint>

struct Vec2 { float x, y; };

struct PlayerState {
    uint8_t  player_id;
    float    x, y, angle;
    uint8_t  flags;
    uint16_t last_seq;
    uint64_t last_seen_ms;
};

struct Map {
    const uint8_t* tiles;   // flat row-major array, 0=empty 1=wall
    int width, height;
    float tile_scale;       // world units per tile
};
