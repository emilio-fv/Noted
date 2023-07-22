// Imports
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../api/authApi";

// Configure initial state
const initialState = {
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
    resetErrors: (state) => {
      state.status = 'idle'
      state.errors = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.register.matchRejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
        const { loggedInUser } = action.payload
        state.isLoggedIn = true
        state.loggedInUser = loggedInUser
        state.status = 'success'
        state.errors = null
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        const { loggedInUser } = action.payload
        state.isLoggedIn = true
        state.loggedInUser = loggedInUser
        state.status = 'success'
        state.errors = null
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.isLoggedIn = false
        state.loggedInUser = null
        state.status = 'idle'
        state.errors = null
      })
  }
});

// Actions
export const { resetErrors} = authSlice.actions;

// Reducer
export default authSlice.reducer;