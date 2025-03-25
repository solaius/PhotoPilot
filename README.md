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

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Redis (for real-time features)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/solaius/PhotoPilot.git
   cd PhotoPilot
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the backend directory based on the provided `.env.example`
   - Add your MongoDB URI, JWT secret, and OAuth credentials

5. Start the development servers:
   - Backend:
     ```bash
     cd backend
     npm run dev
     ```
   - Frontend:
     ```bash
     cd frontend
     npm start
     ```

6. Open your browser and navigate to `http://localhost:3000`

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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
