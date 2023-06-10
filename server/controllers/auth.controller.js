const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  getUserByEmail
} = require('../services/user.service');

const {
  generateAccessToken,
  generateRefreshToken,
} = require('../util/jwt.config');

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
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      username: foundUser.username,
      email: foundUser.email,
    });

    const refreshToken = generateRefreshToken({
      id: foundUser._id,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      username: foundUser.username,
      email: foundUser.email,
    });

    return res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000
      }).json({ accessToken });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const handleRefresh = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({ message: "Unauthorized"});
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET_KEY, 
    async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" })
      }

      const foundUser = await getUserByEmail(decoded.email);

      if (!foundUser) {
        return res.status(401).json({ message: "Unauthorized" })
      }

      const accessToken = generateAccessToken(foundUser);
      return res.json({ accessToken })
    }
  )
}

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }

  return res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  })
  res.json({ message: "Cookie cleared" })
}

module.exports = {
  handleLogin,
  handleRefresh,
  handleLogout
};