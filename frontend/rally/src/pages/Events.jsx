import React from "react";
import "./Events.css";
import TitleBox from "../components/TitleBox";
import "./RoundedLayout.css"; // Import the CSS file'
import "../components/Box.css";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import AttendeeBox from "../components/AttendeeBox";

function InfoBox() {
  return (
    <div className="layout-wrapper">
      {/* Main Box taking up 60% of the width */}
      <div className="main-box rounded-box">
        {/* <h2>Main Box (60%)</h2> */}
        Description
        <br />
        <br />
        Lorum ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nisl
        nec nisl.
      </div>

      {/* Column Box taking up 40% of the width, with 3 smaller boxes */}
      <div className="column-box">
        <div className="small-box rounded-box">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignContent: "space-around",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "0.5rem",
            }}
          >
            <LocationOnOutlinedIcon />{" "}
            <div>
              Location
              <br />
              <a style={{ color: "gray" }}>Location</a>
            </div>
          </div>
        </div>
        <div className="small-box rounded-box">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignContent: "space-around",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "0.5rem",
            }}
          >
            <AccessTimeOutlinedIcon />{" "}
            <div
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              Date
              <br />
              <a style={{ color: "gray" }}>Time</a>
            </div>
          </div>
        </div>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
          className="small-box rounded-box"
        >
          Going <CheckOutlinedIcon />
        </div>
      </div>
    </div>
  );
}

// function AttendeeBox() {
//   return (
//     <div className="layout-wrapper">
//       <div className="rounded-box">
//         Attendees
//         <br />
//         <br />
//         <AttendeeBox />
//         {/* <div style={{ display: "flex", direction: "row" }} className="attendee">
//           <img
//             src="https://randomuser.me/api/portraits" // Random user image
//             alt="User"
//             style={{
//               borderRadius: "50%",
//               width: "100%",
//               height: "50px",
//               marginRight: "1rem",
//             }}
//           />
//           <div>
//             <b>John Doe</b>
//             <br />
//             <a style={{ color: "gray" }}>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//             </a>
//           </div>
//         </div> */}
//         <div className="attendee">
//           <img
//             src="https://randomuser.me/api/photos" // Random user image
//             alt="User"
//             style={{
//               borderRadius: "50%",
//               width: "50px",
//               height: "50px",
//               marginRight: "1rem",
//             }}
//           />
//           <div>
//             <b>Jane Doe</b>
//             <br />
//             <a style={{ color: "gray" }}>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
      <InfoBox />
      <AttendeeBox />
    </div>
  );
};

export default Events;
