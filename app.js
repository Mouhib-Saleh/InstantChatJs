const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const Message = require('./models/message');

require('dotenv').config();

const app = express();
app.use(cors());

// Connect to MongoDB
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error.message);
  });



// Initialize socket.io
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Listen for new connections
io.on('connection', (socket) => {
  console.log('New client connected');

  // Listen for new messages
  socket.on('new-message', (data) => {
    console.log('New message:', data);
  io.emit('new-message', data);
    // Save message to database
    const message = new Message(data);
    message.save().then(() => {
        console.log('message saved!');
      })
      .catch((error) => {
        console.error('Error saving message:', error);
      });
  });

  // Listen for disconnections
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use(express.static(__dirname+'/public')); 
app.get("/",(req,res,next)=>{
    res.sendFile(__dirname + "/index.html");
});

module.exports = server;