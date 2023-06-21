import authAPI from '../../api/authApi';

const register = async (data) => {
  const response = await authAPI.post('/register', data, { withCredentials: true });
  return response.data;
}

const login = async (data) => {
  const response = await authAPI.post('/login', data, { withCredentials: true });
  return response.data;
}

const refreshToken = async (accessToken) => {
  const response = await authAPI.get('/refresh', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  }, { withCredentials: true });
  return response.data;
}

const logout = async (accessToken) => {
  const response = await authAPI.post('/logout', {
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