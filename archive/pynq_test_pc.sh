#!/bin/bash
# pynq_test_pc.sh : launch jupyter_side/test_package_v4.py --no-hw in a tmux session
#
# Layout:
#   ┌─────────────────────────────────────────────────────┐
#   │                  pc test client                     │
#   └─────────────────────────────────────────────────────┘
#
# Connects to the EC2 game server (port 9000) using the PC-side stub
# (no PYNQ board required).  All --no-hw args are passed through.
#
# Usage:
#   ./pynq_test_pc.sh                          # manual mode (default)
#   ./pynq_test_pc.sh --mode auto              # auto mode
#   ./pynq_test_pc.sh --username myname        # custom username
#   ./pynq_test_pc.sh --mode auto --username bot1 --auto-runner-speed 0.05
#
# Extra args after the script name are forwarded verbatim to test_package_v4.py.
# Requires: tmux, python3

BASE_SESSION="pynq_pc"
SESSION="$BASE_SESSION"
n=2
while tmux has-session -t "$SESSION" 2>/dev/null; do
  SESSION="${BASE_SESSION}_${n}"
  n=$(( n + 1 ))
done
REPO="$(cd "$(dirname "$0")" && pwd)"
SCRIPT="$REPO/jupyter_side/test_package_v4.py"
PROTO_SRC="$REPO/pynq_full/interfacing/protocol.py"
PROTO_DST="$REPO/jupyter_side/protocol.py"

# Forward all script args to the Python process (--mode, --username, etc.)
# Default to --mode manual if no --mode arg is present.
EXTRA_ARGS=("$@")
if [[ ! " ${EXTRA_ARGS[*]} " =~ " --mode " ]]; then
  EXTRA_ARGS=("--mode" "manual" "${EXTRA_ARGS[@]}")
fi

if [ -t 1 ]; then
  CLR_RESET=$'\033[0m'
  CLR_BOLD=$'\033[1m'
  CLR_DIM=$'\033[2m'
  CLR_BLUE=$'\033[34m'
  CLR_MAGENTA=$'\033[35m'
  CLR_CYAN=$'\033[36m'
  CLR_GREEN=$'\033[32m'
  CLR_YELLOW=$'\033[33m'
  CLR_RED=$'\033[31m'
  ICON_INFO="●"
  ICON_OK="✔"
  ICON_WARN="▲"
  ICON_ERR="✖"
else
  CLR_RESET=""
  CLR_BOLD=""
  CLR_DIM=""
  CLR_BLUE=""
  CLR_MAGENTA=""
  CLR_CYAN=""
  CLR_GREEN=""
  CLR_YELLOW=""
  CLR_RED=""
  ICON_INFO="i"
  ICON_OK="[ok]"
  ICON_WARN="[warn]"
  ICON_ERR="[err]"
fi

banner() {
  printf "\n%bPYNQ PC TEST%b\n" "${CLR_BOLD}${CLR_MAGENTA}" "${CLR_RESET}"
  printf "%btest_package_v4.py --no-hw%b\n" "${CLR_DIM}" "${CLR_RESET}"
}

section() {
  printf "\n%b== %s ==%b\n" "${CLR_BOLD}${CLR_BLUE}" "$1" "${CLR_RESET}"
}

log_info() {
  printf "%b%s%b %s\n" "${CLR_CYAN}" "${ICON_INFO}" "${CLR_RESET}" "$1"
}

log_ok() {
  printf "%b%s%b %s\n" "${CLR_GREEN}" "${ICON_OK}" "${CLR_RESET}" "$1"
}

log_warn() {
  printf "%b%s%b %s\n" "${CLR_YELLOW}" "${ICON_WARN}" "${CLR_RESET}" "$1"
}

log_err() {
  printf "%b%s%b %s\n" "${CLR_RED}" "${ICON_ERR}" "${CLR_RESET}" "$1"
}

die() {
  log_err "$1"
  exit 1
}

