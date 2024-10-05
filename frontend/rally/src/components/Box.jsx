import React from "react";
import "./Box.css"; // Import the CSS file

// Define the component that accepts width, height, and children props
const RoundedBox = ({
  width = "auto",
  height = "auto",
  margin,
  padding,
  children,
}) => {
  const dynamicStyle = {
    width: width,
    height: height === "auto" ? "auto" : height,
    margin: margin,
    padding: padding,
  };

  return (
    <div className="rounded-box" style={dynamicStyle}>
      {children}
    </div>
  );
};

export default RoundedBox;
