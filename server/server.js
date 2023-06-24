// Configure Environment Variables
require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}`});

// Standard Imports
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/mongoose.config');

// Initialize Express Server
const app = express();

// Import Services Routers
const { userRouter } = require('./routes/user.routes');
const { authRouter } = require('./routes/auth.routes');
const { musicRouter } = require('./routes/music.routes');
const { reviewRouter } = require('./routes/review.routes');

// Configure Server
const port = process.env.SERVER_PORT;

// Middleware
app.use(cors({ 
  credentials: true,
  origin: 'http://localhost:3000', 
  optionsSuccessStatus: 200 
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Endpoints
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/music', musicRouter);
app.use('/review', reviewRouter);

// Database Connection
connectDB();

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
})

mongoose.connection.on('error', err => {
  console.log(err);
})

// Start Server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})
