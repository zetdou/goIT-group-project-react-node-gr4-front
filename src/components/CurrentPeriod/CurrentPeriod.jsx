import React, { useState } from 'react';
import iconTool from '../IconsAsComponents/IconsAsComponents';

const CurrentPeriod = ({ initialPeriod }) => {
  const [currentPeriod, setCurrentPeriod] = useState(initialPeriod);

  const getYearAndMonth = period => {
    return period.split('-').map(Number);
  };

  const toPreviousMonth = () => {
    setCurrentPeriod(previousPeriod => {
      const [year, month] = getYearAndMonth(prevPeriod);
      const previousMonth = new Date(year, month - 2);
      return `${previousMonth.getFullYear()}-${String(
        previousMonth.getMonth() + 1
      ).padStart(2, '0')}`;
    });
  };

  const toNextMonth = () => {
    setCurrentPeriod(previousPeriod => {
      const [year, month] = getYearAndMonth(prevPeriod);
      const nextMonth = new Date(year, month);
      const today = new Date();
      if (nextMonth <= new Date(today.getFullYear(), today.getMonth())) {
        return `${nextMonth.getFullYear()}-${String(
          nextMonth.getMonth() + 1
        ).padStart(2, '0')}`;
      }
    });
  };

  const [year, month] = getYearAndMonth(initialPeriod);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
  }).format(new Date(year, month - 1));

  return (
    <div>
      <h2>Current period:</h2>
      <div>
        <button onClick={toPreviousMonth}>{iconTool.previousPeriod}</button>
        <p>{formattedDate}</p>
        <button onClick={toNextMonth}>{iconTool.nextPeriod}</button>
      </div>
    </div>
  );
};

export default CurrentPeriod;
