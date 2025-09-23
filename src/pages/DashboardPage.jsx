import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MapView from "../components/MapView";
import AlertsPanel from "../components/AlertsPanel";
import CalamityPanel from "../components/CalamityPanel";

import initialTourists from "../data/tourists.json";
import initialAlerts from "../data/alerts.json";

const DashboardPage = () => {
  // live state
  const [tourists, setTourists] = useState(initialTourists);
  const [alerts, setAlerts] = useState(initialAlerts);

  // simulate SOS for a specific tourist id
  const simulateSOS = (touristId) => {
    setTourists((prev) =>
      prev.map((t) =>
        t.id === touristId ? { ...t, status: "SOS" } : t
      )
    );

    const t = tourists.find((x) => x.id === touristId);
    const newAlert = {
      id: `A${Date.now()}`,
      touristId,
      type: "Panic",
      time: new Date().toLocaleTimeString(),
      lat: t?.lat ?? 0,
      lng: t?.lng ?? 0,
    };
    setAlerts((prev) => [newAlert, ...prev]);
  };

  // mark all safe (demo reset)
  const markAllSafe = () => {
    setTourists((prev) => prev.map((t) => ({ ...t, status: "Safe" })));
    setAlerts([]);
  };

  // resolve (remove) alert
  const resolveAlert = (alertId) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
  };

  // generate e-FIR (we keep pdf generation in AlertsPanel but provide callback)
  const generateEFIR = (alert) => {
    // you can forward this to backend later; AlertsPanel already creates PDF
    console.log("eFIR request for", alert);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar
        tourists={tourists}
        onSimulateSOS={simulateSOS}
        onMarkAllSafe={markAllSafe}
      />
      <div className="map-area flex-1 relative">
        <div className="header flex items-center justify-between p-4 bg-white shadow">
          <div>
            <h3 className="text-lg font-semibold">Tourism Control Center</h3>
            <div className="text-xs text-slate-500">Live monitoring · Demo region</div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-xs text-slate-600">Role: Officer</div>
            <button className="small-btn">Export Reports</button>
          </div>
        </div>

        <div style={{ height: "calc(100vh - 72px)" }}>
          <MapView tourists={tourists} />
        </div>

        <AlertsPanel
          alerts={alerts}
          onResolveAlert={resolveAlert}
          onGenerateEFIR={generateEFIR}
        />
        <CalamityPanel />
      </div>
    </div>
  );
};

export default DashboardPage;
