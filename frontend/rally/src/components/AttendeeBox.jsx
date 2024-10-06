import React from "react";
import "./AttendeeBox.css"; // Import the CSS file
import RoundedBox from "./Box";

const AttendeeBox = ({ onAttendeeClick, attendees }) => {
  // Example array of attendees (could be images or objects in a real scenario)
  // const attendees = [
  //   {
  //     id: 1,
  //     name: "John",
  //     imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane",
  //     imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "Tom",
  //     imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
  //   },
  //   {
  //     id: 4,
  //     name: "Tom",
  //     imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
  //   },
  // ];

  return (
    <RoundedBox width="100%" margin="1rem 0 0 0" onClick={onAttendeeClick}>
      Attendees
      <br /> <br />
      {attendees && attendees.length > 0 ? (
        <div className="attendees-row">
          {attendees.map((attendee) => (
            <div className="attendee" key={attendee.email}>
              <img src={attendee.cid} alt={attendee.email} />
            </div>
          ))}
          {/* Placeholder for more attendees */}
          <div className="placeholder">+36</div>
        </div>
      ) : (
        <div>No attendees available</div>
      )}
    </RoundedBox>
  );
};

export default AttendeeBox;
