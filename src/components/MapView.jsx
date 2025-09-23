import React from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";
import maplibregl from "maplibre-gl";

const MapView = ({ tourists = [] }) => {
  const initialView = {
    longitude: 91.876,
    latitude: 25.572,
    zoom: 13,
  };

  const dangerZone = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [91.87, 25.57],
              [91.88, 25.57],
              [91.88, 25.58],
              [91.87, 25.58],
              [91.87, 25.57],
            ],
          ],
        },
      },
    ],
  };

  return (
    <Map
      mapLib={maplibregl}
      initialViewState={initialView}
      style={{ width: "100%", height: "100%" }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    >
      {tourists.map((t) => (
        <Marker key={t.id} longitude={t.lng} latitude={t.lat} anchor="bottom">
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background:
                t.status === "SOS"
                  ? "#ef4444"
                  : t.status === "Caution"
                  ? "#f59e0b"
                  : "#059669",
              border: "2px solid white",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
            title={`${t.name} (${t.id})`}
          />
        </Marker>
      ))}

      <Source id="danger" type="geojson" data={dangerZone}>
        <Layer
          id="danger-fill"
          type="fill"
          paint={{ "fill-color": "#ef4444", "fill-opacity": 0.12 }}
        />
      </Source>
    </Map>
  );
};

export default MapView;