run_step() {
  local message="$1"
  shift

  local logfile rc
  logfile="$(mktemp)"
  rc=0

  if [ -t 1 ]; then
    local frames i pid
    frames=('|' '/' '-' '\')
    i=0

    "$@" >"$logfile" 2>&1 &
    pid=$!

    while kill -0 "$pid" 2>/dev/null; do
      printf "\r  %b%s%b %s %b%s%b" "${CLR_CYAN}" "${ICON_INFO}" "${CLR_RESET}" "${message}" "${CLR_DIM}" "${frames[$i]}" "${CLR_RESET}"
      i=$(( (i + 1) % 4 ))
      sleep 0.08
    done

    wait "$pid"
    rc=$?

    if [ "$rc" -eq 0 ]; then
      printf "\r  %b%s%b %s\n" "${CLR_GREEN}" "${ICON_OK}" "${CLR_RESET}" "${message}"
    else
      printf "\r  %b%s%b %s\n" "${CLR_RED}" "${ICON_ERR}" "${CLR_RESET}" "${message}"
      sed 's/^/    /' "$logfile"
    fi
  else
    printf "  - %s ... " "$message"
    if "$@" >"$logfile" 2>&1; then
      echo "ok"
    else
      rc=$?
      echo "failed"
      sed 's/^/    /' "$logfile"
    fi
  fi

  rm -f "$logfile"
  return "$rc"
}

require_cmds() {
  local cmd
  for cmd in "$@"; do
    if ! command -v "$cmd" >/dev/null 2>&1; then
      die "Missing required command: $cmd"
    fi
  done
}

copy_protocol() {
  cp "$PROTO_SRC" "$PROTO_DST"
}

cleanup_local() {
  tmux kill-session -t "$SESSION" 2>/dev/null || true
}

create_tmux_session() {
  tmux new-session -d -s "$SESSION" -x 220 -y 50
}

configure_tmux() {
  tmux set-option -t "$SESSION" mouse on
  tmux set-option -t "$SESSION" allow-rename off
  tmux set-option -t "$SESSION" pane-border-style "fg=magenta"
  tmux set-option -t "$SESSION" pane-active-border-style "fg=brightmagenta"
  tmux set-option -t "$SESSION" pane-border-status top
  tmux set-option -t "$SESSION" pane-border-format " #{pane_title} "
}

wire_client_pane() {
  local py_args="--no-hw ${EXTRA_ARGS[*]}"

  tmux select-pane -t "$SESSION:0.0" -T "pc test client"
  tmux send-keys -t "$SESSION:0.0" \
    "clear; printf '\033[1;38;5;201m%s\033[0m\n' 'PC TEST CLIENT'; printf '\033[2m%s\033[0m\n' 'jupyter_side/test_package_v4.py --no-hw'; printf '\033[36m● %s\033[0m\n\n' 'Starting...'; cd \"$REPO/jupyter_side\" && python3 test_package_v4.py $py_args" \
    Enter
}

# ── main ──────────────────────────────────────────────────────────────────────

banner

section "Preflight"
require_cmds tmux python3
log_ok "Dependencies available (tmux, python3)"
[ -f "$SCRIPT" ] || die "Missing client script: $SCRIPT"
log_ok "Client script found"
[ -f "$PROTO_SRC" ] || die "Missing protocol source: $PROTO_SRC"
run_step "Copying protocol.py to jupyter_side/" copy_protocol || die "Failed to copy protocol.py"

section "Tmux Session"
run_step "Killing any existing '$SESSION' session" cleanup_local || true
run_step "Creating tmux session '$SESSION'" create_tmux_session || die "Failed creating tmux session"
run_step "Applying tmux pane styling" configure_tmux || die "Failed configuring tmux"

section "Client"
log_info "Args: --no-hw ${EXTRA_ARGS[*]}"
run_step "Wiring client pane" wire_client_pane || die "Failed wiring client pane"

section "Ready"
log_ok "Session '$SESSION' is live."
tmux select-pane -t "$SESSION:0.0"
tmux attach-session -t "$SESSION"
