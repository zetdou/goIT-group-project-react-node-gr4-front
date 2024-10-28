import { useSelector } from 'react-redux';
import { incomes, expenses } from '../redux/Report/ReportSelectors';
import { useMemo } from 'react';

const useReport = () => {
  const incomesData = useSelector(incomes);
  const expensesData = useSelector(expenses);

  return useMemo(
    () => ({
      incomesReport: {
        total: incomesData?.total || 0,
        data: incomesData?.incomesData || {},
      },
      expensesReport: {
        total: expensesData?.total || 0,
        data: expensesData?.expensesData || {},
      },
    }),
    [incomesData, expensesData]
  );
};

export default useReport;
