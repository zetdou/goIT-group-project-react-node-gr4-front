import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const getTransactionsData = createAsyncThunk(
  'report/getTransactionsData',
  async ({ period }, thunkApi) => {
    try {
      const { data } = await axios.get(
        `/transactions/period-data?date=${period}`
      );
      return { data };
    } catch (e) {
      return thunkApi.rejectWithValue('Not founded!');
    }
  }
);
