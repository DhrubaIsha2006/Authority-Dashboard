import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

const Sidebar = ({ tourists = [], onSimulateSOS, onMarkAllSafe }) => {
  return (
    <aside className="w-180 bg-black border-r border-slate-200 p-4 overflow-y-auto">
      <div className="header mb-3">
        <h2 className="text-lg font-semibold">Tourist Safety Control</h2>
        <div className="text-xs text-slate-500">Authority Portal · Demo</div>
      </div>

      <div className="mt-4">
        <h3 className="text-sm text-slate-600 mb-2">Active Tourists</h3>
        <div className="space-y-3">
          {tourists.map((t) => (
            <div key={t.id} className="p-3 bg-slate-50 rounded shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <Link
                    to={`/tourist/${t.id}`}
                    className="font-medium text-sky-600 hover:underline"
                  >
                    {t.name}
                  </Link>
                  <div className="text-xs text-slate-500">{t.id}</div>
                </div>
                <div
                  className={clsx(
                    "px-2 py-1 rounded text-xs",
                    {
                      "bg-emerald-100 text-emerald-800": t.status === "Safe",
                      "bg-amber-100 text-amber-800": t.status === "Caution",
                      "bg-red-100 text-red-800": t.status === "SOS",
                    }
                  )}
                >
                  {t.status}
                </div>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                {t.lat.toFixed(3)}, {t.lng.toFixed(3)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm text-slate-600 mb-2">Quick Actions</h3>
        <button
          className="small-btn w-full"
          onClick={() => {
            if (tourists?.length) onSimulateSOS && onSimulateSOS(tourists[0].id);
          }}
        >
          Simulate SOS (first)
        </button>
        <button
          className="small-btn w-full mt-2 bg-amber-600"
          onClick={() => onMarkAllSafe && onMarkAllSafe()}
        >
          Mark All Safe
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;


