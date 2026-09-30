'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TestTube, Sliders, ChevronRight, Activity, Zap, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import GlassCard from '@/components/ui/GlassCard';
import StatusBadge from '@/components/ui/StatusBadge';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const presets = [
  { id: 'rain', label: 'Rainfall +50%', sst: 0, pressure: 0, wind: 0 },
  { id: 'wind', label: 'Wind Speed +30%', sst: 0, pressure: 0, wind: 30 },
  { id: 'sst', label: 'SST +2°C', sst: 2, pressure: 0, wind: 0 },
  { id: 'press', label: 'Pressure -20 hPa', sst: 0, pressure: -20, wind: 0 },
];

export default function WhatIfPage() {
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [params, setParams] = useState({ sst: 0, pressure: 0, wind: 0 });
  const [simulating, setSimulating] = useState(false);
  const [results, setResults] = useState<any>(null);

  const applyPreset = (preset: any) => {
    setActivePreset(preset.id);
    setParams({ sst: preset.sst, pressure: preset.pressure, wind: preset.wind });
  };

  const handleSimulate = () => {
    setSimulating(true);
    setResults(null);
    
    setTimeout(() => {
      // Simple demo logic for scenario effects
      const baseIntensity = 100;
      const baseDamage = 50;
      
      const newIntensity = baseIntensity + (params.sst * 10) + (params.wind * 0.8) + (Math.abs(params.pressure) * 1.5);
      const newDamage = baseDamage + (params.sst * 15) + (params.wind * 1.2) + (Math.abs(params.pressure) * 2);

      setResults({
        chartData: [
          { name: 'Intensity Index', baseline: baseIntensity, scenario: Math.round(newIntensity) },
          { name: 'Est. Damage ($M)', baseline: baseDamage, scenario: Math.round(newDamage) },
          { name: 'Affected Area', baseline: 80, scenario: Math.round(80 + (params.wind * 0.5)) }
        ],
        change: Math.round(((newIntensity - baseIntensity) / baseIntensity) * 100)
      });
      setSimulating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">
         <div className="flex items-center gap-3 mb-8">
            <TestTube className="w-8 h-8 text-emerald-600" />
            <h1 className="text-3xl font-bold text-slate-900">What-If Analysis</h1>
            <StatusBadge status="warning">SIMULATION</StatusBadge>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6 lg:col-span-1">
              <GlassCard className="p-6">
                 <h2 className="text-lg font-semibold mb-4 text-slate-800 flex items-center gap-2">
                   <Zap className="w-5 h-5 text-amber-500" /> Quick Scenarios
                 </h2>
                 <div className="space-y-3">
                   {presets.map(p => (
                     <button
                       key={p.id}
                       onClick={() => applyPreset(p)}
                       className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${activePreset === p.id ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm' : 'bg-white/50 border-slate-200 hover:bg-white hover:border-slate-300 text-slate-600'}`}
                     >
                       {p.label}
                     </button>
                   ))}
                   <button
                       onClick={() => { setActivePreset('custom'); setParams({sst: 0, pressure: 0, wind: 0}); }}
                       className={`w-full text-left px-4 py-3 rounded-xl border border-dashed transition-all ${activePreset === 'custom' ? 'bg-slate-100 border-slate-400 text-slate-800' : 'border-slate-300 hover:bg-white/50 text-slate-500'}`}
                     >
                       Custom Scenario...
                     </button>
                 </div>
              </GlassCard>

              <GlassCard className="p-6">
                 <h2 className="text-lg font-semibold mb-4 text-slate-800 flex items-center gap-2">
                   <Sliders className="w-5 h-5 text-emerald-500" /> Adjust Parameters
                 </h2>
                 <div className="space-y-6">
                   <div>
                     <div className="flex justify-between text-sm mb-1">
                       <label className="font-medium text-slate-600">SST Anomaly</label>
                       <span className="text-emerald-600 font-bold">{params.sst > 0 ? '+' : ''}{params.sst} °C</span>
                     </div>
                     <input type="range" min="-2" max="5" step="0.5" value={params.sst} onChange={(e) => {setParams({...params, sst: parseFloat(e.target.value)}); setActivePreset('custom');}} className="w-full accent-emerald-500" />
                   </div>
                   <div>
                     <div className="flex justify-between text-sm mb-1">
                       <label className="font-medium text-slate-600">Pressure Change</label>
                       <span className="text-emerald-600 font-bold">{params.pressure > 0 ? '+' : ''}{params.pressure} hPa</span>
                     </div>
                     <input type="range" min="-50" max="20" step="5" value={params.pressure} onChange={(e) => {setParams({...params, pressure: parseInt(e.target.value)}); setActivePreset('custom');}} className="w-full accent-emerald-500" />
                   </div>
                   <div>
                     <div className="flex justify-between text-sm mb-1">
                       <label className="font-medium text-slate-600">Base Wind Increase</label>
                       <span className="text-emerald-600 font-bold">+{params.wind} %</span>
                     </div>
                     <input type="range" min="0" max="100" step="10" value={params.wind} onChange={(e) => {setParams({...params, wind: parseInt(e.target.value)}); setActivePreset('custom');}} className="w-full accent-emerald-500" />
                   </div>
                   
                   <button 
                     onClick={handleSimulate}
                     disabled={simulating}
                     className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all flex justify-center items-center gap-2 disabled:opacity-70"
                   >
                     {simulating ? <Activity className="w-5 h-5 animate-spin" /> : <TestTube className="w-5 h-5" />}
                     {simulating ? 'SIMULATING...' : 'RUN SIMULATION'}
                   </button>
                 </div>
              </GlassCard>
            </div>

            <div className="lg:col-span-2">
               <GlassCard className="h-full p-6 flex flex-col">
                  <h2 className="text-xl font-bold text-slate-800 mb-2 border-b border-slate-100 pb-4">Simulation Results</h2>
                  
                  {simulating ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-emerald-500 space-y-4">
                      <Activity className="w-12 h-12 animate-spin" />
                      <p className="font-medium tracking-widest text-sm">CALCULATING OUTCOMES</p>
                    </div>
                  ) : results ? (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col">
                       <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-lg text-sm flex gap-2 items-start mb-6">
                         <AlertCircle className="w-5 h-5 flex-shrink-0" />
                         <p><strong>SCENARIO / SIMULATION</strong> - Not a real forecast. Results are generated using meteorological sensitivity analysis.</p>
                       </div>

                       <div className="grid grid-cols-2 gap-4 mb-8">
                         <div className="bg-white/60 p-4 rounded-xl border border-slate-200">
                           <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Overall Risk Change</div>
                           <div className={`text-3xl font-black ${results.change > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                              {results.change > 0 ? '+' : ''}{results.change}%
                           </div>
                         </div>
                         <div className="bg-white/60 p-4 rounded-xl border border-slate-200">
                           <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Status Escalation</div>
                           <div className="text-lg font-bold text-slate-800">
                              {results.change > 20 ? 'Category Upgrade Likely' : results.change > 0 ? 'Intensification Expected' : 'Stable / Weakening'}
                           </div>
                         </div>
                       </div>

                       <div className="flex-1 min-h-[300px]">
                         <h3 className="text-sm font-semibold text-slate-600 mb-4 text-center">Baseline vs Scenario Impact</h3>
                         <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={results.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                             <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                             <XAxis dataKey="name" stroke="#64748b" />
                             <YAxis stroke="#64748b" />
                             <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                             <Legend />
                             <Bar dataKey="baseline" name="Current Baseline" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                             <Bar dataKey="scenario" name="Simulated Scenario" fill="#10b981" radius={[4, 4, 0, 0]} />
                           </BarChart>
                         </ResponsiveContainer>
                       </div>
                    </motion.div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 m-4">
                      <div className="text-center">
                        <TestTube className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                        <p>Adjust parameters and run simulation to view projected outcomes.</p>
                      </div>
                    </div>
                  )}
               </GlassCard>
            </div>
         </div>
      </div>
    </div>
  );
}
