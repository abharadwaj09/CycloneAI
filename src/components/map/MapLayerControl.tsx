'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ChevronDown, ChevronUp, Waves, CloudRain, ShieldAlert, Wind, Thermometer } from 'lucide-react';

interface MapLayerControlProps {
  mapStyle: string;
  setMapStyle: (s: string) => void;
  layers: Record<string, boolean>;
  setLayers: (l: any) => void;
}

export function MapLayerControl({ mapStyle, setMapStyle, layers, setLayers }: MapLayerControlProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLayer = (key: string) => {
    setLayers({ ...layers, [key]: !layers[key] });
  };

  const layerLabels: Record<string, { label: string; icon: string }> = {
    cyclone: { label: 'Active Cyclone Vortex', icon: '🌪️' },
    rainfall: { label: 'Regional Rainfall Radar', icon: '🌧️' },
    alertZones: { label: 'District Warning Zones', icon: '🚨' },
    oceanView: { label: 'Ocean Marine Basemap', icon: '🌊' },
    sstThermal: { label: 'Sea Surface Temp (SST)', icon: '🌡️' },
    waveBuoys: { label: 'Ocean Swell & Buoys', icon: '🌊' },
    predictedTrack: { label: 'Forecast Track Cone', icon: '🎯' },
    historicalTrack: { label: 'Historical Past Track', icon: '⏱️' },
    roadBlockages: { label: 'Road Closures / Flooding', icon: '🚧' },
    emergencyFacilities: { label: 'Emergency Shelters/Hospitals', icon: '🏥' },
    coastalDistricts: { label: 'Coastal District Borders', icon: '📍' }
  };

  return (
    <div className="absolute top-4 right-4 z-[400] flex flex-col items-end font-sans">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/95 backdrop-blur-md border border-slate-200/80 px-3 py-2 rounded-2xl shadow-xl text-slate-800 hover:bg-white transition-all flex items-center gap-2 group"
      >
        <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-emerald-600 group-hover:bg-slate-900 group-hover:text-white transition-colors">
          <Layers size={16} />
        </div>
        <span className="font-bold text-xs">Layers &amp; Ocean Controls</span>
        {isOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="mt-2 bg-white/95 backdrop-blur-xl border border-slate-200/80 p-4 rounded-2xl shadow-2xl w-72 max-h-[70vh] overflow-y-auto scrollbar-thin"
          >
            {/* Map Style Selector */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Map Base Style</h4>
                <span className="text-[10px] bg-slate-100 text-emerald-600 px-2 py-0.5 rounded-full font-bold uppercase">{mapStyle}</span>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { id: 'ocean', label: '🌊 Ocean View (Marine & Bathymetry)', desc: 'Esri World Ocean Basemap' },
                  { id: 'geographic', label: '🌐 Geographic (Land & Boundaries)', desc: 'Clean vector administrative' },
                  { id: 'satellite', label: '🛰️ Satellite (True Earth Imagery)', desc: 'High-res earth observation' },
                ].map((style) => (
                  <label 
                    key={style.id} 
                    className={`flex items-start gap-2.5 p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                      mapStyle === style.id 
                        ? 'border-emerald-500 bg-slate-100/70 text-slate-900 font-bold shadow-sm' 
                        : 'border-slate-100 bg-white/50 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="mapStyle" 
                      checked={mapStyle === style.id}
                      onChange={() => setMapStyle(style.id)}
                      className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="leading-snug">{style.label}</div>
                      <div className="text-[10px] text-slate-400 font-normal mt-0.5">{style.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="w-full h-px bg-slate-100 my-3" />
            
            {/* Dynamic Overlays */}
            <div>
              <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Active Meteorological Layers</h4>
              <div className="flex flex-col gap-1.5">
                {Object.keys(layers).map((key) => {
                  const meta = layerLabels[key] || { label: key.replace(/([A-Z])/g, ' $1').trim(), icon: '📍' };
                  const isChecked = layers[key];
                  
                  return (
                    <label 
                      key={key} 
                      className={`flex items-center justify-between p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                        isChecked 
                          ? 'border-slate-200 bg-slate-100/50 text-slate-800 font-semibold' 
                          : 'border-transparent text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{meta.icon}</span>
                        <span>{meta.label}</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={isChecked}
                        onChange={() => toggleLayer(key)}
                        className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MapLayerControl;
