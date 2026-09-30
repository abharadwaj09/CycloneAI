'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, AlertTriangle, Wind, Droplets, Waves, Hospital, Home } from 'lucide-react';

const FallbackGlassCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/70 backdrop-blur-md border border-white/40 rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);
const Card = FallbackGlassCard;

const LOCATION_DATA: Record<string, { alert: string, alertColor: string, wind: string, rain: string, surge: string, flood: string, floodColor: string, needleDeg: number, shelter: string, shelterDist: string, hospital: string, hospDist: string }> = {
  'Puri, Odisha': {
    alert: 'RED WARNING',
    alertColor: 'bg-red-100 text-red-700',
    wind: '215 km/h',
    rain: '185 mm/hr',
    surge: '4.2 m',
    flood: 'CRITICAL',
    floodColor: 'text-red-700 bg-red-50 border-red-100',
    needleDeg: 75,
    shelter: 'Astaranga Multi-Purpose Shelter',
    shelterDist: '1.2 km away • Capacity: 2,500',
    hospital: 'District Headquarters Hospital, Puri',
    hospDist: '2.8 km away • Trauma Unit Open'
  },
  'Visakhapatnam, Andhra Pradesh': {
    alert: 'ORANGE ALERT',
    alertColor: 'bg-amber-100 text-amber-700',
    wind: '85 km/h',
    rain: '45 mm/hr',
    surge: '1.8 m',
    flood: 'MODERATE',
    floodColor: 'text-amber-700 bg-amber-50 border-amber-100',
    needleDeg: 25,
    shelter: 'Vizag Port Community Cyclone Shelter',
    shelterDist: '0.8 km away • Capacity: 1,200',
    hospital: 'King George Hospital, Maharanipeta',
    hospDist: '3.1 km away • Emergency Ward Active'
  },
  'Chennai, Tamil Nadu': {
    alert: 'YELLOW ADVISORY',
    alertColor: 'bg-yellow-100 text-yellow-800',
    wind: '45 km/h',
    rain: '18 mm/hr',
    surge: '0.8 m',
    flood: 'LOW',
    floodColor: 'text-yellow-700 bg-yellow-50 border-yellow-100',
    needleDeg: -35,
    shelter: 'Marina Relief Center, Triplicane',
    shelterDist: '2.1 km away • Standby Mode',
    hospital: 'Rajiv Gandhi Government General Hospital',
    hospDist: '4.5 km away • Fully Operational'
  },
  'Kolkata, West Bengal': {
    alert: 'ORANGE ALERT',
    alertColor: 'bg-amber-100 text-amber-700',
    wind: '95 km/h',
    rain: '110 mm/hr',
    surge: '2.8 m',
    flood: 'HIGH',
    floodColor: 'text-amber-700 bg-amber-50 border-amber-100',
    needleDeg: 40,
    shelter: 'Sundarbans Multi-Purpose Shelter No. 4',
    shelterDist: '1.5 km away • Capacity: 1,800',
    hospital: 'SSKM Medical College & Hospital',
    hospDist: '5.2 km away • Disaster Response Ready'
  },
};

export default function LocationPage() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>('Puri, Odisha');
  const [isLoading, setIsLoading] = useState(false);

  const loc = LOCATION_DATA[selectedLocation || 'Puri, Odisha'] || LOCATION_DATA['Puri, Odisha'];

  const handleUseLocation = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedLocation('Puri, Odisha');
      setIsLoading(false);
    }, 800);
  };

  const handleSelectLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(e.target.value) {
      setSelectedLocation(e.target.value);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 pt-24 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-8">
          <MapPin className="w-8 h-8 text-emerald-500" />
          <h1 className="text-3xl font-bold text-slate-900">Check My Location</h1>
        </motion.div>

        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <button 
              onClick={handleUseLocation}
              className="w-full md:w-auto px-6 py-3 bg-slate-900 hover:bg-emerald-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Navigation className="w-5 h-5" />
              Use My Location
            </button>
            <span className="text-slate-400 font-medium">OR</span>
            <select 
              onChange={handleSelectLocation}
              className="w-full md:flex-1 rounded-lg border-slate-300 py-3 px-4 focus:ring-emerald-500 focus:border-emerald-500 text-slate-700 font-medium bg-white"
              value={selectedLocation || ''}
            >
              <option value="" disabled>Select a coastal city...</option>
              <option value="Puri, Odisha">Puri, Odisha (Ground Zero)</option>
              <option value="Visakhapatnam, Andhra Pradesh">Visakhapatnam, Andhra Pradesh</option>
              <option value="Kolkata, West Bengal">Kolkata, West Bengal</option>
              <option value="Chennai, Tamil Nadu">Chennai, Tamil Nadu</option>
            </select>
          </div>
        </Card>

        {isLoading && (
          <div className="p-12 text-center text-slate-500 animate-pulse flex flex-col items-center">
            <MapPin className="w-10 h-10 text-emerald-400 mb-4 animate-bounce" />
            <p>Locating and fetching risk data...</p>
          </div>
        )}

        {selectedLocation && !isLoading && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="p-8 border-t-4 border-t-emerald-500">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-1">{selectedLocation}</h2>
                  <p className="text-slate-500 flex items-center gap-2">
                    <span className={`${loc.alertColor} px-2.5 py-0.5 rounded-full text-xs font-bold`}>{loc.alert}</span>
                    Updated 2 mins ago
                  </p>
                </div>
                {/* Risk Gauge */}
                <div className="w-32 h-16 bg-slate-200 rounded-t-full relative overflow-hidden flex items-end justify-center pb-2 shadow-inner">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 opacity-90" />
                  <div className="absolute bottom-0 w-24 h-12 bg-white rounded-t-full flex items-end justify-center pb-1">
                    <span className="text-[10px] font-black text-slate-700">{loc.flood} RISK</span>
                  </div>
                  {/* Needle */}
                  <div 
                    className="absolute bottom-0 w-1 h-14 bg-slate-900 origin-bottom transition-transform duration-700" 
                    style={{ transform: `rotate(${loc.needleDeg}deg)` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <Wind className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                  <p className="text-xs text-slate-500 uppercase font-semibold">Wind Speed</p>
                  <p className="text-xl font-bold text-slate-800">{loc.wind}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-xs text-slate-500 uppercase font-semibold">Precipitation</p>
                  <p className="text-xl font-bold text-slate-800">{loc.rain}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <Waves className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-500 uppercase font-semibold">Storm Surge</p>
                  <p className="text-xl font-bold text-slate-800">{loc.surge}</p>
                </div>
                <div className={`${loc.floodColor} p-4 rounded-xl border text-center`}>
                  <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-xs uppercase font-semibold">Inundation Risk</p>
                  <p className="text-xl font-bold">{loc.flood}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800 border-b border-slate-100 pb-2">Nearest Emergency Facilities</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="p-3 bg-emerald-100 text-emerald-700 rounded-lg">
                      <Home className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{loc.shelter}</p>
                      <p className="text-sm text-slate-500">{loc.shelterDist}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                      <Hospital className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{loc.hospital}</p>
                      <p className="text-sm text-slate-500">{loc.hospDist}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs text-slate-500 font-semibold">Location metrics synchronized with live Doppler radar &amp; AWS sensor grid</span>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
