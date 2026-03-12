#!/bin/bash
# pynq_dev.sh : open a 4-pane tmux session for the pynq_full ec2/ stack
#
# Layout:
#   ┌──────────────┬──────────────┬──────────────┐
#   │  pynq server │   sidecar    │   monitor    │  50%
#   ├──────────────┴──────────────┴──────────────┤
#   │              redis stats                   │  50%
#   └─────────────────────────────────────────────┘
#
# Monitor (pynq_full/ec2/monitor/monitor.py) runs on EC2 port 8080.
# SSH tunnel in the monitor pane forwards it to http://localhost:8080
# Shared React monitor bundle is built locally into monitor_ui/dist before sync.
#
# Usage: ./pynq_dev.sh  (from repo root)
# Requires: tmux, SSH key at repo root raycastpair.pem
# PYNQ nodes connect directly to EC2 port 9000 - no node sim panes needed here.

SESSION="pynq"
EC2_IP="3.9.71.204"
EC2="ubuntu@${EC2_IP}"
REPO="$(cd "$(dirname "$0")" && pwd)"
KEY="$REPO/raycastpair.pem"

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
  printf "\n%bPYNQ DEV%b\n" "${CLR_BOLD}${CLR_MAGENTA}" "${CLR_RESET}"
  printf "%bBootstrapping pynq_full on EC2 + tmux%b\n" "${CLR_DIM}" "${CLR_RESET}"
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

ensure_clean_git() {
  # Block if there are uncommitted changes or unpushed commits — EC2 must match local exactly.
  if ! git -C "$REPO" diff --quiet || ! git -C "$REPO" diff --cached --quiet; then
    log_err "Uncommitted changes detected. Commit and push first:"
    git -C "$REPO" status --short
    echo "    git add -p && git commit -m '...' && git push && ./pynq_dev.sh"
    return 1
  fi

  local unpushed
  unpushed="$(git -C "$REPO" log --oneline @{u}..HEAD 2>/dev/null | wc -l | tr -d ' ')"
  if [ "${unpushed:-0}" -gt 0 ]; then
    log_err "$unpushed unpushed commit(s) - EC2 sync would miss them:"
    git -C "$REPO" log --oneline @{u}..HEAD
    echo "    git push && ./pynq_dev.sh"
    return 1
  fi

  return 0
}

cleanup_local() {
  tmux kill-session -t "$SESSION" 2>/dev/null || true
  fuser -k 8080/tcp 2>/dev/null || true
}

build_monitor_ui() {
  npm -C "$REPO" run build:monitor-ui
}

stop_remote_services() {
  ssh -i "$KEY" "$EC2" 'printf "#!/bin/bash\npkill -f server.py 2>/dev/null; pkill -f sidecar.py 2>/dev/null; pkill -f monitor.py 2>/dev/null; fuser -k 8080/tcp 2>/dev/null; true\n" > /tmp/_stop_pynq.sh && bash /tmp/_stop_pynq.sh'
}

