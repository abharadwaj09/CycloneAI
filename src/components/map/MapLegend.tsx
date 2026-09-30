'use client';
import { motion } from 'framer-motion';

export function MapLegend() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md border border-slate-200 p-3.5 rounded-2xl shadow-xl text-xs w-56 font-sans"
    >
      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2.5">
        <h4 className="font-extrabold text-slate-800 text-xs flex items-center gap-1.5">
          <span>🗺️</span>
          <span>Map Intelligence Legend</span>
        </h4>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-red-500 animate-pulse border border-white"></div>
          <span className="text-slate-700 font-medium">Red Alert (&gt;200mm Rain)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-orange-500 border border-white"></div>
          <span className="text-slate-700 font-medium">Orange Alert (100-200mm)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 border border-white"></div>
          <span className="text-slate-700 font-medium">Yellow Watch (50-100mm)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-500 text-sm">🌧️</span>
          <span className="text-slate-700 font-medium">Active Rainfall Downpour</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-cyan-600 text-sm">🌊</span>
          <span className="text-slate-700 font-medium">Ocean Swell &amp; Wave Buoy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-2 rounded border border-orange-500 bg-orange-500/30"></div>
          <span className="text-slate-700 font-medium">SST Warm Pool (&gt;29.5°C)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-emerald-700"></div>
          <span className="text-slate-600">Past Cyclone Track</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 border-t-2 border-dashed border-red-500"></div>
          <span className="text-slate-600">Projected Cone of Track</span>
        </div>
      </div>
    </motion.div>
  );
}

export default MapLegend;
