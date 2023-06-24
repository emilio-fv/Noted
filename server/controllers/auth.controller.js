const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  createUser,
  getUserByEmail
} = require('../services/user.service');

const {
  generateAccessToken,
  generateRefreshToken,
} = require('../util/jwt.util');

const handleRegister = async (req, res) => {
  console.log("Controller: handleRegister");
  try {
    const userWithSameEmail = await getUserByEmail(req.body.email);
    console.log(userWithSameEmail);
    if (userWithSameEmail) {
      return res.status(400).json({ errors: { email: { message: "Email already registered."} }});
    }

    const newUser = await createUser(req.body);

    const accessToken = generateAccessToken({
      id: newUser._id,
      email: newUser.email,
    });

    const refreshToken = generateRefreshToken({
      id: newUser._id,
      email: newUser.email,
    });

    return res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 1000 * 60
      })
      .cookie("refreshToken", refreshToken, {
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
        },
        message: "worked!"
      });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const handleLogin = async (req, res) => {
  console.log("Controller: handleLogin");
  try {
    const foundUser = await getUserByEmail(req.body.email);

    if (!foundUser) {
      return res.status(400).json({ message: "Invalid login."});
    }

    const correctPassword = await bcrypt.compare(req.body.password, foundUser.password); 

    if (!correctPassword) {
      return res.status(400).json({ message: "Invalid login."});
    }

    const accessToken = generateAccessToken({
      id: foundUser._id,
      email: foundUser.email,
    });

    const refreshToken = generateRefreshToken({
      id: foundUser._id,
      email: foundUser.email,
    });

    return res.cookie("accessToken", accessToken, {
        httpOnly: true,
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 1000 * 60
      }).cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000
      }).json({ 
        accessToken: accessToken,
        refreshToken: refreshToken,
        userData: {
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          username: foundUser.username,
        }
      });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const handleRefresh = async (req, res) => {
  console.log("Controller: handleRefresh");
  const authHeader = req.headers.authorization || req.headers.Authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const refreshToken = authHeader.split(' ')[1];

  jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET_KEY, 
    async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Refresh token has expired. User must login again." });
      }

      const foundUser = await getUserByEmail(decoded.email);

      if (!foundUser) {
        return res.status(401).json({ message: "Unauthorized" })
      }
    }
  )

  const accessToken = generateAccessToken({
    id: foundUser._id,
    email: foundUser.email
  });

    return res.json({ accessToken })
};

const handleLogout = async (req, res) => {
  console.log("Controller: handleLogout");
  const { jwt } = req.cookies;
  if (!jwt) {
    return res.sendStatus(204);
  }

  return res.clearCookie('jwt', {
    httpOnly: true,
    secure: true, 
    sameSite: 'None'
  }).json({ message: "Cookie cleared" })
};

module.exports = {
  handleRegister,
  handleLogin,
  handleRefresh,
  handleLogout
};