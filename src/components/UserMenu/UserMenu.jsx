import { useState } from "react"
import { useAuth } from "../../hooks/useAuth";
import css from "./UserMenu.module.css";
import { ExitModal } from "../ExitModal/ExitModal";

export const UserMenu = () => {
    // const { user, isLoggedIn } = useAuth();
    const [showModal, setShowModal] = useState(false);

    const handleLogoutClick = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleConfirmLogout = () => {
        setShowModal(false);
        // dalsza logika wylogowywania
    }

    return (
        <nav className={css.userMenuWrapper}>
            <div className={css.userMenuAvatar}>
                <p className={css.userMenuLetter}>U</p>
            </div>
            <p className={css.usernameText}>Username</p>
            <div className={css.userMenuRectangle}></div>
            <button className={css.userMenuLogout} onClick={handleLogoutClick}>
                <svg className={css.logoutIcon} xmlns="http://www.w3.org/2000/svg"></svg>
                <p className={css.logoutText}>Exit</p>
            </button>

            {showModal && (
                <ExitModal 
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmLogout}
                />
            )}
        </nav>
    )
}