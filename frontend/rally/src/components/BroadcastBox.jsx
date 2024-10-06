import React from "react";
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

const BroadcastBox = ({ onBroadcastClick }) => {
  const broadcasts = [
    "Lorum ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nisl nec nisl.",
    "Nullam nec nisl nec nisl. Lorum ipsum dolor sit amet, consectetur adipiscing elit.",
    "consectetur adipiscing elit. Nullam nec nisl nec nisl. Lorum ipsum dolor sit amet,",
    "Lorum ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nisl nec nisl.",
    "Nullam nec nisl nec nisl. Lorum ipsum dolor sit amet, consectetur adipiscing elit.",
    "consectetur adipiscing elit. Nullam nec nisl nec nisl. Lorum ipsum dolor sit amet,",
  ];
  const displayedBroadcasts = broadcasts.slice(0, 3);
  const hasMoreBroadcasts = broadcasts.length > 3;

  return (
    <RoundedBox width="100%" margin="1rem 0 0 0" onClick={onBroadcastClick}>
      Broadcasts
      <br /> <br />
      <div style={{ width: "90%" }}>
        {displayedBroadcasts.map((broadcast, index) => (
          <Broadcast broadcast={broadcast} index={index} />
        ))}
      </div>
      {hasMoreBroadcasts && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>...</div>
      )}
    </RoundedBox>
  );
};

export default BroadcastBox;
