import React from "react";
import RouteSummaryCard from "./RouteSummaryCard";

// This component must accept `routePreference` and pass it to the card
function ResultsPanel({ routeOptions, startPoint, destinationPoint, selectedRouteId, onRouteSelect, routePreference }) {
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
            rank={index + 1}
            onRouteSelect={onRouteSelect}
            isSelected={selectedRouteId === route.id}
            // This passes the selected preference down to the card
            routePreference={routePreference}
          />
        ))}
      </div>
    </aside>
  );
}

export default ResultsPanel;
