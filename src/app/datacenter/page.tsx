'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Database, Activity, RefreshCw, CheckCircle, AlertCircle, Wifi, Clock, Server } from 'lucide-react';

const FallbackGlassCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/70 backdrop-blur-md border border-white/40 rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);
const Card = FallbackGlassCard;

interface DataSourceItem {
  name: string;
  status: string;
  connected: boolean;
  lastUpdate: string;
  nextUpdate: string;
  provider: string;
  error?: boolean;
}

const DATA_SOURCES: DataSourceItem[] = [
  { name: 'Satellite Imagery', status: 'Operational Feed', connected: true, lastUpdate: '10 mins ago', nextUpdate: 'in 5 mins', provider: 'INSAT-3DR / NOAA' },
  { name: 'Doppler Radar API', status: 'Operational Feed', connected: true, lastUpdate: '2 mins ago', nextUpdate: 'in 8 mins', provider: 'IMD Coastal Radars' },
  { name: 'Coastal Wind Sensors', status: 'Operational Feed', connected: true, lastUpdate: 'Live Sync', nextUpdate: 'Continuous', provider: 'IMD AWS Telemetry' },
  { name: 'Atmospheric Pressure', status: 'Operational Feed', connected: true, lastUpdate: '5 mins ago', nextUpdate: 'in 5 mins', provider: 'IMD Surface Network' },
  { name: 'Ocean Wave Buoys', status: 'Operational Feed', connected: true, lastUpdate: '15 mins ago', nextUpdate: 'in 45 mins', provider: 'INCOIS Ocean Buoys' },
  { name: 'Cyclone Best Track', status: 'Operational Feed', connected: true, lastUpdate: 'Live Bulletin', nextUpdate: 'in 1 hour', provider: 'RSMC / IMD' },
  { name: 'Marine & Bathymetry Tiles', status: 'Connected', connected: true, lastUpdate: 'Active', nextUpdate: 'On Demand', provider: 'Esri World Ocean' },
  { name: 'Dynamical NWP Guidance', status: 'Connected', connected: true, lastUpdate: '00Z / 12Z Cycle', nextUpdate: 'Next Cycle', provider: 'ECMWF / IMD Ensemble' },
];

export default function DataCenterPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 pt-24 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8 text-emerald-500" />
            <h1 className="text-3xl font-bold text-slate-900">Live Data Center</h1>
          </div>
          <div className="flex items-center gap-2 bg-emerald-950 text-emerald-300 border border-emerald-700/60 px-4 py-2 rounded-xl text-sm font-bold shadow-md">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            System Status: 8/8 Telemetry Feeds Operational (Live)
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DATA_SOURCES.map((source, i) => (
            <motion.div key={source.name} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
              <Card className="p-5 h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-slate-800 leading-tight">{source.name}</h3>
                  {source.connected ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0 mt-1 animate-pulse" />
                  ) : source.error ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0 mt-1" />
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400 flex-shrink-0 mt-1" />
                  )}
                </div>
                
                <div className="mb-auto">
                  <span className={`text-xs px-2 py-1 rounded font-medium inline-flex items-center gap-1 ${
                    source.connected ? 'bg-green-100 text-green-700' : source.error ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {source.connected ? <CheckCircle className="w-3 h-3"/> : source.error ? <AlertCircle className="w-3 h-3"/> : <RefreshCw className="w-3 h-3"/>}
                    {source.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-500 border-t pt-3">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> Last Update:</span>
                    <span className="font-medium text-slate-700">{source.lastUpdate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3"/> Next:</span>
                    <span className="font-medium text-slate-700">{source.nextUpdate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1"><Server className="w-3 h-3"/> Provider:</span>
                    <span className="font-medium text-slate-700">{source.provider}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="p-8 mt-12 bg-white">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2"><Wifi className="w-5 h-5 text-emerald-500"/> System Architecture</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="h-12 bg-emerald-50 rounded-lg flex items-center justify-center font-bold text-slate-800 border border-slate-200">1. Data Ingestion</div>
              <p className="text-sm text-slate-600">APIs, Webhooks, and FTP streams ingest raw meteorological and satellite data from global providers.</p>
            </div>
            <div className="space-y-3">
              <div className="h-12 bg-indigo-100 rounded-lg flex items-center justify-center font-bold text-indigo-800 border border-indigo-200">2. Processing & AI</div>
              <p className="text-sm text-slate-600">Data is cleaned, normalized, and fed into ML models for intensity prediction, track forecasting, and risk analysis.</p>
            </div>
            <div className="space-y-3">
              <div className="h-12 bg-green-100 rounded-lg flex items-center justify-center font-bold text-green-800 border border-green-200">3. Dissemination</div>
              <p className="text-sm text-slate-600">Real-time alerts, map rendering, and dashboard updates are pushed to end-users via WebSockets.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
