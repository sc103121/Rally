import React, { useState } from "react";

function CreateEventPage() {
    const [formData, setFormData] = useState({
        eventName: '',
        eventDate: '',
        eventTime: '',
        eventLocation: '',
        eventDescription: '',
        eventImage: null,
        eventPublic: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Print the entire form except the image
        const { eventImage, ...formWithoutImage } = formData;
        console.log('Form data without image:', formWithoutImage);

        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            const response = await fetch('http://localhost:3001/events/events', {
                method: 'POST',
                body: formDataToSend
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Event created successfully:', result);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '100%', maxWidth: '500px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Event</h1>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="eventName" style={{ display: 'block', marginBottom: '5px' }}>Event Name:</label>
                        <input type="text" id="eventName" name="eventName" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} value={formData.eventName} onChange={handleChange} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="eventDate" style={{ display: 'block', marginBottom: '5px' }}>Event Date:</label>
                        <input type="date" id="eventDate" name="eventDate" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} value={formData.eventDate} onChange={handleChange} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="eventTime" style={{ display: 'block', marginBottom: '5px' }}>Event Time:</label>
                        <input type="time" id="eventTime" name="eventTime" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} value={formData.eventTime} onChange={handleChange} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="eventLocation" style={{ display: 'block', marginBottom: '5px' }}>Event Location:</label>
                        <input type="text" id="eventLocation" name="eventLocation" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} value={formData.eventLocation} onChange={handleChange} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="eventDescription" style={{ display: 'block', marginBottom: '5px' }}>Event Description:</label>
                        <textarea id="eventDescription" name="eventDescription" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box', minHeight: '100px' }} value={formData.eventDescription} onChange={handleChange}></textarea>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="eventImage" style={{ display: 'block', marginBottom: '5px' }}>Event Image:</label>
                        <input type="file" id="eventImage" name="eventImage" accept="image/*" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} onChange={handleChange} />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="eventPublic" style={{ display: 'block', marginBottom: '5px' }}>Event Public:</label>
                        <input type="checkbox" id="eventPublic" name="eventPublic" style={{ marginRight: '10px' }} checked={formData.eventPublic} onChange={handleChange} />
                        <span>Make event public</span>
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Create Event</button>
                </form>
            </div>
        </div>
    );
}

export default CreateEventPage;