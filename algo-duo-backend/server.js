require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/app');

const { initCombatSocket } = require('./src/socket/combatSocket.js');

const PORT = process.env.PORT || 5000;



// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Initialize combat socket handlers
initCombatSocket(io);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`⚔️ Combat Socket.IO ready`);
  console.log(`📚 Algo Duo Backend is ready for DSA learning!`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});