// import React from "react";

// function Modal({ onClose, children }) {
//   const handleOverlayClick = (e) => {
//     // If the user clicks outside the modal content, close the modal
//     if (e.target.classList.contains("modal-overlay")) {
//       onClose();
//     }
//   };
//   return (
//     <div className="modal-overlay" onClick={handleOverlayClick}>
//       <div className="modal-content">
//         <button className="modal-close-button" onClick={onClose}>
//           &times;
//         </button>
//         <div className="modal-description">{children}</div>
//       </div>
//     </div>
//   );
// }

// export default Modal;

import React from "react";

function Modal({ onClose, children }) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} style={styles.overlay}>
      <div className="modal-content" style={styles.modal}>
        <button className="modal-close-button" onClick={onClose} style={styles.closeButton}>
          &times;
        </button>
        <div className="modal-description" style={styles.modalDescription}>
          {children} {/* Render the BroadcastPage inside the modal */}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    width: "500px", // Fixed width
    height: "600px", // Fixed height
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    overflow: "hidden", // Hide overflow on the main container
  },
  modalDescription: {
    flexGrow: 1, // Ensure it takes up the rest of the space
    overflowY: "auto", // Enable vertical scrolling when content overflows
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
};

export default Modal;
