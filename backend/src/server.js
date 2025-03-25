const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:59638', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: ['http://localhost:59638', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Database connection
const connectDB = async () => {
  try {
    // For development, we'll use a local MongoDB instance
    // In production, this would be MongoDB Atlas
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/photopilot');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    
    // In development mode, we can continue without a database
    if (process.env.NODE_ENV === 'development' && process.env.MOCK_DB === 'true') {
      console.log('⚠️ Running with mock database in development mode');
      return false;
    }
    
    // In production, exit the process
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    
    return false;
  }
};

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to PhotoPilot API' });
});

// Import routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/media', require('./routes/media'));

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to database
connectDB();

module.exports = { app, server, io };