# Redis Installation Guide

PhotoPilot uses Redis for caching, real-time features, and pub/sub messaging. This guide will help you install and set up Redis on your operating system.

## Linux

### Ubuntu/Debian

1. Update your package index:
   ```bash
   sudo apt update
   ```

2. Install Redis:
   ```bash
   sudo apt install redis-server
   ```

3. Configure Redis to start on boot:
   ```bash
   sudo systemctl enable redis-server
   ```

4. Start Redis:
   ```bash
   sudo systemctl start redis-server
   ```

5. Verify the installation:
   ```bash
   redis-cli ping
   ```
   You should receive a response of `PONG`.

### Fedora/RHEL/CentOS

1. Install Redis:
   ```bash
   sudo dnf install redis
   ```

2. Start Redis:
   ```bash
   sudo systemctl start redis
   ```

3. Enable Redis to start on boot:
   ```bash
   sudo systemctl enable redis
   ```

4. Verify the installation:
   ```bash
   redis-cli ping
   ```
   You should receive a response of `PONG`.

## macOS

### Using Homebrew (Recommended)

1. Install Homebrew if you don't have it:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Install Redis:
   ```bash
   brew install redis
   ```

3. Start Redis:
   ```bash
   brew services start redis
   ```

4. Verify the installation:
   ```bash
   redis-cli ping
   ```
   You should receive a response of `PONG`.

### Using Redis Cloud (Cloud Option)

If you prefer not to install Redis locally, you can use Redis Cloud:

1. Sign up for a free account at [Redis Cloud](https://redis.com/try-free/).
2. Create a new subscription (the free tier is sufficient for development).
3. Create a new database.
4. Get your endpoint and password.
5. Use the connection details in your PhotoPilot application by setting them in the `.env` file.

## Windows 11 with WSL 2.0 (Ubuntu)

### Installing Redis in WSL

1. Update your package index:
   ```bash
   sudo apt update
   ```

2. Install Redis:
   ```bash
   sudo apt install redis-server
   ```

3. Configure Redis to start on boot:
   ```bash
   sudo systemctl enable redis-server
   ```

4. Start Redis:
   ```bash
   sudo systemctl start redis-server
   ```

5. Verify the installation:
   ```bash
   redis-cli ping
   ```
   You should receive a response of `PONG`.

## Configuring Redis for PhotoPilot

### Basic Configuration

1. Open the Redis configuration file:
   ```bash
   # For Linux/WSL
   sudo nano /etc/redis/redis.conf
   
   # For macOS
   nano $(brew --prefix)/etc/redis.conf
   ```

2. Make the following changes for a development environment:
   - Set a password (recommended):
     ```
     requirepass your_secure_password
     ```
   - Bind to localhost only (for security):
     ```
     bind 127.0.0.1
     ```
   - Set the maximum memory (adjust based on your system):
     ```
     maxmemory 256mb
     maxmemory-policy allkeys-lru
     ```

3. Save the file and restart Redis:
   ```bash
   # For Linux/WSL
   sudo systemctl restart redis-server
   
   # For macOS
   brew services restart redis
   ```

4. Update your PhotoPilot `.env` file with the Redis connection details:
   ```
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=your_secure_password
   ```

### Advanced Configuration for Production

For production environments, consider:

1. Enabling persistence:
   ```
   appendonly yes
   appendfsync everysec
   ```

2. Setting up Redis Sentinel or Redis Cluster for high availability.

3. Configuring proper memory limits and eviction policies based on your usage patterns.

## Troubleshooting

### Redis Service Won't Start

If Redis service fails to start, check the logs:
```bash
# For Linux/WSL
sudo journalctl -u redis-server

# For macOS
brew services list
```

Common issues include:
- Permission problems with the data directory
- Port 6379 already in use
- Configuration syntax errors

### Connection Issues

If you can't connect to Redis:
1. Check if Redis is running:
   ```bash
   # For Linux/WSL
   sudo systemctl status redis-server
   
   # For macOS
   brew services list
   ```

2. Verify the Redis port is open:
   ```bash
   sudo lsof -i :6379
   ```

3. Check firewall settings:
   ```bash
   # For Ubuntu
   sudo ufw status
   
   # For Fedora
   sudo firewall-cmd --list-all
   ```

4. Test connection with authentication:
   ```bash
   redis-cli
   auth your_secure_password
   ping
   ```

## Redis CLI Commands

Here are some useful Redis CLI commands for debugging:

```bash
# Connect to Redis
redis-cli

# Authenticate (if password is set)
auth your_secure_password

# Test connection
ping

# Get server info
info

# List all keys
keys *

# Monitor Redis commands in real-time
monitor

# Exit Redis CLI
exit
```

## Next Steps

After installing Redis, you have completed all the prerequisites for PhotoPilot. You can now proceed to [setting up the PhotoPilot application](../getting-started.md).