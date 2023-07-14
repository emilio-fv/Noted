// Imports
import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout, refreshAccessToken } from "./authService";

const initialState = {
  tokenExpiration: null,
  isLoggedIn: false,
  loggedInUser: null,
  status: 'idle', // 'idle' | 'loading' | 'success' | 'failed'
  errors: null
}

// Auth slice
export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload
      })
      .addCase(register.fulfilled, (state, action) => {
        const { loggedInUser, tokenExpiration } = action.payload
        state.tokenExpiration = tokenExpiration
        state.isLoggedIn = true
        state.loggedInUser = loggedInUser
        state.status = 'success'
        state.errors = null
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload
      })
      .addCase(login.fulfilled, (state, action) => {
        const { loggedInUser, tokenExpiration } = action.payload
        state.tokenExpiration = tokenExpiration
        state.isLoggedIn = true
        state.loggedInUser = loggedInUser
        state.status = 'success'
        state.errors = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.tokenExpiration = null
        state.isLoggedIn = false
        state.loggedInUser = null
        state.status = 'idle'
        state.errors = null
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        const { tokenExpiration } = action.payload
        state.tokenExpiration = tokenExpiration
      })
  }
});

// Actions
export const { updateAccessToken } = authSlice.actions;

// Reducer
export default authSlice.reducer;