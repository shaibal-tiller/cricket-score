import React from 'react';

function Display() {
  const displayStyle = {
    height: '20vh',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Almost transparent background
  };

  // You can parse data from localStorage here
  // For example:
  const ballsPlayed = localStorage.getItem('ballsPlayed') || 0;
  const totalRuns = localStorage.getItem('totalRuns') || 0;

  return (
    <div style={displayStyle}>
      <p>Balls Played: {ballsPlayed}</p>
      <p>Total Runs: {totalRuns}</p>
      {/* Add more info as needed */}
    </div>
  );
}

export default Display;
