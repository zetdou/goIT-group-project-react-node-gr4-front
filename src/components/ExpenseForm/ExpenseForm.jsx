import { useDispatch } from 'react-redux';
import { addExpense } from '../../redux/expenses/expenseOperations';
import { fetchCurrentUser } from '../../redux/Users/AuthOperations';

const ExpenseForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    // ... logika dodawania wydatku ...
    try {
      await dispatch(addExpense(expenseData)).unwrap();
      await dispatch(fetchCurrentUser()).unwrap();
      // ... resetowanie formularza itp. ...
    } catch (error) {
      console.error('Failed to add expense:', error);
    }
  };

  // ... reszta komponentu ...
};
