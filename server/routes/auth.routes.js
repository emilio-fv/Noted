// Imports
const express = require('express');
const {
  handleRegister,
  handleLogin,
  handleRefresh,
  handleLogout
} = require('../controllers/auth.controller');

// Instantiate router
const router = express.Router();

// API Endpoints
router.post('/register', handleRegister); 
router.post('/login', handleLogin);
router.post('/logout', handleLogout);
router.get('/refresh', handleRefresh);

// Exports
module.exports = { 
  authRouter: router
};