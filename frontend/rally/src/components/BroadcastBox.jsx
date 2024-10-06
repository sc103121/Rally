import React, { useState, useEffect } from "react";
import "./BroadcastBox.css"; // Import the CSS file
import RoundedBox from "./Box";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";

const Broadcast = ({ broadcast, index }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }} key={index}>
      <CampaignOutlinedIcon className="broadcast-icon" />{" "}
      <p className="broadcast-text" style={{ margin: "0.5rem" }}>
        {broadcast}
      </p>
    </div>
  );
};

function BroadcastBox({ onBroadcastClick, event }) {
  const [broadcasts, setBroadcasts] = useState([]);
  const url = process.env.REACT_APP_API_URL; // Backend API URL

  useEffect(() => {
    if (!event || !event._id) {
      console.error("Invalid event or event ID is missing");
      return;
    }

    // Fetch broadcasts from the backend
    fetch(`${url}/events/get_event/${event._id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.message) {
          setBroadcasts(data.message); // Set the existing messages to the broadcasts state
        } else {
          console.error("No broadcasts found in event data");
        }
      })
      .catch((error) => console.error("Error fetching broadcasts:", error));
  }, [event]); // Add event as a dependency to trigger useEffect when event changes

  // Display the first 3 broadcasts and add "..." if more exist
  const displayedBroadcasts = broadcasts.slice(0, 3);
  const hasMoreBroadcasts = broadcasts.length > 3;

  return (
    <RoundedBox width="100%" margin="1rem 0 0 0" onClick={onBroadcastClick}>
      <div>Broadcasts</div>
      <br />
      <div style={{ width: "90%" }}>
        {displayedBroadcasts.map((broadcast, index) => (
          <Broadcast key={index} broadcast={broadcast.message} index={index} />
        ))}
      </div>
      {hasMoreBroadcasts && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>...</div>
      )}
    </RoundedBox>
  );
}

export default BroadcastBox;