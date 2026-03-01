#!/usr/bin/env bash
# Deploy the Python game server to EC2 and restart it.
# Usage: EC2_HOST=ubuntu@1.2.3.4 EC2_KEY=~/.ssh/key.pem bash infra/scripts/deploy_server.sh
set -euo pipefail

# Sync Python server files to EC2
rsync -avz -e "ssh -i $EC2_KEY" \
    ec2/server/ \
    interfacing_+_sim/protocol.py \
    requirements.txt \
    "$EC2_HOST:/opt/game_server/"

# Restart the server process
ssh -i "$EC2_KEY" "$EC2_HOST" "sudo systemctl restart game_server"

echo "Deployed. Build game_logic C++ module separately if needed:"
echo "  ssh into EC2, cd /opt/game_server/game_logic, cmake . && make"
