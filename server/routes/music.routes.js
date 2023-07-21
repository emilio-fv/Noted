// Imports
const express = require('express');
const {
  handleRequestAccessToken
} = require('../controllers/music.controller');

// Instantiate router
const router = express.Router();

// API Endpoints
router.get('/requestAccessToken', handleRequestAccessToken);

// Exports
module.exports = {
  musicRouter: router
};