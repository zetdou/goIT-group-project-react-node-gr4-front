import axios from '../Tools/axiosConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';

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
      Notiflix.Notify.success('Rejestracja zakończona sukcesem!');
      return res.data;
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            Notiflix.Notify.warning(
              'Błędny format hasła. Hasło musi zawierać 8 znaków, co najmniej jedną dużą literę i jedną cyfrę.'
            );
            break;
          case 409:
            Notiflix.Notify.warning(
              'Ten adres email jest już zarejestrowany. Proszę użyć innego adresu email.'
            );
            break;
          default:
            Notiflix.Notify.failure('Błąd rejestracji: ' + error.message);
        }
      } else if (error.request) {
        Notiflix.Notify.failure(
          'Brak odpowiedzi z serwera. Sprawdź swoje połączenie internetowe.'
        );
      } else {
        Notiflix.Notify.failure('Błąd rejestracji: ' + error.message);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/auth/login', credentials);
      setAuthHeader(res.data.accessToken);
      Notiflix.Notify.success('Logowanie zakończone sukcesem!');
      return res.data;
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            Notiflix.Notify.warning(
              'Podany email nie istnieje w bazie danych. Proszę się zarejestrować lub sprawdzić poprawność adresu email.'
            );
            break;
          case 403:
            Notiflix.Notify.warning(
              'Błędny email lub hasło. Proszę spróbować ponownie.'
            );
            break;
          default:
            Notiflix.Notify.failure('Błąd logowania: ' + error.message);
        }
      } else if (error.request) {
        Notiflix.Notify.failure(
          'Brak odpowiedzi z serwera. Sprawdź swoje połączenie internetowe.'
        );
      } else {
        Notiflix.Notify.failure('Błąd logowania: ' + error.message);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/auth/logout');
    clearAuthHeader();
    Notiflix.Notify.success('Wylogowano pomyślnie!');
  } catch (error) {
    Notiflix.Notify.failure('Błąd wylogowania: ' + error.message);
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

      // Pobierz dane użytkownika po odświeżeniu tokena
      const userResponse = await axios.get('/user', {
        headers: {
          Authorization: `Bearer ${response.data.newAccessToken}`,
        },
      });

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
