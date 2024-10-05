import React from "react";
import "./Events.css";
import TitleBox from "../components/TitleBox";
import "./RoundedLayout.css"; // Import the CSS file'
import "../components/Box.css";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

export const Events = () => {
  return (
    // <div className="box">
    //   <div className="events-page">
    //     {/* Wishlist
    //   TitleBox
    //   DescriptionBox
    //   Location DateTime RSVP
    //   Attendees
    //   Broadcasts
    //   Donate
    //   Share*/}
    //     <TitleBox />
    //   </div>
    // </div>
    <div className="background">
      <TitleBox />
      <div className="layout-wrapper">
        {/* Main Box taking up 60% of the width */}
        <div className="main-box rounded-box">
          {/* <h2>Main Box (60%)</h2> */}
          Description
          <br />
          <br />
          Lorum ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
          nisl nec nisl fermentum.
        </div>

        {/* Column Box taking up 40% of the width, with 3 smaller boxes */}
        <div className="column-box">
          <div className="small-box rounded-box">Box 1</div>
          <div className="small-box rounded-box">Box 2</div>
          <div className="small-box rounded-box">Box 3</div>
        </div>
      </div>
    </div>
  );
};

export default Events;
