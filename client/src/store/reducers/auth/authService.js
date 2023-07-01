import { createAsyncThunk } from '@reduxjs/toolkit';
import { publicAuthAPI, privateAuthAPI } from '../../api/authApi';

export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    const response = await publicAuthAPI.post('/register', data, { withCredentials: true });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errors);
  }
})

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const response = await publicAuthAPI.post('/login', data, { withCredentials: true });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errors);
  }
})

export const logout = createAsyncThunk('auth/logout', async (data, thunkAPI) => {
  return await privateAuthAPI.post('/logout', null, {
    withCredentials: true
  });
})

const authService = {
  register,
  login,
  logout
};

export default authService;