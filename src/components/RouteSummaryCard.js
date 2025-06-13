import React from "react";

const getSegmentIcon = (type) => {
  if (type === "walk") return "🚶";
  if (type === "subway") return "🚇";
  if (type === "bus") return "🚌";
  if (type === "transfer") return "→";
  return "●";
};

// The component now uses the `routePreference` prop to decide what to display
function RouteSummaryCard({ route, rank, onRouteSelect, isSelected, routePreference }) {
  if (!route) {
    return null;
  }

  const cardClassName = `route-summary-card ${isSelected ? "selected" : ""}`;

  // This object maps the preference key to a displayable label and the correct score data
  const scoreConfig = {
    overall: {
      label: "총 소요시간",
      value: route.totalTime,
      unit: "분",
    },
    least_time: {
      label: "총 소요시간",
      value: route.totalTime,
      unit: "분",
    },
    stability: {
      label: "안정성 점수",
      value: route.scores?.stability?.toFixed(2),
      unit: "점",
    },
    transfer_convenience: {
      label: "환승 편의성",
      value: route.scores?.transfer_convenience?.toFixed(3),
      unit: "점",
    },
    least_congestion: {
      label: "평균 혼잡도",
      value: route.scores?.least_congestion?.toFixed(2),
      unit: "점",
    },
    comfort: {
      label: "쾌적도 점수",
      value: route.scores?.comfort?.toFixed(2),
      unit: "점",
    },
  };

  const displayScore = scoreConfig[routePreference];

  const renderMainScore = () => {
    // Fallback to total time if the specific score isn't available
    if (!displayScore || displayScore.value === undefined || displayScore.value === null) {
      return <span className="total-time">{route.totalTime}분</span>;
    }

    return (
      <div className="main-score-display">
        <span className="score-label">{displayScore.label}</span>
        <span className="score-value">
          {displayScore.value}
          <span className="score-unit">{displayScore.unit}</span>
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
          {/* This block now renders the dynamic score instead of just the time */}
          {renderMainScore()}

          {/* The total time, distance, and fare are now on the secondary line */}
          <span className="meta-info">
            총 {route.totalTime}분 | {route.totalDistance}km | {route.fare.toLocaleString()}원
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
