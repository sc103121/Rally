import React from "react";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./event_thumbnail.css";
import { useEffect, useState } from "react";

export const fallbackEvents = [
  {
    id: 1,
    title: "Cornell Campus Rally",
    description:
      "Join us for a peaceful protest to raise awareness about climate change.",
    date: "2023-10-15",
    time: "12:00 PM",
    location: "Cornell University, Ithaca, NY",
    goal: 1000,
    raised: 300,
    isPrivate: false,
  },
  {
    id: 2,
    title: "Cornell Sustainability March",
    description: "March with us to promote sustainable practices on campus.",
    date: "2023-11-05",
    time: "2:00 PM",
    location: "Cornell University, Ithaca, NY",
    goal: 500,
    raised: 100,
    isPrivate: false,
  },
  {
    id: 3,
    title: "Cornell Diversity and Inclusion Rally",
    description:
      "Stand together to support diversity and inclusion within our community.",
    date: "2023-12-01",
    time: "1:00 PM",
    location: "Cornell University, Ithaca, NY",
    goal: 100,
    raised: 50,
    isPrivate: true,
  },
  {
    id: 4,
    title: "Cornell Mental Health Awareness Walk",
    description:
      "Walk to raise awareness about mental health issues and support services.",
    date: "2024-01-20",
    time: "11:00 AM",
    location: "Cornell University, Ithaca, NY",
    goal: 100,
    raised: 10,
    isPrivate: false,
  },
];

export default function Event_thumbnail() {
  const apiURL = process.env.REACT_APP_API_URL;
  const url = `${apiURL}/events/get_events`;
  const [events, setEvents] = useState(fallbackEvents);
  const [groupedEvents, setGroupedEvents] = useState({});
  const [showIndexes, setShowIndexes] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    // Fetch dynamic events from API
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data = data.sort(
          (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
        );
        setEvents(data); // Overwrite fallback events with API data
        groupEvents(data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        groupEvents(fallbackEvents); // Use fallback if API fails
      });
  }, []);

  // Function to group events by date
  const groupEvents = (eventList) => {
    const grouped = eventList.reduce((acc, event) => {
      const date = event.eventDate || event.date; // Support both API and static event format
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {});
    setGroupedEvents(grouped);
  };

  // Toggle filter by user email
  const handleFilterToggle = () => {
    const userEmail = localStorage.getItem("email");
    if (isFiltered) {
      groupEvents(events); // Show all events
    } else {
      const filteredEvents = events.filter(
        (event) => event.creator === userEmail
      );
      groupEvents(filteredEvents); // Show only user-created events
    }
    setIsFiltered(!isFiltered);
  };

  // Staggered animations for event display
  useEffect(() => {
    const timeouts = [];
    events.forEach((_, index) => {
      const dateTimeout = setTimeout(() => {
        setShowIndexes((prev) => [...prev, `date-${index}`]);
      }, index * 600);
      const boxTimeout = setTimeout(() => {
        setShowIndexes((prev) => [...prev, `box-${index}`]);
      }, index * 600 + 300);
      timeouts.push(dateTimeout, boxTimeout);
    });
    return () => timeouts.forEach(clearTimeout); // Clean up on unmount
  }, [events]);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          borderTop: "2px solid",
          borderTopColor: "rgba(0, 0, 0, 0.1)",
          // minHeight: "100vh",
          width: "100%",
        }}
      >
        <button
          onClick={handleFilterToggle}
          className={"rounded-box"}
          style={{
            padding: "10px 20px",
            margin: "20px 0",
            // backgroundColor: "#007BFF",
            color: "#fff",
            // border: "none",
            boxShadow: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
          // onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          // onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
        >
          {isFiltered ? "Show All Events" : "Filter My Events"}
        </button>

        {Object.keys(groupedEvents).map((date, dateIndex) => {
          const formattedDate = new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          });

          return (
            <div key={date}>
              {/* Staggered date */}
              <div
                className={`fade-up ${
                  showIndexes.includes(`date-${dateIndex}`) ? "show" : ""
                }`}
              >
                <h3 style={{ margin: "16px 0", color: "#333" }}>
                  {formattedDate}
                </h3>
              </div>

              {/* Staggered event box */}
              {groupedEvents[date].map((eventDetails, eventIndex) => (
                <Link
                  to={`/event/${eventDetails.id || eventDetails._id}`}
                  key={eventDetails.id || eventDetails._id}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    className={`rounded-box fade-up ${
                      showIndexes.includes(`box-${dateIndex}`) ? "show" : ""
                    }`}
                    style={{
                      marginBottom: "0.5rem",
                    }}
                    // style={{
                    //   position: "relative",
                    //   border: "1px solid #ccc",
                    //   borderRadius: "8px",
                    //   padding: "16px",
                    //   margin: "8px 0",
                    //   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    //   // backgroundColor: "#fff",
                    //   maxWidth: "400px",
                    // }}
                  >
                    <h4 style={{ margin: "0 0 8px 0" }}>
                      {eventDetails.eventName}
                    </h4>
                    <p
                      style={{
                        margin: "0.5rem 0.5rem 0.5rem 0.5rem",
                        color: "#555",
                        textAlign: "center",
                      }}
                    >
                      {eventDetails.description ||
                        eventDetails.eventDescription}
                    </p>
                    <p style={{ margin: "0", color: "#777" }}>
                      {eventDetails.location || eventDetails.eventLocation}
                    </p>
                    {(eventDetails.isPrivate || !eventDetails.eventPublic) && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: "8px",
                          right: "8px",
                          fontSize: "16px",
                        }}
                      >
                        <LockOutlinedIcon />
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
