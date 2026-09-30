'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Compass, ArrowUpRight, ArrowDownRight, Thermometer, Droplet, Gauge } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GlassCard from '@/components/ui/GlassCard';
import StatusBadge from '@/components/ui/StatusBadge';
import DataSourceTag from '@/components/ui/DataSourceTag';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const demoWindData = [
  { time: '00:00', speed: 45 },
  { time: '04:00', speed: 52 },
  { time: '08:00', speed: 58 },
  { time: '12:00', speed: 75 },
  { time: '16:00', speed: 90 },
  { time: '20:00', speed: 85 },
  { time: '24:00', speed: 88 },
];

export default function WindPage() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden bg-slate-100 text-slate-800">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Simple wind particle animation */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="absolute h-px bg-emerald-300 opacity-50 animate-wind"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: '-10%', 
              width: `${50 + Math.random() * 150}px`,
              animationDuration: `${2 + Math.random() * 3}s`, 
              animationDelay: `${Math.random() * 2}s` 
            }} 
          />
        ))}
      </div>

      <motion.div variants={containerVars} initial="hidden" animate="show" className="max-w-7xl mx-auto space-y-6 relative z-10">
        <header className="flex justify-between items-end border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3 text-slate-900">
              <Wind className="w-10 h-10 text-emerald-500" />
              Wind & Atmosphere
            </h1>
            <p className="text-slate-500 mt-2">Atmospheric dynamics and circulation patterns</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusBadge mode="live" pulse />
            <DataSourceTag source="GFS &amp; ECMWF Models" timestamp={new Date().toISOString()} />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassCard className="p-6 col-span-1 md:col-span-2 lg:col-span-2 flex flex-col justify-center items-center bg-gradient-to-br from-emerald-500 to-emerald-600 text-white relative overflow-hidden">
            <div className="absolute top-4 left-4 flex items-center gap-2 text-slate-300">
              <Wind className="w-5 h-5" /> Current Wind Speed
            </div>
            <div className="text-center mt-6">
              <div className="text-7xl font-bold font-mono tracking-tighter">
                <AnimatedCounter value={165} />
              </div>
              <div className="text-xl text-emerald-100 font-medium">km/h</div>
            </div>
            <div className="mt-4 px-4 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
              Peak Gusts up to 215 km/h (Category 4)
            </div>
          </GlassCard>

          <GlassCard className="p-6 flex flex-col items-center justify-center">
            <div className="text-slate-500 mb-2 font-medium">Direction</div>
            <div className="relative w-32 h-32 flex items-center justify-center">
              <Compass className="w-32 h-32 text-slate-300 absolute" />
              <motion.div 
                animate={{ rotate: 315 }} 
                transition={{ duration: 2, ease: "easeOut" }}
                className="w-full h-full flex items-center justify-center absolute"
              >
                <div className="w-1 h-16 bg-red-500 rounded-full origin-bottom -translate-y-8" />
              </motion.div>
              <div className="z-10 font-bold text-xl bg-white/80 rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm text-slate-900">
                NW
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <Gauge className="w-5 h-5 text-red-500" /> Central Pressure
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-800">948 <span className="text-lg font-normal text-slate-500">hPa</span></div>
              <div className="flex items-center text-red-500 text-sm mt-2 font-medium">
                <ArrowDownRight className="w-4 h-4 mr-1" /> Deep Barometric Dip (-8 hPa/3h)
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-900">Wind Speed Trend</h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={demoWindData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="speed" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>

          <div className="space-y-4">
            <GlassCard className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><Thermometer className="w-6 h-6" /></div>
                <div>
                  <div className="text-sm text-slate-500">Air Temp</div>
                  <div className="font-bold text-lg">28.5 °C</div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Droplet className="w-6 h-6" /></div>
                <div>
                  <div className="text-sm text-slate-500">Relative Humidity</div>
                  <div className="font-bold text-lg">85 %</div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg"><Wind className="w-6 h-6" /></div>
                <div>
                  <div className="text-sm text-slate-500">Vertical Wind Shear</div>
                  <div className="font-bold text-lg text-green-600">Low (12 kts)</div>
                </div>
              </div>
              <div className="text-xs text-right text-slate-400 max-w-[80px]">Favorable for dev.</div>
            </GlassCard>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
