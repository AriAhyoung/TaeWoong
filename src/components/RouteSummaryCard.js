import React from "react";

const getSegmentIcon = (type) => {
  if (type === "walk") return "🚶";
  if (type === "subway") return "🚇";
  if (type === "transfer") return "→";
  return "●";
};

function RouteSummaryCard({ route, rank, onRouteSelect, isSelected, routePreference }) {
  if (!route) {
    return null;
  }

  const cardClassName = `route-summary-card ${isSelected ? "selected" : ""}`;

  // This object maps the preference key to a displayable label and the correct score data
  const scoreConfig = {
    overall: { label: "종합 만족도", value: route.scores?.overall, unit: "점" },
    least_time: { label: "총 소요시간", value: route.totalTime, unit: "분" },
    stability: { label: "안정성", value: route.scores?.stability, unit: "점" },
    transfer_convenience: { label: "환승편의성", value: route.scores?.transfer_convenience, unit: "" },
    least_congestion: { label: "혼잡도", value: route.scores?.least_congestion, unit: "" },
    comfort: { label: "쾌적도", value: route.scores?.comfort, unit: "점" },
  };

  const renderMainScore = () => {
    const scoreInfo = scoreConfig[routePreference] || scoreConfig.least_time;
    const value = scoreInfo.value;

    // Safely check if the value is a valid number
    if (value == null || isNaN(Number(value))) {
      // Fallback to displaying total time if score is missing or invalid
      return <span className="total-time">{route.totalTime}분</span>;
    }

    // Determine decimal points for formatting
    const decimalPoints = routePreference === "transfer_convenience" ? 2 : 1;
    const formattedValue = Number(value).toFixed(decimalPoints);

    // If the category is time, just show the time
    if (routePreference === "least_time") {
      return <span className="total-time">{route.totalTime}분</span>;
    }

    // Otherwise, show the score label and value
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
          {renderMainScore()}
          <span className="meta-info">
            시간 {route.totalTime}분 | 환승 {route.transfers || "N/A"}회
          </span>
        </div>

        {/* This part is now preserved to show the path details */}
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
