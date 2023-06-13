const jwt = require('jsonwebtoken');

const generateAccessToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.ACCESS_SECRET_KEY, 
    { 
      expiresIn: process.env.ACCESS_EXPIRATION 
    }
  )
};

const generateRefreshToken = (payload) => {
  return jwt.sign(
    payload, 
    process.env.REFRESH_SECRET_KEY, 
    { 
      expiresIn: process.env.REFRESH_EXPIRATION 
    }
  )
}

const verifyToken = (token, secretKey) => {
  return jwt.verify(token, secretKey)
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};