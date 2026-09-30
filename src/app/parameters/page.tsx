'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Wind, Droplets, Thermometer, Database } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import GlassCard from '@/components/ui/GlassCard';
import StatusBadge from '@/components/ui/StatusBadge';

const radarData = [
  { subject: 'Wind Speed', A: 120, fullMark: 150 },
  { subject: 'Rainfall', A: 98, fullMark: 150 },
  { subject: 'SST', A: 86, fullMark: 150 },
  { subject: 'Pressure Drop', A: 99, fullMark: 150 },
  { subject: 'Size/Extent', A: 85, fullMark: 150 },
  { subject: 'Storm Surge', A: 65, fullMark: 150 },
];

export default function ParametersPage() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen p-6 bg-slate-100 text-slate-800">
      <motion.div variants={containerVars} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-6">
        <header className="flex justify-between items-end border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3 text-slate-900">
              <Database className="w-10 h-10 text-emerald-600" />
              Cyclone Parameters
            </h1>
            <p className="text-slate-500 mt-2">Detailed multi-variable storm profile</p>
          </div>
          <StatusBadge mode="live" status="VERY SEVERE CYCLONE: DANA" type="live" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassCard className="p-4 flex items-center gap-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-full"><Wind className="w-6 h-6" /></div>
            <div>
              <div className="text-sm text-slate-500">Max Sustained</div>
              <div className="text-xl font-bold">165 km/h</div>
            </div>
          </GlassCard>
          
          <GlassCard className="p-4 flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full"><Activity className="w-6 h-6" /></div>
            <div>
              <div className="text-sm text-slate-500">Central Pressure</div>
              <div className="text-xl font-bold">958 hPa</div>
            </div>
          </GlassCard>

          <GlassCard className="p-4 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full"><Droplets className="w-6 h-6" /></div>
            <div>
              <div className="text-sm text-slate-500">Est. Rainfall</div>
              <div className="text-xl font-bold">250 mm/day</div>
            </div>
          </GlassCard>

          <GlassCard className="p-4 flex items-center gap-4">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-full"><Thermometer className="w-6 h-6" /></div>
            <div>
              <div className="text-sm text-slate-500">Underlying SST</div>
              <div className="text-xl font-bold">30.2 °C</div>
            </div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold mb-6 text-slate-900">Parameter Profile</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar name="Cyclone" dataKey="A" stroke="#10b981" strokeWidth={2} fill="#10b981" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="text-xl font-bold mb-6 text-slate-900">Key Metrics Table</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-3 text-slate-500 font-medium">Parameter</th>
                    <th className="pb-3 text-slate-500 font-medium">Current Value</th>
                    <th className="pb-3 text-slate-500 font-medium">Trend (24h)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="py-3 font-medium">Eye Diameter</td>
                    <td className="py-3">45 km</td>
                    <td className="py-3 text-green-600">Contracting</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Movement Speed</td>
                    <td className="py-3">12 km/h</td>
                    <td className="py-3 text-slate-500">Steady</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Radius of Max Winds</td>
                    <td className="py-3">55 km</td>
                    <td className="py-3 text-red-600">Expanding</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Storm Surge Risk</td>
                    <td className="py-3">2.5 - 3.5 m</td>
                    <td className="py-3 text-red-600">Increasing</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Distance to Coast</td>
                    <td className="py-3">240 km</td>
                    <td className="py-3 text-orange-600">Decreasing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  );
}
