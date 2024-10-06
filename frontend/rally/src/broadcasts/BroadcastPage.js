import React, { useState, useEffect } from "react";

function BroadcastPage({ isCreator, event }) {
  const [broadcasts, setBroadcasts] = useState([]); // Stores list of messages
  const [newBroadcast, setNewBroadcast] = useState(""); // Stores current message input
  const url = process.env.REACT_APP_API_URL; // Backend URL

  // Fetch existing broadcasts from the backend when component mounts
  useEffect(() => {
    fetch(`${url}/events/get_event/${event._id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.message) {
          setBroadcasts(data.message); // Set the existing messages to the broadcasts state
        }
      })
      .catch((error) => console.error("Error fetching broadcasts:", error));
  }, [event._id]);

  // Handle input change
  const handleInputChange = (e) => {
    setNewBroadcast(e.target.value); // Update the state with the new message
  };

  // Handle form submission (sending new broadcast)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newBroadcast) return; // Don't send if input is empty

    try {
      // Add the new broadcast message to the existing list
      const updatedBroadcasts = [...broadcasts, { message: newBroadcast }];
      
      // Update the broadcasts state locally (to show new message immediately)
      setBroadcasts(updatedBroadcasts);
      setNewBroadcast(""); // Clear input field after submission

      // Send the updated list of broadcasts back to the backend to update the event
      const response = await fetch(`${url}/events/update_event/${event._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: updatedBroadcasts }), // Send updated message list
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update event.");
      }

      console.log("Broadcasts successfully updated!");
    } catch (error) {
      console.error("Error updating event:", error);
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
      {isCreator && (
        <form className="broadcast-form" onSubmit={handleSubmit} style={styles.broadcastForm}>
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
