import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useReport from '../../hooks/useReport';
import { getTransactionsData } from '../../redux/Report/ReportOperations';
import css from './BalanceLabel.module.css';

const BalanceLabel = () => {
  const dispatch = useDispatch();
  const { incomesReport = {}, expensesReport = {} } = useReport();

  // Pobieramy dane o transakcjach
  useEffect(() => {
    dispatch(getTransactionsData());
  }, [dispatch]);

  const renderBalanceItem = (label, amount, isExpense) => (
    <p className={css.balanceItem}>
      {label}:{' '}
      <span>
        <span
          className={
            isExpense ? css.BalanceLabelSpanRed : css.BalanceLabelSpanGreen
          }
        >
          {isExpense ? `- ${amount}` : `+ ${amount}`}
        </span>{' '}
        <span>UAH.</span>
      </span>
    </p>
  );

  return (
    <div className={css.balanceLabelContainer}>
      <div className={css.balanceLabelWrapper}>
        {renderBalanceItem('Expenses', expensesReport.total || 0, true)}
        <div className={css.separator}></div>
        {renderBalanceItem('Incomes', incomesReport.total || 0, false)}
      </div>
    </div>
  );
};

export default BalanceLabel;