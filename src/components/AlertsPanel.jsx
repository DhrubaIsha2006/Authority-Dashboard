import React from 'react';
import alerts from '../data/alerts.json';
import tourists from '../data/tourists.json';
import jsPDF from 'jspdf';

const AlertsPanel = () => {

  const handleEfir = (alert) => {
    const t = tourists.find(x => x.id === alert.touristId) || {};
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('e-FIR Report', 20, 20);
    doc.setFontSize(11);
    doc.text(`Tourist: ${t.name || alert.touristId}`, 20, 40);
    doc.text(`Alert Type: ${alert.type}`, 20, 52);
    doc.text(`Time: ${alert.time}`, 20, 64);
    doc.text(`Location: ${alert.lat}, ${alert.lng}`, 20, 76);
    doc.save('efir.pdf');
  };

  return (
    <div className="alerts">
      <h4 className="text-sm font-medium mb-2">Alerts</h4>
      <div className="space-y-3">
        {alerts.map(a => (
          <div key={a.id} className="p-3 bg-white rounded border">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">{a.touristId}</div>
                <div className="text-xs text-slate-500">{a.type} • {a.time}</div>
              </div>
              <div>
                <button className="small-btn" onClick={() => handleEfir(a)}>Generate e-FIR</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;
