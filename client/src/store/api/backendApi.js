// Imports
import axios from "axios";

// Set base url
const isProduction = process.env.NODE_ENV === 'production';
export const baseUrl = isProduction ? "TODO: PRODUCTION DOMAIN NAME" : 'http://localhost:8000';

// Private api
const backendAPI = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Exports
export default backendAPI;