const express = require('express');

const { verifyJWT } = require('../middleware/verifyJWT');
const {
  handleRegisterUser,
  handleGetAllUsers
} = require('../controllers/user.controller');

const router = express.Router();

router.post('/register', handleRegisterUser);
router.get('/all', verifyJWT, handleGetAllUsers);

module.exports = { 
  userRouter: router 
};