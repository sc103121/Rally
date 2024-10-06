import React from "react";
import RoundedBox from "./Box.jsx";
import ProgressBar from "./ProgressBar.jsx";

// The TitleBox now accepts props for dynamic data
function TitleBox({ event }) {
  return (
    <RoundedBox width="100%">
      <div
        style={{ fontSize: "30px", marginBottom: "2rem", marginTop: "1rem" }}
      >
        {event.eventName} {/* Use the title prop */}
      </div>

      <ProgressBar goal={event.eventGoal} raised={event.eventRaised} />
    </RoundedBox>
  );
}

export default TitleBox;
