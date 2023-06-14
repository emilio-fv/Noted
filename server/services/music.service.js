const axios = require('axios');

const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
  },
  json: true
}

const requestAccessToken = async () => {
  console.log("Service: requestAccessToken");
  const response = await axios.post('https://accounts.spotify.com/api/token', 
    {
      'grant_type': 'client_credentials'
    }, {
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
  return response.data;
}

module.exports = {
  requestAccessToken
};