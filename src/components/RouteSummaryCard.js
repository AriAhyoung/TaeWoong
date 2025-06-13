// src/components/RouteSummaryCard.js

import React from "react";

// This component is now much simpler.
function RouteSummaryCard({ route, rank, onRouteSelect, isSelected }) {
  if (!route) {
    return null;
  }

  const cardClassName = `route-summary-card ${isSelected ? "selected" : ""}`;

  return (
    <div className={cardClassName} onClick={() => onRouteSelect(route.id)}>
      <div className="card-rank">
        <span className="rank-circle">{rank}</span>
      </div>
      <div className="card-content">
        <div className="card-main-info">
          {/* This now displays the hardcoded main text */}
          <span className="total-time" style={{ color: "#1a73e8", fontSize: "2em" }}>
            {route.mainDisplay}
          </span>
          {/* This now displays the hardcoded meta text */}
          <span className="meta-info">{route.metaDisplay}</span>
        </div>

        {/* The segments are empty in this temporary version */}
        <div className="route-segments"></div>

        <div className="card-footer">
          <button className="details-button">경로 상세</button>
          <button className="share-button">공유</button>
        </div>
      </div>
    </div>
  );
}

export default RouteSummaryCard;
