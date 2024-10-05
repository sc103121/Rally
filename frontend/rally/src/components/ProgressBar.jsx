import React from "react";
import "./ProgressBar.css"; // Import CSS for the progress bar

const ProgressBar = ({ goal, raised }) => {
  const percentage = Math.min((raised / goal) * 100, 100); // Calculate percentage, max 100%

  return (
    <>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${percentage}%` }}>
          {percentage.toFixed(1)}%
        </div>
      </div>
      <div className="progress-info">
        ${raised.toLocaleString()} raised of ${goal.toLocaleString()} goal
      </div>
    </>
  );
};

export default ProgressBar;
