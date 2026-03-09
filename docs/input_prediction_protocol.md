# Input Prediction Protocol

This repo now uses a hybrid node -> EC2 protocol designed for responsive local control on PYNQ while keeping EC2 authoritative over game outcomes.

## Why send predicted pose at all?

The node has two jobs that pull in different directions:

- it must feel immediate to the local player
- it must not become the authority for multiplayer state

That is why the node computes a local pose immediately from its inputs, but the server still decides what the real game state is.

In protocol terms:

- `input_flags` = what the player actually pressed this tick
- `pred_x`, `pred_y`, `pred_angle` = what the node thinks those inputs produced locally
- EC2 broadcast state = what actually counts

The word `predicted` matters. The node is reporting its local result as a guess, not as the final truth.

## Is this standard?

Yes, the standard multiplayer pattern is:

1. client sends input
2. client predicts locally for responsiveness
3. server simulates authoritative state
4. client reconciles to server state

The only optional part is whether the client also sends its predicted pose to the server.

Two common designs are:

- `input only`
  - simplest authoritative model
  - server computes everything
  - client keeps prediction local only
- `input + predicted pose`
  - server still uses input as the authoritative cause
  - predicted pose helps with drift detection, validation, debugging, and reconciliation tooling

For this repo, `input + predicted pose` is the pragmatic choice because we have:

- a PYNQ PS implementation
- a simulator implementation
- an EC2 authoritative tick
- future FPGA/PS offload work where comparing node-side and server-side behaviour is useful

## Current packet meaning

The node packet stays 24 bytes, but the old pad bytes now carry explicit metadata.

Node -> server fields:

- `type`
- `seq`
- `timestamp`
- `pred_x`
- `pred_y`
- `pred_angle`
- `input_flags`
- `movement_mode`
- `protocol_version`
- `reserved`

Important interpretation:

- if `movement_mode = pose`, the server treats the node pose as the primary update and validates it
- if `movement_mode = intent_only`, the server should simulate movement entirely from `input_flags`
- if `movement_mode = intent_with_prediction`, the server can use `input_flags` as the real driver and use predicted pose as a validation/debug hint

At the moment, the repo is in an intermediate state:

- protocol supports all three modes
- clients default to `intent_with_prediction`
- T2 parses the mode/version cleanly
- full EC2-side movement integration for `intent_only` is still the next step

## Why this fits PYNQ well

On the PYNQ board, four hardware buttons map naturally to movement intent:

- `forward`
- `back`
- `turn_left`
- `turn_right`

The PS can turn those button states into local movement immediately for smooth feel. That local movement becomes the predicted pose.

So the board remains responsive, but EC2 still owns:

- tag resolution
- match flow
- fairness
- final state

## Where `game_logic_bridge` fits

`pynq_full/ec2/server/game_logic_bridge.py` is only a server-side adapter.

Its role is:

- Python T2 calls one stable API
- if `libgame_logic.so` exists, it uses the native C++ implementation
- otherwise it falls back to Python logic

That means T2 can stay simple:

- parse packet
- read `input_flags`, `movement_mode`, and predicted pose
- validate/apply authoritative rules
- broadcast authoritative state

The bridge does not change protocol semantics. It only changes whether the EC2-side logic runs in Python or native C++.

## Intended end state

The target architecture is:

1. PYNQ PS or simulator reads local input
2. node predicts motion immediately
3. node sends `input_flags + predicted pose + seq`
4. EC2 simulates the authoritative result
5. EC2 compares predicted pose against authoritative state when useful
6. EC2 broadcasts authoritative game state back to all nodes

This gives:

- responsive controls locally
- authoritative fairness centrally
- a clear place for FPGA/PS acceleration
- a clear reconciliation path when local and server state diverge
