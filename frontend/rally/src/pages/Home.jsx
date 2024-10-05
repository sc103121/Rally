import React from "react";
import Search from "../components/search";
import Event_thumbnail from "../components/event_thumbnail";
import Create_event_button from "../components/create_event_button";
import Profile_photo_link from "../components/profile_photo_link";
function Home() {
  return (<div>

  <h2>Home Page</h2>;
  <Search />
  <Profile_photo_link />
  <Event_thumbnail />
  <Create_event_button />
  </div>)
}

export default Home;
