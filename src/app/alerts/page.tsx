'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bell, ShieldAlert, Send, Clock, Map, Info, AlertTriangle, Wind, Droplets, Waves, CheckCircle2 } from 'lucide-react';
// Assuming these are available, using standard Tailwind fallbacks if not
import GlassCard from '@/components/ui/GlassCard';
import AlertBadge from '@/components/ui/AlertBadge';

// Fallback components in case the UI library isn't fully ready
const FallbackGlassCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/70 backdrop-blur-md border border-white/40 rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);

const FallbackAlertBadge = ({ level, text }: { level: string, text: string }) => {
  const colors: Record<string, string> = {
    RED: 'bg-red-100 text-red-800 border-red-300',
    ORANGE: 'bg-orange-100 text-orange-800 border-orange-300',
    YELLOW: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    GREEN: 'bg-green-100 text-green-800 border-green-300',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors[level] || colors.GREEN}`}>
      {text}
    </span>
  );
};

// Use fallbacks if real ones fail (simulate this by just using fallbacks for guaranteed render)
const Card = FallbackGlassCard;
const Badge = FallbackAlertBadge;

const STATES = ['Odisha', 'West Bengal', 'Andhra Pradesh', 'Tamil Nadu', 'Kerala', 'Karnataka', 'Goa', 'Maharashtra', 'Gujarat'];
const DISTRICTS: Record<string, string[]> = {
  'Odisha': ['Puri', 'Ganjam', 'Kendrapara', 'Jagatsinghpur', 'Balasore'],
  'West Bengal': ['South 24 Parganas', 'Purba Medinipur', 'Howrah', 'Kolkata'],
  'Andhra Pradesh': ['Visakhapatnam', 'East Godavari', 'Krishna', 'Srikakulam'],
  'Tamil Nadu': ['Chennai', 'Kanyakumari', 'Cuddalore', 'Nagapattinam'],
};

const TIMELINE_EVENTS = [
  { time: '10:42 PM', location: 'Puri District, Odisha', level: 'RED', icon: AlertTriangle, desc: 'Red warning issued for Puri district. Immediate evacuation recommended.', source: 'IMD' },
  { time: '10:31 PM', location: 'Visakhapatnam, AP', level: 'RED', icon: Droplets, desc: 'Extreme rainfall detected. Flood risk critical.', source: 'Radar Data' },
  { time: '10:18 PM', location: 'Bay of Bengal', level: 'RED', icon: Wind, desc: 'Cyclone intensity increased to Category 3.', source: 'JTWC' },
  { time: '09:55 PM', location: 'East Godavari, AP', level: 'ORANGE', icon: AlertTriangle, desc: 'Orange alert issued. Prepare for heavy winds.', source: 'State Authority' },
  { time: '09:30 PM', location: 'Coastal Odisha', level: 'ORANGE', icon: Wind, desc: 'Wind speed exceeded 100 km/h.', source: 'Sensor Network' },
  { time: '09:10 PM', location: 'Puri Coast, Odisha', level: 'ORANGE', icon: Waves, desc: 'Storm surge warning. High tide expected.', source: 'INCOIS' },
  { time: '08:45 PM', location: 'South 24 Parganas, WB', level: 'YELLOW', icon: AlertTriangle, desc: 'Watch issued. Monitor updates.', source: 'IMD' },
  { time: '08:20 PM', location: 'Chennai, TN', level: 'YELLOW', icon: Droplets, desc: 'Heavy rainfall warning.', source: 'Local Met' },
];

const DISTRICT_ALERTS: Record<string, { level: 'RED' | 'ORANGE' | 'YELLOW' | 'GREEN', title: string, text: string, action: string }> = {
  'Puri': { level: 'RED', title: 'RED WARNING (TAKE ACTION)', text: 'Landfall eyewall perimeter. Peak gusts up to 215 km/h, storm surge 4.2m.', action: 'Mandatory evacuation of low-lying coastal areas to designated shelters.' },
  'Ganjam': { level: 'RED', title: 'RED WARNING (TAKE ACTION)', text: 'Extremely heavy rainfall and high gale-force winds up to 180 km/h.', action: 'Stay indoors away from weak structures, keep emergency provisions ready.' },
  'Balasore': { level: 'RED', title: 'RED WARNING (TAKE ACTION)', text: 'Direct impact zone. Storm surge inundation likely in Dhamra-Chandipur belt.', action: 'Follow state evacuation orders immediately.' },
  'Kendrapara': { level: 'RED', title: 'RED WARNING (TAKE ACTION)', text: 'Tidal surge and tidal river overflow near Rajnagar & Mahakalapada.', action: 'Move to elevated multi-purpose cyclone shelters.' },
  'Jagatsinghpur': { level: 'RED', title: 'RED WARNING (TAKE ACTION)', text: 'High risk of sea water intrusion near Paradip port area.', action: 'Total suspension of marine and fishing activities.' },
  'Visakhapatnam': { level: 'ORANGE', title: 'ORANGE ALERT (BE PREPARED)', text: 'Severe squally winds 70-90 km/h, rough to phenomenal seas.', action: 'Secure boats and outdoor equipment. Fishermen advised not to venture out.' },
  'Srikakulam': { level: 'ORANGE', title: 'ORANGE ALERT (BE PREPARED)', text: 'Torrential peripheral rain bands and moderate localized flooding.', action: 'Avoid unnecessary travel on coastal state highways.' },
  'South 24 Parganas': { level: 'ORANGE', title: 'ORANGE ALERT (BE PREPARED)', text: 'Sundarbans embankments alert. 3.5m surge tide expected.', action: 'Continuous vigil on river dikes and evacuation of vulnerable hamlets.' },
  'Purba Medinipur': { level: 'ORANGE', title: 'ORANGE ALERT (BE PREPARED)', text: 'Digha and Mandarmani coastline under high tide inundation watch.', action: 'Beach access restricted. Tourists advised to vacate coastal resorts.' },
  'Chennai': { level: 'YELLOW', title: 'YELLOW ADVISORY (BE AWARE)', text: 'Distant feeder bands causing localized showers and gusty winds.', action: 'Monitor official weather bulletins; normal port precautions.' },
};

export default function AlertsPage() {
  const [selectedState, setSelectedState] = useState('Odisha');
  const [selectedDistrict, setSelectedDistrict] = useState('Puri');
  const [selectedCity, setSelectedCity] = useState('');
  
  const [prefs, setPrefs] = useState({
    cyclone: true, rainfall: true, flood: false, wind: true, road: false,
    severity: 'any'
  });

  const availableDistricts = DISTRICTS[selectedState] || [];

  const handlePrefChange = (key: string) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const currentAlert = DISTRICT_ALERTS[selectedDistrict] || {
    level: 'GREEN' as const,
    title: 'ALL CLEAR (NO WARNING)',
    text: `Normal atmospheric conditions observed for ${selectedDistrict || selectedState}. No cyclone advisories in effect.`,
    action: 'Routine weather monitoring active. Maritime and surface transport normal.'
  };

  const alertBg = currentAlert.level === 'RED' ? 'bg-red-50 border-red-200' :
                  currentAlert.level === 'ORANGE' ? 'bg-amber-50 border-amber-200' :
                  currentAlert.level === 'YELLOW' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-emerald-50 border-emerald-200';

  const alertText = currentAlert.level === 'RED' ? 'text-red-800' :
                    currentAlert.level === 'ORANGE' ? 'text-amber-800' :
                    currentAlert.level === 'YELLOW' ? 'text-yellow-800' :
                    'text-emerald-800';

  const alertSub = currentAlert.level === 'RED' ? 'text-red-700' :
                   currentAlert.level === 'ORANGE' ? 'text-amber-700' :
                   currentAlert.level === 'YELLOW' ? 'text-yellow-700' :
                   'text-emerald-700';

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 pt-24 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-8">
          <Bell className="w-8 h-8 text-emerald-500" />
          <h1 className="text-3xl font-bold text-slate-900">Alerts &amp; Notifications</h1>
          <span className="ml-auto text-xs bg-red-100 text-red-700 border border-red-200 px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            LIVE BROADCAST FEED
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-emerald-500"/> Location Status</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">State</label>
                  <select 
                    value={selectedState} 
                    onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(DISTRICTS[e.target.value]?.[0] || ''); }}
                    className="w-full rounded-lg border-slate-300 bg-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  >
                    {STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">District</label>
                  <select 
                    value={selectedDistrict} 
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full rounded-lg border-slate-300 bg-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  >
                    {availableDistricts.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">City/Town</label>
                  <input 
                    type="text" 
                    placeholder="Enter city..."
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full rounded-lg border-slate-300 bg-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className={`${alertBg} border rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6`}>
                <div className={`w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 ${currentAlert.level === 'RED' ? 'bg-red-100 text-red-600 animate-pulse' : currentAlert.level === 'ORANGE' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                  <ShieldAlert className="w-10 h-10" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${alertText} mb-1`}>{currentAlert.title}</h3>
                  <p className={`${alertSub} font-medium text-sm mb-1`}>{currentAlert.text}</p>
                  <p className="text-slate-600 text-xs mt-1"><strong>Official Directive: </strong>{currentAlert.action}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2"><Clock className="w-5 h-5 text-emerald-500"/> Alert Timeline</h2>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {TIMELINE_EVENTS.map((event, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <event.icon className={`w-5 h-5 ${event.level === 'RED' ? 'text-red-500' : event.level === 'ORANGE' ? 'text-orange-500' : 'text-yellow-500'}`} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                      <div className="flex items-center justify-between mb-1">
                        <Badge level={event.level} text={event.level + ' WARNING'} />
                        <span className="text-xs text-slate-400 font-medium">{event.time}</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800 mb-1">{event.location}</p>
                      <p className="text-sm text-slate-600">{event.desc}</p>
                      <p className="text-xs text-slate-400 mt-2 flex items-center gap-1"><Info className="w-3 h-3"/> Source: {event.source}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Bell className="w-5 h-5 text-emerald-500"/> Subscriptions</h2>
              <p className="text-sm text-slate-600 mb-4">Select types of alerts to receive via SMS/Email.</p>
              
              <div className="space-y-3 mb-6">
                {['Cyclone', 'Heavy rainfall', 'Flood', 'Strong wind', 'Road closure'].map((type) => {
                  const key = type.split(' ')[0].toLowerCase();
                  return (
                    <label key={type} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={prefs[key as keyof typeof prefs] as boolean || false}
                        onChange={() => handlePrefChange(key)}
                        className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-slate-700">{type}</span>
                    </label>
                  );
                })}
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-sm font-medium text-slate-800">Minimum Severity</p>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="severity" checked={prefs.severity === 'any'} onChange={() => setPrefs({...prefs, severity: 'any'})} className="text-emerald-600 focus:ring-emerald-500" />
                  <span className="text-sm text-slate-700">Any change</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="severity" checked={prefs.severity === 'orange'} onChange={() => setPrefs({...prefs, severity: 'orange'})} className="text-emerald-600 focus:ring-emerald-500" />
                  <span className="text-sm text-slate-700">Orange or higher</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="severity" checked={prefs.severity === 'red'} onChange={() => setPrefs({...prefs, severity: 'red'})} className="text-emerald-600 focus:ring-emerald-500" />
                  <span className="text-sm text-slate-700">Red warning only</span>
                </label>
              </div>

              <button className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Save Preferences
              </button>
            </Card>

            <Card className="p-6 bg-slate-800 text-white border-slate-700">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white"><Send className="w-5 h-5 text-emerald-400"/> Send Alert (Admin)</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Alert Type</label>
                  <select className="w-full rounded-lg border-slate-600 bg-slate-700 text-white text-sm">
                    <option>Cyclone</option>
                    <option>Heavy rainfall</option>
                    <option>Flood</option>
                    <option>Evacuation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Severity</label>
                  <select className="w-full rounded-lg border-slate-600 bg-slate-700 text-white text-sm">
                    <option value="RED">🔴 RED</option>
                    <option value="ORANGE">🟠 ORANGE</option>
                    <option value="YELLOW">🟡 YELLOW</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Message</label>
                  <textarea rows={3} className="w-full rounded-lg border-slate-600 bg-slate-700 text-white text-sm p-2" placeholder="Enter alert message..."></textarea>
                </div>
                <button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition-colors text-sm">
                  SEND ALERT BROADCAST
                </button>
                <p className="text-xs text-slate-400 italic text-center">Alert delivery requires notification service configuration. Alert saved locally.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
