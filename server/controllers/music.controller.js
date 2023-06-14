const {
  requestAccessToken
} = require('../services/music.service.js');

const handleRequestAccessToken = async (req, res) => {
  console.log("Controller: handleRequestAccessToken");
  try {
    const response = await requestAccessToken();
    return res.json(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleRequestAccessToken
}