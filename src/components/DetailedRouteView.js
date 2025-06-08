import React from "react";
import "../App.css"; // For shared styles

function DetailedRouteView({ route, onBack }) {
  if (!route) return <p>No route selected for detailed view.</p>;

  // Placeholder for actual directions (this would come from your algorithm's data)
  const mockDirections = [
    "Head southeast on Main St. (200m)",
    "Turn left onto Green Blvd. (500m)",
    "Continue straight past the park (1.2km)",
    "Arrive at destination on your right (100m)",
  ];

  return (
    <div id="selected-route-details" className="detailed-route-view">
      <button className="back-to-options-btn" onClick={onBack}>
        ← Back to Options
      </button>
      <h3>{route.name} Details</h3>
      <p className="total-summary">
        Total: {route.time}, {route.distance}
      </p>
      <div className="directions-list">
        <h4>Directions:</h4>
        <ol>
          {mockDirections.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default DetailedRouteView;
