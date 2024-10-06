import React from 'react'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Invites() {
    const { id } = useParams();

    // get single event by id
    const url = "http://localhost:3001/events/get_event/" + id;
    const [event, setEvent] = useState([]);
    // const [groupedevents, segroupedtEvents] = useState([]);
  
    useEffect(() => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data); // Log the data to see what is being returned
          setEvent(data);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }, [url]);
const handleAccept = async () => {
    const userEmail = localStorage.getItem('email') 
    const userCid = localStorage.getItem('cid') 
    const userAlias = localStorage.getItem('alias') 

    event.attendees = event.attendees || [];
    const updatedEvent = {
        ...event,
        attendees: [...event.attendees, {email: userEmail, cid: userCid, alias: userAlias}]
    };

    try {
        const response = await fetch(`http://localhost:3001/events/update_event/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedEvent)
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setEvent(data);
        console.log("Event updated successfully:", data);
        window.location.href = '/';
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
};

return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0', padding: '20px' }}>
        <h1 style={{ marginBottom: '20px', fontSize: '24px' }}>Event Invitation</h1>
        <div style={{ textAlign: 'center', marginBottom: '20px', width: '100%', maxWidth: '400px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>{event.eventName}</h2>
            <p style={{ fontSize: '16px', marginBottom: '10px' }}>{event.eventDescription}</p>
            <p style={{ fontSize: '16px', marginBottom: '10px' }}>{new Date(event.eventDate).toLocaleDateString()}</p>
            <p style={{ fontSize: '16px', marginBottom: '10px' }}>{event.eventLocation}</p>
            <p style={{ fontSize: '16px', marginBottom: '10px' }}>{event.creator}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button 
                style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', flex: '1 1 45%', maxWidth: '200px' }}
                onClick={handleAccept}
            >
                Accept
            </button>
            <button 
                style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', flex: '1 1 45%', maxWidth: '200px' }}
                onClick={() => window.location.href = '/'}
            >
                Reject
            </button>
        </div>
    </div>
);
}
