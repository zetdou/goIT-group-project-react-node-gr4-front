import { useState, useEffect } from 'react';
import useReport  from '../../hooks/useReport';
import iconTool  from '../IconsAsComponents/IconsAsComponents';

const CategoryList = ({ currentView }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const reportData = useReport(currentView);

  const fetchReportsData = () => {
    try {
      setLoading(true);
      const categories = Object.keys(reportData || {});

      const categorySum = categories.map(category => {
        const total = Object.values(reportData[category] || {}).reduce(
          (acc, value) => acc + value,
          0
        );
        return {
          category,
          total: total.toString({
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
          icon: iconTool[category],
        };
      });
      setCategoryData(categorySum);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportsData();
  }, [currentView, reportData]);

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
};

export default CategoryList;
