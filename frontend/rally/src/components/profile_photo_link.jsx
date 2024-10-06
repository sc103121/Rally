import React from "react";

export default function Profile_photo_link() {
  return (
    <div style={{}}>
      <a href="/profile">
        <div
          style={{
            width: "50px",
            height: "50px",
          }}
        >
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Profile Thumbnail"
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
          />
        </div>
      </a>
    </div>
  );
}
