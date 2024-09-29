import { createSlice } from '@reduxjs/toolkit';
import { getTransactionsData } from './ReportOperations';

const initialState = {
  loadingReports: false,
  incomes: {},
  expenses: {},
};

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getTransactionsData.pending, state => {
        state.loadingReports = true;
      })
      .addCase(getTransactionsData.fulfilled, (state, action) => {
        state.loadingReports = false;
        state.incomes = action.payload.incomes;
        state.expenses = action.payload.expenses;
      })
      .addCase(getTransactionsData.rejected, state => {
        state.loadingReports = false;
      });
  },
});

export const reportReducer = reportSlice.reducer;
