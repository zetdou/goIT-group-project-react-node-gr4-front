import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../Tools/axiosConfig';

export const getTransactionsData = createAsyncThunk(
  'report/getTransactionsData',
  async ({ period }, thunkApi) => {
    try {
      const { data } = await axiosInstance.get(
        `/transaction/period-data?date=${period}`
      );
      return data;
    } catch (e) {
      console.error('Error fetching transactions:', e);
      return thunkApi.rejectWithValue('Nie udało się pobrać danych');
    }
  }
);
