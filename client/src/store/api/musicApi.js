import axios from 'axios';

export const musicAPI = axios.create({
  baseURL: 'http://localhost:8000/music',
});

export const spotifyAPI = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});