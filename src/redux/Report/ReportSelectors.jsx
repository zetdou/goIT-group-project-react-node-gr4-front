export const loadingReports = state => state.report.loadingReports;
export const incomes = state =>
  state.report.incomes || { total: 0, incomesData: {} };
export const expenses = state =>
  state.report.expenses || { total: 0, expensesData: {} };
export const error = state => state.report.error;
