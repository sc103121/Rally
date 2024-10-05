import React from "react";
import "./ProgressBar.css"; // Import CSS for the progress bar

const ProgressBar = ({ goal, raised }) => {
  // Ensure goal and raised are valid numbers, defaulting to 0 if undefined
  const validGoal = goal || 0;
  const validRaised = raised || 0;
  const percentage = validGoal > 0 ? Math.min((validRaised / validGoal) * 100, 100) : 0; // Calculate percentage, max 100%

  return (
    <>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${percentage}%` }}>
          {percentage.toFixed(1)}%
        </div>
      </div>
      <div className="progress-info">
        ${validRaised.toLocaleString()} raised of ${validGoal.toLocaleString()} goal
      </div>
    </>
  );
};

export default ProgressBar;
