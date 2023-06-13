const express = require('express');

const { 
  verifyJWT
} = require('../middleware/verifyJWT');
const {
  handleGetAllUsers
} = require('../controllers/user.controller');

const router = express.Router();

router.get('/all', verifyJWT, handleGetAllUsers);

module.exports = { 
  userRouter: router 
};