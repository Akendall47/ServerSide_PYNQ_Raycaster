#!/bin/bash
# dev.sh : open a 6-pane tmux session for the SEDA ec2/ stack
#
# Layout:
#   ┌──────────────────────┬──────────────┐  (large)
#   │      seda server     │   sidecar    │
#   ├──────────┬───────────┼──────────────┤  (small)
#   │ node sim1│ node sim2 │ redis --stat │
#   ├──────────┴───────────┴──────────────┤
#   │  monitor (SSH tunnel + monitor.py)  │
#   └─────────────────────────────────────┘
#
# Monitor runs on EC2 port 8080, tunnelled to http://localhost:8080
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
ssh -i "$KEY" "$EC2" "pkill -f server.py; pkill -f sidecar.py; cd ~/ServerSide_PYNQ_Raycaster && git pull"
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
#   Split top row right (sidecar), split bottom strip off (15%), split mid row into 3,
#   then add a narrow monitor strip at the very bottom
tmux split-window -t "$SESSION:0.0" -h -p 30   # 0=top-left(server)  1=top-right(sidecar)
tmux split-window -t "$SESSION:0.0" -v -p 30   # 0=server  2=mid-left
tmux split-window -t "$SESSION:0.2" -h -p 66   # 2=mid-left  3=mid-center
tmux split-window -t "$SESSION:0.3" -h -p 50   # 3=mid-center  4=mid-right
tmux split-window -t "$SESSION:0.2" -v -p 30   # 2=mid-left  5=bottom strip
# Final: 0=server  1=sidecar  2=node-sim-1  3=node-sim-2  4=redis-stats  5=monitor

tmux select-pane -t "$SESSION:0.0" -T "seda server"
tmux send-keys -t "$SESSION:0.0" "ssh -t -i $KEY $EC2 'source ~/venv/bin/activate && cd ~/ServerSide_PYNQ_Raycaster && python3 ec2/server/server.py'"

tmux select-pane -t "$SESSION:0.1" -T "sidecar"
tmux send-keys -t "$SESSION:0.1" "ssh -t -i $KEY $EC2 'source ~/venv/bin/activate && cd ~/ServerSide_PYNQ_Raycaster && python3 ec2/sidecar/sidecar.py'"

tmux select-pane -t "$SESSION:0.2" -T "node sim 1"
tmux send-keys -t "$SESSION:0.2" "cd $REPO && python3 interfacing/node_simulator.py 18.175.238.148 9000 --nodes 1"

tmux select-pane -t "$SESSION:0.3" -T "node sim 2"
tmux send-keys -t "$SESSION:0.3" "cd $REPO && python3 interfacing/node_simulator.py 18.175.238.148 9000 --nodes 1 --player-id 2"

tmux select-pane -t "$SESSION:0.4" -T "redis stats"
tmux send-keys -t "$SESSION:0.4" "ssh -t -i $KEY $EC2 'redis-cli --stat'"

# Monitor: SSH tunnel (port 8080) + launch monitor.py on EC2
# Tunnel stays open as long as this pane lives.
tmux select-pane -t "$SESSION:0.5" -T "monitor :8080"
tmux send-keys -t "$SESSION:0.5" "ssh -i $KEY -L 8080:localhost:8080 $EC2 'source ~/venv/bin/activate && cd ~/ServerSide_PYNQ_Raycaster && python3 ec2/monitor/monitor.py'"

# Open browser after a moment to let the tunnel come up (WSL: use cmd.exe start)
sleep 3 && cmd.exe /c start http://localhost:8080 &

# Focus server pane on attach
tmux select-pane -t "$SESSION:0.0"
tmux attach-session -t "$SESSION"
