import React, { useState, useEffect } from "react";
import "../components/Box.css"; // Ensure your styles are imported

function CreateEventPage() {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    eventLocation: "",
    eventDescription: "",
    eventImage: null,
    eventPublic: false,
    eventGoal: 0,
    evenRaised: 0,
    attendees: JSON.stringify([
      {
        email: localStorage.getItem("email"),
        cid: localStorage.getItem("cid"),
        alias: localStorage.getItem("alias"),
      },
    ]),
    creator: localStorage.getItem("email"),
  });

  const [showIndexes, setShowIndexes] = useState([]); // Track which elements to show

  // Stagger the appearance of form elements
  useEffect(() => {
    const timeouts = [];
    const elements = [
      "eventName",
      "eventDate",
      "eventTime",
      "eventLocation",
      "eventDescription",
      "eventImage",
      "eventGoal",
      "eventPublic",
      "submitButton",
    ];

    elements.forEach((element, index) => {
      const timeout = setTimeout(() => {
        setShowIndexes((prev) => [...prev, element]);
      }, index * 100); // Stagger each element by 100ms
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout); // Cleanup timeouts on unmount
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Print the entire form except the image
    const { eventImage, ...formWithoutImage } = formData;
    console.log("Form data without image:", formWithoutImage);

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:3001/events/events", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Event created successfully:", result);
      window.location.href = "/";
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgb(255, 233.9, 208.12) 0%, rgb(209.52, 165.22, 163.69) 100%)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            paddingBottom: "1rem",
            marginTop: "1rem",
            fontFamily: "Montserrat",
            borderBottom: "1px solid rgba(0,0,0,0.3)",
          }}
        >
          Create Event
        </h1>
        <form onSubmit={handleSubmit}>
          <div
            style={{ marginBottom: "15px" }}
            className={`fade-up ${
              showIndexes.includes("eventName") ? "show" : ""
            }`}
          >
            <label
              htmlFor="eventName"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Event Name:
            </label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              required
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                border: "1px solid rgba(0, 0, 0, 0.3)",
              }}
              value={formData.eventName}
              onChange={handleChange}
            />
          </div>

          <div
            style={{ marginBottom: "15px" }}
            className={`fade-up ${
              showIndexes.includes("eventDate") ? "show" : ""
            }`}
          >
            <label
              htmlFor="eventDate"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Event Date:
            </label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              required
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                border: "1px solid rgba(0, 0, 0, 0.3)",
              }}
              value={formData.eventDate}
              onChange={handleChange}
            />
          </div>

          <div
            style={{ marginBottom: "15px" }}
            className={`fade-up ${
              showIndexes.includes("eventTime") ? "show" : ""
            }`}
          >
            <label
              htmlFor="eventTime"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Event Time:
            </label>
            <input
              type="time"
              id="eventTime"
              name="eventTime"
              required
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                border: "1px solid rgba(0, 0, 0, 0.3)",
              }}
              value={formData.eventTime}
              onChange={handleChange}
            />
          </div>

          <div
            style={{ marginBottom: "15px" }}
            className={`fade-up ${
              showIndexes.includes("eventLocation") ? "show" : ""
            }`}
          >
            <label
              htmlFor="eventLocation"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Event Location:
            </label>
            <input
              type="text"
              id="eventLocation"
              name="eventLocation"
              required
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                border: "1px solid rgba(0, 0, 0, 0.3)",
              }}
              value={formData.eventLocation}
              onChange={handleChange}
            />
          </div>

          <div
            style={{ marginBottom: "15px" }}
            className={`fade-up ${
              showIndexes.includes("eventDescription") ? "show" : ""
            }`}
          >
            <label
              htmlFor="eventDescription"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Event Description:
            </label>
            <textarea
              id="eventDescription"
              name="eventDescription"
              required
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                minHeight: "100px",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                border: "1px solid rgba(0, 0, 0, 0.3)",
              }}
              value={formData.eventDescription}
              onChange={handleChange}
            ></textarea>
          </div>

          <div
            style={{ marginBottom: "15px" }}
            className={`fade-up ${
              showIndexes.includes("eventImage") ? "show" : ""
            }`}
          >
            <label
              htmlFor="eventImage"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Event Image:
            </label>
            <input
              type="file"
              id="eventImage"
              name="eventImage"
              accept="image/*"
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
              }}
              onChange={handleChange}
            />
          </div>

          <div
            style={{ marginBottom: "15px" }}
            className={`fade-up ${
              showIndexes.includes("eventGoal") ? "show" : ""
            }`}
          >
            <label
              htmlFor="fundraiserGoal"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Fundraiser Goal Amount:
            </label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "5px" }}>$</span>
              <input
                type="number"
                id="fundraiserGoal"
                name="eventGoal"
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  boxSizing: "border-box",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  border: "1px solid rgba(0, 0, 0, 0.3)",
                }}
                value={formData.eventGoal}
                onChange={handleChange}
              />
            </div>
          </div>

          <div
            style={{ marginBottom: "15px" }}
            className={`fade-up ${
              showIndexes.includes("eventPublic") ? "show" : ""
            }`}
          >
            <label
              htmlFor="eventPublic"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Event Public:
            </label>
            <input
              type="checkbox"
              id="eventPublic"
              name="eventPublic"
              style={{ marginRight: "10px" }}
              checked={formData.eventPublic}
              onChange={handleChange}
            />
            <span>Make event public</span>
          </div>

          <button
            type="submit"
            className={`fade-up ${
              showIndexes.includes("submitButton") ? "show" : ""
            }`}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "white",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEventPage;
