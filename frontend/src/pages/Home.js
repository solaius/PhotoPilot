import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>Welcome to PhotoPilot</h1>
        <p>
          Streamline your photography workflow with multi-cloud storage, AI-powered image analysis,
          and multi-channel social media publishing.
        </p>
        <div className="cta-buttons">
          <Link to="/register" className="btn btn-primary">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        </div>
      </div>

      <div className="features">
        <div className="feature">
          <h2>Photo Management</h2>
          <p>
            Connect to Dropbox, Google Drive, and OneDrive. Sort photos into "Good," "Change," or
            "Delete" with automatic subfolder creation.
          </p>
        </div>
        <div className="feature">
          <h2>AI Integration</h2>
          <p>
            On-demand image captioning using BLIP-2. Generate titles, captions, and hashtags using
            GPT-4 Turbo.
          </p>
        </div>
        <div className="feature">
          <h2>Social Media Publishing</h2>
          <p>
            Multi-platform posting to Instagram, Twitter, and Facebook with compliance to API limits.
            Archive published content automatically.
          </p>
        </div>
        <div className="feature">
          <h2>Real-Time Collaboration</h2>
          <p>
            WebSocket-based real-time notifications for sorting, commenting, and updates. Role-based
            access control for team collaboration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;