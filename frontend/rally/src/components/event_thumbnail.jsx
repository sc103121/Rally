import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Event_thumbnail() {
  const url = "http://localhost:3001/events/get_events";
  const [events, setEvents] = useState([]);
  const [groupedevents, segroupedtEvents] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data = data.sort(
          (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
        );
        console.log(data);
        setEvents(data);
        segroupedtEvents(
          data.reduce((acc, event) => {
            const date = event.eventDate;
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(event);
            return acc;
          }, {})
        );
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  //   const sortedEvents = events.sort(
  //     (a, b) => new Date(a.date) - new Date(b.date)
  //   );

  // var groupedEvents = events.reduce((acc, event) => {
  //   const date = event.date;
  //   if (!acc[date]) {
  //     acc[date] = [];
  //   }
  //   acc[date].push(event);
  //   return acc;
  // }, {});

  const [isFiltered, setIsFiltered] = useState(false);

  const handleFilterToggle = () => {
    if (isFiltered) {
      // If currently filtered, reset to all events
      segroupedtEvents(
        events.reduce((acc, event) => {
          const date = event.eventDate;
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(event);
          return acc;
        }, {})
      );
    } else {
      // If not filtered, filter by user email
      const userEmail = localStorage.getItem("email");
      const filteredEvents = events.filter(
        (event) => event.creator === userEmail
      );
      
      segroupedtEvents(
        filteredEvents.reduce((acc, event) => {
          const date = event.eventDate;
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(event);
          return acc;
        }, {})
      );
    }
    setIsFiltered(!isFiltered);
  };

  return (
    <div>
      <button
        onClick={handleFilterToggle}
        style={{
          padding: "10px 20px",
          margin: "20px 0",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
      >
        {isFiltered ? "Show All Events" : "Filter My Events"}
      </button>
      <div>
        {Object.keys(groupedevents).map((date) => {
          const formattedDate = new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          return (
            <div key={date}>
              <ul>
                <h3 style={{ margin: "16px 0", color: "#333" }}>
                  {formattedDate}
                </h3>
                {groupedevents[date].map((eventDetails, index) => (
                  <Link
                    to={`/event/${eventDetails.id}`}
                    key={eventDetails.id}
                    style={{ textDecoration: "none", color: "inherit" }} // This preserves the styling
                  >
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "16px",
                        margin: "8px 0",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#fff",
                        maxWidth: "400px",
                      }}
                    >
                      <h4 style={{ margin: "0 0 8px 0" }}>
                        {eventDetails.title}
                      </h4>
                      <p style={{ margin: "0 0 8px 0", color: "#555" }}>
                        {eventDetails.eventDescription.length > 180
                          ? `${eventDetails.eventDescription.substring(
                              0,
                              180
                            )}...`
                          : eventDetails.eventDescription}
                      </p>
                      <p style={{ margin: "0", color: "#777" }}>
                        {eventDetails.eventLocation}
                      </p>
                      {eventDetails.eventPublic && (
                        <span
                          style={{
                            position: "absolute",
                            bottom: "8px",
                            right: "8px",
                            fontSize: "16px",
                          }}
                        >
                          🔒
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
