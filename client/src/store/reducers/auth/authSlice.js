// Imports
import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout } from "./authService";

// Set initial state
const initialState = {
  accessToken: null,
  refreshToken: null,
  loggedInUser: null,
  status: 'idle', // 'idle' | 'loading' | 'success' | 'failed'
  errors: null
}

// Create auth slice
export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload
    }
  },
  extraReducers: (builder) => {
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
    builder.addCase(logout.fulfilled, (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.loggedInUser = null
      state.status = 'idle'
      state.errors = null
    })
  }
});

export const selectAccessToken = (state) => state.auth.accessToken;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectStatus = (state) => state.auth.status;
export const selectErrors = (state) => state.auth.errors;

export const { updateAccessToken } = authSlice.actions;

export default authSlice.reducer;