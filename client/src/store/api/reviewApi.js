// Imports
import { createApi } from '@reduxjs/toolkit/query/react';
import { authBaseQuery, reviewBaseQuery } from './apiConfig';
import { authApi } from './authApi';

// Handle refreshing access token
const baseQueryWithReauth = async (args, api, extraOptions) => {
  // Initial API request
  let result = await reviewBaseQuery(args, api, extraOptions);

  // Check for 401 errors
  if (result.error && result.error.status === 401) {
    console.log('Expired access token');
    // Refresh access token
    const response = await authBaseQuery('/refresh', authApi);
    if (response.data) {
      result = await reviewBaseQuery(args, api, extraOptions);
      console.log(result);
    } else {
      // Logout
      return await authBaseQuery('/logout', authApi);
    }
  } else {
    result = await reviewBaseQuery(args, api, extraOptions);
  }
  // Return response
  return result;
}

// Review API
export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Create Review
    createReview: builder.mutation({
      query: (data) => ({
        url: '/create',
        method: 'POST',
        body: data,
        credentials: "include"
      }),
      transformErrorResponse: (response, meta, arg) => {
        console.log(response);
        return response;
      }
    }),
    // Get Logged In User's Reviews
    getLoggedInUsersReviews: builder.query({
      query: () => ({
        url: '/loggedInUser',
        credentials: "include"
      })
    }),
    // Get Reviews By Other Users
    getReviewsByOtherUsers: builder.query({
      query: () => ({
        url: '/allOthers',
        credentials: "include"
      })
    }),
    // Get Reviews By Albums
    getReviewsByAlbum: builder.query({
      query: (albumId) => ({
        url: `/${albumId}/album`,
        credentials: "include"
      })
    }),
    // Get Reviews By Artist
    getReviewsByArtist: builder.query({
      query: (artistId) => ({
        url: `/${artistId}/artist`,
        credentials: "include"
      })
    })
  })
});

export const { 
  useCreateReviewMutation,
  useGetLoggedInUsersReviewsQuery, 
  useGetReviewsByAlbumQuery, 
  useGetReviewsByArtistQuery, 
  useGetReviewsByOtherUsersQuery 
} = reviewApi;