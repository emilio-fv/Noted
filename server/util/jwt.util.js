// Imports
const jwt = require('jsonwebtoken');

const generateAccessToken = (payload) => {
  // Sign access token
  const accessToken = jwt.sign(
    payload,
    process.env.ACCESS_SECRET_KEY, 
    { 
      expiresIn: process.env.ACCESS_EXPIRATION
    }
  );

  // Return access token
  return accessToken;
};

const generateRefreshToken = (payload) => {
  // Sign refresh token
  const refreshToken = jwt.sign(
    payload, 
    process.env.REFRESH_SECRET_KEY, 
    { 
      expiresIn: process.env.REFRESH_EXPIRATION
    }
  );

  // Return refresh token
  return refreshToken;
}

// Exports
module.exports = {
  generateAccessToken,
  generateRefreshToken,
};