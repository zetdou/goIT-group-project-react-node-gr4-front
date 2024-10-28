import React, { useState, useEffect, useCallback } from 'react';
import useReport from '../../hooks/useReport';
import iconTool from '../IconsAsComponents/IconsAsComponents';

const CategoryList = ({ currentView, onCategorySelect }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const { incomesReport, expensesReport } = useReport();

  const calculateCategoryData = useCallback(() => {
    try {
      const reportData =
        currentView === 'expenses' ? expensesReport.data : incomesReport.data;

      if (!reportData) {
        setCategoryData([]);
        return;
      }

      const categories = Object.entries(reportData).map(([category, data]) => {
        const total =
          data.total ||
          Object.values(data).reduce(
            (sum, value) => (typeof value === 'number' ? sum + value : sum),
            0
          );

        return {
          category,
          total: Number(total).toFixed(2),
          icon: iconTool[category.toLowerCase()] || iconTool.other,
          details: data,
        };
      });

      setCategoryData(categories);

      if (categories.length > 0 && !activeCategory) {
        const firstCategory = categories[0];
        setActiveCategory(firstCategory.category);
        onCategorySelect(firstCategory.category, firstCategory.details);
      }
    } catch (error) {
      console.error('Error in CategoryList:', error);
      setCategoryData([]);
    }
  }, [
    currentView,
    incomesReport.data,
    expensesReport.data,
    onCategorySelect,
    activeCategory,
  ]);

  useEffect(() => {
    calculateCategoryData();
  }, [calculateCategoryData]);

  const handleCategoryClick = (category, details) => {
    setActiveCategory(category);
    onCategorySelect(category, details);
  };

  return (
    <div>
      <ul>
        {categoryData.map(item => (
          <li
            key={item.category}
            onClick={() => handleCategoryClick(item.category, item.details)}
            style={{
              cursor: 'pointer',
              backgroundColor:
                activeCategory === item.category ? '#f0f0f0' : 'transparent',
              padding: '10px',
              margin: '5px 0',
              borderRadius: '4px',
              transition: 'background-color 0.3s ease',
            }}
          >
            <p>{item.total} UAH</p>
            <div>{item.icon}</div>
            <p>{item.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
