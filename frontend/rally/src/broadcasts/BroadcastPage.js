import React, { useState, useEffect } from 'react';
import './BroadcastPage.css';

function BroadcastPage() {
  const [broadcasts, setBroadcasts] = useState([]);
  const [newBroadcast, setNewBroadcast] = useState('');

  const url = "http://localhost:3001";

  // Fetch broadcasts from the backend
  useEffect(() => {
    fetch(`${url}/api/broadcasts`)
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

    const response = await fetch(`${url}/api/broadcasts`, {
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
    <div className="broadcast-container">
      <div className="broadcast-header">
        <h3>Broadcasts</h3>
        <button className="close-btn">X</button>
      </div>
      <div className="broadcast-list">
        {broadcasts.map((broadcast, index) => (
          <div className="broadcast-item" key={index}>
            <span className="megaphone-icon">📢</span>
            <p>{broadcast.message}</p>
          </div>
        ))}
      </div>
      <form className="broadcast-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Send a broadcast..."
          value={newBroadcast}
          onChange={handleInputChange}
        />
        <button type="submit" className="send-btn">
          🚀
        </button>
      </form>
    </div>
  );
}

export default BroadcastPage;
