// DashboardPage.jsx

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MapView from "../components/MapView";
import AlertsPanel from "../components/AlertsPanel";
import CalamityPanel from "../components/CalamityPanel";

import initialTourists from "../data/tourists.json";
import initialAlerts from "../data/alerts.json";

// Define the danger zone GeoJSON here (or import from separate file)
const dangerZoneGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [88.405, 22.516],
            [88.408, 22.515],
            [88.407, 22.512],
            [88.404, 22.513],
            [88.405, 22.516]
          ]
        ]
      },
      properties: { name: "Kolkata Zone Alpha" }
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [88.400, 22.511],
            [88.402, 22.510],
            [88.401, 22.508],
            [88.399, 22.509],
            [88.400, 22.511]
          ]
        ]
      },
      properties: { name: "Kolkata Zone Bravo" }
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [88.406, 22.510],
            [88.409, 22.511],
            [88.410, 22.508],
            [88.407, 22.507],
            [88.406, 22.510]
          ]
        ]
      },
      properties: { name: "Kolkata Zone Charlie" }
    }
  ]
};

const DashboardPage = () => {
  const [tourists, setTourists] = useState(initialTourists);
  const [alerts, setAlerts] = useState(initialAlerts);

  // simulate SOS for a specific tourist id
  const simulateSOS = (touristId) => {
    setTourists(prev =>
      prev.map(t => (t.id === touristId ? { ...t, status: "SOS" } : t))
    );

    const t = tourists.find(x => x.id === touristId);
    const newAlert = {
      id: `A${Date.now()}`,
      touristId,
      type: "Panic",
      time: new Date().toLocaleTimeString(),
      lat: t?.lat ?? 0,
      lng: t?.lng ?? 0
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const markAllSafe = () => {
    setTourists(prev => prev.map(t => ({ ...t, status: "Safe" })));
    setAlerts([]);
  };

  const resolveAlert = (alertId) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  const generateEFIR = (alert) => {
    console.log("eFIR request for", alert);
  };

  // This is the callback MapView will call when it detects a danger‐zone entry
  const handleAlertFromMap = (alertObj) => {
    // Add that alert to state
    setAlerts(prev => [alertObj, ...prev]);
    // Optionally also update tourist status in your main list
    setTourists(prev =>
      prev.map(t =>
        t.id === alertObj.touristId ? { ...t, status: "SOS" } : t
      )
    );
  };

  // This is the callback MapView will call when a new tourist is added
  const handleAddTouristFromMap = (newTourist) => {
    setTourists(prev => [...prev, newTourist]);
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      <div className="flex-none w-64 bg-gray-900 text-white">
        <Sidebar
          tourists={tourists}
          onSimulateSOS={simulateSOS}
          onMarkAllSafe={markAllSafe}
        />
      </div>

      <div className="flex-1 flex flex-col bg-gray-100">
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 bg-white relative">
            <div className="absolute inset-0">
              <MapView
                tourists={tourists}
                onAddTourist={handleAddTouristFromMap}
                onAlert={handleAlertFromMap}
                dangerZone={dangerZoneGeoJSON}
              />
            </div>
          </div>

          <div className="w-80 bg-white border-l overflow-y-auto">
            <div className="p-4 space-y-6 pt-10">
              <AlertsPanel
                alerts={alerts}
                onResolveAlert={resolveAlert}
                onGenerateEFIR={generateEFIR}
              />
              <CalamityPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
