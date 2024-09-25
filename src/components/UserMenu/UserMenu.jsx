import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/Users/AuthOperations';
import css from './UserMenu.module.css';
import { ExitModal } from '../ExitModal/ExitModal';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

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
    return null;
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
        <p className={css.logoutText}>Exit</p>
      </button>

      {showModal && (
        <ExitModal onClose={handleCloseModal} onConfirm={handleConfirmLogout} />
      )}
    </nav>
  );
};
