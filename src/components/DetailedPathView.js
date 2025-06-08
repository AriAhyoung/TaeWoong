import React from "react";
import "../App.css";

const getSegmentIcon = (type) => {
  if (type === "walk") return "🚶";
  if (type === "subway") return "🚇";
  if (type === "bus") return "🚌";
  if (type === "transfer") return "→";
  return "●";
};

function DetailedPathView({ selectedRoute }) {
  if (!selectedRoute || !selectedRoute.segments) {
    return <aside className="detailed-path-view empty"></aside>;
  }

  return (
    <aside className="detailed-path-view">
      <h4>상세 경로</h4>
      <ul>
        {selectedRoute.segments.map((segment, index) => (
          <li key={index} className={`path-segment-item type-${segment.type}`}>
            <span className={`path-segment-icon line-${segment.line}`}>{getSegmentIcon(segment.type)}</span>
            <span className="path-segment-detail">{segment.detail}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default DetailedPathView;
