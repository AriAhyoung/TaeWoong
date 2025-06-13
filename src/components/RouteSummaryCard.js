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
    least_time: { label: "", value: route.totalTime, unit: "분" },
    stability: { label: "안정성", value: route.scores?.stability, unit: "" },
    transfer_convenience: { label: "환승편의성", value: route.scores?.transfer_convenience, unit: "" },
    least_congestion: { label: "혼잡도", value: route.scores?.least_congestion, unit: "" },
    comfort: { label: "쾌적도", value: route.scores?.comfort, unit: "" },
    overall: { label: "", value: route.totalTime, unit: "분" },
  };

  const renderMainDisplay = () => {
    const scoreInfo = scoreConfig[routePreference] || scoreConfig.least_time;
    const value = scoreInfo.value;

    if (value == null || isNaN(Number(value))) {
      return <span className="total-time">{route.totalTime}분</span>;
    }

    const decimalPoints = routePreference === "transfer_convenience" ? 2 : 1;
    const formattedValue = Number(value).toFixed(decimalPoints);

    if (routePreference === "least_time" || routePreference === "overall") {
      return <span className="total-time">{route.totalTime}분</span>;
    }

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
          {renderMainDisplay()}
          <span className="meta-info">
            시간 {route.totalTime}분 | 환승 {route.transfers || "N/A"}회
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
