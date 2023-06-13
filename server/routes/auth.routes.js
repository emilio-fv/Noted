const express = require('express');

const {
  handleRegister,
  handleLogin,
  handleRefresh,
  handleLogout
} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', handleRegister);
router.post('/login', handleLogin)
router.get('/refresh', handleRefresh)
router.post('/logout', handleLogout)

module.exports = { 
  authRouter: router
};