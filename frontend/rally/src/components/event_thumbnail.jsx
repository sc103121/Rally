import React from "react";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./event_thumbnail.css";
import { useEffect, useState } from "react";

export const events = [
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
  const [showIndexes, setShowIndexes] = useState([]); // Track which items to show

  // Use useEffect to stagger animations
  useEffect(() => {
    const timeouts = [];
    events.forEach((_, index) => {
      // First, show the date
      const dateTimeout = setTimeout(() => {
        console.log(`Showing date-${index}`); // Debugging
        setShowIndexes((prev) => [...prev, `date-${index}`]);
      }, index * 600); // Staggered by 600ms per index

      // Then, show the event box after the date
      const boxTimeout = setTimeout(() => {
        console.log(`Showing box-${index}`); // Debugging
        setShowIndexes((prev) => [...prev, `box-${index}`]);
      }, index * 600 + 300); // Box appears 300ms after date

      timeouts.push(dateTimeout, boxTimeout);
    });

    // Clean up timeouts when the component unmounts
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const sortedEvents = events.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const groupedEvents = sortedEvents.reduce((acc, event) => {
    const date = event.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {});

  return (
    <div
      style={{
        borderTop: "2px solid",
        borderTopColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
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
                to={`/event/${eventDetails.id}`}
                key={eventDetails.id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className={`rounded-box fade-up ${
                    showIndexes.includes(`box-${dateIndex}`) ? "show" : ""
                  }`}
                >
                  <h4 style={{ margin: "0 0 8px 0" }}>{eventDetails.title}</h4>
                  <p
                    style={{
                      margin: "0.5rem 0.5rem 0.5rem 0.5rem",
                      color: "#555",
                      textAlign: "center",
                    }}
                  >
                    {eventDetails.description.length > 180
                      ? `${eventDetails.description.substring(0, 180)}...`
                      : eventDetails.description}
                  </p>
                  <p style={{ margin: "0", color: "#777" }}>
                    {eventDetails.location}
                  </p>
                  {eventDetails.isPrivate && (
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
  );
}
