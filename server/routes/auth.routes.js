const express = require('express');

const {
  handleLogin,
  handleRefresh,
  handleLogout
} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', handleLogin)
router.get('/refresh', handleRefresh)
router.post('/logout', handleLogout)

module.exports = { 
  authRouter: router
};