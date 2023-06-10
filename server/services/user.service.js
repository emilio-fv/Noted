const { User } = require('../models/user.model');

const createUser = async (data) => {
  console.log("Service: createUser");
  const newUser = await User.create(data);
  return newUser;
};

const getUserByEmail = async (data) => {
  console.log("Service: getUserByEmail");
  const user = await User.findOne({ email: data });
  return user;
};

const getAllUsers = async () => {
  console.log("Service: getAllUsers");
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