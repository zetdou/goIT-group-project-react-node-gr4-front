import { useAuth } from "../../hooks/useAuth";
import css from "./UserMenu.module.css";

export const UserMenu = () => {
    // const { user, isLoggedIn } = useAuth();

    return (
        <nav className={css.userMenuWrapper}>
            <div className={css.userMenuAvatar}>
                <p className={css.userMenuLetter}>U</p>
            </div>
            <p>User Name</p>
            <div className={css.userMenuRectangle}></div>
            <a className={css.userMenuLogout}>Exit</a>
        </nav>
    )
}