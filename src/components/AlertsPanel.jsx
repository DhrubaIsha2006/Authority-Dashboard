<<<<<<< HEAD
// AlertsPanel.jsx

import React from "react";
import { Link } from "react-router-dom";

const AlertsPanel = ({ alerts = [], onResolveAlert, onGenerateEFIR }) => {
=======
import React from "react";
import { Link } from "react-router-dom";

const AlertsPanel = ({ alerts = [], onResolveAlert }) => {
>>>>>>> 05fe2464aa1ee92116b9ef0c87f67222ee1a6f33
  return (
    <div className="alerts">
      <h4 className="text-sm font-medium mb-2">Alerts</h4>
      <div className="space-y-3">
<<<<<<< HEAD
        {alerts.length === 0 && (
          <div className="text-sm text-slate-500">No active alerts</div>
        )}
=======
        {alerts.length === 0 && <div className="text-sm text-slate-500">No active alerts</div>}
>>>>>>> 05fe2464aa1ee92116b9ef0c87f67222ee1a6f33
        {alerts.map((a) => (
          <div key={a.id} className="p-3 bg-white rounded border">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">
                  Tourist {a.touristId}
                </div>
                <div className="text-xs text-slate-500">
                  {a.type} • {a.time}
                  {a.zone && ` • ${a.zone}`}
                </div>
                <div className="text-xs text-slate-500">
                  {a.lat?.toFixed(4)}, {a.lng?.toFixed(4)}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
<<<<<<< HEAD
                {onGenerateEFIR && (
                  <button
                    className="small-btn"
                    onClick={() => onGenerateEFIR(a)}
                  >
                    Prepare e-FIR
                  </button>
                )}
=======
                <Link to={`/efir/${a.id}`} className="small-btn">Prepare e-FIR</Link>
>>>>>>> 05fe2464aa1ee92116b9ef0c87f67222ee1a6f33
                <button
                  className="small-btn bg-white border border-slate-200 text-slate-700"
                  onClick={() => onResolveAlert && onResolveAlert(a.id)}
                >
                  Resolve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;

