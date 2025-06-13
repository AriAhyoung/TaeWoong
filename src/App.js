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
    // Make sure this URL is your currently active ngrok URL
    const backendUrl = "https://ac9a-121-135-181-73.ngrok-free.app";

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

        const fetchedRoutesObject = await response.json();

        // --- THIS IS THE CORRECTED LOGIC ---
        // This selects the correct list of routes from the object the backend sends
        const preferenceMap = {
          comfort: "top_pleasant",
          transfer_convenience: "top_transfer_convenience",
          stability: "top_punctual",
          least_congestion: "top_congestions",
          least_time: "routes_time_sorted",
          overall: "routes_time_sorted", // Default to time-sorted for 'overall'
        };
        const resultKey = preferenceMap[routePreference];
        const routesToShow = fetchedRoutesObject[resultKey] || [];
        // --- END OF CORRECTION ---

        if (routesToShow.length > 0) {
          setRouteOptions(routesToShow);
          setSelectedRouteId(routesToShow[0].id);
        } else {
          alert("No routes were found for this preference.");
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
