import axios from '../Tools/axiosConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const setAuthHeader = accessToken => {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/auth/register', credentials);
      setAuthHeader(res.data.accessToken);
      console.log('Odpowiedź z serwera po rejestracji:', res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      console.log('credentials:', credentials);
      const res = await axios.post('/auth/login', credentials);
      setAuthHeader(res.data.accessToken);
      console.log('Odpowiedź z serwera po logowaniu:', res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/auth/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedRefreshToken = state.auth.refreshToken;
    const persistedSid = state.auth.sid;

    if (persistedRefreshToken === null || persistedSid === null) {
      return thunkAPI.rejectWithValue('Brak tokena odświeżania lub sid');
    }

    try {
      const response = await axios.post(
        '/auth/refresh',
        { sid: persistedSid },
        {
          headers: {
            Authorization: `Bearer ${persistedRefreshToken}`,
          },
        }
      );

      console.log('Odpowiedź z serwera po odświeżeniu tokena:', response.data);

      // Pobierz dane użytkownika po odświeżeniu tokena
      const userResponse = await axios.get('/user', {
        headers: {
          Authorization: `Bearer ${response.data.newAccessToken}`,
        },
      });

      console.log('Dane użytkownika po odświeżeniu:', userResponse.data);

      return {
        ...response.data,
        user: userResponse.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateBalance = createAsyncThunk(
  'auth/updateBalance',
  async (balanceValue, thunkAPI) => {
    try {
      const res = await axios.patch('/user/balance', {
        balance: balanceValue,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
