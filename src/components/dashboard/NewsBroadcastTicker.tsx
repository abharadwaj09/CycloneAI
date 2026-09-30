'use client';
import { motion } from 'framer-motion';
import { AlertCircle, Radio, Siren, Volume2 } from 'lucide-react';

export function NewsBroadcastTicker() {
  const breakingAlerts = [
    "🔴 LIVE METEOROLOGICAL SPECIAL BROADCAST: CYCLONE DANA CLOSING IN ON ODISHA-BENGAL COASTLINE",
    "LANDFALL TIMELINE: EYE TOUCHDOWN ESTIMATED IN 3 TO 4 HOURS NEAR DHAMRA / PURI WITH PEAK GUSTS REACHING 215 KM/H",
    "RECORD RAINFALL: PURI LOGS 285MM, BALASORE 210MM, BHADRAK 190MM • FLASH FLOOD & INUNDATION WARNING IN EFFECT",
    "EVACUATION STATUS: OVER 1.14 MILLION PEOPLE RELOCATED ACROSS 6,200 CYCLONE RELIEF SHELTERS IN ODISHA",
    "WEST BENGAL ALERT: DIGHA, SHANKARPUR & SAGAR ISLAND FACING 3.5M TO 4.2M TIDAL SURGE • EMBANKMENTS PATROLLED",
    "PORT WARNING: GREAT DANGER SIGNAL NO. 10 HOISTED AT PARADIP, DHAMRA, GOPALPUR AND HALDIA PORTS",
    "EMERGENCY MOBILIZATION: 52 NDRF BATTALIONS & 63 ODRAF UNITS DEPLOYED WITH HEAVY RESCUE AND DEBRIS CLEARANCE BOATS"
  ];

  return (
    <div className="w-full bg-slate-900 border-y border-red-600/60 shadow-lg overflow-hidden font-sans mb-6">
      <div className="flex items-center">
        {/* News Channel Badge */}
        <div className="flex-shrink-0 bg-red-600 text-white px-3 py-2 flex items-center gap-2 font-black text-xs tracking-wider uppercase z-10 shadow-md">
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
          <Siren size={15} className="animate-pulse" />
          <span className="hidden sm:inline">NEWS 24×7</span>
          <span className="bg-red-800 text-[10px] px-1.5 py-0.5 rounded font-bold">LIVE IMPACT</span>
        </div>

        {/* Ticker Title */}
        <div className="flex-shrink-0 bg-amber-500 text-slate-950 px-3 py-2 font-extrabold text-xs hidden md:flex items-center gap-1.5 uppercase tracking-wide">
          <Radio size={14} className="animate-spin text-slate-950" />
          <span>EMERGENCY DISPATCH:</span>
        </div>

        {/* Continuous Scrolling News Crawl */}
        <div className="flex-1 overflow-hidden relative py-2 bg-slate-950">
          <motion.div
            className="flex gap-12 whitespace-nowrap text-xs font-bold text-slate-100"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 35
            }}
          >
            {[...breakingAlerts, ...breakingAlerts].map((alert, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="text-amber-400">⚡</span>
                <span className={alert.includes('RED') || alert.includes('RECORD') ? 'text-red-400 font-extrabold' : 'text-slate-100'}>
                  {alert}
                </span>
                <span className="text-slate-600">■</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Live Audio / Broadcast Status Indicator */}
        <div className="flex-shrink-0 hidden lg:flex items-center gap-2 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-300 border-l border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[11px] text-slate-400 uppercase">SAT-FEED: INSAT-3DR</span>
        </div>
      </div>
    </div>
  );
}

export default NewsBroadcastTicker;
