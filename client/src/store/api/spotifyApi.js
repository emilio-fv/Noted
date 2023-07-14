// Imports
import axios from "axios";
import { refreshSpotifyToken } from "../middleware/refreshSpotifyToken";

// Spotify api
const spotifyAPI = axios.create({
  baseURL: 'https://api.spotify.com/v1'
});

// Middleware
spotifyAPI.interceptors.request.use(
  refreshSpotifyToken
)

// Exports
export default spotifyAPI;