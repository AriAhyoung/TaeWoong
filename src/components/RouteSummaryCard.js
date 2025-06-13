// src/components/RouteSummaryCard.js

import React from "react";

const getSegmentIcon = (type) => {
  if (type === "walk") return "🚶";
  if (type === "subway") return "🚇";
  if (type === "bus") return "🚌";
  if (type === "transfer") return "→";
  return "●";
};

// The component now accepts routePreference to decide what to display
function RouteSummaryCard({ route, rank, onRouteSelect, isSelected, routePreference }) {
  if (!route) {
    return null;
  }

  const cardClassName = `route-summary-card ${isSelected ? "selected" : ""}`;

  // This function will now return a hardcoded label and the route's main score/time
  const renderMainDisplay = () => {
    let label = "총 소요시간";
    let value = route.totalTime;
    let unit = "분";

    // This switch statement sets the correct label and value based on the selected option
    switch (routePreference) {
      case "least_congestion":
        label = "혼잡도";
        value = route.scores?.least_congestion;
        unit = ""; // The unit is part of the score name
        break;
      case "stability":
        label = "안정성";
        value = route.scores?.stability;
        unit = "";
        break;
      case "comfort":
        label = "쾌적도";
        value = route.scores?.comfort;
        unit = "";
        break;
      case "transfer_convenience":
        label = "환승편의성";
        value = route.scores?.transfer_convenience;
        unit = "";
        break;
      default: // 'least_time' and 'overall' will use the default time display
        break;
    }

    // Format the value safely
    const formattedValue =
      value != null && !isNaN(Number(value)) ? Number(value).toFixed(routePreference === "transfer_convenience" ? 2 : 1) : route.totalTime; // Fallback to time if score is invalid

    if (routePreference === "least_time" || routePreference === "overall") {
      return <span className="total-time">{route.totalTime}분</span>;
    }

    return (
      <div className="main-score-display">
        <span className="score-value">
          {label} {formattedValue}
        </span>
      </div>
    );
  };

  return (
    <div className={cardClassName} onClick={() => onRouteSelect(route.id)}>
      <div className="card-rank">
        <span className="rank-circle">{rank}</span>
      </div>
      <div className="card-content">
        <div className="card-main-info">
          {renderMainDisplay()}
          <span className="meta-info">
            시간 {route.totalTime}분 | {route.totalDistance}km | {route.fare.toLocaleString()}원
          </span>
        </div>
        <div className="route-segments">
          {route.segments &&
            route.segments.map((segment, index) => (
              <div key={index} className={`segment-item type-${segment.type}`}>
                <span className={`segment-icon line-${segment.line}`}>{getSegmentIcon(segment.type)}</span>
                <span className="segment-detail">{segment.detail}</span>
              </div>
            ))}
        </div>
        <div className="card-footer">
          <button className="details-button">경로 상세</button>
          <button className="share-button">공유</button>
        </div>
      </div>
    </div>
  );
}

export default RouteSummaryCard;
