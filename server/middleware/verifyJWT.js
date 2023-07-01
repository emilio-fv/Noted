const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../util/jwt.util');

const verifyJWT = (req, res, next) => {
  try {
    // Extract authorization header
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Handle invalid header
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Unauthorized' })
    }
  
    // Extract access token from header
    const accessToken = authHeader.split(' ')[1]
    
    // Verify access token
    const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);

    // Handle expired access token 
    if (decodedAccessToken.exp <= Date.now() / 1000) {
      // Extract refresh token
      const { refreshToken } = req.cookies;

      // Verify refresh token
      jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, decoded) {
        // TODO: Handle expired refresh token
        // TODO: Generate new access token
        // TODO; Update request header
      })

    } else {
      req.decoded = decodedAccessToken;
      next();
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { verifyJWT };