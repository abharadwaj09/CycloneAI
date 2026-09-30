'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Waves, ThermometerSun, AlertTriangle, TrendingUp, Info } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import StatusBadge from '@/components/ui/StatusBadge';
import DataSourceTag from '@/components/ui/DataSourceTag';
import AlertBadge from '@/components/ui/AlertBadge';

export default function OceanPage() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden bg-slate-100 text-slate-800">
      <motion.div variants={containerVars} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-6 relative z-10">
        <header className="flex justify-between items-end border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3 text-slate-900">
              <Waves className="w-10 h-10 text-blue-500" />
              Ocean Intelligence
            </h1>
            <p className="text-slate-500 mt-2">Sea surface dynamics and thermal content</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusBadge mode="live" pulse />
            <DataSourceTag source="INCOIS &amp; NOAA" timestamp={new Date().toISOString()} />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <GlassCard className="p-0 overflow-hidden relative min-h-[400px] flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-sky-500 opacity-90 z-0"></div>
              {/* Abstract ocean heat map representation */}
              <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #ff0000 0%, transparent 40%), radial-gradient(circle at 30% 70%, #ffaa00 0%, transparent 50%)' }}></div>
              
              <div className="relative z-10 p-6 flex-1 flex flex-col text-white">
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-8">
                  <ThermometerSun className="w-6 h-6 text-yellow-300" />
                  Sea Surface Temperature (SST)
                </h2>
                
                <div className="mt-auto mb-8">
                  <div className="text-8xl font-bold font-mono tracking-tighter drop-shadow-lg">29.8<span className="text-4xl">°C</span></div>
                  <div className="text-blue-100 text-xl mt-2 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-red-300" /> +1.2°C Anomaly
                  </div>
                </div>
                
                <div className="w-full h-4 rounded-full bg-blue-900/50 backdrop-blur-md overflow-hidden flex">
                  <div className="h-full bg-blue-400 w-1/5"></div>
                  <div className="h-full bg-green-400 w-1/5"></div>
                  <div className="h-full bg-yellow-400 w-1/5"></div>
                  <div className="h-full bg-orange-500 w-1/5"></div>
                  <div className="h-full bg-red-500 w-1/5 relative">
                    <div className="absolute top-0 bottom-0 left-[90%] w-1 bg-white shadow-[0_0_10px_white]"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs mt-2 text-blue-200 font-medium">
                  <span>24°C</span>
                  <span>Critical: &gt;26.5°C</span>
                  <span>32°C</span>
                </div>
              </div>
            </GlassCard>
            
            <div className="grid grid-cols-2 gap-4">
              <GlassCard className="p-5 border-l-4 border-l-orange-500">
                <div className="text-sm text-slate-500 font-medium mb-1">Ocean Heat Content</div>
                <div className="text-3xl font-bold text-slate-800">85 <span className="text-sm font-normal">kJ/cm²</span></div>
                <div className="mt-2 text-xs text-slate-500">High energy reservoir for intensification</div>
              </GlassCard>
              <GlassCard className="p-5 border-l-4 border-l-emerald-500">
                <div className="text-sm text-slate-500 font-medium mb-1">Significant Wave Height</div>
                <div className="text-3xl font-bold text-slate-800">4.2 <span className="text-sm font-normal">m</span></div>
                <div className="mt-2 text-xs text-slate-500">Increasing trend last 6 hours</div>
              </GlassCard>
            </div>
          </div>

          <div className="space-y-6">
            <GlassCard className="p-6 border border-indigo-200 bg-indigo-50/50">
              <div className="flex items-center gap-2 mb-4 text-indigo-900">
                <AlertTriangle className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-bold">Oceanic Assessment</h2>
              </div>
              
              <div className="p-3 bg-white rounded-lg shadow-sm mb-4 border border-indigo-100">
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Oceanographic Assessment Status</div>
                <div className="text-sm text-slate-600">INCOIS &amp; NOAA satellite sea-surface thermal observation verified.</div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Favorable Factors (Intensification)</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-green-500 mt-0.5">●</span>
                      SST (29.8°C) is significantly above the 26.5°C threshold required for cyclogenesis.
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-green-500 mt-0.5">●</span>
                      High Ocean Heat Content provides deep thermal energy, reducing the cooling effect of upwelling.
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Inhibiting Factors</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-yellow-500 mt-0.5">●</span>
                      Approaching cooler eddies near the coastline may slow intensification in 48h.
                    </li>
                  </ul>
                </div>
                
                <div className="pt-4 border-t border-indigo-100">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">Overall Potential:</span>
                    <AlertBadge level="high" text="HIGH" />
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
