# MongoDB Installation Guide

PhotoPilot uses MongoDB as its primary database. This guide will help you install and set up MongoDB on your operating system.

## Linux

### Ubuntu

1. Import the MongoDB public GPG key:
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   ```

2. Create a list file for MongoDB:
   ```bash
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   ```

3. Update the package list:
   ```bash
   sudo apt-get update
   ```

4. Install MongoDB:
   ```bash
   sudo apt-get install -y mongodb-org
   ```

5. Start MongoDB:
   ```bash
   sudo systemctl start mongod
   ```

6. Enable MongoDB to start on boot:
   ```bash
   sudo systemctl enable mongod
   ```

7. Verify the installation:
   ```bash
   mongosh --eval 'db.runCommand({ connectionStatus: 1 })'
   ```

### Fedora

1. Create a repository file for MongoDB:
   ```bash
   sudo nano /etc/yum.repos.d/mongodb-org-6.0.repo
   ```

2. Add the following content:
   ```
   [mongodb-org-6.0]
   name=MongoDB Repository
   baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/6.0/x86_64/
   gpgcheck=1
   enabled=1
   gpgkey=https://www.mongodb.org/static/pgp/server-6.0.asc
   ```

3. Install MongoDB:
   ```bash
   sudo dnf install -y mongodb-org
   ```

4. Start MongoDB:
   ```bash
   sudo systemctl start mongod
   ```

5. Enable MongoDB to start on boot:
   ```bash
   sudo systemctl enable mongod
   ```

6. Verify the installation:
   ```bash
   mongosh --eval 'db.runCommand({ connectionStatus: 1 })'
   ```

## macOS

### Using Homebrew (Recommended)

1. Install Homebrew if you don't have it:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Install MongoDB:
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   ```

3. Start MongoDB:
   ```bash
   brew services start mongodb-community
   ```

4. Verify the installation:
   ```bash
   mongosh --eval 'db.runCommand({ connectionStatus: 1 })'
   ```

### Using MongoDB Atlas (Cloud Option)

If you prefer not to install MongoDB locally, you can use MongoDB Atlas, a cloud-based MongoDB service:

1. Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2. Create a new cluster (the free tier is sufficient for development).
3. Set up database access (create a user with a password).
4. Set up network access (allow access from your IP address or from anywhere for development).
5. Get your connection string from the "Connect" button.
6. Use the connection string in your PhotoPilot application by setting it in the `.env` file.

## Windows 11 with WSL 2.0 (Ubuntu)

### Installing MongoDB in WSL

1. Import the MongoDB public GPG key:
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   ```

2. Create a list file for MongoDB:
   ```bash
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   ```

3. Update the package list:
   ```bash
   sudo apt-get update
   ```

4. Install MongoDB:
   ```bash
   sudo apt-get install -y mongodb-org
   ```

5. Create the data directory:
   ```bash
   sudo mkdir -p /data/db
   sudo chown -R `id -un` /data/db
   ```

6. Start MongoDB:
   ```bash
   mongod --dbpath /data/db
   ```

   To run MongoDB as a service, create a systemd service file:
   ```bash
   sudo nano /etc/systemd/system/mongodb.service
   ```

   Add the following content:
   ```
   [Unit]
   Description=MongoDB Database Service
   After=network.target

   [Service]
   Type=simple
   User=mongodb
   ExecStart=/usr/bin/mongod --config /etc/mongod.conf
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```

   Then enable and start the service:
   ```bash
   sudo systemctl enable mongodb
   sudo systemctl start mongodb
   ```

7. Verify the installation:
   ```bash
   mongosh --eval 'db.runCommand({ connectionStatus: 1 })'
   ```

## Configuring MongoDB for PhotoPilot

1. Create a database for PhotoPilot:
   ```bash
   mongosh
   ```

2. In the MongoDB shell, create and use the PhotoPilot database:
   ```javascript
   use photopilot
   ```

3. Create a user for the PhotoPilot application (optional but recommended):
   ```javascript
   db.createUser({
     user: "photopilotuser",
     pwd: "your_secure_password",
     roles: [{ role: "readWrite", db: "photopilot" }]
   })
   ```

4. Exit the MongoDB shell:
   ```javascript
   exit
   ```

5. Update your PhotoPilot `.env` file with the MongoDB connection string:
   ```
   MONGO_URI=mongodb://photopilotuser:your_secure_password@localhost:27017/photopilot
   ```

   If you didn't create a user, use:
   ```
   MONGO_URI=mongodb://localhost:27017/photopilot
   ```

## Troubleshooting

### MongoDB Service Won't Start

If MongoDB service fails to start, check the logs:
```bash
sudo journalctl -u mongod
```

Common issues include:
- Permission problems with the data directory
- Port 27017 already in use
- Insufficient disk space

### Connection Issues

If you can't connect to MongoDB:
1. Check if MongoDB is running:
   ```bash
   sudo systemctl status mongod  # For Linux
   brew services list            # For macOS
   ```

2. Verify the MongoDB port is open:
   ```bash
   sudo lsof -i :27017
   ```

3. Check firewall settings:
   ```bash
   sudo ufw status               # For Ubuntu
   sudo firewall-cmd --list-all  # For Fedora
   ```

## Next Steps

After installing MongoDB, proceed to installing [Redis](redis.md).