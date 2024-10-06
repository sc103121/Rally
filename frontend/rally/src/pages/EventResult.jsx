import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EventResult = () => {
  const location = useLocation(); // Access the passed state
  const navigate = useNavigate(); // For redirection
  const { predictedCategory, recommendations, eventName, eventDescription } = location.state || {};

  // Handle "Go back to home page" button click
  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '100%', maxWidth: '600px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Event created successfully!</h1>

        <div style={{ marginBottom: '15px' }}>
          <h3>Event Name:</h3>
          <p>{eventName || "No event name available"}</p>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h3>Event Description:</h3>
          <p>{eventDescription || "No event description available"}</p>
        </div>

        {/* Display predicted category or show "No category predicted" */}
        {predictedCategory ? (
          <div style={{ marginBottom: '15px' }}>
            <h3>Predicted Category:</h3>
            <p>{predictedCategory}</p>
          </div>
        ) : (
          <p>No category predicted.</p>
        )}

        {/* Check if there are recommendations or show "No recommendations" */}
        {recommendations && recommendations.length > 0 ? (
          <div style={{ marginBottom: '15px' }}>
            <h3>Recommended Events:</h3>
            <ul>
              {recommendations.map((rec, index) => (
                <li key={index}>
                  <strong>{rec.event_name}</strong> - {rec.event_description}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No recommendations available.</p>
        )}

        <button
          onClick={goToHomePage}
          style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '20px' }}
        >
          Go back to home page
        </button>
      </div>
    </div>
  );
};

export default EventResult;
