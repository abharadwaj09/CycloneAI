'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, MonitorPlay, AlertTriangle, Activity, Map, Radio } from 'lucide-react';

const FallbackGlassCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/70 backdrop-blur-md border border-white/40 rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);
const Card = FallbackGlassCard;

const DEMO_STEPS = [
  { title: "SYSTEM INITIALIZATION", icon: Activity, content: "Connecting to meteorological data streams... Satellite feeds acquired. Awaiting anomaly detection." },
  { title: "CYCLONE DETECTED", icon: Radio, content: "Anomaly detected in Bay of Bengal. Low-pressure system forming. Initial classification: Tropical Depression." },
  { title: "SYNOPTIC DIAGNOSTICS ACTIVE", icon: Activity, content: "Processing Doppler radar & INSAT-3D thermal feeds. Numerical ensemble guidance computing track & intensity probabilities." },
  { title: "INTENSITY ESCALATION", icon: AlertTriangle, content: "System intensified to Severe Cyclonic Storm. Wind speeds exceeding 100 km/h. Landfall projected in Odisha." },
  { title: "RISK ASSESSMENT", icon: Map, content: "Mapping vulnerable coastal districts. Calculating storm surge risk. High probability of infrastructure damage in Puri." },
  { title: "ALERTS DEPLOYED", icon: AlertTriangle, content: "RED ALERT issued for Puri and Ganjam districts. Automated notifications sent to registered emergency services." },
];

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= DEMO_STEPS.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, DEMO_STEPS.length - 1));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 0));
  const togglePlay = () => setIsPlaying(!isPlaying);

  const step = DEMO_STEPS[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8 pt-24 font-sans flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background visual effects */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-500 via-slate-900 to-slate-900" />
      
      <div className="max-w-3xl w-full z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-bold mb-6 tracking-widest">
            <MonitorPlay className="w-4 h-4" /> PRESENTATION MODE
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">System Simulation</h1>
          <p className="text-slate-400">Guided tour of CYCLONEAI capabilities</p>
        </motion.div>

        <div className="mb-12 h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center shadow-2xl shadow-black/50">
                <Icon className="w-16 h-16 text-emerald-400 mb-6" />
                <h2 className="text-2xl font-bold text-white mb-4 tracking-wider">{step.title}</h2>
                <p className="text-lg text-slate-300 leading-relaxed max-w-xl">{step.content}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-8">
          {/* Progress dots */}
          <div className="flex gap-3">
            {DEMO_STEPS.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => { setCurrentStep(idx); setIsPlaying(false); }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentStep ? 'bg-emerald-400 scale-125' : 'bg-slate-700 hover:bg-slate-500'}`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <button onClick={handlePrev} disabled={currentStep === 0} className="p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <SkipBack className="w-6 h-6" />
            </button>
            <button onClick={togglePlay} className="p-4 rounded-full bg-slate-900 text-white hover:bg-emerald-600 shadow-lg shadow-sky-500/30 transition-all transform hover:scale-105">
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 pl-1" />}
            </button>
            <button onClick={handleNext} disabled={currentStep === DEMO_STEPS.length - 1} className="p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <SkipForward className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
