'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudRain, Filter, MapPin, ChevronDown, Droplets, Activity, Search } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GlassCard from '@/components/ui/GlassCard';
import StatusBadge from '@/components/ui/StatusBadge';
import AlertBadge from '@/components/ui/AlertBadge';
import DataSourceTag from '@/components/ui/DataSourceTag';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const rainfallChartData = [
  { time: '00:00', rain: 12.5 },
  { time: '04:00', rain: 28.4 },
  { time: '08:00', rain: 65.2 },
  { time: '12:00', rain: 112.5 },
  { time: '16:00', rain: 185.0 },
  { time: '20:00', rain: 145.2 },
  { time: '24:00', rain: 95.1 },
];

const locations = [
  { rank: 1, city: 'Puri Coast', state: 'Odisha', current: 185.0, acc24: 285.4, intensity: 'Extremely Heavy', updated: 'Just now' },
  { rank: 2, city: 'Ganjam', state: 'Odisha', current: 135.2, acc24: 215.0, intensity: 'Extremely Heavy', updated: '2m ago' },
  { rank: 3, city: 'Sundarbans', state: 'West Bengal', current: 110.0, acc24: 190.0, intensity: 'Extremely Heavy', updated: '5m ago' },
  { rank: 4, city: 'Balasore', state: 'Odisha', current: 95.0, acc24: 210.5, intensity: 'Heavy', updated: '8m ago' },
  { rank: 5, city: 'Srikakulam', state: 'Andhra Pradesh', current: 85.0, acc24: 160.2, intensity: 'Heavy', updated: '12m ago' },
  { rank: 6, city: 'Visakhapatnam', state: 'Andhra Pradesh', current: 45.0, acc24: 85.0, intensity: 'Moderate', updated: '15m ago' },
];

export default function RainfallPage() {
  const [filter, setFilter] = useState('All');
  const [expandedCity, setExpandedCity] = useState<string | null>(null);

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden bg-slate-100 text-slate-800">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {/* Simple rain particle animation placeholder via CSS/divs */}
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-0.5 h-4 bg-blue-500 rounded-full animate-rain" style={{ left: `${Math.random() * 100}%`, animationDuration: `${0.5 + Math.random()}s`, animationDelay: `${Math.random()}s` }} />
        ))}
      </div>

      <motion.div variants={containerVars} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-6 relative z-10">
        <header className="flex justify-between items-end border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3 text-slate-900">
              <CloudRain className="w-10 h-10 text-emerald-500" />
              Rainfall Monitor
            </h1>
            <p className="text-slate-500 mt-2">Real-time precipitation intelligence</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusBadge mode="live" pulse />
            <DataSourceTag source="IMD Radar & Satellite" timestamp={new Date().toISOString()} />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <GlassCard className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-600" />
                  Top Locations by Rainfall
                </h2>
                <div className="flex gap-2">
                  {['All', 'Coastal', 'Heavy+'].map(f => (
                    <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-full text-sm transition-colors ${filter === f ? 'bg-slate-900 text-white' : 'bg-emerald-50 text-slate-700 hover:bg-emerald-100'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {locations.map((loc) => (
                  <motion.div key={loc.city} layout className="border border-slate-200 rounded-xl overflow-hidden bg-white/50 hover:bg-white/80 transition-colors">
                    <div className="p-4 cursor-pointer flex items-center justify-between" onClick={() => setExpandedCity(expandedCity === loc.city ? null : loc.city)}>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-slate-400">#{loc.rank}</span>
                        <div>
                          <h3 className="font-bold text-lg">{loc.city}</h3>
                          <p className="text-sm text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {loc.state}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="font-mono text-xl font-bold text-slate-700">{loc.current} <span className="text-sm font-normal text-slate-500">mm/hr</span></div>
                          <AlertBadge level={loc.intensity.includes('Heavy') ? 'high' : 'low'} text={loc.intensity} />
                        </div>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedCity === loc.city ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {expandedCity === loc.city && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="bg-slate-100/50 border-t border-slate-200 px-4 py-4 overflow-hidden">
                          <div className="grid grid-cols-4 gap-4">
                            <div className="p-3 bg-white rounded-lg shadow-sm">
                              <div className="text-xs text-slate-500 mb-1">1h Accumulation</div>
                              <div className="font-bold text-lg">{loc.current} mm</div>
                            </div>
                            <div className="p-3 bg-white rounded-lg shadow-sm">
                              <div className="text-xs text-slate-500 mb-1">24h Accumulation</div>
                              <div className="font-bold text-lg">{loc.acc24} mm</div>
                            </div>
                            <div className="p-3 bg-white rounded-lg shadow-sm">
                              <div className="text-xs text-slate-500 mb-1">Flood Risk</div>
                              <div className="font-bold text-red-500">HIGH</div>
                            </div>
                            <div className="p-3 bg-white rounded-lg shadow-sm">
                              <div className="text-xs text-slate-500 mb-1">Last Updated</div>
                              <div className="font-bold">{loc.updated}</div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>

          <div className="space-y-6">
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-emerald-600" />
                24h Trend (Coastal Avg)
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={rainfallChartData}>
                    <defs>
                      <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="rain" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRain)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            <GlassCard className="p-6 bg-gradient-to-br from-white to-slate-50">
              <h2 className="text-xl font-semibold mb-4">Reference Categories</h2>
              <div className="space-y-3">
                {[
                  { label: 'Light Rain', range: '< 2.5 mm/hr', color: 'bg-green-100 text-green-700' },
                  { label: 'Moderate Rain', range: '2.5 - 7.5 mm/hr', color: 'bg-yellow-100 text-yellow-700' },
                  { label: 'Heavy Rain', range: '7.5 - 35.5 mm/hr', color: 'bg-orange-100 text-orange-700' },
                  { label: 'Very Heavy', range: '35.5 - 115.5 mm/hr', color: 'bg-red-100 text-red-700' },
                  { label: 'Extremely Heavy', range: '> 115.5 mm/hr', color: 'bg-purple-100 text-purple-700' },
                ].map((cat) => (
                  <div key={cat.label} className="flex justify-between items-center text-sm">
                    <span className={`px-2 py-1 rounded ${cat.color} font-medium`}>{cat.label}</span>
                    <span className="text-slate-600">{cat.range}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
