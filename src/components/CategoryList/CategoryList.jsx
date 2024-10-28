import React, { useState, useEffect, useCallback } from 'react';
import useReport from '../../hooks/useReport';
import iconTool from '../IconsAsComponents/IconsAsComponents';
import axiosInstance from '../../redux/Tools/axiosConfig';

const CategoryList = ({ currentView, onCategorySelect }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [availableCategories, setAvailableCategories] = useState([]);
  const { incomesReport, expensesReport } = useReport();

  // Pobieranie kategorii z API
  const fetchCategories = useCallback(async () => {
    try {
      const endpoint =
        currentView === 'expenses'
          ? '/transaction/expense-categories'
          : '/transaction/income-categories';

      const response = await axiosInstance.get(endpoint);
      setAvailableCategories(response.data);
    } catch (error) {
      console.error('Błąd podczas pobierania kategorii:', error);
      setAvailableCategories([]);
    }
  }, [currentView]);

  // Pobierz kategorie przy zmianie widoku
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const calculateCategoryData = useCallback(() => {
    try {
      const reportData =
        currentView === 'expenses' ? expensesReport.data : incomesReport.data;

      // Tworzenie pełnej listy kategorii z danymi z API
      const categories = availableCategories.map(category => {
        const categoryData = reportData[category] || {};
        const total = categoryData.total || 0;

        return {
          category,
          total: Number(total).toFixed(2),
          icon: iconTool[category.toLowerCase()] || iconTool.other,
          details: categoryData,
          hasTransactions: Object.keys(categoryData).length > 0,
        };
      });

      setCategoryData(categories);

      // Wybierz pierwszą kategorię z transakcjami
      if (categories.length > 0 && !activeCategory) {
        const firstCategoryWithTransactions = categories.find(
          cat => cat.hasTransactions
        );
        if (firstCategoryWithTransactions) {
          setActiveCategory(firstCategoryWithTransactions.category);
          onCategorySelect(
            firstCategoryWithTransactions.category,
            firstCategoryWithTransactions.details
          );
        } else {
          setActiveCategory(null);
          onCategorySelect(null, null);
        }
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
    availableCategories,
  ]);

  useEffect(() => {
    if (availableCategories.length > 0) {
      calculateCategoryData();
    }
  }, [calculateCategoryData, availableCategories]);

  const handleCategoryClick = (category, details) => {
    if (Object.keys(details).length > 0) {
      setActiveCategory(category);
      onCategorySelect(category, details);
    } else {
      setActiveCategory(null);
      onCategorySelect(null, null);
    }
  };

  return (
    <div>
      <ul>
        {categoryData.map(item => (
          <li
            key={item.category}
            onClick={() => handleCategoryClick(item.category, item.details)}
            style={{
              cursor: item.hasTransactions ? 'pointer' : 'default',
              backgroundColor:
                activeCategory === item.category ? '#f0f0f0' : 'transparent',
              opacity: item.hasTransactions ? 1 : 0.5,
              padding: '10px',
              margin: '5px 0',
              borderRadius: '4px',
              transition: 'all 0.3s ease',
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
