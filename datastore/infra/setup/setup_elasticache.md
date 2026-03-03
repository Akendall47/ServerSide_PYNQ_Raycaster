# Redis (ElastiCache) Setup

## Cluster
- Engine: Redis OSS 7.x
- Deployment: Single-node (cluster mode disabled)
- Node type: `cache.t3.micro` : free tier: 750 hrs/month for 12 months
- Region: eu-west-2

## VPC & Security
- Place in the **same VPC** as the EC2 instance
- Create a security group `fpga-raycaster-redis-sg`
  - Inbound: TCP 6379 from the EC2 security group only
  - No public access

## Parameter Group
- Default `default.redis7`
- Optional: set `maxmemory-policy allkeys-lru` to evict old data under memory pressure

## Creation (Console)
1. ElastiCache → Redis clusters → Create
2. Cluster mode: disabled
3. Node type: cache.t3.micro
4. Replicas: 0 (free tier)
5. VPC: same as EC2
6. Security group: `fpga-raycaster-redis-sg`

## After Creation
Copy the **Primary endpoint** into `.env`:
```
REDIS_HOST=your-cluster.abc123.euw2.cache.amazonaws.com
REDIS_PORT=6379
```

## Current Status — Not Yet Wired

The server currently runs Redis on **EC2 localhost:6379** (installed directly on the instance).
`t4_redis_writer.py` hardcodes `127.0.0.1:6379` and does not read from `.env`.

ElastiCache is the production upgrade path but is **not active**.
To switch: update `REDIS_HOST` / `REDIS_PORT` in `t4_redis_writer.py` and `sidecar.py`, and
ensure the EC2 security group can reach the ElastiCache security group on TCP 6379.

## Key Schema
See `redis/README.md`.
