#!/bin/bash
# dev.sh : open a 4-pane tmux session for the basic/ stack
#
# Layout:
#   ┌─────────────────┬─────────────────┐  (large)
#   │     server      │     sidecar     │
#   ├─────────────────┼─────────────────┤  (small)
#   │    client 1     │    client 2     │
#   └─────────────────┴─────────────────┘
#
# Usage: ./dev.sh
# Requires: tmux, SSH key at ./raycastpair.pem

SESSION="raycaster"
EC2="ubuntu@18.175.238.148"
KEY="$(cd "$(dirname "$0")" && pwd)/raycastpair.pem"
SSH="ssh -t -i $KEY $EC2"

# Kill existing tmux session and stale EC2 processes, then pull latest code
tmux kill-session -t "$SESSION" 2>/dev/null
$SSH "pkill -f server.py; pkill -f sidecar.py; cd ~/ServerSide_PYNQ_Raycaster && git pull" 2>/dev/null || true

# Create session
tmux new-session -d -s "$SESSION" -x 220 -y 50

# Mouse + lock titles
tmux set-option -t "$SESSION" mouse on
tmux set-option -t "$SESSION" allow-rename off
tmux set-option -t "$SESSION" pane-border-style "fg=green"
tmux set-option -t "$SESSION" pane-active-border-style "fg=brightgreen"
tmux set-option -t "$SESSION" pane-border-status top
tmux set-option -t "$SESSION" pane-border-format " #{pane_title} "

# Build layout: split bottom row off (20%), then split each row vertically
tmux split-window -t "$SESSION:0.0" -v -p 30   # 0=top-left  1=bottom-left
tmux split-window -t "$SESSION:0.1" -h -p 50   # 1=bottom-left  2=bottom-right
tmux split-window -t "$SESSION:0.0" -h -p 50   # 0=top-left  3=top-right
# Final: 0=top-left  1=bottom-left  2=bottom-right  3=top-right

tmux select-pane -t "$SESSION:0.0" -T "server"
tmux send-keys -t "$SESSION:0.0" "$SSH 'source ~/venv/bin/activate && cd ~/ServerSide_PYNQ_Raycaster && python3 basic/server/server.py'"

tmux select-pane -t "$SESSION:0.3" -T "sidecar"
tmux send-keys -t "$SESSION:0.3" "$SSH 'source ~/venv/bin/activate && cd ~/ServerSide_PYNQ_Raycaster && python3 basic/sidecar/sidecar.py'"

tmux select-pane -t "$SESSION:0.1" -T "client 1"
tmux send-keys -t "$SESSION:0.1" "python3 basic/client/sender.py"

tmux select-pane -t "$SESSION:0.2" -T "client 2"
tmux send-keys -t "$SESSION:0.2" "python3 basic/client/sender.py"

# Focus server pane on attach
tmux select-pane -t "$SESSION:0.0"
tmux attach-session -t "$SESSION"
