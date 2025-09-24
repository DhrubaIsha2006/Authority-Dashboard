import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import L from "leaflet";

// Sample tourist data
const tourists = [
  { id: "T-101", name: "Alice", lat: 27.1767, lng: 78.0081 }, // Agra
  { id: "T-202", name: "Bob", lat: 25.3176, lng: 82.9739 },   // Varanasi
];

// Sample restricted zone (polygon around an area)
const restrictedZones = [
  {
    name: "Restricted Forest Area",
    coordinates: [
      [25.30, 82.95],
      [25.32, 82.95],
      [25.32, 82.99],
      [25.30, 82.99],
    ],
  },
  {
    name: "High-Risk Border Zone",
    coordinates: [
      [27.17, 78.00],
      [27.18, 78.02],
      [27.19, 78.01],
    ],
  },
];

export default function TouristMap() {
  const [selectedTourist, setSelectedTourist] = useState(null);

  // Custom red icon for tracked tourist
  const redIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* Search Tourist by ID */}
      <div style={{ position: "absolute", zIndex: 1000, top: 10, left: 10 }}>
        <input
          type="text"
          placeholder="Enter Tourist ID..."
          onChange={(e) => {
            const found = tourists.find((t) => t.id === e.target.value);
            setSelectedTourist(found || null);
          }}
          style={{ padding: "6px", borderRadius: "4px", border: "1px solid gray" }}
        />
      </div>

      <MapContainer center={[26.8, 80.9]} zoom={6} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Show all tourists */}
        {tourists.map((t) => (
          <Marker key={t.id} position={[t.lat, t.lng]}>
            <Popup>
              <b>{t.name}</b> <br /> ID: {t.id}
            </Popup>
          </Marker>
        ))}

        {/* Highlight restricted zones */}
        {restrictedZones.map((zone, idx) => (
          <Polygon key={idx} positions={zone.coordinates} color="red">
            <Popup>{zone.name}</Popup>
          </Polygon>
        ))}

        {/* Highlight selected tourist */}
        {selectedTourist && (
          <Marker
            position={[selectedTourist.lat, selectedTourist.lng]}
            icon={redIcon}
          >
            <Popup>
              <b>{selectedTourist.name}</b> <br /> ID: {selectedTourist.id} <br />
              <i>Tracked Tourist</i>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}