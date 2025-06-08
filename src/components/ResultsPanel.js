// src/components/ResultsPanel.js

import React from "react";
import RouteSummaryCard from "./RouteSummaryCard";

// Update props to accept selectedRouteId and onRouteSelect
function ResultsPanel({ routeOptions, startPoint, destinationPoint, selectedRouteId, onRouteSelect }) {
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
            // Pass the selection handler and check if this card is the selected one
            onRouteSelect={onRouteSelect}
            isSelected={selectedRouteId === route.id}
          />
        ))}
      </div>
    </aside>
  );
}

export default ResultsPanel;
