// Imports
const {
  requestAccessToken
} = require('../services/music.service.js');

const handleRequestAccessToken = async (req, res) => {
  // Log controller method
  console.log("Controller: handleRequestAccessToken .");

  try {
    // Request access token from Spotify API
    const response = await requestAccessToken();

    // Extract access token, token type, and expiration date
    const { access_token, token_type, expires_in } = response;

    const expiration = Date.now() + expires_in;

    console.log("test");
    console.log(response);
    // Return access token
    return res.json({
      accessToken: access_token,
      tokenType: token_type,
      expiresIn: expires_in,
      expiration: expiration
    });
  } catch (error) {
    console.log(error);
  }
};

// Exports
module.exports = {
  handleRequestAccessToken
}