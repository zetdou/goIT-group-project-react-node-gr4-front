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
            <p>User Name</p>
            <div className={css.userMenuRectangle}></div>
            <a className={css.userMenuLogout} onClick={handleLogoutClick}>Exit</a>

            {showModal && (
                <ExitModal 
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmLogout}
                />
            )}
        </nav>
    )
}