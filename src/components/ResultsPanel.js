import React from "react";
import RouteSummaryCard from "./RouteSummaryCard";
// DetailedRouteView can be used later
// import DetailedRouteView from './DetailedRouteView';

function ResultsPanel({ routeOptions, startPoint, destinationPoint }) {
  // If there are no routes, show a message
  if (!routeOptions || routeOptions.length === 0) {
    return (
      <aside className="results-panel">
        <div className="results-placeholder">경로를 검색해주세요.</div>
      </aside>
    );
  }

  return (
    <aside className="results-panel">
      <div className="results-header">
        <h3>
          {startPoint || "출발지"} → {destinationPoint || "도착지"}
        </h3>
      </div>
      <div className="routes-list">
        {routeOptions.map((route, index) => (
          <RouteSummaryCard
            key={route.id}
            route={route}
            rank={index + 1} // Assign rank based on order
          />
        ))}
      </div>
    </aside>
  );
}

export default ResultsPanel;
