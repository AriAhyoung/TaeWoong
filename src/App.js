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
    if (startPoint && destinationPoint) {
      setIsLoading(true);
      setRouteOptions([]);
      setSelectedRouteId(null);
      console.log(`Searching for routes from ${startPoint} to ${destinationPoint}`);

      // Make sure this URL is your currently active ngrok URL
      const backendUrl = "https://ac9a-121-135-181-73.ngrok-free.app";

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
            hasRestroom: hasRestroom,
            hasElevator: hasElevator,
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
        setIsLoading(false);
      }
    } else {
      alert("Please enter both start and destination points.");
    }
  };

  const handleRouteSelect = (routeId) => {
    setSelectedRouteId(routeId);
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
        />
        <MapPanel selectedRoute={currentSelectedRoute} />
        <DetailedPathView selectedRoute={currentSelectedRoute} />
      </main>
    </div>
  );
}

export default App;
