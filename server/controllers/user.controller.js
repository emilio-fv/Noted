// Imports
const {
  getAllUsers
} = require('../services/user.service');

const handleGetAllUsers = async (req, res) => {
  // Log controller method
  console.log("Controller: handleGetAllUsers");

  try {
    // Get all users from db
    const allUsers = await getAllUsers();
    
    // Return all users data
    return res.json({ allUsers });
  } catch (error) {
    console.log(error);
  }
};

// Exports
module.exports = {
  handleGetAllUsers,
};