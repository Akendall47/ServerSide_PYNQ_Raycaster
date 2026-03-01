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

# Kill stale tmux session
tmux kill-session -t "$SESSION" 2>/dev/null

# Kill any local process holding port 8080 (stale SSH tunnel from a previous run)
fuser -k 8080/tcp 2>/dev/null || true

echo "--- killing stale EC2 processes and pulling latest code ---"
# Each pkill uses '|| true' so a "no process found" exit-1 doesn't abort the chain.
# fuser on EC2 also frees port 8080 server-side in case monitor.py crashed mid-bind.
# git pull is last and its exit code is checked.
# Write a stop script to EC2 and run it — avoids pkill -f matching its own SSH command string
ssh -i "$KEY" "$EC2" 'printf "#!/bin/bash\npkill -f server.py 2>/dev/null; pkill -f sidecar.py 2>/dev/null; pkill -f monitor.py 2>/dev/null; fuser -k 8080/tcp 2>/dev/null; true\n" > /tmp/_stop_seda.sh && bash /tmp/_stop_seda.sh'
sleep 1
ssh -i "$KEY" "$EC2" 'cd ~/ServerSide_PYNQ_Raycaster && git status --short && git pull'
if [ $? -ne 0 ]; then
  echo "!!! EC2 git pull failed — check output above"
  exit 1
fi
echo "--- EC2 ready ---"

# Create session (6 panes)
tmux new-session -d -s "$SESSION" -x 220 -y 50

# Mouse + lock titles
tmux set-option -t "$SESSION" mouse on
tmux set-option -t "$SESSION" allow-rename off
tmux set-option -t "$SESSION" pane-border-style "fg=cyan"
tmux set-option -t "$SESSION" pane-active-border-style "fg=brightcyan"
tmux set-option -t "$SESSION" pane-border-status top
tmux set-option -t "$SESSION" pane-border-format " #{pane_title} "

# Build layout — 2 rows x 3 columns, all panes equal size (50% height, 33% width)
#
#   ┌──────────────┬──────────────┬──────────────┐
#   │  seda server │   sidecar    │   monitor    │  50%
#   ├──────────────┼──────────────┼──────────────┤
#   │  node sim 1  │  node sim 2  │  redis stats │  50%
#   └──────────────┴──────────────┴──────────────┘
#
# Strategy: split top row into 3, then split each pane vertically 50%
tmux split-window -t "$SESSION:0.0" -h -p 67   # 0=top-L  1=top-R-two-thirds
tmux split-window -t "$SESSION:0.1" -h -p 50   # 1=top-M  2=top-R   (now 3 equal cols)
tmux split-window -t "$SESSION:0.0" -v -p 50   # 0=server  3=bot-L
tmux split-window -t "$SESSION:0.1" -v -p 50   # 1=sidecar 4=bot-M
tmux split-window -t "$SESSION:0.2" -v -p 50   # 2=monitor 5=bot-R
# Final: 0=server  1=sidecar  2=monitor  3=node-sim-1  4=node-sim-2  5=redis-stats

# Auto-start EC2 services (server → sidecar → monitor) then leave node sims ready to run manually.
# Startup order matters: server must bind port 9000 before nodes register.

tmux select-pane -t "$SESSION:0.0" -T "seda server"
tmux send-keys -t "$SESSION:0.0" "ssh -t -i $KEY $EC2 'source ~/venv/bin/activate && cd ~/ServerSide_PYNQ_Raycaster && python3 ec2/server/server.py'" Enter

tmux select-pane -t "$SESSION:0.1" -T "sidecar"
tmux send-keys -t "$SESSION:0.1" "ssh -t -i $KEY $EC2 'source ~/venv/bin/activate && cd ~/ServerSide_PYNQ_Raycaster && python3 ec2/sidecar/sidecar.py'" Enter

# Monitor: start on EC2, poll until port 8080 is bound, then tail log (tunnel already open via -L).
tmux select-pane -t "$SESSION:0.2" -T "monitor :8080"
tmux send-keys -t "$SESSION:0.2" "fuser -k 8080/tcp 2>/dev/null || true; ssh -t -i $KEY -L 0.0.0.0:8080:localhost:8080 $EC2 'source ~/venv/bin/activate && cd ~/ServerSide_PYNQ_Raycaster && nohup python3 ec2/monitor/monitor.py > /tmp/monitor.log 2>&1 & until nc -z localhost 8080 2>/dev/null; do sleep 0.2; done && echo [monitor] port 8080 ready && tail -f /tmp/monitor.log'" Enter

# Node sims: pre-filled but NOT auto-started — press Enter in each pane when server is ready.
tmux select-pane -t "$SESSION:0.3" -T "node sim 1 (runner)  ← press Enter to start"
tmux send-keys -t "$SESSION:0.3" "cd $REPO && python3 interfacing_+_sim/node_simulator.py 18.175.238.148 9000 --nodes 1 --node-index 0"

tmux select-pane -t "$SESSION:0.4" -T "node sim 2 (tagger)  ← press Enter to start"
tmux send-keys -t "$SESSION:0.4" "cd $REPO && python3 interfacing_+_sim/node_simulator.py 18.175.238.148 9000 --nodes 1 --node-index 1"

tmux select-pane -t "$SESSION:0.5" -T "redis stats"
tmux send-keys -t "$SESSION:0.5" "ssh -t -i $KEY $EC2 'redis-cli --stat'" Enter

# Open browser — use WSL IP since SSH tunnel binds to WSL interface, not Windows localhost
WSL_IP=$(hostname -I | awk '{print $1}')
cd /mnt/c && cmd.exe /c start "http://${WSL_IP}:8080"

# Focus server pane on attach
tmux select-pane -t "$SESSION:0.0"
tmux attach-session -t "$SESSION"
