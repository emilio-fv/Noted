// Imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../services/user.service');
const { generateAccessToken, generateRefreshToken } = require('../util/jwt.util');

const handleRegister = async (req, res) => {
  // Log controller method
  console.log('Controller: handleRegister');

  try {
    // Check if email already registered
    const userWithSameEmail = await getUserByEmail(req.body.email);

    // Handle if email already registered
    if (userWithSameEmail) {
      return res.status(400).json({ errors: { email: { message: 'Email already registered.'} }});
    }

    // Create user and add to db
    const newUser = await createUser(req.body);

    // Generate access token
    const accessToken = generateAccessToken({
      id: newUser._id,
      email: newUser.email,
    });

    // Generate refresh token
    const refreshToken = generateRefreshToken({
      id: newUser._id,
      email: newUser.email,
    });

    // Attach tokens to cookies and user data to response object
    return res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 1000 * 60
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000
      }).json({ 
        accessToken: accessToken,
        refreshToken: refreshToken,
        userData: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          username: newUser.username,
        }
      });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const handleLogin = async (req, res) => {
  // Log controller method
  console.log('Controller: handleLogin');

  try {
    // Check if email registered
    const foundUser = await getUserByEmail(req.body.email);

    // Handle no user found
    if (!foundUser) {
      return res.status(400).json({ message: 'Invalid login.'});
    }

    // Compare hashed passwords
    const correctPassword = await bcrypt.compare(req.body.password, foundUser.password); 

    // Handle incorrect password
    if (!correctPassword) {
      return res.status(400).json({ message: 'Invalid login.'});
    }

    // Generate access token
    const accessToken = generateAccessToken({
      id: foundUser._id,
      email: foundUser.email,
    });

    // Generate refresh token
    const refreshToken = generateRefreshToken({
      id: foundUser._id,
      email: foundUser.email,
    });

    // Attach tokens to cookies and user data to response object
    return res.cookie('accessToken', accessToken, {
        httpOnly: true,
        httpOnly: true,
        secure: true,
        sameSite: 'None'
      }).cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
      }).json({
        // TODO: only pass tokens through cookies
        accessToken: accessToken,
        refreshToken: refreshToken,
        userData: {
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          username: foundUser.username,
        }
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

const handleRefresh = async (req, res) => {
  // Log controller method
  console.log('Controller: handleRefresh');

  try {
    // Extract authorization header
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Handle missing authorization header
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    // Extract refresh token 
    const refreshToken = authHeader.split(' ')[1];

    // Verify refresh token
    jwt.verify(
      refreshToken, 
      process.env.REFRESH_SECRET_KEY,
      async (err, decoded) => {
        // Handle expired refresh token
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'ExpiredRefreshToken' });
        }

        // Generate new access token
        const newAccessToken = generateAccessToken(decoded);

        // Attach token to cookie
        return res.cookie('accessToken', newAccessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'None'
        });
      }
    )
  } catch (error) {
    res.status(400).json(error);
  }
};


const handleLogout = async (req, res) => {
  // Log controller method
  console.log('Controller: handleLogout');

  // Extract access token
  const { accessToken } = req.cookies;

  // Clear cookies
  return res.clearCookie('accessToken', {
    httpOnly: true,
    secure: true, 
    sameSite: 'None'
  }).clearCookie('refreshToken', {    
    httpOnly: true,
    secure: true, 
    sameSite: 'None'
  })
  .json({ message: 'Cookie cleared' })
};

// Exports
module.exports = {
  handleRegister,
  handleLogin,
  handleRefresh,
  handleLogout
};