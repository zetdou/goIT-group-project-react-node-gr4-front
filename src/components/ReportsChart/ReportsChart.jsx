import React from 'react';
import { Chart } from 'react-google-charts';

const ReportsChart = ({ expensesData, incomesData, currentCategory }) => {
  const prepareChartData = () => {
    const data = [['Category', currentCategory]];
    const categoryData =
      currentCategory === 'Expenses' ? expensesData : incomesData;

    if (!categoryData?.expensesData && !categoryData?.incomesData) {
      return data;
    }

    const dataToProcess =
      currentCategory === 'Expenses'
        ? categoryData.expensesData
        : categoryData.incomesData;

    Object.entries(dataToProcess || {}).forEach(([category, categoryData]) => {
      // Zmiana z data.push na:
      data.push([category, categoryData.total]);
    });

    return data;
  };

  const chartData = prepareChartData();

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
