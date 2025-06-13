import React from "react";

const getSegmentIcon = (type) => {
  if (type === "walk") return "🚶";
  if (type === "subway") return "🚇";
  if (type === "bus") return "🚌";
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
      value: route.scores?.stability,
      unit: "점",
    },
    transfer_convenience: {
      label: "환승 편의성",
      value: route.scores?.transfer_convenience,
      unit: "점",
    },
    least_congestion: {
      label: "평균 혼잡도",
      value: route.scores?.least_congestion,
      unit: "점",
    },
    comfort: {
      label: "쾌적도 점수",
      value: route.scores?.comfort,
      unit: "점",
    },
  };

  const renderMainScore = () => {
    const scoreInfo = scoreConfig[routePreference];

    // Check if score information and its value exist and are not null/undefined
    if (!scoreInfo || scoreInfo.value == null) {
      return <span className="total-time">{route.totalTime}분</span>;
    }

    const valueAsNumber = Number(scoreInfo.value);

    // Check if the conversion to a number was successful. If not, fallback to time.
    if (isNaN(valueAsNumber)) {
      return <span className="total-time">{route.totalTime}분</span>;
    }

    // Determine decimal points based on the unit (0 for minutes, 2 for scores)
    const decimalPoints = scoreInfo.unit === "분" ? 0 : 2;
    const formattedValue = valueAsNumber.toFixed(decimalPoints);

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
