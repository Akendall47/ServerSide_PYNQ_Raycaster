# Running the Stack

## One-command launch

```bash
./pynq_dev.sh   # PYNQ board stack
./sim_dev2.sh   # simulator stack (software nodes, no hardware needed)
```

Both scripts block until tmux is ready, then attach automatically.

---

## First-time local setup

```bash
# System packages (Ubuntu/WSL)
sudo apt-get install -y tmux nodejs npm

# Node dependencies for the React monitor UI build
npm install
```

After this, the dev scripts handle everything else automatically on every run.

---

## What each script does

1. **Preflight** — checks SSH key, EC2 reachability, local tools (`tmux`, `ssh`, `npm`, etc.)
2. **Build** — `npm run build:monitor-ui` compiles the React monitor bundle into `monitor_ui/dist/`
3. **Remote sync** — `git reset --hard` the EC2 repo to match the pushed branch exactly
4. **Tmux** — opens panes that SSH into EC2 and run server, sidecar, monitor in the venv
5. **Tunnels** — SSH port-forwards EC2:8080 → local:8080 (monitor UI); sim also forwards EC2:6379 → local:6380 for node sims
6. **Browser** — opens `http://<WSL-IP>:8080` automatically

---

## What runs where

| Component | Host |
|-----------|------|
| Redis | EC2 |
| Game server (`server.py`) | EC2 (in `~/venv`) |
| Sidecar (`sidecar.py`) | EC2 (in `~/venv`) |
| Monitor (`monitor.py`) | EC2 (in `~/venv`) |
| Node simulators | Local (WSL) |
| PYNQ board client | PYNQ hardware |

---

## EC2 prerequisites (one-time, already done on existing instance)

```bash
python3 -m venv ~/venv
~/venv/bin/pip install -r requirements.txt
sudo apt-get install -y redis-server
git clone <repo-url> ~/ServerSide_PYNQ_Raycaster
```

AWS credentials come from the EC2 instance's IAM role — nothing to configure as long as you're on the existing instance.

---

## Giving someone else access

Hand them `raycastpair.pem`. As long as the EC2 instance keeps running they get the full stack — the IAM role is attached to the instance, not the key.

```bash
cp raycastpair.pem ServerSide_PYNQ_Raycaster/
chmod 600 ServerSide_PYNQ_Raycaster/raycastpair.pem
cd ServerSide_PYNQ_Raycaster
npm install        # one-time
./sim_dev2.sh      # or ./pynq_dev.sh
```

---

## Useful commands (on EC2)

```bash
tail -f /tmp/server.log
tail -f /tmp/sidecar.log
tail -f /tmp/monitor.log
```
