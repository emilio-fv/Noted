import { createAsyncThunk } from '@reduxjs/toolkit';
import backendAPI from '../../api/backendApi';

export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    const response = await backendAPI.post('/auth/register', data);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data.errors);
  }
});

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const response = await backendAPI.post('/auth/login', data);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data.errors);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  return await backendAPI.post('/auth/logout');
});

export const refreshAccessToken = createAsyncThunk('auth/refreshAccessToken', async () => {
  return await backendAPI.get('/auth/refresh');
})