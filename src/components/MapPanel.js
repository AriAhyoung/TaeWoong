// src/components/MapPanel.js

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker, useMap } from "react-leaflet";
import L from "leaflet";

// Fix for default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// This helper component now controls map view changes and fixes the rendering bug.
function MapController({ bounds }) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] }); // Fit bounds with padding

      // THIS IS THE FIX:
      // Give the map a moment to adjust to the new layout, then
      // tell it to re-check its size. This forces it to render the map tiles.
      const timer = setTimeout(() => {
        map.invalidateSize();
      }, 100);

      // Cleanup the timer
      return () => clearTimeout(timer);
    }
  }, [map, bounds]); // Rerun when map or bounds change

  return null;
}

function MapPanel({ selectedRoute }) {
  const defaultCenter = [37.5665, 126.978]; // Seoul City Hall

  if (!selectedRoute || !selectedRoute.polyline || selectedRoute.polyline.length === 0) {
    return (
      <section className="map-panel placeholder">
        <p>경로를 선택하면 여기에 지도가 표시됩니다.</p>
      </section>
    );
  }

  const polyline = selectedRoute.polyline;
  const bounds = L.latLngBounds(polyline);

  const startMarker = polyline[0];
  const endMarker = polyline[polyline.length - 1];

  return (
    <section className="map-panel">
      <MapContainer
        center={defaultCenter}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false} // Optional: disable zoom on scroll
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Polyline pathOptions={{ color: "#4a69bd", weight: 5 }} positions={polyline} />

        {startMarker && <Marker position={startMarker}></Marker>}
        {endMarker && <Marker position={endMarker}></Marker>}

        <MapController bounds={bounds} />
      </MapContainer>
    </section>
  );
}

export default MapPanel;
