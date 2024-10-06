import React, { useState } from "react";
import "./ProfilePage.css"; // Assuming you'll add the CSS here

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
    window.location.href = "/";
  };

  return (
    <>
      <div className="profile-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <h1
            style={{
              marginBottom: "2rem",
            }}
          >
            Profile
          </h1>
        </div>
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="Camera Icon"
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            overflow: "hidden",
            borderRadius: "50%",
            marginBottom: "1rem",
          }}
        />
        <div className="input-field">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <p>Email: {localStorage.getItem("email") || "No email found"}</p>
          </div>
        </div>
        <button className="delete-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}

export default ProfilePage;
