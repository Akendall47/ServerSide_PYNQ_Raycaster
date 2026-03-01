#!/bin/bash
# dev.sh : open a 5-pane tmux session for the SEDA ec2/ stack
#
# Layout:
#   ┌──────────────────────┬──────────────┐  (60% height)
#   │      seda server     │   sidecar    │
#   ├──────────┬───────────┼──────────────┤  (40% height)
#   │ node sim1│ node sim2 │ redis --stat │
#   └──────────┴───────────┴──────────────┘
#
# Monitor runs on EC2 port 8080, tunnelled to http://localhost:8080
# The SSH tunnel is baked into the sidecar pane; browser opens automatically.
#
# Usage: ./dev.sh  (from repo root)
# Requires: tmux, SSH key at repo root raycastpair.pem
# For basic/ stack: ./basic/basicdev.sh

SESSION="seda"
EC2="ubuntu@18.175.238.148"
REPO="$(cd "$(dirname "$0")" && pwd)"
KEY="$REPO/raycastpair.pem"

# Kill stale EC2 processes and pull latest code (non-fatal — WSL SSH can be flaky)
tmux kill-session -t "$SESSION" 2>/dev/null
echo "--- pulling latest code on EC2 ---"
ssh -i "$KEY" "$EC2" "pkill -f server.py; pkill -f sidecar.py; pkill -f monitor.py; cd ~/ServerSide_PYNQ_Raycaster && git pull"
echo "--- done ---"

# Create session
tmux new-session -d -s "$SESSION" -x 220 -y 50

# Mouse + lock titles
tmux set-option -t "$SESSION" mouse on
tmux set-option -t "$SESSION" allow-rename off
tmux set-option -t "$SESSION" pane-border-style "fg=cyan"
tmux set-option -t "$SESSION" pane-active-border-style "fg=brightcyan"
tmux set-option -t "$SESSION" pane-border-status top
tmux set-option -t "$SESSION" pane-border-format " #{pane_title} "

# Build layout:
#   Split right (sidecar, 30%), split bottom off top-left (40%), split bottom into 3
tmux split-window -t "$SESSION:0.0" -h -p 30   # 0=top-left(server)  1=top-right(sidecar)
tmux split-window -t "$SESSION:0.0" -v -p 40   # 0=server  2=bottom-left
tmux split-window -t "$SESSION:0.2" -h -p 66   # 2=bottom-left  3=bottom-mid
tmux split-window -t "$SESSION:0.3" -h -p 50   # 3=bottom-mid   4=bottom-right
# Final: 0=server  1=sidecar  2=node-sim-1  3=node-sim-2  4=redis-stats

tmux select-pane -t "$SESSION:0.0" -T "seda server"
tmux send-keys -t "$SESSION:0.0" "ssh -t -i $KEY $EC2 'source ~/venv/bin/activate && cd ~/ServerSide_PYNQ_Raycaster && python3 ec2/server/server.py'"

# Sidecar + SSH tunnel for monitor on same connection (-L 8080:localhost:8080)
tmux select-pane -t "$SESSION:0.1" -T "sidecar + monitor tunnel :8080"
tmux send-keys -t "$SESSION:0.1" "ssh -t -i $KEY -L 8080:localhost:8080 $EC2 'source ~/venv/bin/activate && cd ~/ServerSide_PYNQ_Raycaster && python3 ec2/sidecar/sidecar.py'"

tmux select-pane -t "$SESSION:0.2" -T "node sim 1"
tmux send-keys -t "$SESSION:0.2" "cd $REPO && python3 interfacing/node_simulator.py 18.175.238.148 9000 --nodes 1"

tmux select-pane -t "$SESSION:0.3" -T "node sim 2"
tmux send-keys -t "$SESSION:0.3" "cd $REPO && python3 interfacing/node_simulator.py 18.175.238.148 9000 --nodes 1 --player-id 2"

tmux select-pane -t "$SESSION:0.4" -T "redis stats"
tmux send-keys -t "$SESSION:0.4" "ssh -t -i $KEY $EC2 'redis-cli --stat'"

# Open browser (WSL: cd to /mnt/c first to avoid UNC path error in cmd.exe)
cd /mnt/c && cmd.exe /c start http://localhost:8080

# Focus server pane on attach
tmux select-pane -t "$SESSION:0.0"
tmux attach-session -t "$SESSION"
