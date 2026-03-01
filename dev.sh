#!/bin/bash
# dev.sh : open a 5-pane tmux session for the SEDA ec2/ stack
#
# Layout:
#   ┌────────────────┬────────────┬────────────┐  (60% height)
#   │   seda server  │  sidecar   │  monitor   │
#   ├────────────────┴┬───────────┴────────────┤  (40% height)
#   │   node sim 1   │  node sim 2  │ redis    │
#   └────────────────┴─────────────┴───────────┘
#
# Monitor (ec2/monitor/monitor.py) runs on EC2 port 8080.
# SSH tunnel in the monitor pane forwards it to http://localhost:8080
#
# Usage: ./dev.sh  (from repo root)
# Requires: tmux, SSH key at repo root raycastpair.pem
# For basic/ stack: ./basic/basicdev.sh

SESSION="seda"
EC2="ubuntu@18.175.238.148"
REPO="$(cd "$(dirname "$0")" && pwd)"
KEY="$REPO/raycastpair.pem"

# Warn if local commits haven't been pushed yet
UNPUSHED=$(git -C "$REPO" log --oneline @{u}..HEAD 2>/dev/null | wc -l)
if [ "$UNPUSHED" -gt 0 ]; then
  echo "!!! WARNING: $UNPUSHED unpushed commit(s) — EC2 pull will miss them. Push first!"
  echo "    git push && ./dev.sh"
  read -rp "    Continue anyway? [y/N] " confirm
  [[ "$confirm" =~ ^[Yy]$ ]] || exit 1
fi

# Kill stale session and EC2 processes, pull latest code
tmux kill-session -t "$SESSION" 2>/dev/null
echo "--- pulling latest code on EC2 ---"
ssh -i "$KEY" "$EC2" "pkill -f server.py; pkill -f sidecar.py; pkill -f monitor.py; sleep 2; cd ~/ServerSide_PYNQ_Raycaster && git pull"
echo "--- done ---"

# Create session (6 panes)
tmux new-session -d -s "$SESSION" -x 220 -y 50

# Mouse + lock titles
tmux set-option -t "$SESSION" mouse on
tmux set-option -t "$SESSION" allow-rename off
tmux set-option -t "$SESSION" pane-border-style "fg=cyan"
tmux set-option -t "$SESSION" pane-active-border-style "fg=brightcyan"
tmux set-option -t "$SESSION" pane-border-status top
tmux set-option -t "$SESSION" pane-border-format " #{pane_title} "

# Build layout — top row: server | sidecar | monitor (3 columns)
#                bottom row: node-sim-1 | node-sim-2 | redis (3 columns)
tmux split-window -t "$SESSION:0.0" -h -p 50          # 0=top-left  1=top-right-half
tmux split-window -t "$SESSION:0.1" -h -p 50          # 1=top-mid   2=top-right
tmux split-window -t "$SESSION:0.0" -v -p 40          # 0=server    3=bottom-left
tmux split-window -t "$SESSION:0.3" -h -p 66          # 3=bot-left  4=bot-mid
tmux split-window -t "$SESSION:0.4" -h -p 50          # 4=bot-mid   5=bot-right
# Final: 0=server  1=sidecar  2=monitor  3=node-sim-1  4=node-sim-2  5=redis-stats

tmux select-pane -t "$SESSION:0.0" -T "seda server"
tmux send-keys -t "$SESSION:0.0" "ssh -t -i $KEY $EC2 'source ~/venv/bin/activate && cd ~/ServerSide_PYNQ_Raycaster && python3 ec2/server/server.py'"

tmux select-pane -t "$SESSION:0.1" -T "sidecar"
tmux send-keys -t "$SESSION:0.1" "ssh -t -i $KEY $EC2 'source ~/venv/bin/activate && cd ~/ServerSide_PYNQ_Raycaster && python3 ec2/sidecar/sidecar.py'"

# Monitor: SSH tunnel (-L 8080) + monitor.py — open http://localhost:8080 in browser
tmux select-pane -t "$SESSION:0.2" -T "monitor :8080"
tmux send-keys -t "$SESSION:0.2" "ssh -t -i $KEY -L 8080:localhost:8080 $EC2 'source ~/venv/bin/activate && cd ~/ServerSide_PYNQ_Raycaster && python3 ec2/monitor/monitor.py'"

tmux select-pane -t "$SESSION:0.3" -T "node sim 1"
tmux send-keys -t "$SESSION:0.3" "cd $REPO && python3 interfacing_+_sim/node_simulator.py 18.175.238.148 9000 --nodes 1"

tmux select-pane -t "$SESSION:0.4" -T "node sim 2"
tmux send-keys -t "$SESSION:0.4" "cd $REPO && python3 interfacing_+_sim/node_simulator.py 18.175.238.148 9000 --nodes 1 --player-id 2"

tmux select-pane -t "$SESSION:0.5" -T "redis stats"
tmux send-keys -t "$SESSION:0.5" "ssh -t -i $KEY $EC2 'redis-cli --stat'"

# Open browser (WSL: cd to /mnt/c first to avoid UNC path error in cmd.exe)
cd /mnt/c && cmd.exe /c start http://localhost:8080

# Focus server pane on attach
tmux select-pane -t "$SESSION:0.0"
tmux attach-session -t "$SESSION"
