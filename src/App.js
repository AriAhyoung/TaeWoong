// src/App.js

import React, { useState } from "react";
import "./App.css";
import DetailedPathView from "./components/DetailedPathView";
import Header from "./components/Header";
import ResultsPanel from "./components/ResultsPanel";
import MapPanel from "./components/MapPanel";
import { mockRouteData } from "./mockData"; // Import the hardcoded data

function App() {
  const [hasRestroom, setHasRestroom] = useState(false);
  const [hasElevator, setHasElevator] = useState(false);
  const [startPoint, setStartPoint] = useState("");
  const [destinationPoint, setDestinationPoint] = useState("");
  const [routeOptions, setRouteOptions] = useState([]);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [routePreference, setRoutePreference] = useState("overall");

  // This function now uses the hardcoded mockData instead of fetching from a server
  const handleFindRoute = () => {
    if (startPoint && destinationPoint) {
      console.log(`Displaying hardcoded results for preference: ${routePreference}`);
      setIsLoading(true);
      setRouteOptions([]); // Clear previous results

      // Simulate a network delay
      setTimeout(() => {
        const dataToShow = mockRouteData[routePreference] || [];
        setRouteOptions(dataToShow);
        setSelectedRouteId(dataToShow.length > 0 ? dataToShow[0].id : null);
        setIsLoading(false);
      }, 500);
    } else {
      alert("Please enter both start and destination points.");
    }
  };

  const handleRouteSelect = (routeId) => {
    setSelectedRouteId(routeId);
  };

  const handleShowDetailedView = (routeId) => {
    setSelectedRouteId(routeId);
    setShowDetailedView(true);
  };

  const handleBackToOptions = () => {
    setShowDetailedView(false);
  };

  const handleReverse = () => {
    const tempStart = startPoint;
    setStartPoint(destinationPoint);
    setDestinationPoint(tempStart);
  };

  const currentSelectedRoute = routeOptions.find((route) => route.id === selectedRouteId);

  return (
    <div className="app-container">
      <Header
        startPoint={startPoint}
        setStartPoint={setStartPoint}
        destinationPoint={destinationPoint}
        setDestinationPoint={setDestinationPoint}
        onFindRoute={handleFindRoute}
        onReverse={handleReverse}
        routePreference={routePreference}
        setRoutePreference={setRoutePreference}
        hasRestroom={hasRestroom}
        setHasRestroom={setHasRestroom}
        hasElevator={hasElevator}
        setHasElevator={setHasElevator}
      />

      {isLoading && <div className="loading-indicator">Finding routes...</div>}

      <main className="main-content-area">
        <ResultsPanel
          routeOptions={routeOptions}
          startPoint={startPoint}
          destinationPoint={destinationPoint}
          selectedRouteId={selectedRouteId}
          onRouteSelect={handleRouteSelect}
          showDetailedView={showDetailedView}
          onShowDetailedView={handleShowDetailedView}
          onBackToOptions={handleBackToOptions}
          currentSelectedRoute={currentSelectedRoute}
        />
        {/* The map and detailed views will be empty with this mock data */}
        <MapPanel selectedRoute={null} />
        <DetailedPathView selectedRoute={null} />
      </main>
    </div>
  );
}

export default App;
