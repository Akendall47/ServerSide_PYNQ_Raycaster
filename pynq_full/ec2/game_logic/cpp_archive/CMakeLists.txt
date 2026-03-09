cmake_minimum_required(VERSION 3.16)
project(game_logic CXX)
set(CMAKE_CXX_STANDARD 17)

# Build as a shared library so Python T2 can load it via ctypes.
# Usage from EC2: cmake -B build && cmake --build build
# Output: build/libgame_logic.so
add_library(game_logic SHARED
    map_loader.cpp
    raycaster.cpp
    anticheat.cpp
    node_manager.cpp
)
target_include_directories(game_logic PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
target_compile_options(game_logic PRIVATE -Wall -O2)
