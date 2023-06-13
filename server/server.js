const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/mongoose.config');
const { userRouter } = require('./routes/user.routes');
const { authRouter } = require('./routes/auth.routes');
const port = process.env.PORT || 8000;

require('dotenv').config();

connectDB();

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

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  })
})

mongoose.connection.on('error', err => {
  console.log(err);
})