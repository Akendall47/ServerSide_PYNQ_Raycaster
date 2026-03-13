# `test_package_v2.py` Launch Arguments

This file documents the current runtime launch surface for:

- [test_package_v2.py](/home/akendall/Documents/ServerSide_PYNQ_Raycaster/jupyter_side/test_package_v2.py)

It is the current PYNQ board client for `pynq_full`.

## Basic usage

On the board:

```bash
cd /home/xilinx/jupyter_notebooks
python3 test_package_v2.py
```

Important:

- `protocol.py` or `as` `protocol_1` must be in the same folder as `test_package_v2.py`
- this script is meant to run on the PYNQ board with the `pynq` package installed

## Current CLI arguments

### `--server`

- Type: `str`
- Default: `3.9.71.204`
- Purpose: EC2/server IP or hostname

Example:

```bash
python3 test_package_v2.py --server 3.9.71.204
```

### `--port`

- Type: `int`
- Default: `9000`
- Purpose: UDP game server port

Example:

```bash
python3 test_package_v2.py --port 9000
```

### `--overlay`

- Type: `str`
- Default: `/home/xilinx/jupyter_notebooks/Final_project_test/design_1_wrapper.bit`
- Purpose: bitstream path loaded on the board

Example:

```bash
python3 test_package_v2.py --overlay /home/xilinx/jupyter_notebooks/my_overlay/design_1_wrapper.bit
```

### `--username`

- Type: `str`
- Default: empty unless `PYNQ_USERNAME` is set
- Purpose: profile/display identity sent to the server

Example:

```bash
python3 test_package_v2.py --username demo-board-1
```

### `--mode`

- Type: `manual|auto`
- Default: `manual` unless `PYNQ_MODE` is set
- Purpose:
  - `manual`: board buttons drive movement
  - `auto`: board runs built-in runner/tagger AI

Example:

```bash
python3 test_package_v2.py --mode manual
python3 test_package_v2.py --mode auto
```

### `--move-speed`

- Type: `float`
- Default: `0.2`
- Purpose: manual forward/backward movement step per tick

Example:

```bash
python3 test_package_v2.py --mode manual --move-speed 0.2
```

### `--turn-step`

- Type: `int`
- Default: `64`
- Purpose: manual turn increment in 12-bit hardware angle units

Example:

```bash
python3 test_package_v2.py --turn-step 64
```

### `--auto-runner-speed`

- Type: `float`
- Default: `0.2`
- Purpose: auto-mode movement speed when the board is acting as runner

Example:

```bash
python3 test_package_v2.py --mode auto --auto-runner-speed 0.2
```

### `--auto-tagger-speed`

- Type: `float`
- Default: `0.26`
- Purpose: auto-mode movement speed when the board is acting as tagger

Example:

```bash
python3 test_package_v2.py --mode auto --auto-tagger-speed 0.26
```

### `--auto-fallback-speed`

- Type: `float`
- Default: `0.18`
- Purpose: auto-mode fallback roam speed when there is no strong target

Example:

```bash
python3 test_package_v2.py --mode auto --auto-fallback-speed 0.18
```

## Environment variable equivalents

Every runtime tuning flag also has an env form:

- `PYNQ_USERNAME`
- `PYNQ_MODE`
- `PYNQ_MOVE_SPEED`
- `PYNQ_TURN_STEP`
- `PYNQ_AUTO_RUNNER_SPEED`
- `PYNQ_AUTO_TAGGER_SPEED`
- `PYNQ_AUTO_FALLBACK_SPEED`

Example:

```bash
PYNQ_MODE=auto PYNQ_USERNAME=demo-board-2 python3 test_package_v2.py
```

## Common launch recipes

### Manual board with explicit known-good baseline

```bash
python3 test_package_v2.py \
  --mode manual \
  --move-speed 0.2 \
  --turn-step 64 \
  --username board-1
```

### Auto board for one-human demo

```bash
python3 test_package_v2.py \
  --mode auto \
  --username board-2 \
  --auto-runner-speed 0.2 \
  --auto-tagger-speed 0.26 \
  --auto-fallback-speed 0.18
```

### Custom overlay path

```bash
python3 test_package_v2.py \
  --overlay /home/xilinx/jupyter_notebooks/Final_project_test/design_1_wrapper.bit
```

## Bash examples for changing settings

### One-off change on the command line

This changes the value for just that launch:

```bash
python3 test_package_v2.py --mode manual --move-speed 0.25
```

Another example:

```bash
python3 test_package_v2.py --mode auto --auto-tagger-speed 0.3
```

### Export environment variables in Bash

This is useful if you want to keep the command shorter:

```bash
export PYNQ_MODE=manual
export PYNQ_MOVE_SPEED=0.2
export PYNQ_TURN_STEP=64
python3 test_package_v2.py
```

Auto example:

```bash
export PYNQ_MODE=auto
export PYNQ_AUTO_RUNNER_SPEED=0.2
export PYNQ_AUTO_TAGGER_SPEED=0.26
export PYNQ_AUTO_FALLBACK_SPEED=0.18
python3 test_package_v2.py
```

### Clear exported values

If you exported a value and want to go back to script defaults:

```bash
unset PYNQ_MODE
unset PYNQ_MOVE_SPEED
unset PYNQ_TURN_STEP
unset PYNQ_AUTO_RUNNER_SPEED
unset PYNQ_AUTO_TAGGER_SPEED
unset PYNQ_AUTO_FALLBACK_SPEED
```

### Relaunch with new values

If the script is already running, stop it and start it again with the new args:

```bash
pkill -f 'test_package_v2.py'
cd /home/xilinx/jupyter_notebooks
python3 test_package_v2.py --mode manual --move-speed 0.2 --turn-step 64
```

If you are running it inside a `tmux` pane, the usual flow is:

```bash
Ctrl+C
python3 test_package_v2.py --mode auto --auto-runner-speed 0.2 --auto-tagger-speed 0.26
```

## Runtime vs startup control

What can be changed from the PYNQ monitor at runtime:

- `manual` / `auto` mode per board

What is currently startup-only:

- `move-speed`
- `turn-step`
- `auto-runner-speed`
- `auto-tagger-speed`
- `auto-fallback-speed`
- `server`
- `port`
- `overlay`
- `username`

So if you want to tune movement or AI speeds, restart the board client with new launch args.

## Notes

- `test_package_v1.py` is the frozen legacy version
- `test_package_v2.py` is the current runtime path for `pynq_full`
- if board movement looks dead, first confirm the board is actually running the version and args you think it is
