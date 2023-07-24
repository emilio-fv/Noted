// Imports
import { createApi } from '@reduxjs/toolkit/query/react';
import { musicBaseQuery } from './apiConfig';

export const musicApi = createApi({
  reducerPath: 'musicApi',
  baseQuery: musicBaseQuery,
  endpoints: (builder) => ({
    // Request Spotify API access token
    requestSpotifyToken: builder.query({
      query: () => '/requestAccessToken',
      transformResponse: (response, meta, arg) => {
        console.log(response);
        return response
      }
    })
  })
})

export const { useRequestSpotifyTokenQuery } = musicApi;