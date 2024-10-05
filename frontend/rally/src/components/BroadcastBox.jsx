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

const BroadcastBox = () => {
  const broadcasts = [
    "Lorum ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nisl nec nisl.",
    "Nullam nec nisl nec nisl. Lorum ipsum dolor sit amet, consectetur adipiscing elit.",
    "consectetur adipiscing elit. Nullam nec nisl nec nisl. Lorum ipsum dolor sit amet,",
  ];

  return (
    <RoundedBox width="100%" margin="1rem 0 0 0">
      Broadcasts
      <br /> <br />
      <div style={{ width: "90%" }}>
        {broadcasts.map((broadcast, index) => (
          <Broadcast broadcast={broadcast} index={index} />
        ))}
      </div>
    </RoundedBox>
  );
};

export default BroadcastBox;
