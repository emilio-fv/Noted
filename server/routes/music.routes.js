const express = require('express');
const {
  handleRequestAccessToken
} = require('../controllers/music.controller');

const router = express.Router();

router.get('/requestAccessToken', handleRequestAccessToken);

module.exports = {
  musicRouter: router
};