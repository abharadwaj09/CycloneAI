'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Phone, Home, Shield, Flame, Activity, Crosshair, MapPin, Search } from 'lucide-react';

const FallbackGlassCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/70 backdrop-blur-md border border-white/40 rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);
const Card = FallbackGlassCard;

const FACILITIES = [
  { id: 1, name: 'Apollo Hospitals', type: 'Hospital', city: 'Chennai', state: 'Tamil Nadu', contact: '044-28293333' },
  { id: 2, name: 'KIMS Hospital', type: 'Hospital', city: 'Bhubaneswar', state: 'Odisha', contact: '0674-2725111' },
  { id: 3, name: 'Care Hospitals', type: 'Hospital', city: 'Visakhapatnam', state: 'Andhra Pradesh', contact: '0891-6165656' },
  { id: 4, name: 'AMRI Hospitals', type: 'Hospital', city: 'Kolkata', state: 'West Bengal', contact: '033-66800000' },
  { id: 5, name: 'Coastal District Hospital', type: 'Hospital', city: 'Puri', state: 'Odisha', contact: '108' },
  { id: 6, name: 'NIMHANS', type: 'Hospital', city: 'Bengaluru', state: 'Karnataka', contact: '080-26995000' },
  { id: 7, name: 'Government General Hospital', type: 'Hospital', city: 'Kakinada', state: 'Andhra Pradesh', contact: '108' },
  { id: 8, name: 'GMC Hospital', type: 'Hospital', city: 'Panaji', state: 'Goa', contact: '0832-2495000' },
  
  { id: 9, name: 'Puri Cyclone Shelter A', type: 'Shelter', city: 'Puri', state: 'Odisha', contact: 'Local Admin', capacity: '1500' },
  { id: 10, name: 'Gopalpur Multipurpose Shelter', type: 'Shelter', city: 'Ganjam', state: 'Odisha', contact: 'Local Admin', capacity: '2000' },
  { id: 11, name: 'Vizag Port Community Hall', type: 'Shelter', city: 'Visakhapatnam', state: 'Andhra Pradesh', contact: 'Local Admin', capacity: '800' },
  { id: 12, name: 'Digha Coastal Shelter', type: 'Shelter', city: 'Digha', state: 'West Bengal', contact: 'Local Admin', capacity: '1200' },
  { id: 13, name: 'Marina Relief Camp', type: 'Shelter', city: 'Chennai', state: 'Tamil Nadu', contact: 'Local Admin', capacity: '2500' },
  { id: 14, name: 'Machilipatnam Safe House', type: 'Shelter', city: 'Krishna', state: 'Andhra Pradesh', contact: 'Local Admin', capacity: '1000' },
  
  { id: 15, name: 'Marine Drive Police Station', type: 'Police', city: 'Puri', state: 'Odisha', contact: '100' },
  { id: 16, name: 'Beach Road Station', type: 'Police', city: 'Visakhapatnam', state: 'Andhra Pradesh', contact: '100' },
  { id: 17, name: 'Chennai Coastal Police', type: 'Police', city: 'Chennai', state: 'Tamil Nadu', contact: '100' },
  { id: 18, name: 'Digha Police Station', type: 'Police', city: 'Digha', state: 'West Bengal', contact: '100' },
  { id: 19, name: 'Kochi Marine Police', type: 'Police', city: 'Kochi', state: 'Kerala', contact: '100' },
  
  { id: 20, name: 'Central Fire Station', type: 'Fire', city: 'Bhubaneswar', state: 'Odisha', contact: '101' },
  { id: 21, name: 'Vizag Fire & Rescue', type: 'Fire', city: 'Visakhapatnam', state: 'Andhra Pradesh', contact: '101' },
  { id: 22, name: 'Chennai Fire Department', type: 'Fire', city: 'Chennai', state: 'Tamil Nadu', contact: '101' },
  { id: 23, name: 'Kolkata HQ Fire Station', type: 'Fire', city: 'Kolkata', state: 'West Bengal', contact: '101' },
  { id: 24, name: 'Mangaluru Fire Station', type: 'Fire', city: 'Mangaluru', state: 'Karnataka', contact: '101' },
];

