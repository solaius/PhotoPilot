# Getting Started with PhotoPilot

This guide will walk you through the process of setting up and running the PhotoPilot application on your local machine.

## Prerequisites

Before you begin, make sure you have installed all the required dependencies:

- [Node.js](prerequisites/nodejs.md) (v14.x or higher)
- [MongoDB](prerequisites/mongodb.md)
- [Redis](prerequisites/redis.md)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/solaius/PhotoPilot.git
cd PhotoPilot
```

### 2. Set Up the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on the example:
   ```bash
   cp .env.example .env
   ```

4. Edit the `.env` file with your configuration:
   ```bash
   nano .env
   ```

   For development, you can use the following settings:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/photopilot
   JWT_SECRET=dev_jwt_secret
   NODE_ENV=development
   BYPASS_AUTH=true
   MOCK_DB=true
   
   # Redis Configuration
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=
   ```

### 3. Set Up the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Edit the `.env` file with your configuration:
   ```bash
   nano .env
   ```

   For development, you can use the following settings:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_BYPASS_AUTH=true
   REACT_APP_USE_MOCK_DATA=true
   ```

## Running the Application

### Development Mode

1. Start both the backend and frontend servers using the provided script:
   ```bash
   cd ..  # Make sure you're in the root directory
   chmod +x start-dev.sh  # Make the script executable (if not already)
   ./start-dev.sh
   ```

   This script will:
   - Start the backend server on port 5000 (or the port specified in your `.env` file)
   - Start the frontend server on port 3000
   - Watch for changes and automatically reload

2. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Running Servers Separately

If you prefer to run the servers separately:

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. In a new terminal, start the frontend server:
   ```bash
   cd frontend
   npm start
   ```

## Development Features

### Authentication Bypass

For development purposes, authentication is bypassed when `BYPASS_AUTH=true` is set in the backend `.env` file and `REACT_APP_BYPASS_AUTH=true` is set in the frontend `.env` file. This allows you to use the application without setting up OAuth providers.

### Mock Database

When `MOCK_DB=true` is set in the backend `.env` file and `REACT_APP_USE_MOCK_DATA=true` is set in the frontend `.env` file, the application will use mock data instead of connecting to MongoDB. This is useful for development and testing.

## Project Structure

```
/PhotoPilot
  /frontend           # React PWA
    /public
    /src
      /components
      /pages
      /services
      /utils
      /hooks
      /context
  /backend            # Node.js/Express API Gateway
    /src
      /config         # Configuration files
      /controllers    # Route controllers
      /middleware     # Custom middleware
      /models         # MongoDB models
      /routes         # API routes
      /services       # Business logic
      /utils          # Utility functions
    /tests            # Backend tests
  /services           # Microservices
    /auth             # Authentication service
    /ai               # AI orchestration service
    /social           # Social media dispatch service
  /docs               # Documentation
  /.github            # GitHub Actions for CI/CD
```

## API Documentation

For detailed information about the available API endpoints, refer to the [API Documentation](API.md).

## Troubleshooting

### Backend Server Won't Start

1. Check if MongoDB and Redis are running:
   ```bash
   # Check MongoDB
   mongosh --eval 'db.runCommand({ connectionStatus: 1 })'
   
   # Check Redis
   redis-cli ping
   ```

2. Verify that the ports are not already in use:
   ```bash
   # Check if port 5000 is in use
   sudo lsof -i :5000
   
   # Check if port 3000 is in use
   sudo lsof -i :3000
   ```

3. Check the backend logs for errors.

### Frontend Server Won't Start

1. Make sure you have installed all dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Check if the port is already in use:
   ```bash
   sudo lsof -i :3000
   ```

3. Try clearing the cache:
   ```bash
   npm cache clean --force
   ```

### Can't Connect to MongoDB or Redis

1. Make sure the services are running:
   ```bash
   # For Linux/WSL
   sudo systemctl status mongod
   sudo systemctl status redis-server
   
   # For macOS
   brew services list
   ```

2. Check the connection strings in your `.env` files.

3. For development, you can set `MOCK_DB=true` to bypass the database connection.

## Next Steps

- Explore the [Development Plan](DEVELOPMENT_PLAN.md) to understand the project roadmap.
- Check out the [API Documentation](API.md) for details about the available endpoints.
- Learn about the [Project Specification](../PROJECT_SPECIFICATION.md) to understand the project requirements.