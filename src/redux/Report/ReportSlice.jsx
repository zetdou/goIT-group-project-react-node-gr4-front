import { createSlice } from '@reduxjs/toolkit';
import { getTransactionsData } from './ReportOperations';

const initialState = {
  loadingReports: false,
  incomes: {
    total: 0,
    incomesData: {},
  },
  expenses: {
    total: 0,
    expensesData: {},
  },
  error: null,
};

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getTransactionsData.pending, state => {
        state.loadingReports = true;
        state.error = null;
      })
      .addCase(getTransactionsData.fulfilled, (state, action) => {
        state.loadingReports = false;
        state.incomes = action.payload.incomes;
        state.expenses = action.payload.expenses;
      })
      .addCase(getTransactionsData.rejected, (state, action) => {
        state.loadingReports = false;
        state.error = action.payload;
      });
  },
});

export const reportReducer = reportSlice.reducer;
