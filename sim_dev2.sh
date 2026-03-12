#!/bin/bash
# sim_dev2.sh : open a 6-pane tmux session for the sim_full ec2/ stack
#
# Layout:
#   ┌────────────────┬────────────┬────────────┐  (50% height)
#   │   seda server  │  sidecar   │  monitor   │
#   ├────────────────┼────────────┼────────────┤  (50% height)
#   │   node sim 1   │  node sim 2  │ redis    │
#   └────────────────┴─────────────┴───────────┘
#
# Monitor (sim_full/ec2/monitor/monitor.py) runs on EC2 port 8080.
# Port 8080 is forwarded via a dedicated background SSH tunnel (same pattern as
# the Redis tunnel) so the tunnel lifetime is decoupled from the log-tail session.
# Shared React monitor bundle is built locally into monitor_ui/dist before sync.
#
# Usage: ./sim_dev2.sh  (from repo root)
# Requires: tmux, SSH key at repo root raycastpair.pem
# For pynq_full stack: ./pynq_dev.sh

SESSION="seda"
EC2_IP="3.9.71.204"
EC2="ubuntu@${EC2_IP}"
REPO="$(cd "$(dirname "$0")" && pwd)"
KEY="$REPO/raycastpair.pem"
SSH_OPTS="-o BatchMode=yes -o StrictHostKeyChecking=accept-new -o ConnectTimeout=10 -o ServerAliveInterval=30 -o ServerAliveCountMax=3"
GIT_BRANCH=""
GIT_UPSTREAM=""
SIM1_USERNAME="${SIM1_USERNAME:-sim-1}"
SIM2_USERNAME="${SIM2_USERNAME:-sim-2}"

if [ -t 1 ]; then
  CLR_RESET=$'\033[0m'
  CLR_BOLD=$'\033[1m'
  CLR_DIM=$'\033[2m'
  CLR_BLUE=$'\033[34m'
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
  printf "\n%bSIM DEV%b\n" "${CLR_BOLD}${CLR_CYAN}" "${CLR_RESET}"
  printf "%bBootstrapping sim_full on EC2 + tmux%b\n" "${CLR_DIM}" "${CLR_RESET}"
  printf "%bNode sim usernames:%b %s, %s\n" "${CLR_DIM}" "${CLR_RESET}" "${SIM1_USERNAME}" "${SIM2_USERNAME}"
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

