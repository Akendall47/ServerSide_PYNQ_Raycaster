#pragma once
#include "state.h"
#include <unordered_map>

// NodeManager tracks connected players at the C++ level.
// Python T2 is currently authoritative for this; this class is the intended
// replacement once the C++ module is wired in via ctypes / pybind11.
class NodeManager {
public:
    uint8_t register_node(uint32_t ip, uint16_t port);
    void    heartbeat(uint8_t player_id, uint64_t now_ms);
    void    expire(uint64_t now_ms, uint64_t timeout_ms);

    const PlayerState* get(uint8_t player_id) const;
    int  player_count() const { return static_cast<int>(nodes_.size()); }

private:
    std::unordered_map<uint8_t, PlayerState> nodes_;
    uint8_t next_id_ = 1;
};
