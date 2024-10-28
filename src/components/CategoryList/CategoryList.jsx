import React, { useState, useEffect, useCallback } from 'react';
import useReport from '../../hooks/useReport';
import iconTool from '../IconsAsComponents/IconsAsComponents';

const CategoryList = ({ currentView, onCategorySelect }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { incomesReport, expensesReport } = useReport();

  const calculateCategoryData = useCallback(() => {
    try {
      const reportData =
        currentView === 'expenses' ? expensesReport.data : incomesReport.data;

      const categories = Object.entries(reportData || {}).map(
        ([category, data]) => {
          // Sprawdzamy czy data.total istnieje, jeśli nie, sumujemy wartości
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
        }
      );

      setCategoryData(categories);
    } catch (error) {
      console.error('Error in CategoryList:', error);
      setCategoryData([]);
    }
  }, [currentView, incomesReport.data, expensesReport.data]);

  useEffect(() => {
    calculateCategoryData();
  }, [calculateCategoryData]);

  const handleCategoryClick = (category, details) => {
    setSelectedCategory(category);
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
                selectedCategory === item.category ? '#f0f0f0' : 'transparent',
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