resolve_git_target() {
  GIT_BRANCH="$(git -C "$REPO" rev-parse --abbrev-ref HEAD 2>/dev/null || true)"
  if [ -z "$GIT_BRANCH" ] || [ "$GIT_BRANCH" = "HEAD" ]; then
    log_err "Detached HEAD detected. Check out a branch first."
    return 1
  fi

  GIT_UPSTREAM="$(git -C "$REPO" rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>/dev/null || true)"
  if [ -z "$GIT_UPSTREAM" ]; then
    log_err "Branch '$GIT_BRANCH' has no upstream. Push it first:"
    echo "    git push -u origin $GIT_BRANCH"
    return 1
  fi

  case "$GIT_UPSTREAM" in
    origin/*) ;;
    *)
      log_err "Branch '$GIT_BRANCH' tracks '$GIT_UPSTREAM'. Dev scripts only sync from origin."
      echo "    git branch --set-upstream-to=origin/$GIT_BRANCH $GIT_BRANCH"
      return 1
      ;;
  esac

  return 0
}

ensure_clean_git() {
  # Block if there are uncommitted changes or unpushed commits — EC2 must match local exactly.
  resolve_git_target || return 1

  if ! git -C "$REPO" diff --quiet || ! git -C "$REPO" diff --cached --quiet; then
    log_err "Uncommitted changes detected. Commit and push first:"
    git -C "$REPO" status --short
    echo "    git add -p && git commit -m '...' && git push && ./sim_dev2.sh"
    return 1
  fi

  local unpushed
  unpushed="$(git -C "$REPO" rev-list --count "$GIT_UPSTREAM"..HEAD 2>/dev/null | tr -d ' ')"
  if [ "${unpushed:-0}" -gt 0 ]; then
    log_err "$unpushed unpushed commit(s) on '$GIT_BRANCH' - EC2 sync would miss them:"
    git -C "$REPO" log --oneline "$GIT_UPSTREAM"..HEAD
    echo "    git push && ./sim_dev2.sh"
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

check_ec2_access() {
  ssh $SSH_OPTS -i "$KEY" "$EC2" 'echo [ssh] ec2 reachable'
}

stop_remote_services() {
  # Write a stop script to EC2 and run it — avoids pkill -f matching its own SSH command string.
  ssh $SSH_OPTS -i "$KEY" "$EC2" 'printf "#!/bin/bash\npkill -f server.py 2>/dev/null; pkill -f sidecar.py 2>/dev/null; pkill -f monitor.py 2>/dev/null; fuser -k 8080/tcp 2>/dev/null; true\n" > /tmp/_stop_seda.sh && bash /tmp/_stop_seda.sh'
}

sync_remote_repo() {
  ssh $SSH_OPTS -i "$KEY" "$EC2" "cd ~/ServerSide_PYNQ_Raycaster && git fetch origin && git checkout -B '$GIT_BRANCH' '$GIT_UPSTREAM' && git branch --set-upstream-to='$GIT_UPSTREAM' '$GIT_BRANCH' && git reset --hard '$GIT_UPSTREAM'"
}

create_tmux_session() {
  tmux new-session -d -s "$SESSION" -x 220 -y 50
}

configure_tmux() {
  tmux set-option -t "$SESSION" mouse on
  tmux set-option -t "$SESSION" allow-rename off
  tmux set-option -t "$SESSION" pane-border-style "fg=cyan"
  tmux set-option -t "$SESSION" pane-active-border-style "fg=brightcyan"
  tmux set-option -t "$SESSION" pane-border-status top
  tmux set-option -t "$SESSION" pane-border-format " #{pane_title} "
}

build_layout() {
  # Build layout — 2 rows x 3 columns, all panes equal size (50% height, 33% width)
  #
  #   ┌──────────────┬──────────────┬──────────────┐
  #   │  seda server │   sidecar    │   monitor    │  50%
  #   ├──────────────┼──────────────┼──────────────┤
  #   │  node sim 1  │  node sim 2  │  redis stats │  50%
  #   └──────────────┴──────────────┴──────────────┘
  #
  # Strategy: split top row into 3, then split each pane vertically 50%.
  tmux split-window -t "$SESSION:0.0" -h -p 67   # 0=top-L  1=top-R-two-thirds
  tmux split-window -t "$SESSION:0.1" -h -p 50   # 1=top-M  2=top-R   (now 3 equal cols)
  tmux split-window -t "$SESSION:0.0" -v -p 50   # 0=server  3=bot-L
  tmux split-window -t "$SESSION:0.1" -v -p 50   # 1=sidecar 4=bot-M
  tmux split-window -t "$SESSION:0.2" -v -p 50   # 2=monitor 5=bot-R
}

wire_service_panes() {
  # Auto-start EC2 services (server -> sidecar -> monitor) then leave node sims ready to run manually.
  tmux select-pane -t "$SESSION:0.0" -T "seda server"
  tmux send-keys -t "$SESSION:0.0" "clear; printf '\033[1;38;5;45m%s\033[0m\n' 'SEDA SERVER'; printf '\033[2m%s\033[0m\n' 'sim_full/ec2/server/server.py'; printf '\033[36m● %s\033[0m\n\n' 'Connecting to EC2 and starting server...'; ssh $SSH_OPTS -t -i \"$KEY\" \"$EC2\" 'source ~/venv/bin/activate && cd ~/ServerSide_PYNQ_Raycaster/sim_full/ec2/server && python3 server.py'" Enter

  tmux select-pane -t "$SESSION:0.1" -T "sidecar"
  tmux send-keys -t "$SESSION:0.1" "clear; printf '\033[1;38;5;45m%s\033[0m\n' 'SIDECAR'; printf '\033[2m%s\033[0m\n' 'sidecar/sidecar.py'; printf '\033[36m● %s\033[0m\n\n' 'Connecting to EC2 and starting sidecar...'; ssh $SSH_OPTS -t -i \"$KEY\" \"$EC2\" 'source ~/venv/bin/activate && cd ~/ServerSide_PYNQ_Raycaster/sidecar && python3 sidecar.py'" Enter

  # Monitor: start monitor.py on EC2 and tail its log. Port 8080 tunnel is handled
  # separately by create_tunnels so the tunnel is not coupled to this SSH session.
  tmux select-pane -t "$SESSION:0.2" -T "monitor log"
  tmux send-keys -t "$SESSION:0.2" "clear; printf '\033[1;38;5;45m%s\033[0m\n' 'MONITOR'; printf '\033[2m%s\033[0m\n' 'sim_full/ec2/monitor/monitor.py'; printf '\033[36m● %s\033[0m\n\n' 'Connecting to EC2 and starting monitor...'; ssh $SSH_OPTS -t -i \"$KEY\" \"$EC2\" 'source ~/venv/bin/activate && cd ~/ServerSide_PYNQ_Raycaster/sim_full/ec2/monitor && nohup python3 monitor.py > /tmp/monitor.log 2>&1 & until nc -z localhost 8080 2>/dev/null; do sleep 0.2; done && echo [monitor] port 8080 ready && tail -f /tmp/monitor.log'" Enter
}

create_tunnels() {
  # Forward local 6380 -> EC2 6379 so node sims can read game:control signals.
  # Forward local 8080 -> EC2 8080 for the monitor dashboard.
  # Both use dedicated background connections (like -f -N) so the tunnel lifetime
  # is independent of the interactive pane sessions — prevents "Broken pipe" drops
  # caused by tunnel + log-stream contention on the same SSH connection.
  fuser -k 6380/tcp 2>/dev/null || true
  fuser -k 8080/tcp 2>/dev/null || true
  ssh $SSH_OPTS -f -N -o ExitOnForwardFailure=yes -i "$KEY" -L 127.0.0.1:6380:localhost:6379 "$EC2"
  ssh $SSH_OPTS -f -N -o ExitOnForwardFailure=yes -i "$KEY" -L 0.0.0.0:8080:localhost:8080 "$EC2"
}

prepare_node_sim_panes() {
  # Node sims are pre-filled but not auto-started.
  tmux select-pane -t "$SESSION:0.3" -T "node sim 1 (${SIM1_USERNAME})  <- press Enter to start"
  tmux send-keys -t "$SESSION:0.3" "clear; printf '\033[1;38;5;117m%s\033[0m\n' 'NODE SIM 1'; printf '\033[2m%s\033[0m\n' 'sim_full/interfacing_+_sim/node_simulator.py'; printf '\033[36m● %s\033[0m\n' 'Username: ${SIM1_USERNAME}'; printf '\033[36m● %s\033[0m\n' 'Startup mode: manual'; printf '\033[36m● %s\033[0m\n\n' 'Press Enter to launch this simulator.'; cd $REPO && python3 sim_full/interfacing_+_sim/node_simulator.py $EC2_IP 9000 --nodes 1 --node-index 0 --redis-port 6380 --mode manual --username '${SIM1_USERNAME}'"

  tmux select-pane -t "$SESSION:0.4" -T "node sim 2 (${SIM2_USERNAME})  <- press Enter to start"
  tmux send-keys -t "$SESSION:0.4" "clear; printf '\033[1;38;5;117m%s\033[0m\n' 'NODE SIM 2'; printf '\033[2m%s\033[0m\n' 'sim_full/interfacing_+_sim/node_simulator.py'; printf '\033[36m● %s\033[0m\n' 'Username: ${SIM2_USERNAME}'; printf '\033[36m● %s\033[0m\n\n' 'Press Enter to launch this simulator.'; cd $REPO && python3 sim_full/interfacing_+_sim/node_simulator.py $EC2_IP 9000 --nodes 1 --node-index 1 --redis-port 6380 --username '${SIM2_USERNAME}'"

  tmux select-pane -t "$SESSION:0.5" -T "redis stats"
  tmux send-keys -t "$SESSION:0.5" "clear; printf '\033[1;38;5;81m%s\033[0m\n' 'REDIS STATS'; printf '\033[2m%s\033[0m\n' 'redis-cli --stat'; printf '\033[36m● %s\033[0m\n\n' 'Connecting to EC2 Redis telemetry...'; ssh $SSH_OPTS -t -i \"$KEY\" \"$EC2\" 'redis-cli --stat'" Enter
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
run_step "Checking EC2 SSH reachability" check_ec2_access || die "EC2 SSH check failed"
run_step "Building shared React monitor bundle" build_monitor_ui || die "Failed building monitor_ui bundle"
ensure_clean_git || exit 1
log_ok "Git state is clean and pushed ($GIT_BRANCH -> $GIT_UPSTREAM)"

section "Remote Sync"
run_step "Clearing stale local tmux/port state" cleanup_local || die "Failed local cleanup"
run_step "Stopping stale EC2 services" stop_remote_services || die "Failed stopping remote services"
sleep 1
run_step "Syncing EC2 repo to $GIT_UPSTREAM" sync_remote_repo || die "EC2 git sync failed"

section "Tmux Session"
run_step "Creating tmux session '$SESSION'" create_tmux_session || die "Failed creating tmux session"
run_step "Applying tmux pane styling" configure_tmux || die "Failed configuring tmux"
run_step "Building 6-pane layout" build_layout || die "Failed building tmux layout"

section "Service Wiring"
run_step "Starting server/sidecar/monitor panes" wire_service_panes || die "Failed wiring service panes"
run_step "Opening tunnels (6380->Redis, 8080->monitor)" create_tunnels || die "Failed opening tunnels"
run_step "Preparing node simulator panes" prepare_node_sim_panes || die "Failed preparing simulator panes"
if ! run_step "Waiting for local monitor HTTP endpoint" wait_for_local_monitor; then
  log_warn "Local monitor endpoint did not report ready before browser launch."
fi
if ! run_step "Opening monitor URL in browser" open_monitor_browser; then
  log_warn "Could not auto-open browser. Open http://<WSL-IP>:8080 manually."
fi

section "Ready"
log_ok "Session '$SESSION' is live."
log_info "Press Enter in both node sim panes to launch them; they should appear in the lobby immediately."
tmux select-pane -t "$SESSION:0.0"
tmux attach-session -t "$SESSION"
