import React from "react";
import RoundedBox from "./Box.jsx";
import ProgressBar from "./ProgressBar.jsx";

// The TitleBox now accepts props for dynamic data
function TitleBox({ event }) {
  return (
    <RoundedBox width="100%">
      <div
        style={{
          fontSize: "30px",
          marginBottom: "2rem",
          marginTop: "1rem",
          fontFamily: "Montserrat",
        }}
      >
        {event.eventName}
      </div>
      {/*Only show progress bar if there is an eventGoal*/}
      {event.eventGoal && (
        <ProgressBar goal={event.eventGoal} raised={event.eventRaised} />
      )}
    </RoundedBox>
  );
}

export default TitleBox;
