import useReport from '../../hooks/useReport';
import css from './BalanceLabel.module.css';

const BalanceLabel = () => {
  const { incomesReport, expensesReport } = useReport();

  console.log('Balance data:', {
    incomes: incomesReport.total,
    expenses: expensesReport.total,
  });

  const renderBalanceItem = (label, amount, isExpense) => (
    <p className={css.balanceItem}>
      {label}:{' '}
      <span>
        <span
          className={
            isExpense ? css.BalanceLabelSpanRed : css.BalanceLabelSpanGreen
          }
        >
          {isExpense ? `- ${amount.toFixed(2)}` : `+ ${amount.toFixed(2)}`}
        </span>{' '}
        <span>UAH.</span>
      </span>
    </p>
  );

  return (
    <div className={css.balanceLabelContainer}>
      <div className={css.balanceLabelWrapper}>
        {renderBalanceItem('Expenses', expensesReport.total, true)}
        <div className={css.separator}></div>
        {renderBalanceItem('Incomes', incomesReport.total, false)}
      </div>
    </div>
  );
};

export default BalanceLabel;
