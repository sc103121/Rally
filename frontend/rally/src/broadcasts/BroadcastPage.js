// import React, { useState, useEffect } from 'react';
// import './BroadcastPage.css';

// function BroadcastPage() {
//   const [broadcasts, setBroadcasts] = useState([]);
//   const [newBroadcast, setNewBroadcast] = useState('');
//   const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);

//   const url = "http://localhost:3001";

//   // Fetch broadcasts from the backend
//   useEffect(() => {
//     fetch(`${url}/broadcasts/api/broadcasts`)
//       .then((res) => res.json())
//       .then((data) => setBroadcasts(data));
//   }, []);

//   // Handle input change
//   const handleInputChange = (e) => {
//     setNewBroadcast(e.target.value);
//   };

//   // Handle form submit (sending new broadcast)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!newBroadcast) return;

//     const response = await fetch(`${url}/broadcasts/api/broadcasts`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ message: newBroadcast }),
//     });

//     if (response.ok) {
//       const newMessage = await response.json();
//       setBroadcasts([newMessage, ...broadcasts]); // Add the new message to the top of the list
//       setNewBroadcast(''); // Clear the input
//     }
//   };

//   const handleCloseBroadcastModal = () => {
//     setIsBroadcastModalOpen(false);
//   };

//   return (
//     <div className="broadcast-container">
//       <div className="broadcast-header">
//         <h3>Broadcasts</h3>
//         {/* <button className="close-btn">X</button> */}
//       </div>
//       <div className="broadcast-list">
//         {broadcasts.map((broadcast, index) => (
//           <div className="broadcast-item" key={index}>
//             <span className="megaphone-icon">📢</span>
//             <p>{broadcast.message}</p>
//           </div>
//         ))}
//       </div>
//       <form className="broadcast-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Send a broadcast..."
//           value={newBroadcast}
//           onChange={handleInputChange}
//         />
//         <button type="submit" className="send-btn">
//           🚀
//         </button>
//       </form>
//     </div>
//   );
// }

// export default BroadcastPage;

import React, { useState, useEffect } from "react";

function BroadcastPage({isCreator}) {
  const [broadcasts, setBroadcasts] = useState([]);
  const [newBroadcast, setNewBroadcast] = useState('');
  const url = "http://localhost:3001";

  // Fetch broadcasts from the backend
  useEffect(() => {
    fetch(`${url}/broadcasts/api/broadcasts`)
      .then((res) => res.json())
      .then((data) => setBroadcasts(data));
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setNewBroadcast(e.target.value);
  };

  // Handle form submit (sending new broadcast)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newBroadcast) return;

    const response = await fetch(`${url}/broadcasts/api/broadcasts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: newBroadcast }),
    });

    if (response.ok) {
      const newMessage = await response.json();
      setBroadcasts([newMessage, ...broadcasts]); // Add the new message to the top of the list
      setNewBroadcast(''); // Clear the input
    }
  };

  return (
    <div className="broadcast-container" style={styles.broadcastContainer}>
      <div className="broadcast-header" style={styles.broadcastHeader}>
        <h3>Broadcasts</h3>
      </div>
      <div className="broadcast-list" style={styles.broadcastList}>
        {broadcasts.map((broadcast, index) => (
          <div className="broadcast-item" key={index} style={styles.broadcastItem}>
            <span className="megaphone-icon">📢</span>
            <p>{broadcast.message}</p>
          </div>
        ))}
      </div>
      {isCreator && (<form className="broadcast-form" onSubmit={handleSubmit} style={styles.broadcastForm}>
        <input
          type="text"
          placeholder="Send a broadcast..."
          value={newBroadcast}
          onChange={handleInputChange}
          style={styles.input}
        />
        <button type="submit" className="send-btn" style={styles.sendBtn}>
          🚀
        </button>
      </form>
    )}
    </div>
  );
}

const styles = {
  broadcastContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%", // Make sure it fills the modal
    width: "100%", // Full width of modal
    backgroundColor: "#D3BCAF",
    padding: "1rem",
    boxSizing: "border-box", // Ensure padding doesn't affect overall width/height
  },
  broadcastHeader: {
    flexShrink: 0,
    marginBottom: "1rem",
  },
  broadcastList: {
    flexGrow: 1,
    overflowY: "auto", // Enable scrolling if the list is too long
    marginBottom: "1rem",
  },
  broadcastItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
    padding: "0.5rem",
    backgroundColor: "#e8ded1",
    borderRadius: "8px",
  },
  broadcastForm: {
    display: "flex",
    justifyContent: "space-between",
    flexShrink: 0,
  },
  input: {
    flexGrow: 1,
    marginRight: "0.5rem",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  sendBtn: {
    padding: "0.5rem 1rem",
    backgroundColor: "#ff7f50",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    cursor: "pointer",
  },
};

export default BroadcastPage;
