#!/bin/bash
# basic/dev.sh : open a 4-pane tmux session for the basic/ stack
#
# Layout:
#   ┌─────────────────┬─────────────────┐  (large)
#   │     server      │     sidecar     │
#   ├─────────────────┼─────────────────┤  (small)
#   │    client 1     │    client 2     │
#   └─────────────────┴─────────────────┘
#
# Usage: ./basic/dev.sh  (from repo root)  or  cd basic && ./dev.sh
# Requires: tmux, SSH key at repo root raycastpair.pem

SESSION="raycaster"
EC2_IP="3.9.71.204"
EC2="ubuntu@${EC2_IP}"
REPO="$(cd "$(dirname "$0")/.." && pwd)"
KEY="$REPO/raycastpair.pem"
SSH_OPTS="-o BatchMode=yes -o StrictHostKeyChecking=accept-new -o ConnectTimeout=10 -o ServerAliveInterval=30 -o ServerAliveCountMax=3"
SSH="ssh $SSH_OPTS -t -i $KEY $EC2"
GIT_BRANCH=""
GIT_UPSTREAM=""

resolve_git_target() {
  GIT_BRANCH="$(git -C "$REPO" rev-parse --abbrev-ref HEAD 2>/dev/null || true)"
  if [ -z "$GIT_BRANCH" ] || [ "$GIT_BRANCH" = "HEAD" ]; then
    echo "Detached HEAD detected. Check out a branch first."
    return 1
  fi

  GIT_UPSTREAM="$(git -C "$REPO" rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>/dev/null || true)"
  if [ -z "$GIT_UPSTREAM" ]; then
    echo "Branch '$GIT_BRANCH' has no upstream. Push it first:"
    echo "  git push -u origin $GIT_BRANCH"
    return 1
  fi

  case "$GIT_UPSTREAM" in
    origin/*) ;;
    *)
      echo "Branch '$GIT_BRANCH' tracks '$GIT_UPSTREAM'. This script only syncs from origin."
      echo "  git branch --set-upstream-to=origin/$GIT_BRANCH $GIT_BRANCH"
      return 1
      ;;
  esac

  return 0
}

ensure_clean_git() {
  resolve_git_target || return 1

  if ! git -C "$REPO" diff --quiet || ! git -C "$REPO" diff --cached --quiet; then
    echo "Uncommitted changes detected. Commit and push first."
    git -C "$REPO" status --short
    return 1
  fi

  if [ "$(git -C "$REPO" rev-list --count "$GIT_UPSTREAM"..HEAD 2>/dev/null | tr -d ' ')" -gt 0 ]; then
    echo "Unpushed commits detected on '$GIT_BRANCH'. Push first."
    git -C "$REPO" log --oneline "$GIT_UPSTREAM"..HEAD
    return 1
  fi

  return 0
}

sync_remote_repo() {
  ssh $SSH_OPTS -i "$KEY" "$EC2" "pkill -f server.py 2>/dev/null; pkill -f sidecar.py 2>/dev/null; cd ~/ServerSide_PYNQ_Raycaster && git fetch origin && git checkout -B '$GIT_BRANCH' '$GIT_UPSTREAM' && git branch --set-upstream-to='$GIT_UPSTREAM' '$GIT_BRANCH' && git reset --hard '$GIT_UPSTREAM'"
}

# Kill existing tmux session and stale EC2 processes, then sync the matching branch on EC2.
resolve_git_target || exit 1
ensure_clean_git || exit 1
tmux kill-session -t "$SESSION" 2>/dev/null
echo "--- syncing EC2 to $GIT_UPSTREAM ---"
sync_remote_repo || exit 1
echo "--- done ---"

# Create session
tmux new-session -d -s "$SESSION" -x 220 -y 50

# Mouse + lock titles
tmux set-option -t "$SESSION" mouse on
tmux set-option -t "$SESSION" allow-rename off
tmux set-option -t "$SESSION" pane-border-style "fg=green"
tmux set-option -t "$SESSION" pane-active-border-style "fg=brightgreen"
tmux set-option -t "$SESSION" pane-border-status top
tmux set-option -t "$SESSION" pane-border-format " #{pane_title} "

# Build layout: split bottom row off (30%), then split each row vertically
tmux split-window -t "$SESSION:0.0" -v -p 30   # 0=top-left  1=bottom-left
tmux split-window -t "$SESSION:0.1" -h -p 50   # 1=bottom-left  2=bottom-right
tmux split-window -t "$SESSION:0.0" -h -p 50   # 0=top-left  3=top-right
# Final: 0=top-left  1=bottom-left  2=bottom-right  3=top-right

tmux select-pane -t "$SESSION:0.0" -T "server"
tmux send-keys -t "$SESSION:0.0" "$SSH 'source ~/venv/bin/activate && cd ~/ServerSide_PYNQ_Raycaster && python3 basic/server/server.py'"

tmux select-pane -t "$SESSION:0.3" -T "sidecar"
tmux send-keys -t "$SESSION:0.3" "$SSH 'source ~/venv/bin/activate && cd ~/ServerSide_PYNQ_Raycaster && python3 basic/sidecar/sidecar.py'"

tmux select-pane -t "$SESSION:0.1" -T "client 1"
tmux send-keys -t "$SESSION:0.1" "cd $REPO && python3 basic/client/sender.py"

tmux select-pane -t "$SESSION:0.2" -T "client 2"
tmux send-keys -t "$SESSION:0.2" "cd $REPO && python3 basic/client/sender.py"

# Focus server pane on attach
tmux select-pane -t "$SESSION:0.0"
tmux attach-session -t "$SESSION"
