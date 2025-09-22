import React from 'react';
import calamities from '../data/calamities.json';

const CalamityPanel = () => {
  return (
    <div className="calamity">
      <h5 className="text-sm font-medium mb-2">Calamity Updates</h5>
      <div className="space-y-2">
        {calamities.map((c,i) => (
          <div key={i} className="text-sm">
            <div className="font-medium text-rose-700">{c.msg}</div>
            <div className="text-xs text-slate-500">{c.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalamityPanel;
