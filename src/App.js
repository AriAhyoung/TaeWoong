// src/App.js

import React, { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import ResultsPanel from "./components/ResultsPanel";
import MapPanel from "./components/MapPanel";

function App() {
  // --- State Variables ---
  const [startPoint, setStartPoint] = useState("");
  const [destinationPoint, setDestinationPoint] = useState("");
  const [routeOptions, setRouteOptions] = useState([]); // Array of 3 route objects
  const [selectedRouteId, setSelectedRouteId] = useState(null); // ID of the currently active route
  const [showDetailedView, setShowDetailedView] = useState(false); // To toggle between summary/detail view

  // --- CHANGE 1: ADD THIS NEW STATE VARIABLE ---
  const [isLoading, setIsLoading] = useState(false);

  // --- CHANGE 2: REPLACE THE OLD handleFindRoute WITH THIS NEW ONE ---
  const handleFindRoute = async () => {
    if (startPoint && destinationPoint) {
      setIsLoading(true); // Show a loading message
      setRouteOptions([]); // Clear previous results
      setSelectedRouteId(null);
      console.log(`Searching for routes from ${startPoint} to ${destinationPoint}`);

      // --- IMPORTANT: PASTE YOUR NGROK URL HERE ---
      const backendUrl = "https://8a3c-121-135-181-72.ngrok-free.app";

      try {
        const response = await fetch(`${backendUrl}/api/find-routes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startPoint: startPoint,
            destinationPoint: destinationPoint,
            preference: routePreference,
          }),
        });

        if (!response.ok) {
          throw new Error(`The server responded with an error: ${response.status}`);
        }

        const fetchedRoutes = await response.json();

        if (fetchedRoutes && fetchedRoutes.length > 0) {
          setRouteOptions(fetchedRoutes);
          setSelectedRouteId(fetchedRoutes[0].id);
        } else {
          alert("No routes were found for the specified locations.");
        }
      } catch (error) {
        console.error("Error fetching routes:", error);
        alert(`Could not find routes. Please make sure the backend server is running and the URL is correct. Error: ${error.message}`);
      } finally {
        setIsLoading(false); // Hide the loading message
        setShowDetailedView(false);
      }
    } else {
      alert("Please enter both start and destination points.");
    }
  };
  const [routePreference, setRoutePreference] = useState("overall"); // Default to '종합 만족도 순'

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
      />

      {/* --- CHANGE 3: ADD THE LOADING INDICATOR HERE --- */}
      {isLoading && <div className="loading-indicator">Finding routes...</div>}

      <main className="main-content-area">
        <ResultsPanel
          routeOptions={routeOptions}
          selectedRouteId={selectedRouteId}
          onRouteSelect={handleRouteSelect}
          showDetailedView={showDetailedView}
          onShowDetailedView={handleShowDetailedView}
          onBackToOptions={handleBackToOptions}
          currentSelectedRoute={currentSelectedRoute}
        />
        <MapPanel selectedRoute={currentSelectedRoute} />
      </main>
    </div>
  );
}

export default App;
