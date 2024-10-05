import React from "react";
import RoundedBox from "./Box.jsx";
import ProgressBar from "./ProgressBar.jsx";

// The TitleBox now accepts props for dynamic data
function TitleBox({ title, goal, raised }) {
  return (
    <RoundedBox width="100%">
      <div
        style={{ fontSize: "30px", marginBottom: "2rem", marginTop: "1rem" }}
      >
        {title} {/* Use the title prop */}
      </div>

      <ProgressBar goal={goal} raised={raised} /> 
    </RoundedBox>
  );
}

export default TitleBox;
