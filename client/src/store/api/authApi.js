// Imports
import { createApi } from '@reduxjs/toolkit/query/react';
import { authBaseQuery } from './apiConfig';

// Auth API
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    // Register user
    register: builder.mutation({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data,
        credentials: "include"
      }),
      transformErrorResponse: (response, meta, arg) => {
        return response.data.errors;
      }
    }),
    // Login user
    login: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
        credentials: "include"
      }),
      transformErrorResponse: (response, meta, arg) => {
        return response.data;
      }
    }),
    // Logout user
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
        credentials: "include"
      })
    }),
    // Refresh access token
    refreshAccessToken: builder.query({
      query: () => ({
        url: '/refresh',
        method: 'GET',
        credentials: "include"
      })
    })
  })
});

export const { 
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshAccessTokenQuery
} = authApi;