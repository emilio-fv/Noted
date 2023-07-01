// Imports
import axios from "axios";
import baseUrl from "./baseAPI";

import { refreshAccessToken } from "../middleware/refreshAccessToken";

// Retrieve access token from store
const accessToken = store.getState().auth.accessToken;

// Axios instance for public API endpoints
export const publicAuthAPI = axios.create({
  baseURL: baseUrl + '/auth'
});

// Axios instance for private API endpoints
export const privateAuthAPI = axios.create({
  baseURL: baseUrl = '/auth',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }
})

// Refresh access token middleware
privateAuthAPI.interceptors.response.use(
  response => response, 
  refreshAccessToken
);