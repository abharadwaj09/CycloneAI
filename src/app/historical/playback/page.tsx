'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Clock, FastForward, MapPin, Wind, Droplets, AlertTriangle } from 'lucide-react';

import GlassCard from '@/components/ui/GlassCard';
import StatusBadge from '@/components/ui/StatusBadge';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const faniTimeline = [
  { time: 0, label: 'T+0h', lat: 8.5, lon: 86.5, wind: 50, press: 1004, cat: 0, status: 'Depression' },
  { time: 1, label: 'T+12h', lat: 9.2, lon: 86.1, wind: 65, press: 998, cat: 0, status: 'Cyclonic Storm' },
  { time: 2, label: 'T+24h', lat: 10.5, lon: 85.5, wind: 85, press: 990, cat: 1, status: 'Severe' },
  { time: 3, label: 'T+36h', lat: 12.0, lon: 84.8, wind: 120, press: 980, cat: 1, status: 'Very Severe' },
  { time: 4, label: 'T+48h', lat: 14.5, lon: 84.2, wind: 170, press: 960, cat: 3, status: 'Extremely Severe' },
  { time: 5, label: 'T+60h', lat: 17.2, lon: 84.5, wind: 215, press: 932, cat: 4, status: 'Peak Intensity' },
  { time: 6, label: 'T+72h', lat: 19.8, lon: 85.8, wind: 185, press: 955, cat: 3, status: 'Landfall (Puri)' },
  { time: 7, label: 'T+84h', lat: 22.5, lon: 87.5, wind: 90, press: 985, cat: 0, status: 'Weakening' },
];

export default function PlaybackPage() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const currentData = faniTimeline[step];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setStep((prev) => {
          if (prev >= faniTimeline.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const next = () => setStep(s => Math.min(faniTimeline.length - 1, s + 1));
  const prev = () => setStep(s => Math.max(0, s - 1));

  return (
    <div className="min-h-screen bg-slate-100 p-6 text-slate-800">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
           <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-8 h-8 text-indigo-500" />
                Cyclone Time Machine
              </h1>
              <StatusBadge status="info">HISTORICAL MODE</StatusBadge>
            </div>
            <p className="text-slate-500 mt-1">Lifecycle playback: Fani (2019)</p>
          </div>
          
          <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-sm font-semibold text-slate-600 mr-2">Speed:</span>
            {[1, 2, 4].map(s => (
              <button 
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-1 rounded text-xs font-bold ${speed === s ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        <GlassCard className="p-8">
          <div className="flex flex-col items-center gap-8">
            {/* Main visualization */}
            <div className="w-full flex justify-between items-center bg-white/50 p-6 rounded-2xl border border-slate-200 shadow-inner">
               <div className="text-center w-1/4">
                 <MapPin className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                 <div className="text-xs text-slate-500 uppercase font-bold">Location</div>
                 <div className="text-xl font-bold text-slate-800 mt-1">{currentData.lat.toFixed(1)}°N, {currentData.lon.toFixed(1)}°E</div>
               </div>
               
               <div className="text-center w-1/4 border-l border-slate-200">
                 <Wind className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                 <div className="text-xs text-slate-500 uppercase font-bold">Wind Speed</div>
                 <div className="text-3xl font-black text-emerald-600 mt-1"><AnimatedCounter value={currentData.wind} /> <span className="text-lg font-bold">km/h</span></div>
               </div>

               <div className="text-center w-1/4 border-l border-slate-200">
                 <Droplets className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                 <div className="text-xs text-slate-500 uppercase font-bold">Pressure</div>
                 <div className="text-3xl font-black text-blue-600 mt-1"><AnimatedCounter value={currentData.press} /> <span className="text-lg font-bold">hPa</span></div>
               </div>

               <div className="text-center w-1/4 border-l border-slate-200">
                 <AlertTriangle className={`w-8 h-8 mx-auto mb-2 ${currentData.cat >= 3 ? 'text-rose-500' : 'text-amber-500'}`} />
                 <div className="text-xs text-slate-500 uppercase font-bold">Status</div>
                 <div className="text-lg font-bold text-slate-800 mt-1 leading-tight">{currentData.status}</div>
               </div>
            </div>

            {/* Timeline slider */}
            <div className="w-full space-y-4">
               <div className="flex justify-between text-xs font-bold text-slate-400 px-2">
                 {faniTimeline.map((t, i) => (
                   <span key={i} className={i === step ? 'text-emerald-600 text-sm scale-110 transition-all' : ''}>{t.label}</span>
                 ))}
               </div>
               <div className="relative w-full h-2 bg-slate-200 rounded-full">
                 <motion.div 
                   className="absolute top-0 left-0 h-full bg-slate-900 rounded-full"
                   initial={{ width: 0 }}
                   animate={{ width: `${(step / (faniTimeline.length - 1)) * 100}%` }}
                   transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                 />
                 <div 
                   className="absolute top-1/2 -mt-2 w-4 h-4 bg-white border-2 border-slate-500 rounded-full shadow transition-all duration-300"
                   style={{ left: `calc(${(step / (faniTimeline.length - 1)) * 100}% - 8px)` }}
                 />
               </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button onClick={prev} disabled={step === 0} className="p-3 bg-white hover:bg-slate-50 text-slate-700 rounded-full shadow disabled:opacity-50 transition">
                <SkipBack className="w-6 h-6" />
              </button>
              
              <button onClick={togglePlay} className="p-5 bg-slate-900 hover:bg-emerald-600 text-white rounded-full shadow-lg shadow-sky-500/40 transition hover:scale-105 active:scale-95">
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>

              <button onClick={next} disabled={step === faniTimeline.length - 1} className="p-3 bg-white hover:bg-slate-50 text-slate-700 rounded-full shadow disabled:opacity-50 transition">
                <SkipForward className="w-6 h-6" />
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
