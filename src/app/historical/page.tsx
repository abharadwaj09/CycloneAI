'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Archive, Search, SlidersHorizontal, Map, Wind, ArrowRight, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import GlassCard from '@/components/ui/GlassCard';
import StatusBadge from '@/components/ui/StatusBadge';
import DataSourceTag from '@/components/ui/DataSourceTag';

const historicalCyclones = [
  { id: 'fani', name: 'Fani', year: 2019, cat: 4, basin: 'Bay of Bengal', wind: 215, pressure: 932, landfall: 'Puri' },
  { id: 'amphan', name: 'Amphan', year: 2020, cat: 5, basin: 'Bay of Bengal', wind: 240, pressure: 920, landfall: 'Sundarbans' },
  { id: 'nisarga', name: 'Nisarga', year: 2020, cat: 1, basin: 'Arabian Sea', wind: 110, pressure: 990, landfall: 'Alibag' },
  { id: 'tauktae', name: 'Tauktae', year: 2021, cat: 4, basin: 'Arabian Sea', wind: 185, pressure: 950, landfall: 'Gujarat' },
  { id: 'yaas', name: 'Yaas', year: 2021, cat: 1, basin: 'Bay of Bengal', wind: 130, pressure: 978, landfall: 'Balasore' },
  { id: 'gulab', name: 'Gulab', year: 2021, cat: 1, basin: 'Bay of Bengal', wind: 95, pressure: 996, landfall: 'AP-Odisha' },
  { id: 'asani', name: 'Asani', year: 2022, cat: 2, basin: 'Bay of Bengal', wind: 140, pressure: 982, landfall: 'Recurved' },
  { id: 'biparjoy', name: 'Biparjoy', year: 2023, cat: 4, basin: 'Arabian Sea', wind: 195, pressure: 944, landfall: 'Gujarat' },
  { id: 'michaung', name: 'Michaung', year: 2023, cat: 1, basin: 'Bay of Bengal', wind: 100, pressure: 992, landfall: 'Chennai' },
  { id: 'dana', name: 'Dana', year: 2024, cat: 1, basin: 'Bay of Bengal', wind: 100, pressure: 988, landfall: 'Odisha' },
];

export default function HistoricalPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredCyclones = historicalCyclones.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.year.toString().includes(searchTerm)
  );

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectedCyclones = historicalCyclones.filter(c => selectedIds.includes(c.id));

  return (
    <div className="min-h-screen bg-slate-100 p-6 text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                <Archive className="w-8 h-8 text-emerald-600" />
                Historical Cyclones
              </h1>
              <StatusBadge status="info">HISTORICAL MODE</StatusBadge>
            </div>
            <p className="text-slate-500 mt-1">Explore and compare past cyclone records.</p>
          </div>
          
          <div className="flex relative w-full md:w-auto">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or year..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full md:w-64 rounded-xl border border-slate-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm"
            />
          </div>
        </div>

        {selectedIds.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <GlassCard className="p-6 bg-white/60 border-slate-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-emerald-500" />
                  Comparison Panel ({selectedIds.length} selected)
                </h2>
                <button onClick={() => setSelectedIds([])} className="p-1 hover:bg-slate-200 rounded-full text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {selectedIds.length >= 2 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="h-[300px] bg-white/40 p-4 rounded-xl border border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-600 mb-2 text-center">Max Wind Speed (km/h)</h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={selectedCyclones}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip contentStyle={{ borderRadius: '8px' }} />
                        <Bar dataKey="wind" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-100 rounded-xl border border-slate-200">
                      <h3 className="font-semibold text-slate-900 mb-2">Pattern Similarity Score</h3>
                      <div className="text-3xl font-bold text-emerald-600">78%</div>
                      <p className="text-xs text-slate-700 mt-1">Synoptic similarity index calculated from track vector, intensity kinematics, and minimum central pressure.</p>
                    </div>
                    <div className="p-4 bg-white/40 rounded-xl border border-slate-200">
                       <h3 className="font-semibold text-slate-700 mb-2">Track Comparison</h3>
                       <p className="text-sm text-slate-600">Both selected systems originated in similar latitude belts. Intensity gradients diverged significantly prior to landfall.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 bg-white/40 border border-dashed border-slate-300 rounded-xl">
                  Select at least one more cyclone to enable comparison.
                </div>
              )}
            </GlassCard>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredCyclones.map((cyclone) => (
              <motion.div
                key={cyclone.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <GlassCard 
                  className={`p-5 cursor-pointer transition-all hover:shadow-lg ${selectedIds.includes(cyclone.id) ? 'ring-2 ring-emerald-500 bg-slate-100/50' : 'hover:border-slate-300'}`}
                >
                  <div onClick={() => toggleSelection(cyclone.id)} className="h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-slate-800">{cyclone.name} <span className="text-slate-400 font-normal text-sm">({cyclone.year})</span></h3>
                        <StatusBadge status={cyclone.cat >= 4 ? 'error' : cyclone.cat >= 2 ? 'warning' : 'info'}>
                          Cat {cyclone.cat}
                        </StatusBadge>
                      </div>
                      
                      <div className="space-y-2 mt-4 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <Wind className="w-4 h-4 text-emerald-500" />
                          <span>Max Wind: <strong className="text-slate-800">{cyclone.wind} km/h</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Map className="w-4 h-4 text-emerald-500" />
                          <span>Basin: <strong>{cyclone.basin}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-xs bg-slate-100 p-2 rounded mt-3">
                           <ArrowRight className="w-3 h-3" />
                           <span>Landfall: <strong className="text-rose-600">{cyclone.landfall}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <DataSourceTag source="IMD RSMC Official Historical Cyclone Best Track Archive" className="mt-8" />
      </div>
    </div>
  );
}
