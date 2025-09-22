import React from 'react';
import Sidebar from '../components/Sidebar';
import MapView from '../components/MapView';
import AlertsPanel from '../components/AlertsPanel';
import CalamityPanel from '../components/CalamityPanel';

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="map-area">
        <div className="header">
          <div>
            <h3 className="text-lg font-semibold">Tourism Control Center</h3>
            <div className="text-xs text-slate-500">Live monitoring · Region: Meghalaya (demo)</div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-xs text-slate-600">Role: Officer</div>
            <button className="small-btn">Export Reports</button>
          </div>
        </div>

        <div style={{height: 'calc(100vh - 72px)'}}>
          <MapView />
        </div>

        <AlertsPanel />
        <CalamityPanel />
      </div>
    </div>
  );
};

export default DashboardPage;
