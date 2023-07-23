import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

const isProduction = process.env.NODE_ENV === 'production';

export const baseUrl = isProduction ? "https://note-d-server.vercel.app" : 'http://localhost:8000';

// Auth Base Query
export const authBaseQuery = fetchBaseQuery({
  baseUrl: baseUrl + '/auth',
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set('Access-Control-Allow-Origin', '*');
  }
});

// Review Base Query
export const reviewBaseQuery = fetchBaseQuery({
  baseUrl: baseUrl + '/review',
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set('Access-Control-Allow-Origin', '*');
  }
});

// Music Base Query
export const musicBaseQuery = fetchBaseQuery({
  baseUrl: baseUrl + '/music',
  prepareHeaders: (headers) => {
    headers.set('Access-Control-Allow-Origin', '*');
    console.log(headers);
  }
});

// Spotify Base Query
export const spotifyBaseQuery = fetchBaseQuery({ 
  baseUrl: 'https://api.spotify.com/v1',
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = getState().music.accessToken;
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return headers;
  },
});