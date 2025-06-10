import React, { useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker, useMap } from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const transferIcon = new L.Icon({
  // Use the same image files as the default marker
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),

  // Set a smaller size (default is [25, 41])
  iconSize: [18, 29],

  // Adjust the anchor points accordingly
  iconAnchor: [9, 29],
  popupAnchor: [1, -34],
  shadowSize: [29, 29],

  // Add a custom class name that we can target with CSS
  className: "leaflet-marker-red",
});

// Helper component to auto-center the map
function MapController({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
      const timer = setTimeout(() => map.invalidateSize(), 100);
      return () => clearTimeout(timer);
    }
  }, [map, bounds]);
  return null;
}

function MapPanel({ selectedRoute }) {
  const defaultCenter = [37.5665, 126.978];

  // The guard clause now checks for the new `path_segments` property
  if (!selectedRoute || !selectedRoute.path_segments || selectedRoute.path_segments.length === 0) {
    return (
      <section className="map-panel placeholder">
        <p>경로를 선택하면 여기에 지도가 표시됩니다.</p>
      </section>
    );
  }

  // Combine all coordinate segments to calculate the map bounds
  const allCoords = selectedRoute.path_segments.flatMap((segment) => segment.coords);
  const bounds = allCoords.length > 0 ? L.latLngBounds(allCoords) : null;

  const startMarker = allCoords[0];
  const endMarker = allCoords[allCoords.length - 1];

  return (
    <section className="map-panel">
      <MapContainer center={defaultCenter} zoom={12} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* --- RENDER MULTIPLE, COLORED POLYLINES --- */}
        {selectedRoute.path_segments.map((segment, index) => (
          <Polyline key={index} pathOptions={{ color: segment.color, weight: 5 }} positions={segment.coords} />
        ))}

        {/* --- RENDER TRANSFER MARKERS --- */}
        {selectedRoute.transfer_points.map((point, index) => (
          <Marker key={`transfer-${index}`} position={point} icon={transferIcon} />
        ))}

        {/* Standard start and end markers */}
        {startMarker && <Marker position={startMarker}></Marker>}
        {endMarker && <Marker position={endMarker}></Marker>}

        {bounds && <MapController bounds={bounds} />}
      </MapContainer>
    </section>
  );
}

export default MapPanel;
