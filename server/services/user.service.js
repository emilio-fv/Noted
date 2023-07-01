// Imports
const { User } = require('../models/user.model');

// Add new user to db
const createUser = async (data) => {
  const newUser = await User.create(data);
  return newUser;
};

// Query db for users by email
const getUserByEmail = async (data) => {
  const user = await User.findOne({ email: data });
  return user;
};

// Query db for all users
const getAllUsers = async () => {
  const allUsers = await User.find();
  return allUsers;
};

// Exports
module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers
};