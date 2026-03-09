// game_logic/map_loader.cpp — load text map files into tile arrays.

#include "map_loader.h"
#include <fstream>
#include <stdexcept>

bool load_map(const std::string& path, std::vector<uint8_t>& tiles,
              int& width, int& height) {
    std::ifstream f(path);
    if (!f) return false;

    std::vector<std::vector<uint8_t>> rows;
    std::string line;
    while (std::getline(f, line)) {
        if (line.empty()) continue;
        std::vector<uint8_t> row;
        for (char c : line)
            row.push_back(c == '#' ? 1 : 0);
        rows.push_back(std::move(row));
    }

    if (rows.empty()) return false;
    width  = static_cast<int>(rows[0].size());
    height = static_cast<int>(rows.size());
    tiles.clear();
    tiles.reserve(width * height);
    for (auto& r : rows)
        tiles.insert(tiles.end(), r.begin(), r.end());
    return true;
}

Map make_map_view(const std::vector<uint8_t>& tiles, int width, int height,
                  float tile_scale) {
    return Map{tiles.data(), width, height, tile_scale};
}
