import React, { useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionsData } from '../../redux/Report/ReportOperations';
import {
  loadingReports,
  expenses,
  incomes,
} from '../../redux/Report/ReportSelectors';

const ReportsChart = ({ currentPeriod, currentCategory }) => {
  const dispatch = useDispatch();

  const expensesData = useSelector(expenses);
  const incomesData = useSelector(incomes);
  const loading = useSelector(loadingReports);

  console.log('expensesData:', expensesData); // returns empty object

  useEffect(() => {
    dispatch(getTransactionsData({ period: currentPeriod }));
  }, [dispatch, currentPeriod]);

  const prepareChartData = () => {
    const data = [['Category', currentCategory]];

    const categoryData =
      currentCategory === 'Expenses' ? expensesData : incomesData;
      console.log('category Data:', categoryData); // returns empty object
    // Nie jestem pewien, czy item.category i item.amount będą ok. Chyba to zależy, jak się będzie wysyłać dane w reduxie do operacji expenses i incomes
    if (!Array.isArray(categoryData) || categoryData.length === 0) {
      return data; // Return default data if categoryData is not a valid array
    }
    
    const aggregatedData = categoryData.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount;
      return acc;
    }, {});

    for (const [category, amount] of Object.entries(aggregatedData)) {
      data.push([category, amount]);
    }

    return data;
  };

  const chartData = prepareChartData();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Chart
        width={'100%'}
        height={'400px'}
        chartType="Bar"
        data={chartData}
        options={{
          title: currentCategory,
          chartArea: { width: '50%' },
          hAxis: {
            title: 'Amount',
            minValue: 0,
          },
          vAxis: {
            title: 'Category',
          },
        }}
      />
    </div>
  );
};

export default ReportsChart;
