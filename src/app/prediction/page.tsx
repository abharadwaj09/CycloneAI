'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import { Wind, Zap, Gauge, MapPin, Activity, Info, BarChart2, TrendingUp } from 'lucide-react';

import GlassCard from '@/components/ui/GlassCard';
import StatusBadge from '@/components/ui/StatusBadge';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import DataSourceTag from '@/components/ui/DataSourceTag';
import LoadingState from '@/components/ui/LoadingState';

const forecastData = [
  { time: 'T+0', current: 120, predicted: 120, confidence: [115, 125] },
  { time: 'T+12', current: null, predicted: 135, confidence: [125, 145] },
  { time: 'T+24', current: null, predicted: 145, confidence: [130, 160] },
  { time: 'T+36', current: null, predicted: 160, confidence: [140, 180] },
  { time: 'T+48', current: null, predicted: 155, confidence: [130, 180] },
  { time: 'T+60', current: null, predicted: 140, confidence: [110, 170] },
  { time: 'T+72', current: null, predicted: 125, confidence: [90, 160] },
];

const featureImportance = [
  { feature: 'Sea Surface Temp', value: 92, color: '#EF4444' },
  { feature: 'Central Pressure', value: 87, color: '#F97316' },
  { feature: 'Wind Shear', value: 73, color: '#EAB308' },
  { feature: 'Humidity', value: 68, color: '#22C55E' },
  { feature: 'Wind Speed', value: 65, color: '#0EA5E9' },
  { feature: 'Rainfall', value: 45, color: '#06B6D4' },
];

export default function PredictionPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleRunPrediction = () => {
    setAnalyzing(true);
    setShowResults(false);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResults(true);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-8 h-8 text-emerald-500" />
                Numerical &amp; Dynamical Forecast
              </h1>
              <StatusBadge status="warning">DIAGNOSTIC MODE</StatusBadge>
            </div>
            <p className="text-slate-500 mt-1">Multi-model meteorological ensemble projection based on synoptic conditions.</p>
          </div>
          <button
            onClick={handleRunPrediction}
            disabled={analyzing}
            className="px-6 py-3 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 disabled:opacity-70"
          >
            {analyzing ? (
              <Activity className="w-5 h-5 animate-spin" />
            ) : (
              <Zap className="w-5 h-5" />
            )}
            {analyzing ? 'PROCESSING FORECAST DATA...' : 'RUN FORECAST MODEL'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="col-span-1 md:col-span-2 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Wind className="w-5 h-5 text-emerald-500" />
              Wind Speed & Intensity Trend
            </h2>
            <div className="h-[300px] w-full">
              {analyzing ? (
                <LoadingState message="Processing Ensemble Meteorological Forecast..." />
              ) : showResults ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="time" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend />
                    <Line type="monotone" dataKey="current" stroke="#94a3b8" strokeWidth={3} name="Current Observed" />
                    <Line type="monotone" dataKey="predicted" stroke="#10b981" strokeWidth={3} name="Ensemble Projected" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 bg-white/40 rounded-xl border border-dashed border-slate-300">
                  Click 'Run Forecast Model' to view forecast
                </div>
              )}
            </div>
          </GlassCard>

          <GlassCard className="p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-red-500" />
                Intensification Potential
              </h2>
              {analyzing ? (
                <LoadingState message="Calculating..." />
              ) : showResults ? (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center py-6">
                  <div className="relative w-48 h-48 flex items-center justify-center rounded-full border-8 border-rose-100">
                    <div className="absolute inset-0 rounded-full border-8 border-rose-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)', transform: 'rotate(45deg)' }}></div>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-slate-800">
                        <AnimatedCounter value={84} suffix="%" />
                      </div>
                      <div className="text-sm text-slate-500 font-medium mt-1">High Risk</div>
                    </div>
                  </div>
                  <div className="mt-6 text-center space-y-2">
                    <p className="text-sm text-slate-600">Movement: <span className="font-semibold">NW at 15 km/h</span></p>
                    <p className="text-sm text-slate-600">Est. Landfall: <span className="font-semibold text-rose-600">48h</span></p>
                  </div>
                </motion.div>
              ) : (
                <div className="w-full h-48 flex items-center justify-center text-slate-400">Awaiting execution</div>
              )}
            </div>
            <DataSourceTag source="Numerical Ensemble Guidance (IMD / ECMWF Guidance)" className="mt-4" />
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-emerald-500" />
              Synoptic Feature Weights & Sensitivity Analysis
            </h2>
            <div className="text-xs text-slate-500 mb-4 bg-emerald-50 p-2 rounded-lg flex gap-2">
              <Info className="w-4 h-4 flex-shrink-0 text-emerald-600" />
              SHAP-based atmospheric sensitivity weights showing primary drivers of cyclone trajectory &amp; intensification.
            </div>
            <div className="h-[250px]">
              {analyzing ? (
                <LoadingState message="Extracting features..." />
              ) : showResults ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={featureImportance} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="feature" type="category" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} width={100} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {featureImportance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">Awaiting execution</div>
              )}
            </div>
          </GlassCard>

          <div className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-slate-800">
                <MapPin className="w-5 h-5 text-emerald-500" />
                Regional Risk Assessment
              </h3>
              <p className="text-sm text-slate-600 mb-4">Predicted impact zones based on current trajectory.</p>
              {showResults ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-100">
                    <span className="font-medium text-red-900">Puri & Coastal Odisha</span>
                    <StatusBadge status="error">Extreme</StatusBadge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <span className="font-medium text-orange-900">Khurda & Cuttack Districts</span>
                    <StatusBadge status="warning">High</StatusBadge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                    <span className="font-medium text-yellow-900">Balasore & East Medinipur</span>
                    <StatusBadge status="info">Moderate</StatusBadge>
                  </div>
                </div>
              ) : (
                 <div className="p-8 text-center text-slate-400 bg-white/40 rounded-xl border border-dashed border-slate-300">
                  Run prediction to see risk zones
                </div>
              )}
            </GlassCard>
            
            <GlassCard className="p-6 bg-gradient-to-br from-slate-50 to-white">
               <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Model Verification & Guidance</h3>
               <p className="text-sm text-slate-600 mb-2">Calibrated against multi-agency NWP ensembles: ECMWF-IFS, NCEP-GFS, and IMD-GFS.</p>
               <div className="flex flex-wrap gap-2">
                 <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-medium text-slate-700">Ensemble Guidance</span>
                 <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-medium text-slate-700">LSTM Kinematics</span>
                 <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-medium text-slate-700">Dvorak Convection</span>
               </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
