#pragma once
#include "state.h"
#include <string>
#include <vector>

// Load a text map file into a flat tile array.
// Returns false on failure. tiles is row-major, 0=empty 1=wall.
bool load_map(const std::string& path, std::vector<uint8_t>& tiles,
              int& width, int& height);

// Build a Map view over an already-loaded tile buffer.
Map make_map_view(const std::vector<uint8_t>& tiles, int width, int height,
                  float tile_scale);
