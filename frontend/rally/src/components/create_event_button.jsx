import React from "react";
import { useNavigate } from "react-router-dom";

export default function Create_event_button() {
    const history = useNavigate();

    const handleClick = () => {
        history.push("/create-event");
    };

    return (
        <div>
            <button
                onClick={handleClick}
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    width: "70px", // Increased width
                    height: "70px", // Increased height
                    borderRadius: "50%",
                    backgroundColor: "#ffcc00", // Changed background color to a warmer, more neutral color
                    color: "white",
                    border: "none",
                    fontSize: "32px", // Increased font size
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                }}
            >
                +
            </button>
        </div>
    );
}

