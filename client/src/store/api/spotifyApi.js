// Imports
import { createApi } from '@reduxjs/toolkit/query/react';
import { musicBaseQuery, spotifyBaseQuery } from './apiConfig';
import { musicApi } from './musicApi';

// Handle refreshing access token
const baseQueryWithReauth = async (args, api, extraOptions) => {
  // Initial API request
  let result = await spotifyBaseQuery(args, api, extraOptions);

  // Check for 401 errors
  if (result.error && result.error) {
    const response = await musicBaseQuery('/requestAccessToken', musicApi);

    if (response.data) {
      result = await spotifyBaseQuery(args, api, extraOptions);
    }
  }
  // Return response
  return result;
}

// Spotify API
export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Get new releases
    getNewReleases: builder.query({
      query: () => ({
        url: '/browse/new-releases',
        params: {
          limit: 5,
          country: 'US'
        }
      }),
      transformResponse: (response, meta, arg) => {
        console.log(response);
        return response
      }
    }),
    // Search Spotify database
    searchSpotify: builder.query({
      query: (query) => ({
        url: '/search',
        params: {
          q: query,
          type: 'album,artist,track',
          limit: 5,
          offset: 0
        }
      })
    }),
    // Get artist
    getArtist: builder.query({
      query: (artistId) => ({
        url: `/artists/${artistId}`
      })
    }),
    // Get album
    getAlbum: builder.query({
      query: (albumId) => ({
        url: `/albums/${albumId}`
      })
    }),
    // Get album tracks
    getAlbumTracks: builder.query({
      query: (albumId) => ({ 
        url: `/albums/${albumId}/tracks`
      })
    }),
    // Get artist's discography
    getArtistsAlbums: builder.query({
      query: (artistId) => {
        return {
          url: `/artists/${artistId}/albums`,
          params: {
            include_groups: 'album'
          }
        }
      }
    })
  })
})

export const { 
  useGetNewReleasesQuery,
  useSearchSpotifyQuery, 
  useGetAlbumQuery,
  useGetArtistQuery,
  useGetAlbumTracksQuery, 
  useGetArtistsAlbumsQuery 
} = spotifyApi;