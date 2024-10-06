import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { pinata } from "../utils/config"; // Make sure this is correct if you're using Pinata SDK


function CreateEventPage() {
    const [formData, setFormData] = useState({
        eventName: '',
        eventDate: '',
        eventTime: '',
        eventLocation: '',
        eventDescription: '',
        eventImage: null, // Event image file is stored here
        eventPublic: false,
        eventGoal: 0,
        evenRaised: 0,
        creator: localStorage.getItem('email')
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            
            let ImageCID = '';  // CID of the uploaded image
        
            // 1. Upload the image to Pinata (if any)
            if (formData.eventImage) {
                console.log("Uploading image to Pinata...");
                const upload = await pinata.upload.file(formData.eventImage);
                
                //console.log("upload:", upload)

                ImageCID = upload.cid;  // Store the CID separately
                console.log("Image uploaded successfully. CID:", ImageCID);
            }
    
            // 2. Prepare the form data with the Pinata URL and CID
            const formDataToSend = {
                ...formData,
                imageCID: ImageCID     // CID of the uploaded image
            };
    
            // 3. Submit the event data to your backend
            console.log("Submitting form data to the backend with image CID:", formDataToSend);
            const response = await fetch('http://localhost:3001/events/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataToSend),
            });
    
            if (!response.ok) {
                throw new Error('Form submission failed');
            }
    
            // const result = await response.json();
            
        
            // 4. Get predictions based on the form data (this remains the same)
            const predictionResponse = await axios.post('http://127.0.0.1:5001/predict', {
                event_name: formData.eventName,
                event_description: formData.eventDescription,
            });
    
            const predictedCategory = predictionResponse.data.predicted_category;
            const recommendations = predictionResponse.data.recommendations;
    
            // 5. Navigate to the result page
            navigate('/results', {
                state: {
                    predictedCategory,
                    recommendations,
                    eventName: formData.eventName,
                    eventDescription: formData.eventDescription,
                },
            });
            
        } catch (error) {
            console.error('There was a problem with the submission:', error);
            alert('An error occurred during submission. Please check the console for more details.');
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
                        <label htmlFor="fundraiserGoal" style={{ display: 'block', marginBottom: '5px' }}>Fundraiser Goal Amount:</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginRight: '5px' }}>$</span>
                            <input type="number" id="fundraiserGoal" name="eventGoal" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} value={formData.eventGoal} onChange={handleChange} />
                        </div>
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
