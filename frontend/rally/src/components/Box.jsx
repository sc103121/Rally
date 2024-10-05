import React from "react";
import "./Box.css"; // Import the CSS file

// Define the component that accepts width, height, and children props
const RoundedBox = ({
  width = "auto",
  height = "auto",
  margin,
  padding,
  isButton = false,
  onClick = null,
  children,
}) => {
  const dynamicStyle = {
    width: width,
    height: height === "auto" ? "auto" : height,
    margin: margin,
    padding: padding,
  };
  isButton = onClick || isButton; // If there's an onClick function, it's a button
  // Handle hover styles if it's a button
  const handleMouseEnter = (e) => {
    if (isButton) {
      e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)"; // Change background on hover
    }
  };

  const handleMouseLeave = (e) => {
    if (isButton) {
      e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)"; // Revert background when not hovered
    }
  };

  return (
    <div
      className="rounded-box"
      style={dynamicStyle}
      onClick={isButton ? onClick : null}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default RoundedBox;
