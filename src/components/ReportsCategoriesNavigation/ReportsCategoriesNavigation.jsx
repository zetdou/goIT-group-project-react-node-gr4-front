import React, { useMemo } from 'react';
import iconTool from '../IconsAsComponents/IconsAsComponents';

const ReportsCategoriesNavigation = ({ currentView, toggleView }) => {
  const viewCategory = useMemo(
    () => (currentView === 'expenses' ? 'Expenses' : 'Incomes'),
    [currentView]
  );

  return (
    <div>
      <button onClick={toggleView}>{iconTool.smallArrowLeft}</button>
      <p>{viewCategory}</p>
      <button onClick={toggleView}>{iconTool.smallArrowRight}</button>
    </div>
  );
};

export default ReportsCategoriesNavigation;
