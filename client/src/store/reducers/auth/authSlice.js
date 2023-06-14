import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  accessToken: null,
  refreshToken: null,
  loggedInUser: null,
  status: 'idle', // 'idle' | 'loading' | 'success' | 'failed'
  errors: null
}

export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    return await authService.register(data);
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    return thunkAPI.rejectWithValue(errors);
  }
})

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    return await authService.login(data);
  } catch (error) {
    console.log(error);
    const errors = error.response.data;
    return thunkAPI.rejectWithValue(errors);
  }
})

export const refreshAccessToken = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const { refreshToken } = thunkAPI.getState();
  return await authService.refreshToken(refreshToken);
})

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  const { accessToken } = thunkAPI.getState();
  return await authService.logout(accessToken);
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(register.rejected, (state, action) => {
      state.status = 'failed'
      state.errors = action.payload
    })
    builder.addCase(register.fulfilled, (state, action) => {
      const {accessToken, refreshToken, userData} = action.payload
      state.accessToken = accessToken
      state.refreshToken = refreshToken
      state.status = 'success'
      state.loggedInUser = userData
      state.errors = null
    })
    builder.addCase(login.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(login.rejected, (state, action) => {
      state.status = 'failed'
      state.errors = action.payload
    })
    builder.addCase(login.fulfilled, (state, action) => {
      const {accessToken, refreshToken, userData} = action.payload
      state.accessToken = accessToken
      state.refreshToken = refreshToken
      state.loggedInUser = userData
      state.status = 'success'
      state.errors = null
    })
    builder.addCase(logout.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.loggedInUser = null
      state.status = 'idle'
      state.errors = null
    })
    builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
      state.token = action.payload
    })
    builder.addCase(refreshAccessToken.rejected, (state) => {
      state.token = null
    })
  }
});

export const selectAccessToken = (state) => state.auth.accessToken;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectStatus = (state) => state.auth.status;
export const selectErrors = (state) => state.auth.errors;

export const { updateAccessToken } = authSlice.actions;

export default authSlice.reducer;