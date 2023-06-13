import axios from 'axios';
const API_URL = 'http://localhost:8000/auth/';

const register = async (data) => {
  const response = await axios.post(API_URL + 'register', data, { withCredentials: true });
  return response.data;
}

const login = async (data) => {
  const response = await axios.post(API_URL + 'login', data, { withCredentials: true });
  return response.data;
}

const refreshToken = async (accessToken) => {
  const response = await axios.get('refresh', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  }, { withCredentials: true });
  return response.data;
}

const logout = async (accessToken) => {
  const response = await axios.post(API_URL + 'logout', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  }, { withCredentials: true });
  return response.data;
}

const authService = {
  register,
  login,
  refreshToken,
  logout
};

export default authService;