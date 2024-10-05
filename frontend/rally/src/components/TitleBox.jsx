import React from "react";
import RoundedBox from "./Box.jsx";
import ProgressBar from "./ProgressBar.jsx";

function TitleBox() {
  const goal = 1000;
  const raised = 500;
  return (
    <RoundedBox width="100%">
      <div
        style={{ fontSize: "30px", marginBottom: "2rem", marginTop: "1rem" }}
      >
        Title
      </div>

      <ProgressBar goal={goal} raised={raised} />
    </RoundedBox>
  );
}

export default TitleBox;