sync_remote_repo() {
  ssh -i "$KEY" "$EC2" 'cd ~/ServerSide_PYNQ_Raycaster && git fetch origin && git reset --hard origin/main'
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

build_layout() {
  # Build layout — top row 3 cols, bottom pane under the left column.
  tmux split-window -t "$SESSION:0.0" -h -p 67   # 0=top-L  1=top-R-two-thirds
  tmux split-window -t "$SESSION:0.1" -h -p 50   # 1=top-M  2=top-R
  tmux split-window -t "$SESSION:0.0" -v -p 50   # 0=server  3=bot
}

wire_service_panes() {
  tmux select-pane -t "$SESSION:0.0" -T "pynq server"
  tmux send-keys -t "$SESSION:0.0" "clear; printf '\033[1;38;5;201m%s\033[0m\n' 'PYNQ SERVER'; printf '\033[2m%s\033[0m\n' 'pynq_full/ec2/server/server.py'; printf '\033[36m● %s\033[0m\n\n' 'Connecting to EC2 and starting server...'; ssh -t -i '$KEY' '$EC2' 'source ~/venv/bin/activate && cd ~/ServerSide_PYNQ_Raycaster/pynq_full/ec2/server && python3 server.py'" Enter

  tmux select-pane -t "$SESSION:0.1" -T "sidecar"
  tmux send-keys -t "$SESSION:0.1" "clear; printf '\033[1;38;5;201m%s\033[0m\n' 'SIDECAR'; printf '\033[2m%s\033[0m\n' 'sidecar/sidecar.py'; printf '\033[36m● %s\033[0m\n\n' 'Connecting to EC2 and starting sidecar...'; ssh -t -i '$KEY' '$EC2' 'source ~/venv/bin/activate && cd ~/ServerSide_PYNQ_Raycaster/sidecar && python3 sidecar.py'" Enter

  # Monitor: SSH tunnel + start on EC2, wait for port 8080, then tail log.
  tmux select-pane -t "$SESSION:0.2" -T "monitor :8080"
  tmux send-keys -t "$SESSION:0.2" "clear; printf '\033[1;38;5;201m%s\033[0m\n' 'MONITOR TUNNEL'; printf '\033[2m%s\033[0m\n' 'local :8080 -> EC2 :8080'; printf '\033[36m● %s\033[0m\n\n' 'Opening SSH tunnel and waiting for monitor...'; fuser -k 8080/tcp 2>/dev/null || true; ssh -t -i '$KEY' -L 0.0.0.0:8080:localhost:8080 '$EC2' 'source ~/venv/bin/activate && cd ~/ServerSide_PYNQ_Raycaster/pynq_full/ec2/monitor && nohup python3 monitor.py > /tmp/monitor.log 2>&1 & until nc -z localhost 8080 2>/dev/null; do sleep 0.2; done && echo [monitor] port 8080 ready && tail -f /tmp/monitor.log'" Enter

  tmux select-pane -t "$SESSION:0.3" -T "redis stats"
  tmux send-keys -t "$SESSION:0.3" "clear; printf '\033[1;38;5;171m%s\033[0m\n' 'REDIS STATS'; printf '\033[2m%s\033[0m\n' 'redis-cli --stat'; printf '\033[36m● %s\033[0m\n\n' 'Connecting to EC2 Redis telemetry...'; ssh -t -i '$KEY' '$EC2' 'redis-cli --stat'" Enter
}

open_monitor_browser() {
  # Use WSL IP since SSH tunnel binds to WSL interface, not Windows localhost.
  local wsl_ip
  wsl_ip="$(hostname -I | awk '{print $1}')"
  [ -n "$wsl_ip" ] || return 1
  (cd /mnt/c && cmd.exe /c start "http://${wsl_ip}:8080")
}

wait_for_local_monitor() {
  local attempts=0
  local max_attempts=150

  while [ "$attempts" -lt "$max_attempts" ]; do
    if printf 'GET / HTTP/1.0\r\nHost: localhost\r\n\r\n' | nc -w 1 127.0.0.1 8080 2>/dev/null | grep -q '200 OK'; then
      return 0
    fi
    sleep 0.2
    attempts=$((attempts + 1))
  done

  return 1
}

banner

section "Preflight"
[ -f "$KEY" ] || die "Missing SSH key: $KEY"
log_ok "SSH key found"
require_cmds tmux ssh git fuser nc hostname awk npm
log_ok "Dependencies available (tmux, ssh, git, fuser, nc, npm)"
run_step "Building shared React monitor bundle" build_monitor_ui || die "Failed building monitor_ui bundle"
ensure_clean_git || exit 1
log_ok "Git state is clean and pushed"

section "Remote Sync"
run_step "Clearing stale local tmux/port state" cleanup_local || die "Failed local cleanup"
run_step "Stopping stale EC2 services" stop_remote_services || die "Failed stopping remote services"
sleep 1
run_step "Syncing EC2 repo to origin/main" sync_remote_repo || die "EC2 git sync failed"

section "Tmux Session"
run_step "Creating tmux session '$SESSION'" create_tmux_session || die "Failed creating tmux session"
run_step "Applying tmux pane styling" configure_tmux || die "Failed configuring tmux"
run_step "Building pane layout" build_layout || die "Failed building tmux layout"

section "Service Wiring"
run_step "Starting server/sidecar/monitor/redis panes" wire_service_panes || die "Failed wiring service panes"
if ! run_step "Waiting for local monitor HTTP endpoint" wait_for_local_monitor; then
  log_warn "Local monitor endpoint did not report ready before browser launch."
fi
if ! run_step "Opening monitor URL in browser" open_monitor_browser; then
  log_warn "Could not auto-open browser. Open http://<WSL-IP>:8080 manually."
fi

section "Ready"
log_ok "Session '$SESSION' is live."
tmux select-pane -t "$SESSION:0.0"
tmux attach-session -t "$SESSION"
