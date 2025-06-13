import React, { useState } from "react";
import "./App.css";
import DetailedPathView from "./components/DetailedPathView";
import Header from "./components/Header";
import ResultsPanel from "./components/ResultsPanel";
import MapPanel from "./components/MapPanel";

function App() {
  const [hasRestroom, setHasRestroom] = useState(false);
  const [hasElevator, setHasElevator] = useState(false);
  const [startPoint, setStartPoint] = useState("");
  const [destinationPoint, setDestinationPoint] = useState("");
  const [routeOptions, setRouteOptions] = useState([]);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [routePreference, setRoutePreference] = useState("overall");

  const handleFindRoute = async () => {
    // This uses the live backend, make sure your ngrok URL is correct
    const backendUrl = "https://3a47-163-152-3-166.ngrok-free.app";

    if (startPoint && destinationPoint) {
      setIsLoading(true);
      setRouteOptions([]);
      setSelectedRouteId(null);

      try {
        const response = await fetch(`${backendUrl}/api/find-routes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            startPoint,
            destinationPoint,
            preference: routePreference,
            hasRestroom,
            hasElevator,
          }),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const fetchedRoutes = await response.json();

        // This selects the correct list of routes based on the preference
        const preferenceMap = {
          comfort: "top_pleasant",
          transfer_convenience: "top_transfer_convenience",
          stability: "top_punctual",
          least_congestion: "top_congestions",
          least_time: "routes_time_sorted",
          overall: "routes_time_sorted",
        };
        const resultKey = preferenceMap[routePreference] || "routes_time_sorted";
        const routesToShow = fetchedRoutes[resultKey] || [];

        if (routesToShow.length > 0) {
          setRouteOptions(routesToShow);
          setSelectedRouteId(routesToShow[0].id);
        } else {
          alert("No routes found.");
        }
      } catch (error) {
        console.error("Error fetching routes:", error);
        alert(`Failed to fetch routes. Please check the backend server. Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please enter a start and destination.");
    }
  };

  const handleRouteSelect = (routeId) => {
    setSelectedRouteId(routeId);
  };

  const handleReverse = () => {
    setStartPoint(destinationPoint);
    setDestinationPoint(startPoint);
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
        />
        <MapPanel selectedRoute={currentSelectedRoute} />
        <DetailedPathView selectedRoute={currentSelectedRoute} />
      </main>
    </div>
  );
}

export default App;
