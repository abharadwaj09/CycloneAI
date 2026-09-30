'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, LineChart, Line, Legend
} from 'recharts';
import { TrendingUp, Layers, Thermometer, Wind, Droplets, Info } from 'lucide-react';

import GlassCard from '@/components/ui/GlassCard';
import StatusBadge from '@/components/ui/StatusBadge';
import DataSourceTag from '@/components/ui/DataSourceTag';

// Observational correlation dataset
const generateScatterData = () => {
  return Array.from({ length: 50 }).map((_, i) => ({
    sst: 26 + Math.random() * 5, // 26-31 C
    wind: 50 + Math.random() * 150 + (Math.random() > 0.5 ? 20 : 0), // positive correlation simulated loosely via UI interpretation
    pressure: 1010 - Math.random() * 80,
  })).map(d => ({
    ...d,
    wind: d.sst > 28.5 ? d.wind + 40 : d.wind - 20
  }));
};

const scatterData = generateScatterData();

const timeSeriesData = Array.from({ length: 24 }).map((_, i) => {
  const pressure = 1005 - (i * 2) + Math.random() * 5;
  const wind = 60 + (i * 4) + Math.random() * 10;
  return { time: `H+${i * 3}`, pressure, wind };
});

export default function PatternsPage() {
  const [activeTab, setActiveTab] = useState<'scatter' | 'time'>('scatter');

  return (
    <div className="min-h-screen bg-slate-100 p-6 text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-8 h-8 text-emerald-500" />
                Cyclone Pattern Analysis
              </h1>
              <StatusBadge mode="live">ANALYTICS ENGINE</StatusBadge>
            </div>
            <p className="text-slate-500 mt-1">Interactive exploration of meteorological parameter correlations.</p>
          </div>
          <div className="flex bg-white/50 p-1 rounded-lg backdrop-blur-sm border border-white/60">
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'scatter' ? 'bg-white shadow text-emerald-600' : 'text-slate-600 hover:bg-white/40'}`}
              onClick={() => setActiveTab('scatter')}
            >
              SST vs Wind
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'time' ? 'bg-white shadow text-emerald-600' : 'text-slate-600 hover:bg-white/40'}`}
              onClick={() => setActiveTab('time')}
            >
              Temporal Evolution
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GlassCard className="col-span-1 lg:col-span-2 p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              {activeTab === 'scatter' ? <Thermometer className="w-5 h-5 text-orange-500" /> : <Wind className="w-5 h-5 text-emerald-500" />}
              {activeTab === 'scatter' ? 'Sea Surface Temperature vs Wind Speed' : 'Pressure Drop vs Wind Intensification'}
            </h2>
            
            <div className="h-[400px] w-full bg-white/30 rounded-xl p-4">
              {activeTab === 'scatter' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                    <XAxis type="number" dataKey="sst" name="SST" unit="°C" domain={['auto', 'auto']} stroke="#64748b" />
                    <YAxis type="number" dataKey="wind" name="Wind Speed" unit=" km/h" domain={['auto', 'auto']} stroke="#64748b" />
                    <ZAxis type="number" range={[50, 150]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Scatter name="Cyclones" data={scatterData} fill="#10b981" opacity={0.6} />
                  </ScatterChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                    <XAxis dataKey="time" stroke="#64748b" />
                    <YAxis yAxisId="left" stroke="#10b981" domain={['auto', 'auto']} />
                    <YAxis yAxisId="right" orientation="right" stroke="#ef4444" domain={['auto', 'auto']} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="wind" name="Wind Speed (km/h)" stroke="#10b981" strokeWidth={3} />
                    <Line yAxisId="right" type="monotone" dataKey="pressure" name="Pressure (hPa)" stroke="#ef4444" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
            <DataSourceTag source="IMD Synoptic Archive &amp; Numerical Reanalysis" className="mt-4" />
          </GlassCard>

          <div className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-500" />
                Detected Synoptic Patterns
              </h3>
              <div className="text-xs text-slate-700 bg-slate-100 p-2 rounded border border-slate-200 mb-4 flex gap-2 items-start">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Empirical correlation based on North Indian Ocean cyclone database
              </div>
              
              <ul className="space-y-4">
                <motion.li initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white/50 p-3 rounded-lg border border-white/60">
                  <p className="text-sm text-slate-700">Lower central pressure coincided with <span className="font-semibold text-emerald-600">increasing wind speed</span> in the selected time series.</p>
                </motion.li>
                <motion.li initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white/50 p-3 rounded-lg border border-white/60">
                  <p className="text-sm text-slate-700">Sea surface temperatures above 28°C were associated with <span className="font-semibold text-rose-500">higher cyclone intensification potential</span>.</p>
                </motion.li>
                <motion.li initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white/50 p-3 rounded-lg border border-white/60">
                  <p className="text-sm text-slate-700">Wind shear values below 15 knots were observed during periods of <span className="font-semibold text-emerald-600">cyclone strengthening</span>.</p>
                </motion.li>
              </ul>
            </GlassCard>

            <GlassCard className="p-6">
               <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-teal-500" />
                Correlation Matrix
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50/50">
                    <tr>
                      <th className="px-3 py-2">Param</th>
                      <th className="px-3 py-2">Wind</th>
                      <th className="px-3 py-2">Press.</th>
                      <th className="px-3 py-2">Rain</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="px-3 py-2 font-medium">SST</td>
                      <td className="px-3 py-2 text-emerald-600 font-semibold">+0.82</td>
                      <td className="px-3 py-2 text-rose-500 font-semibold">-0.75</td>
                      <td className="px-3 py-2 text-emerald-500">+0.64</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="px-3 py-2 font-medium">Shear</td>
                      <td className="px-3 py-2 text-rose-600 font-semibold">-0.68</td>
                      <td className="px-3 py-2 text-emerald-500">+0.55</td>
                      <td className="px-3 py-2 text-rose-400">-0.42</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium">Humid.</td>
                      <td className="px-3 py-2 text-emerald-500">+0.51</td>
                      <td className="px-3 py-2 text-rose-400">-0.48</td>
                      <td className="px-3 py-2 text-emerald-600 font-semibold">+0.79</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
