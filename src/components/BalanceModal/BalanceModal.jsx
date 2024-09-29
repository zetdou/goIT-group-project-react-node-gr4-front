import { useState, useEffect } from 'react';

const BalanceModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      handleModalClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        handleModalClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isModalOpen) {
    return null;
  }

  return (
    <div onClick={handleBackdropClick}>
      <div>
        <p>Hello! To get started, enter the current balance of your account!</p>
        <p>You can't spend money until you have it :)</p>
      </div>
    </div>
  );
};

export default BalanceModal;
