import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateBalance } from '../../redux/Users/AuthOperations';
import { useAuth } from '../../hooks/useAuth';
import css from './Balance.module.css';
import BalanceModal from '../BalanceModal/BalanceModal';

const Balance = () => {
  const dispatch = useDispatch();
  const form = useRef();
  const { user } = useAuth();
  
  const userBalance = user ? user.balance : null; // : '0.00'
  const [placeholderText, setPlaceholderText] = useState(`${userBalance} USD`);
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
    form.current.reset();
    setPlaceholderText(`${balanceValue} USD`);
  };
  
//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setBalanceValue(value);
//     setIsTooltipVisible(value === '');  // Pokaż tooltip, gdy pole jest puste
//   };
  
  return (
    <div className={css.BalanceContainer}>
      <form ref={form} onSubmit={handleSubmit} className={css.BalanceForm}>
        <label className={css.BalanceLabel}>Balance</label>
        <div className={css.BalanceWrapper}>
          <input
            className={css.BalanceInput}
            type="number"
            name="balance"
            title="Please, enter your balance"
            step="0.01"
//             placeholder={placeholderText}
            placeholder="0.00 ZŁ"
//             onChange={handleInputChange}
            required
            id="balance-input"
            // className={css.balanceInput}
          />
          <button type="submit" className={css.BalanceButton}>
            CONFIRM
          </button>
        </div>
        {/* Tooltip wyświetla się, jeśli pole jest puste */}
        {isTooltipVisible && (
          <div className={css.tooltip}>
            {/* these p or balance modal */}
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