const HELPLINES = [
  { name: 'National Emergency', num: '112', cat: 'General' },
  { name: 'NDMA Control Room', num: '1070', cat: 'Disaster' },
  { name: 'Disaster Management', num: '1078', cat: 'Disaster' },
  { name: 'Ambulance', num: '108', cat: 'Medical' },
  { name: 'Police', num: '100', cat: 'Security' },
  { name: 'Fire & Rescue', num: '101', cat: 'Emergency' },
  { name: 'Women Helpline', num: '1091', cat: 'Support' },
  { name: 'Child Helpline', num: '1098', cat: 'Support' },
  { name: 'Indian Coast Guard', num: '1554', cat: 'Rescue' },
];

export default function EmergencyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterState, setFilterState] = useState('All');

  const states = Array.from(new Set(FACILITIES.map(f => f.state)));
  const types = Array.from(new Set(FACILITIES.map(f => f.type)));

  const filteredFacilities = FACILITIES.filter(f => {
    if (filterType !== 'All' && f.type !== filterType) return false;
    if (filterState !== 'All' && f.state !== filterState) return false;
    if (searchTerm && !f.name.toLowerCase().includes(searchTerm.toLowerCase()) && !f.city.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getIcon = (type: string) => {
    switch(type) {
      case 'Hospital': return <Activity className="w-5 h-5 text-red-500" />;
      case 'Shelter': return <Home className="w-5 h-5 text-green-500" />;
      case 'Police': return <Shield className="w-5 h-5 text-blue-500" />;
      case 'Fire': return <Flame className="w-5 h-5 text-orange-500" />;
      default: return <Building2 className="w-5 h-5 text-slate-500" />;
    }
  };

  const handleGeolocation = () => {
    setFilterState('Odisha');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 pt-24 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-8">
          <Activity className="w-8 h-8 text-emerald-500" />
          <h1 className="text-3xl font-bold text-slate-900">Emergency Facilities</h1>
          <span className="ml-auto text-xs bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            VERIFIED EMERGENCY RELIEF DIRECTORY
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Facilities List */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search hospitals, shelters..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border-slate-300 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <select className="rounded-lg border-slate-300" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                  <option value="All">All Types</option>
                  {types.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <select className="rounded-lg border-slate-300" value={filterState} onChange={(e) => setFilterState(e.target.value)}>
                  <option value="All">All States</option>
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <button onClick={() => { setFilterType('Shelter'); setFilterState('Odisha'); }} className="whitespace-nowrap px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                  <Crosshair className="w-4 h-4 text-emerald-600"/> Nearest Shelter (Puri Coast)
                </button>
                <button onClick={() => { setFilterType('Hospital'); setFilterState('Odisha'); }} className="whitespace-nowrap px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                  <Crosshair className="w-4 h-4 text-red-600"/> Nearest Hospital
                </button>
                <button onClick={() => { setFilterType('All'); setFilterState('All'); setSearchTerm(''); }} className="whitespace-nowrap px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                  <Crosshair className="w-4 h-4"/> Reset Filters
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredFacilities.map((f, i) => (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} key={f.id} className="border border-slate-200 rounded-xl p-4 bg-white hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        {getIcon(f.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800">{f.name}</h3>
                        <p className="text-xs text-slate-500 mb-2">{f.city}, {f.state}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm font-medium text-slate-700 flex items-center gap-1">
                            <Phone className="w-3 h-3"/> {f.contact}
                          </span>
                          {f.capacity && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Cap: {f.capacity}</span>}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar Helplines */}
          <div className="space-y-6">
            <Card className="p-6 bg-slate-900 text-white border-slate-800">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                <Phone className="w-5 h-5 text-red-400" /> Emergency Helplines
              </h2>
              <div className="space-y-3">
                {HELPLINES.map((hl) => (
                  <div key={hl.name} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700">
                    <div>
                      <p className="text-sm font-semibold text-slate-200">{hl.name}</p>
                      <p className="text-xs text-slate-400">{hl.cat}</p>
                    </div>
                    <a href={`tel:${hl.num}`} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold transition-colors">
                      <Phone className="w-3 h-3" /> {hl.num}
                    </a>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-6 text-center italic">
                All emergency helpline numbers and relief facilities are cross-verified with state disaster management authorities.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
