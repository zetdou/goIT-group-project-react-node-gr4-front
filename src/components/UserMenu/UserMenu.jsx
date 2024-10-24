import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import css from './UserMenu.module.css';
import { ExitModal } from '../ExitModal/ExitModal';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/Users/AuthOperations';

export const UserMenu = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmLogout = () => {
    setShowModal(false);
    dispatch(logOut());
  };

  if (!user || !user.email) {
    return null; // Nie renderuj nic, jeśli user lub user.email jest null/undefined
  }

  return (
    <nav className={css.userMenuWrapper}>
      <div className={css.userMenuAvatar}>
        <p className={css.userMenuLetter}>
          {user.email.charAt(0).toUpperCase()}
        </p>
      </div>
      <p className={css.usernameText}>{user.email}</p>
      <div className={css.userMenuRectangle}></div>
      <button className={css.userMenuLogout} onClick={handleLogoutClick}>
        <svg
          className={css.logoutIcon}
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
        <p className={css.logoutText}>Logout</p>
      </button>

      {showModal && (
        <ExitModal onClose={handleCloseModal} onConfirm={handleConfirmLogout} />
      )}
    </nav>
  );
};
