// src/components/MapPanel.js
import React, { useEffect } from "react"; // Ensure React and useEffect are imported
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet"; // Remove Marker if you don't need it or uncomment the Marker JSX later
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../App.css";
// ... rest of your MapPanel.js code
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "[https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png](https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png)",
  iconUrl: "[https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png](https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png)",
  shadowUrl:
    "[https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png](https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png)",
});

// A helper component to update map view when selectedRoute changes
function ChangeView({ center, zoom, polyline }) {
  const map = useMap();
  useEffect(() => {
    if (polyline && polyline.length > 0) {
      // Fit bounds to the polyline whenever it changes
      map.fitBounds(polyline);
    } else {
      map.setView(center, zoom); // Or reset to default view
    }
  }, [center, zoom, polyline, map]);
  return null;
}

function MapPanel({ selectedRoute }) {
  const defaultCenter = [37.5665, 126.978]; // Center on Seoul
  const defaultZoom = 13;

  // Extract polyline for the selected route
  const routePolyline = selectedRoute ? selectedRoute.polyline : [];

  return (
    <div id="map-container" className="right-map-panel">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }} // Map takes full container size
      >
        <TileLayer
          attribution='&copy; <a href="[https://www.openstreetmap.org/copyright](https://www.openstreetmap.org/copyright)">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Component to update map view when data changes */}
        <ChangeView center={defaultCenter} zoom={defaultZoom} polyline={routePolyline} />

        {routePolyline.length > 0 && (
          <Polyline
            positions={routePolyline}
            color="#4285F4" // Blue color for the route line
            weight={5}
            opacity={0.8}
          />
        )}

        {/* You might add start/end markers here based on selectedRoute */}
        {/* {selectedRoute && selectedRoute.startMarker && (
                    <Marker position={selectedRoute.startMarker} />
                )}
                {selectedRoute && selectedRoute.endMarker && (
                    <Marker position={selectedRoute.endMarker} />
                )} */}
      </MapContainer>
    </div>
  );
}

export default MapPanel;
