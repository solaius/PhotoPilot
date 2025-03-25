# Prerequisites for PhotoPilot

This document provides an overview of the prerequisites needed to run PhotoPilot. For detailed installation instructions for each prerequisite, follow the links below.

## Required Software

### 1. Node.js (v14.x or higher)

Node.js is the runtime environment used for both the frontend and backend of PhotoPilot.

- **Installation Guide:** [Node.js Installation](prerequisites/nodejs.md)
- **Purpose:** Runs the Express.js backend server and the React frontend application
- **Version Requirement:** 14.x or higher
- **Verification Command:** `node --version && npm --version`

### 2. MongoDB

MongoDB is the primary database used by PhotoPilot to store project data, user information, and media asset metadata.

- **Installation Guide:** [MongoDB Installation](prerequisites/mongodb.md)
- **Purpose:** Stores application data in a flexible, JSON-like format
- **Version Requirement:** 4.4 or higher
- **Verification Command:** `mongosh --eval 'db.runCommand({ connectionStatus: 1 })'`

### 3. Redis

Redis is used for caching, real-time features, and pub/sub messaging in PhotoPilot.

- **Installation Guide:** [Redis Installation](prerequisites/redis.md)
- **Purpose:** Provides caching, session storage, and real-time messaging capabilities
- **Version Requirement:** 6.0 or higher
- **Verification Command:** `redis-cli ping`

## Optional Tools

### 1. MongoDB Compass

MongoDB Compass is a GUI for MongoDB that makes it easier to visualize and interact with your data.

- **Download:** [MongoDB Compass](https://www.mongodb.com/products/compass)
- **Purpose:** Visual database management and exploration

### 2. Redis Insight

Redis Insight is a GUI for Redis that helps you visualize and manage your Redis data.

- **Download:** [Redis Insight](https://redis.com/redis-enterprise/redis-insight/)
- **Purpose:** Visual Redis management and monitoring

### 3. Postman

Postman is an API platform for building and using APIs, useful for testing the PhotoPilot API endpoints.

- **Download:** [Postman](https://www.postman.com/downloads/)
- **Purpose:** API testing and documentation

## System Requirements

### Minimum Requirements

- **CPU:** Dual-core processor, 2.0 GHz or higher
- **RAM:** 4 GB
- **Disk Space:** 1 GB for the application, plus additional space for storing photos and data
- **Operating System:** 
  - Linux: Ubuntu 18.04+, Fedora 34+, or other modern distributions
  - macOS: 10.15 (Catalina) or newer
  - Windows: Windows 10/11 with WSL 2.0 (Ubuntu)

### Recommended Requirements

- **CPU:** Quad-core processor, 2.5 GHz or higher
- **RAM:** 8 GB or more
- **Disk Space:** 2 GB for the application, plus additional space for storing photos and data
- **Operating System:** Latest versions of Ubuntu, macOS, or Windows 11 with WSL 2.0

## Next Steps

Once you have installed all the prerequisites, you can proceed to [Getting Started with PhotoPilot](getting-started.md) to set up and run the application.