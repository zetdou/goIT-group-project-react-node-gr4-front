import React from 'react';
import iconTool from '../IconsAsComponents/IconsAsComponents';

const CurrentPeriod = ({ currentPeriod, setCurrentPeriod }) => {
  console.log('currentPeriod:', currentPeriod);

  const getYearAndMonth = period => {
    if (!period) return [new Date().getFullYear(), new Date().getMonth() + 1];
    return period.split('-').map(Number);
  };

  const toPreviousMonth = () => {
    const [year, month] = getYearAndMonth(currentPeriod);
    const previousMonth = new Date(year, month - 2);
    setCurrentPeriod(
      `${previousMonth.getFullYear()}-${String(
        previousMonth.getMonth() + 1
      ).padStart(2, '0')}`
    );
  };

  const toNextMonth = () => {
    const [year, month] = getYearAndMonth(currentPeriod);
    const nextMonth = new Date(year, month);
    const today = new Date();
    if (nextMonth <= new Date(today.getFullYear(), today.getMonth())) {
      setCurrentPeriod(
        `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(
          2,
          '0'
        )}`
      );
    }
  };

  const [year, month] = getYearAndMonth(currentPeriod);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
  }).format(new Date(year, month - 1));

  return (
    <div>
      <h2>Current period:</h2>
      <div>
        <button onClick={toPreviousMonth}>{iconTool.smallArrowLeft}</button>
        <p>{formattedDate}</p>
        <button onClick={toNextMonth}>{iconTool.smallArrowRight}</button>
      </div>
    </div>
  );
};

export default CurrentPeriod;
