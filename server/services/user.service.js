const { User } = require('../models/user.model');

const createUser = async (data) => {
  const newUser = await User.create(data);
  return newUser;
};

const getUserByEmail = async (data) => {
  const user = await User.findOne({ email: data });
  return user;
};

const getAllUsers = async () => {
  const allUsers = await User.find();
  return allUsers;
};

// Update User
// Delete User

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers
};