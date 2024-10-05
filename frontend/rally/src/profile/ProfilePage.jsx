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

  return (
    <div className="profile-container">
      <div className="profile-picture">
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <label htmlFor="fileInput" className="upload-label">
          {selectedImage ? (
            <img src={selectedImage} alt="Profile" className="profile-img" />
          ) : (
            <img src="camera-icon.png" alt="Camera Icon" />
          )}
        </label>
      </div>
      <div className="input-field">
        <input type="text" placeholder="Username" />
      </div>
      <div className="input-field">
        <input type="password" placeholder="Change Password" />
      </div>
      <button className="delete-button">Delete</button>
    </div>
  );
}

export default ProfilePage;
