import React from 'react';
import './Notification.css';

const Notification = ({ message, type, onClose }) => {
  if (!message) {
    return null;
  }

  // Desaparece automaticamente após 5 segundos
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className={`notification-container ${type}`}>
      <div className="notification-message">{message}</div>
      <button onClick={onClose} className="notification-close-btn">
        &times;
      </button>
    </div>
  );
};

export default Notification;