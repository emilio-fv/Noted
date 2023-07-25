// Imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../services/user.service');
const { generateAccessToken, generateRefreshToken } = require('../util/jwt.util');

// Register
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
      userId: newUser._id,
      email: newUser.email,
    });

    // Generate refresh token
    const refreshToken = generateRefreshToken({
      userId: newUser._id,
      email: newUser.email,
    });

    // Attach tokens to cookies and user data to response object
    return res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      }).json({ 
        loggedInUser: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          username: newUser.username,
        }
      });
  } catch (error) {
    return res.status(400).json(error);
  }
};

// Login
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
      userId: foundUser._id,
      email: foundUser.email,
    });

    // Generate refresh token
    const refreshToken = generateRefreshToken({
      userId: foundUser._id,
      email: foundUser.email,
    });

    // TESTING
    console.log(accessToken, refreshToken);

    // Attach tokens to cookies and user data to response object
    return res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
      }).cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
      }).json({
        loggedInUser: {
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          username: foundUser.username,
        }
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

// Logout
const handleLogout = async (req, res) => {
  // Log controller method
  console.log('Controller: handleLogout');

  // Clear cookies
  return res.clearCookie('accessToken').clearCookie('refreshToken').json({ message: 'Logged out' });
};

// Refresh Access Token
const handleRefresh = async (req, res) => {
  // Log controller method
  console.log('Controller: handleRefresh');

  // Extract refresh token
  const { refreshToken } = req.cookies;

  try {    
    // Verify refresh token
    jwt.verify(
      refreshToken, 
      process.env.REFRESH_SECRET_KEY,
      (error, decoded) => {
        // Handle expired refresh token
        if (error?.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'ExpiredRefreshToken' });
        } else {
          // Generate new access token
          const newAccessToken = generateAccessToken({
            ...decoded
          });
  
          // Attach token to cookie
          return res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
          }).json({
            message: "Token refreshed"
          })
        }
      }
    )
  } catch (error) {
    console.log(error);
  }
};

// Exports
module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
  handleRefresh
};