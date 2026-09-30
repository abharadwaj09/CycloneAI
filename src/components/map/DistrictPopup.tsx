import React from 'react';

export function DistrictPopup({ district }: { district: any }) {
  const isRed = district.alertLevel === 'red';
  const colorClass = isRed ? 'text-red-600 bg-red-50' : 
                     district.alertLevel === 'orange' ? 'text-orange-600 bg-orange-50' : 
                     'text-yellow-600 bg-yellow-50';

  return (
    <div className="min-w-[200px] p-1 font-sans">
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-800 text-base m-0 leading-tight">{district.name}</h3>
          <p className="text-xs text-slate-500 m-0">{district.state}</p>
        </div>
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${colorClass}`}>
          {district.alertLevel} ALERT
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
        <div className="bg-slate-50 p-1.5 rounded">
          <span className="text-slate-400 block mb-0.5">Wind</span>
          <span className="font-semibold text-slate-700">{isRed ? '180-210' : '100-120'} km/h</span>
        </div>
        <div className="bg-slate-50 p-1.5 rounded">
          <span className="text-slate-400 block mb-0.5">Rainfall</span>
          <span className="font-semibold text-slate-700">{isRed ? '> 200' : '100-150'} mm</span>
        </div>
        <div className="bg-slate-50 p-1.5 rounded">
          <span className="text-slate-400 block mb-0.5">Flood Risk</span>
          <span className={`font-semibold ${isRed ? 'text-red-500' : 'text-orange-500'}`}>{isRed ? 'EXTREME' : 'HIGH'}</span>
        </div>
        <div className="bg-slate-50 p-1.5 rounded">
          <span className="text-slate-400 block mb-0.5">Evacuation</span>
          <span className={`font-semibold ${isRed ? 'text-red-500' : 'text-slate-700'}`}>{isRed ? 'MANDATORY' : 'RECOMMENDED'}</span>
        </div>
      </div>
      
      <div className="text-[10px] text-slate-400 mt-2 text-right flex items-center justify-end gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Updated: 2 mins ago • Radar Feed Verified</span>
      </div>
    </div>
  );
}

export default DistrictPopup;
