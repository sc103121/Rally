import React from "react";
import RoundedBox from "./Box.jsx";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";

const ShareButton = ({ event }) => {
  // Function to handle the sharing action
  const handleShare = async () => {
    // Check if the Web Share API is supported by the browser
    const apiURL = process.env.REACT_APP_API_URL;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          text: "Here is something I wanted to share with you.",
          url: `http://localhost:3000/invites/${event._id}`, // Replace with your actual URL
        });
        console.log("Successfully shared");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert("Sharing is not supported on this browser. Copy the URL manually.");
    }
  };

  return (
    <RoundedBox
      isButton={true}
      onClick={handleShare}
      customStyles={{
        width: "100px", // Adjust width as needed
        height: "50px", // Adjust height as needed
        backgroundColor: "#e0f7fa", // Set your preferred background color
      }}
    >
      {/* Share icon inside the button */}
      <IosShareOutlinedIcon />
    </RoundedBox>
  );
};

export default ShareButton;
