import css from "./ExitModal.module.css";

export const ExitModal = ({ onClose, onConfirm }) => {
    return (
        <div className={css.modalOverlay}>
            <div className={css.modalContent}>
                <button className={css.closeBtn} onClick={onClose}>X</button>
                <p className={css.modalText}>Do you really want to leave?</p>
                <div className={css.modalBtnGroup}>
                    <button className={css.yesBtn} onClick={onConfirm}>Yes</button>
                    <button className={css.noBtn} onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    )
}