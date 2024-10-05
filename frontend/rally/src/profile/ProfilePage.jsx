import React, { useState } from 'react';
import './ProfilePage.css'; // Assuming you'll add the CSS here

function ProfilePage() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle the image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="profile-container">
      <div className="profile-picture">
        <label htmlFor="fileInput" className="upload-label">
          {selectedImage ? (
            <img src={selectedImage} alt="Profile" className="profile-img" />
          ) : (
            <img src="camera-icon.png" alt="Camera Icon" />
          )}
        </label>
      </div>
      <div className="input-field">
        <p>{localStorage.getItem('email') || 'No email found'}</p>
      </div>
      <button className="delete-button" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default ProfilePage;
