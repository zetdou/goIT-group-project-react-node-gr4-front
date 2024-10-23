import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  logIn,
  logOut,
  refreshUser,
  setAuthHeader,
} from './AuthOperations';

const initialState = {
  user: { email: null, balance: 0 },
  accessToken: null,
  refreshToken: null,
  sid: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        console.log('Dane zapisywane w stanie po rejestracji:', action.payload);
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sid = action.payload.sid;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        console.log('Dane zapisywane w stanie po logowaniu:', action.payload);
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.sid = action.payload.sid;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { email: null, balance: 0 };
        state.accessToken = null;
        state.refreshToken = null;
        state.sid = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        console.log(
          'Aktualizacja stanu po odświeżeniu tokena:',
          action.payload
        );
        state.user = action.payload.user;
        state.accessToken = action.payload.newAccessToken;
        state.refreshToken = action.payload.newRefreshToken;
        state.sid = action.payload.newSid;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        setAuthHeader(action.payload.newAccessToken);
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.sid = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
