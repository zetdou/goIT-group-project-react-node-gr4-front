import React, { useMemo } from 'react';
import iconTool from '../IconsAsComponents/IconsAsComponents';

const ReportsCategoriesNavigation = ({ currentCategory, toggleCategory }) => {
  const viewCategory = useMemo(
    () => (currentCategory === 'Expenses' ? 'Expenses' : 'Incomes'),
    [currentCategory]
  );

  return (
    <div>
      <button onClick={toggleCategory}>{iconTool.smallArrowLeft}</button>
      <p>{viewCategory}</p>
      <button onClick={toggleCategory}>{iconTool.smallArrowRight}</button>
    </div>
  );
};

export default ReportsCategoriesNavigation;
