const {
  createUser,
  getUserByEmail,
  getAllUsers
} = require('../services/user.service');

const {
  generateAccessToken,
  generateRefreshToken,
} = require('../util/jwt.config');

const handleRegisterUser = async (req, res) => {
  console.log("Controller: handleRegisterUser");
  try {
    const userWithSameEmail = await getUserByEmail(req.body.email);
    console.log(userWithSameEmail);
    if (userWithSameEmail) {
      return res.status(400).json({ email: { message: "Email already registered."}});
    }

    const newUser = await createUser(req.body);

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
    return res.status(400).json(error);
  }
}

const handleGetAllUsers = async (req, res) => {
  console.log("Controller: handleGetAllUsers");
  try {
    const allUsers = await getAllUsers();
    res.json(allUsers);
  } catch (error) {
    return res.status(400).json(error);
  }
}

module.exports = {
  handleRegisterUser,
  handleGetAllUsers,
}