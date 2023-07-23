// Configure environment variables
require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}`});

// Imports
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { connectDB } = require('./config/mongoose.config');
const helmet = require('helmet');

// Instantiate server
const app = express();

// Import Services Routers
const { userRouter } = require('./routes/user.routes');
const { authRouter } = require('./routes/auth.routes');
const { musicRouter } = require('./routes/music.routes');
const { reviewRouter } = require('./routes/review.routes');

// Configure port
const port = process.env.SERVER_PORT;

// Configure origin
const origins = [
  'http://localhost:3000', // development
  'https://note-d-server-git-stage-emilio-fv.vercel.app/', // stage
  'https://note-d.onrender.com' // production
];

// Middleware
app.use(helmet());
app.use(cors({ 
  origin: function(origin, callback) {
    console.log(origin);
    if (!origin || origins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'))
    }
  },
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  methods: ['POST', 'PUT', 'GET'],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ 
  extended: false 
}));

// API endpoints
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/music', musicRouter);
app.use('/review', reviewRouter);

// Establish MongoDB connection
connectDB();

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
})

mongoose.connection.on('error', err => {
  console.log(err);
})

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})

// Test server
app.get('/', (req, res) => {
  res.send('Welcome to the Note-d backend server!')
})

// Exports
module.exports = app;