import React from "react";

function Modal({ onClose, children }) {
  const handleOverlayClick = (e) => {
    // If the user clicks outside the modal content, close the modal
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-description">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
