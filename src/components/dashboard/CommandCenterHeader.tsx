'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle2, Database, Activity, Map, AlertTriangle, Compass, Wind } from 'lucide-react';

export function CommandCenterHeader() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  const steps = [
    { name: 'Loading Satellite & Doppler Radars', icon: Database },
    { name: 'Analyzing Ocean Surface Temperature (SST)', icon: Activity },
    { name: 'Processing Wind & Pressure Gradient Vectors', icon: Wind },
    { name: 'Computing Baroclinic Vorticity & Kinematics', icon: Compass },
    { name: 'Mapping Coastal & Regional Impact Zones', icon: Map },
    { name: 'Generating Location-Specific Warning Advisories', icon: AlertTriangle }
  ];

  const handleStart = () => {
    setIsAnalyzing(true);
    let step = 0;
    setActiveStep(0);
    
    const interval = setInterval(() => {
      step++;
      if (step < steps.length) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
        setTimeout(() => setIsAnalyzing(false), 2000);
      }
    }, 1100);
  };

  return (
    <div className="relative w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 overflow-hidden shadow-xl border border-slate-700/40">
      {/* Decorative lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-extrabold uppercase tracking-wider border border-rose-500/30 flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
              Live Monitoring Mode
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 flex items-center gap-1.5">
              <span>🛰️</span>
              <span>INSAT-3D &amp; Doppler Weather Radar Network</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
              NWP Guidance: ECMWF &amp; IMD Ensemble
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            Tropical Cyclone Pattern &amp;<br />Meteorological Intelligence
          </h1>
          
          <p className="text-slate-300 text-sm md:text-base max-w-xl leading-relaxed mb-6 font-normal">
            Real-time synoptic observation of cyclone dynamics, ocean thermal energy, coastal rainfall accumulation, gale wind fields, and regional emergency impact.
          </p>

          <button 
            onClick={handleStart}
            disabled={isAnalyzing}
            className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/30 active:scale-95"
          >
            {isAnalyzing ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <Play fill="currentColor" size={18} />
            )}
            <span>{isAnalyzing ? 'RUNNING METEOROLOGICAL DIAGNOSTICS...' : 'START SYSTEM DIAGNOSTICS'}</span>
          </button>
        </div>

        {/* Diagnostic Status Panel */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full md:w-88 bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-xl p-5 shadow-2xl"
            >
              <div className="text-xs font-extrabold text-emerald-400 uppercase mb-3.5 flex items-center justify-between">
                <span>Diagnostic Pipeline</span>
                <span className="animate-pulse bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-400">{Math.round(((activeStep + 1) / steps.length) * 100)}%</span>
              </div>
              
              <div className="space-y-3">
                {steps.map((step, i) => {
                  const isPast = i < activeStep;
                  const isCurrent = i === activeStep;
                  
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`
                        flex items-center justify-center w-6 h-6 rounded-full text-xs transition-colors duration-300 flex-shrink-0
                        ${isPast ? 'bg-emerald-500 text-white' : 
                          isCurrent ? 'bg-emerald-400 text-white animate-pulse' : 
                          'bg-white/10 text-white/40'}
                      `}>
                        {isPast ? <CheckCircle2 size={13} /> : <step.icon size={13} />}
                      </div>
                      <span className={`text-xs transition-colors duration-300 ${isPast ? 'text-white' : isCurrent ? 'text-emerald-300 font-bold' : 'text-white/40'}`}>
                        {step.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CommandCenterHeader;
