import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateBalance } from '../../redux/Users/AuthOperations';
import { useAuth } from '../../hooks/useAuth';
import css from './Balance.module.css';

const Balance = () => {
  const dispatch = useDispatch();
  const form = useRef();
  const { user } = useAuth();

  const userBalance = user ? user.balance : null;
  const [balanceValue, setBalanceValue] = useState(userBalance || '');
  const [isTooltipVisible, setIsTooltipVisible] = useState(!userBalance);

  useEffect(() => {
    if (balanceValue !== '') {
      setIsTooltipVisible(false); // Ukryj tooltip, jeśli wpisano kwotę
    }
  }, [balanceValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const balanceValue = e.target.balance.value;
    console.log('Balance to update:', balanceValue);
    dispatch(updateBalance(balanceValue));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setBalanceValue(value);
    setIsTooltipVisible(value === '');  // Pokaż tooltip, gdy pole jest puste
  };

  return (
    <div className={css.balanceContainer}>
      <form ref={form} onSubmit={handleSubmit} className={css.balanceForm}>
        <label className={css.balanceLabel}>Balance:</label>
        <div className={css.inputWrapper}>
          <input
            type="number"
            name="balance"
            title="Please, enter your balance"
            value={balanceValue}
            step="0.01"
            placeholder="0.00 ZŁ"
            onChange={handleInputChange}
            required
            id="balance-input"
            className={css.balanceInput}
          />
          <button type="submit" className={css.confirmButton}>CONFIRM</button>
        </div>
        {/* Tooltip wyświetla się, jeśli pole jest puste */}
        {isTooltipVisible && (
          <div className={css.tooltip}>
            <p className={css.tooltipText}>
              Hello! To get started, enter the current balance of your account!
            </p>
            <p className={css.tooltipText}>
              You can't spend money until you have it :)
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Balance;