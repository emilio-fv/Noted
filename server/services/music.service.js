// Imports
const axios = require('axios');

const requestAccessToken = async () => {
  // Configure authorization header value
  const authorizationValue = 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'));
  // Request access token from Spotify API
  const response = await axios.post('https://accounts.spotify.com/api/token', 
    { 'grant_type': 'client_credentials' }, 
    {
      headers: {
        'Authorization': authorizationValue,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
  // Return access token
  return response.data;
};

module.exports = {
  requestAccessToken
};