'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, AlertTriangle, CheckCircle, Clock, MapPin, ChevronDown, ChevronUp, AlertOctagon } from 'lucide-react';

const FallbackGlassCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/70 backdrop-blur-md border border-white/40 rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);
const Card = FallbackGlassCard;

const ROAD_INCIDENTS = [
  { id: 1, name: 'NH-16 near Puri', location: 'Odisha', status: 'BLOCKED', reason: 'Flooding', reported: '2h ago', updated: '15m ago', source: 'Traffic Police', details: 'Deep waterlogging near toll plaza. Both carriageways impassable.', altRoute: 'Use SH-23 via Pipili, expect 45m delay.' },
  { id: 2, name: 'NH-5 Visakhapatnam', location: 'Andhra Pradesh', status: 'PARTIALLY AFFECTED', reason: 'Waterlogging', reported: '1h ago', updated: '10m ago', source: 'User Reports', details: 'Left lane submerged near airport junction.', altRoute: 'Proceed with caution, follow local diversions.' },
  { id: 3, name: 'SH-60 East Midnapore', location: 'West Bengal', status: 'BLOCKED', reason: 'Fallen trees', reported: '3h ago', updated: '1h ago', source: 'State Disaster Mgmt', details: 'Multiple large trees uprooted across the highway.', altRoute: 'Avoid travel. Road clearing in progress.' },
  { id: 4, name: 'NH-48 Mumbai-Goa', location: 'Maharashtra', status: 'OPEN', reason: 'Clear', reported: '-', updated: '30m ago', source: 'Highway Auth', details: 'Normal traffic flow observed.', altRoute: 'N/A' },
  { id: 5, name: 'NH-8 Raigad', location: 'Maharashtra', status: 'PARTIALLY AFFECTED', reason: 'Landslide debris', reported: '4h ago', updated: '30m ago', source: 'Traffic Police', details: 'Minor mudslides near ghat section. Single lane open.', altRoute: 'Heavy vehicles diverted via Pune.' },
  { id: 6, name: 'State Road Balasore', location: 'Odisha', status: 'BLOCKED', reason: 'Cyclone damage', reported: '1h ago', updated: '5m ago', source: 'Local Admin', details: 'Electric poles down on road.', altRoute: 'No immediate alternative route cleared.' },
  { id: 7, name: 'NH-32 Chennai', location: 'Tamil Nadu', status: 'PARTIALLY AFFECTED', reason: 'Heavy Rain', reported: '2h ago', updated: '20m ago', source: 'Traffic Police', details: 'Reduced visibility and surface water.', altRoute: 'Drive at reduced speeds.' },
  { id: 8, name: 'NH-66 Mangaluru', location: 'Karnataka', status: 'OPEN', reason: 'Clear', reported: '-', updated: '1h ago', source: 'Highway Auth', details: 'All lanes open.', altRoute: 'N/A' }
];

export default function RoadsPage() {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterState, setFilterState] = useState('ALL');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const stats = {
    OPEN: ROAD_INCIDENTS.filter(r => r.status === 'OPEN').length,
    PARTIALLY_AFFECTED: ROAD_INCIDENTS.filter(r => r.status === 'PARTIALLY AFFECTED').length,
    BLOCKED: ROAD_INCIDENTS.filter(r => r.status === 'BLOCKED').length
  };

  const filteredRoads = ROAD_INCIDENTS.filter(road => {
    if (filterStatus !== 'ALL' && road.status !== filterStatus) return false;
    if (filterState !== 'ALL' && road.location !== filterState) return false;
    return true;
  });

  const states = Array.from(new Set(ROAD_INCIDENTS.map(r => r.location)));

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 pt-24 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-8">
          <Map className="w-8 h-8 text-emerald-500" />
          <h1 className="text-3xl font-bold text-slate-900">Roads &amp; Infrastructure</h1>
          <span className="ml-auto text-xs bg-red-100 text-red-700 border border-red-200 px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            LIVE HIGHWAY SURVEILLANCE
          </span>
        </motion.div>

        <p className="text-sm text-slate-500 mb-6">NHAI &amp; State Emergency Traffic Operations status on coastal highway blockages and waterlogged routes.</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border-l-4 border-l-green-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">OPEN ROADS</p>
                <h3 className="text-3xl font-bold text-slate-800">{stats.OPEN}</h3>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </Card>
          <Card className="p-6 border-l-4 border-l-amber-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">PARTIALLY AFFECTED</p>
                <h3 className="text-3xl font-bold text-slate-800">{stats.PARTIALLY_AFFECTED}</h3>
              </div>
              <div className="p-3 rounded-full bg-amber-100 text-amber-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>
          </Card>
          <Card className="p-6 border-l-4 border-l-red-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">BLOCKED</p>
                <h3 className="text-3xl font-bold text-slate-800">{stats.BLOCKED}</h3>
              </div>
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <AlertOctagon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4 w-full sm:w-auto">
            <select 
              className="rounded-lg border-slate-300 text-sm focus:ring-emerald-500 focus:border-emerald-500"
              value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="OPEN">Open</option>
              <option value="PARTIALLY AFFECTED">Partially Affected</option>
              <option value="BLOCKED">Blocked</option>
            </select>
            <select 
              className="rounded-lg border-slate-300 text-sm focus:ring-emerald-500 focus:border-emerald-500"
              value={filterState} onChange={(e) => setFilterState(e.target.value)}
            >
              <option value="ALL">All States</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <p className="text-sm text-slate-500">Showing {filteredRoads.length} incidents</p>
        </Card>

        {/* Incident List */}
        <div className="space-y-4">
          {filteredRoads.map((road, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={road.id}
            >
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div 
                  className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center cursor-pointer"
                  onClick={() => setExpandedId(expandedId === road.id ? null : road.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-800 text-lg">{road.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        road.status === 'BLOCKED' ? 'bg-red-100 text-red-700' :
                        road.status === 'OPEN' ? 'bg-green-100 text-green-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {road.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {road.location}</span>
                      <span className="flex items-center gap-1"><AlertTriangle className="w-4 h-4"/> {road.reason}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-500 sm:text-right">
                    <div className="hidden sm:block">
                      <p>Reported: {road.reported}</p>
                      <p className="text-xs">Updated: {road.updated}</p>
                    </div>
                    {expandedId === road.id ? <ChevronUp className="w-5 h-5"/> : <ChevronDown className="w-5 h-5"/>}
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === road.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-100 bg-slate-50"
                    >
                      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-slate-700 mb-2">Incident Details</h4>
                          <p className="text-sm text-slate-600 mb-3">{road.details}</p>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Clock className="w-4 h-4" /> Source: {road.source} | Last Verified: {road.updated}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-700 mb-2">Alternative Route / Advice</h4>
                          <div className="bg-slate-100 text-slate-800 p-3 rounded-lg text-sm border border-slate-200">
                            {road.altRoute}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
          {filteredRoads.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No roads match the selected filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
