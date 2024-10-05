import React from "react";
import Search from "../components/search";
import Event_thumbnail from "../components/event_thumbnail";
import Create_event_button from "../components/create_event_button";

function Home() {
  return (<div>

  <h2>Home Page</h2>;
  <Search />
  <Event_thumbnail />
  <Create_event_button />
  </div>)
}

export default Home;
