import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

const isProduction = process.env.NODE_ENV === 'production';

export const baseUrl = isProduction ? "TODO: PRODUCTION DOMAIN NAME" : 'http://localhost:8000';

// Auth Base Query
export const authBaseQuery = fetchBaseQuery({
  baseUrl: baseUrl + '/auth',
  credentials: 'include'
});

// Review Base Query
export const reviewBaseQuery = fetchBaseQuery({
  baseUrl: baseUrl + '/review',
  credentials: 'include'
});

// Music Base Query
export const musicBaseQuery = fetchBaseQuery({
  baseUrl: baseUrl + '/music'
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