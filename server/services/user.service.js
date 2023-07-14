// Imports
const { User } = require('../models/user.model');

const createUser = async (data) => {
  // Add new user to db
  const newUser = await User.create(data);

  // Return new user
  return newUser;
};

const getUserByEmail = async (data) => {
  // Query db for users by email
  const user = await User.findOne({ email: data });

  // Return found user
  return user;
};

const getAllUsers = async () => {
  // Query db for all users
  const allUsers = await User.find();

  // Return all found users
  return allUsers;
};

// Exports
module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers
};