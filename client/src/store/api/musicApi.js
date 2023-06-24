import axios from 'axios';
import baseUrl from "./baseAPI";

export const musicAPI = axios.create({
  baseURL: baseUrl + '/music',
});

export const spotifyAPI = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});