import React from "react";
import Search from "../components/search";
import Event_thumbnail from "../components/event_thumbnail";
import Create_event_button from "../components/create_event_button";
import Profile_photo_link from "../components/profile_photo_link";
function Home() {
  return (
    <div className="background">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          // padding: "1rem",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ flexGrow: "1", marginRight: "2.5rem" }}>
          <Search />
        </div>
        <Profile_photo_link />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
          alignItems: "left",
          width: "100%",
          flexDirection: "row",
        }}
      >
        <p
          style={{
            fontFamily: "Montserrat",
            fontSize: "2rem",
            fontWeight: "bold",
            justifyContent: "left",
            margin: 0,
          }}
        >
          Your movements
        </p>
      </div>

      <Event_thumbnail />
      <Create_event_button />
    </div>
  );
}

export default Home;
