// game_logic/node_manager.cpp — player registration and heartbeat tracking.

#include "node_manager.h"

uint8_t NodeManager::register_node(uint32_t ip, uint16_t port) {
    // TODO: reject if next_id_ > MAX_PLAYERS
    // TODO: store ip+port → player_id mapping for lookup on incoming packets
    (void)ip; (void)port;
    uint8_t id = next_id_++;
    nodes_[id] = PlayerState{id, 0.f, 0.f, 0.f, 0, 0, 0};
    return id;
}

void NodeManager::heartbeat(uint8_t player_id, uint64_t now_ms) {
    auto it = nodes_.find(player_id);
    if (it != nodes_.end())
        it->second.last_seen_ms = now_ms;
}

void NodeManager::expire(uint64_t now_ms, uint64_t timeout_ms) {
    for (auto it = nodes_.begin(); it != nodes_.end(); ) {
        if (now_ms - it->second.last_seen_ms > timeout_ms)
            it = nodes_.erase(it);
        else
            ++it;
    }
}

const PlayerState* NodeManager::get(uint8_t player_id) const {
    auto it = nodes_.find(player_id);
    return it != nodes_.end() ? &it->second : nullptr;
}
