// Imports
const express = require('express');
const {  verifyAccessToken } = require('../middleware/verifyAccessToken');
const { handleGetAllUsers } = require('../controllers/user.controller');

// Instantiate router
const router = express.Router();

// API Endpoints
router.get('/all', verifyAccessToken, handleGetAllUsers);

// Exports
module.exports = { 
  userRouter: router 
};