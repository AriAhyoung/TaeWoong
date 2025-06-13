// src/components/RouteSummaryCard.js (Final Corrected Version)

import React from "react";

const getSegmentIcon = (type) => {
  if (type === "walk") return "🚶";
  if (type === "subway") return "🚇";
  if (type === "bus") return "🚌";
  if (type === "transfer") return "→";
  return "●";
};

// This component now correctly receives routePreference and displays the right score
function RouteSummaryCard({ route, rank, onRouteSelect, isSelected, routePreference }) {
  if (!route) {
    return null;
  }

  const cardClassName = `route-summary-card ${isSelected ? "selected" : ""}`;

  // This object maps the preference from the Header to a display label and the correct score
  const scoreConfig = {
    overall: { label: "총 소요시간", value: route.totalTime, unit: "분" },
    least_time: { label: "최소 시간", value: route.totalTime, unit: "분" },
    stability: { label: "안정성", value: route.scores?.stability, unit: "" },
    transfer_convenience: { label: "환승편의성", value: route.scores?.transfer_convenience, unit: "" },
    least_congestion: { label: "혼잡도", value: route.scores?.least_congestion, unit: "" },
    comfort: { label: "쾌적도", value: route.scores?.comfort, unit: "" },
  };

  const renderMainScore = () => {
    const scoreInfo = scoreConfig[routePreference] || scoreConfig.overall;

    // Check if the score value is a valid number
    if (scoreInfo.value == null || isNaN(Number(scoreInfo.value))) {
      // Fallback to displaying total time if score is missing or invalid
      return <span className="total-time">{route.totalTime}분</span>;
    }

    // Format the number for display
    const decimalPoints = routePreference === "least_time" || routePreference === "overall" ? 0 : 1;
    const formattedValue = Number(scoreInfo.value).toFixed(decimalPoints);

    // This is the main display block from your screenshot
    return (
      <div className="main-score-display">
        <span className="score-value">
          {scoreInfo.label} {formattedValue}
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
          {/* Render the main score display */}
          {renderMainScore()}

          {/* Render the secondary information */}
          <span className="meta-info">
            시간 {route.totalTime}분 | 환승 {route.transfers}회
          </span>
        </div>

        {/* This part is preserved to show the path details */}
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
