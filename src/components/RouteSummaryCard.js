import React from "react";

// A helper function to get the right icon based on segment type
const getSegmentIcon = (type) => {
  if (type === "walk") return "🚶"; // Walking person emoji
  if (type === "subway") return "🚇"; // Subway emoji
  if (type === "bus") return "🚌"; // Bus emoji
  if (type === "transfer") return "›"; // Arrow for transfer
  return "●";
};

function RouteSummaryCard({ route, rank }) {
  if (!route) {
    return null;
  }

  return (
    <div className="route-summary-card">
      <div className="card-rank">
        <span className="rank-circle">{rank}</span>
      </div>
      <div className="card-content">
        <div className="card-main-info">
          <span className="total-time">{route.totalTime}분</span>
          <span className="meta-info">
            {route.totalDistance}km | {route.fare.toLocaleString()}원
          </span>
        </div>
        <div className="route-segments">
          {route.segments.map((segment, index) => (
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
