// src/components/ResultsPanel.js

import React from "react";
import RouteSummaryCard from "./RouteSummaryCard";

// THIS IS THE CHANGE: Accept routePreference as a prop
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
            // THIS IS THE CHANGE: Pass the prop down to the card
            routePreference={routePreference}
          />
        ))}
      </div>
    </aside>
  );
}

export default ResultsPanel;
