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

  // This object maps the preference key to a displayable label and the correct score data
  const scoreConfig = {
    overall: { label: "총 소요시간", value: route.totalTime, unit: "분" },
    least_time: { label: "최소 시간", value: route.totalTime, unit: "분" },
    stability: { label: "안정성", value: route.scores?.stability, unit: "점" },
    transfer_convenience: { label: "환승편의성", value: route.scores?.transfer_convenience, unit: "" },
    least_congestion: { label: "혼잡도", value: route.scores?.least_congestion, unit: "점" },
    comfort: { label: "쾌적도", value: route.scores?.comfort, unit: "점" },
  };

  const renderMainScore = () => {
    const scoreInfo = scoreConfig[routePreference] || scoreConfig.overall;

    // Check if the score value exists and is a valid number
    if (scoreInfo.value == null || isNaN(Number(scoreInfo.value))) {
      // Fallback to total time if score is missing or not a number
      return <span className="total-time">{route.totalTime}분</span>;
    }

    // Format the number. 0 decimals for time, 2 for scores, 3 for transfer convenience.
    let decimalPoints = 2;
    if (routePreference === "least_time" || routePreference === "overall") {
      decimalPoints = 0;
    } else if (routePreference === "transfer_convenience") {
      decimalPoints = 2; // Show more precision for transfer score
    }

    const formattedValue = Number(scoreInfo.value).toFixed(decimalPoints);

    return (
      <div className="main-score-display">
        <span className="score-label">{scoreInfo.label}</span>
        <span className="score-value">
          {formattedValue}
          <span className="score-unit">{scoreInfo.unit}</span>
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
          {renderMainScore()}
          <span className="meta-info">
            {/* Display total time here if it's not the main score */}
            {routePreference !== "least_time" && routePreference !== "overall" && `시간 ${route.totalTime}분 | `}
            {route.totalDistance}km | {route.fare.toLocaleString()}원
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
