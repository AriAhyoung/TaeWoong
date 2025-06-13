import React from "react";

const getSegmentIcon = (type) => {
  if (type === "walk") return "🚶";
  if (type === "subway") return "🚇";
  if (type === "transfer") return "→";
  return "●";
};

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
          <span className="total-time">{route.totalTime}분</span>
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
