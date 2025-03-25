# PhotoPilot

PhotoPilot is a modern, AI-assisted workflow platform for photographers. It streamlines the photographer's workflow by integrating multi-cloud storage, on-demand AI image analysis, and multi-channel social media publishing.

## Features

- **Photo Management:**
  - Connect to Dropbox, Google Drive, OneDrive via OAuth2
  - Sort photos into "Good," "Change," or "Delete" with automatic subfolder creation
  - Real-time updates and role-based access (view, edit, comment)

- **AI Integration:**
  - On-demand image captioning using BLIP-2
  - Content generation (titles, captions, hashtags) using GPT-4 Turbo with fallback options

- **Social Media Publishing:**
  - Multi-platform posting (Instagram, Twitter, Facebook) with compliance to API limits
  - Archiving of published content

- **Collaboration & Real-Time Features:**
  - WebSocket-based real-time notifications for sorting, commenting, and updates

## Tech Stack

- **Frontend:** React, HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express
- **Real-Time:** Socket.io with Redis
- **Database:** MongoDB
- **Cloud Integration:** OAuth2 for Dropbox, Google Drive, OneDrive
- **AI Services:** BLIP-2 (for image captioning), GPT-4 Turbo (for text generation)
- **Social APIs:** Instagram Graph API, Twitter API v2, Facebook Graph API
- **Deployment:** Heroku (initial), with alternatives such as Fly.io, Railway

## Documentation

### Getting Started

- [Prerequisites Overview](docs/prerequisites.md)
  - [Node.js Installation Guide](docs/prerequisites/nodejs.md)
  - [MongoDB Installation Guide](docs/prerequisites/mongodb.md)
  - [Redis Installation Guide](docs/prerequisites/redis.md)
- [Getting Started Guide](docs/getting-started.md)
- [API Documentation](docs/API.md)
- [Development Plan](docs/DEVELOPMENT_PLAN.md)

### Prerequisites

Before you begin, make sure you have installed:

- **Node.js** (v14 or higher) - [Installation Guide](docs/prerequisites/nodejs.md)
- **MongoDB** (local or Atlas) - [Installation Guide](docs/prerequisites/mongodb.md)
- **Redis** (for real-time features) - [Installation Guide](docs/prerequisites/redis.md)

### Quick Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/solaius/PhotoPilot.git
   cd PhotoPilot
   ```

2. Run the development setup script:
   ```bash
   chmod +x start-dev.sh
   ./start-dev.sh
   ```

   This will install dependencies and start both the backend and frontend servers.

3. Open your browser and navigate to `http://localhost:59638`

For detailed installation instructions, see the [Getting Started Guide](docs/getting-started.md).

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

## Development Mode Features

For easier development, PhotoPilot includes:

- **Authentication Bypass:** Set `BYPASS_AUTH=true` in backend `.env` and `REACT_APP_BYPASS_AUTH=true` in frontend `.env`
- **Mock Database:** Set `MOCK_DB=true` in backend `.env` and `REACT_APP_USE_MOCK_DATA=true` in frontend `.env`

These features allow you to run the application without setting up OAuth providers or a database.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
