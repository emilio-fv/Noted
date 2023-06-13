const {
  getAllUsers
} = require('../services/user.service');

const handleGetAllUsers = async (req, res) => {
  console.log("Controller: handleGetAllUsers");
  try {
    const allUsers = await getAllUsers();
    return res.json({ allUsers });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleGetAllUsers,
};