import React, { memo, useCallback } from 'react';
import { useState, useEffect } from 'react';
import useReport from '../../hooks/useReport';
import iconTool from '../IconsAsComponents/IconsAsComponents';

const CategoryList = memo(({ currentView }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const reportData = useReport(currentView);

  const fetchReportsData = useCallback(() => {
    if (!reportData) return;

    try {
      setLoading(true);
      const categories = Object.keys(reportData || {});

      const categorySum = categories.map(category => ({
        category,
        total: Object.values(reportData[category] || {})
          .reduce((acc, value) => acc + value, 0)
          .toFixed(2),
        icon: iconTool[category],
      }));

      setCategoryData(categorySum);
    } catch (e) {
      console.log('Error in CategoryList:', e);
    } finally {
      setLoading(false);
    }
  }, [reportData]);

  useEffect(() => {
    fetchReportsData();
  }, [fetchReportsData]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {categoryData.map((category, index) => (
            <li key={index}>
              <p>{category.total}</p>
              <div>{category.icon}</div>
              <p>{category.category}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default CategoryList;
