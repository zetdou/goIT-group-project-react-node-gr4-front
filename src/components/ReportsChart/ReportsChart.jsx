import React from 'react';
import { Chart } from 'react-google-charts';

const ReportsChart = ({ selectedCategory, categoryData, currentView }) => {
  const prepareChartData = () => {
    if (!selectedCategory || !categoryData) {
      return [['Transaction', 'Amount', { role: 'annotation' }]];
    }

    const data = [['Transaction', 'Amount', { role: 'annotation' }]];

    Object.entries(categoryData).forEach(([transaction, amount]) => {
      if (transaction !== 'total') {
        data.push([transaction, amount, amount.toString()]);
      }
    });

    return data;
  };

  const chartData = prepareChartData();

  return (
    <div>
      <Chart
        width={'100%'}
        height={'400px'}
        chartType="ColumnChart"
        data={chartData}
        options={{
          title: `${selectedCategory || 'Select category'} Details`,
          legend: { position: 'none' },
          annotations: {
            textStyle: {
              fontSize: 12,
              color: '#000',
              auraColor: 'none',
            },
          },
          vAxis: {
            title: 'Amount (UAH)',
            minValue: 0,
          },
          hAxis: {
            title: 'Transactions',
          },
        }}
      />
    </div>
  );
};

export default ReportsChart;
