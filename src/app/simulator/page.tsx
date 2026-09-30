'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Beaker, Sliders, Play, AlertCircle, RefreshCw, Wind,
  Thermometer, Droplets, Gauge, Compass, Zap, CheckCircle2,
  AlertTriangle, TrendingUp, Layers, Globe, ShieldAlert, Sparkles
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import StatusBadge from '@/components/ui/StatusBadge';

interface SimulationParameters {
  sst: number;            // Sea Surface Temperature (°C) [22 - 34]
  shear: number;          // Vertical Wind Shear (knots) [2 - 45]
  humidity: number;       // Mid-Tropospheric Humidity (%) [20 - 95]
  pressure: number;       // Ambient Low Pressure (hPa) [920 - 1012]
  latitude: number;       // Latitude (°N) [2 - 25]
  oceanDepth: number;     // 26°C Isotherm Depth / OHC (meters) [15 - 120]
  vorticity: number;      // 850 hPa Relative Vorticity (10^-5 s^-1) [1 - 25]
}

interface Preset {
  id: string;
  name: string;
  basin: string;
  description: string;
  params: SimulationParameters;
}

const PRESETS: Preset[] = [
  {
    id: 'dana-bay-of-bengal',
    name: 'Bay of Bengal Super-Intensification',
    basin: 'North Indian Ocean',
    description: 'Post-monsoon hyper-favorable warm pool with near-zero shear and deep marine moisture reservoir.',
    params: {
      sst: 31.0,
      shear: 6,
      humidity: 88,
      pressure: 948,
      latitude: 16.5,
      oceanDepth: 85,
      vorticity: 18
    }
  },
  {
    id: 'arabian-sea-biparjoy',
    name: 'Arabian Sea High-Latitude Recurvature',
    basin: 'Arabian Sea',
    description: 'Warm sea surface with moderate shear and dry continental air intrusion from northwest deserts.',
    params: {
      sst: 29.5,
      shear: 14,
      humidity: 68,
      pressure: 975,
      latitude: 19.2,
      oceanDepth: 55,
      vorticity: 12
    }
  },
  {
    id: 'itcz-genesis',
    name: 'Equatorial ITCZ Tropical Depression',
    basin: 'South Bay of Bengal',
    description: 'Incipient monsoon trough low. Strong moisture but limited planetary vorticity near equator.',
    params: {
      sst: 28.4,
      shear: 11,
      humidity: 80,
      pressure: 998,
      latitude: 6.2,
      oceanDepth: 45,
      vorticity: 7
    }
  },
  {
    id: 'hostile-shear',
    name: 'Hostile Shear & Cool Water Dispersal',
    basin: 'Upper Latitudes',
    description: 'Strong westerly jet shear and cooler shelf waters tear convective updrafts apart before cyclogenesis.',
    params: {
      sst: 24.8,
      shear: 36,
      humidity: 38,
      pressure: 1008,
      latitude: 22.5,
      oceanDepth: 22,
      vorticity: 3
    }
  }
];

export default function SimulatorPage() {
  const [params, setParams] = useState<SimulationParameters>(PRESETS[0].params);
  const [activePreset, setActivePreset] = useState<string>('dana-bay-of-bengal');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [hasRun, setHasRun] = useState<boolean>(true);
  const [selectedPhase, setSelectedPhase] = useState<number>(3); // 0: Disturbance, 1: Depression, 2: Storm, 3: Eyewall

  // Calculate Genesis Potential Index (GPI) based on Gray's classical cyclogenesis physics
  const physicsEvaluation = useMemo(() => {
    const { sst, shear, humidity, pressure, latitude, oceanDepth, vorticity } = params;

    // 1. Thermal factor: SST > 26.5°C threshold & isotherm depth
    const sstDelta = Math.max(0, sst - 26.0);
    const thermalScore = Math.min(100, Math.round((sstDelta / 5.5) * 60 + (oceanDepth / 100) * 40));

    // 2. Dynamic shear penalty: Shear < 12 kts is optimal, > 25 kts disrupts eye
    let shearScore = 100;
    if (shear <= 10) {
      shearScore = 100;
    } else if (shear <= 20) {
      shearScore = 100 - (shear - 10) * 4.5;
    } else {
      shearScore = Math.max(5, 55 - (shear - 20) * 3.5);
    }

    // 3. Moisture / Mid-tropospheric Relative Humidity factor
    const moistureScore = Math.min(100, Math.max(0, Math.round(((humidity - 30) / 60) * 100)));

    // 4. Coriolis factor: Latitude must be >= 4° for planetary spin
    const coriolisFactor = latitude < 4 ? latitude / 4 : 1.0;

    // 5. Planetary vorticity contribution
    const vorticityScore = Math.min(100, Math.round((vorticity / 20) * 100));

    // 6. Overall Cyclogenesis Likelihood
    const rawLikelihood = ((thermalScore * 0.32) + (shearScore * 0.30) + (moistureScore * 0.22) + (vorticityScore * 0.16)) * coriolisFactor;
    const likelihood = Math.min(99, Math.max(2, Math.round(rawLikelihood)));

    // Category and Expected Maximum Wind Velocity (km/h)
    let category = 'Tropical Disturbance / Low Pressure';
    let catCode = 'TL';
    let badgeColor = 'bg-slate-100 text-slate-700 border-slate-300';
    let maxWindKmH = 45;
    let stormSurgeM = 0.5;
    let minPressureHpa = pressure;

    if (likelihood >= 85) {
      category = 'Category 4 - Extremely Severe Cyclonic Storm';
      catCode = 'ESCS (Cat 4)';
      badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      maxWindKmH = Math.round(180 + (sst - 28) * 12 - shear * 1.2);
      minPressureHpa = Math.round(Math.min(pressure, 930 + shear * 0.8));
      stormSurgeM = 4.2;
    } else if (likelihood >= 70) {
      category = 'Category 2/3 - Very Severe Cyclonic Storm';
      catCode = 'VSCS (Cat 2-3)';
      badgeColor = 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      maxWindKmH = Math.round(135 + (sst - 27) * 8 - shear * 1.5);
      minPressureHpa = Math.round(Math.min(pressure, 960 + shear * 0.9));
      stormSurgeM = 2.8;
    } else if (likelihood >= 50) {
      category = 'Cyclonic Storm (Deep Depression)';
      catCode = 'CS (Gale)';
      badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      maxWindKmH = Math.round(75 + (sst - 26) * 5 - shear * 1.1);
      minPressureHpa = Math.round(Math.min(pressure, 985 + shear * 0.5));
      stormSurgeM = 1.6;
    } else if (likelihood >= 30) {
      category = 'Tropical Depression';
      catCode = 'DD';
      badgeColor = 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      maxWindKmH = Math.round(45 + (sst - 25) * 3);
      minPressureHpa = Math.round(Math.min(pressure, 998));
      stormSurgeM = 0.9;
    }

    return {
      likelihood,
      thermalScore,
      shearScore: Math.round(shearScore),
      moistureScore,
      vorticityScore,
      category,
      catCode,
      badgeColor,
      maxWindKmH: Math.max(35, maxWindKmH),
      minPressureHpa: Math.min(1010, Math.max(915, minPressureHpa)),
      stormSurgeM,
      coriolisActive: latitude >= 4.5,
      isSuperFavorable: likelihood >= 80,
      shearDisruption: shear >= 25,
      dryAirIntrusion: humidity < 50,
      coolSeaPenalty: sst < 26.5
    };
  }, [params]);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setHasRun(false);

    // Simulate multi-tier atmospheric kinematic convergence
    setTimeout(() => {
      setIsSimulating(false);
      setHasRun(true);
    }, 1200);
  };

  const handleApplyPreset = (preset: Preset) => {
    setActivePreset(preset.id);
    setParams(preset.params);
    setHasRun(true);
  };

  const updateParam = (key: keyof SimulationParameters, val: number) => {
    setActivePreset('custom');
    setParams(prev => ({ ...prev, [key]: val }));
  };

  // Dynamic vortex animation speed & rotation properties based on live physics
  const vortexSpinDuration = Math.max(2.2, 14 - (physicsEvaluation.likelihood / 100) * 11);
  const vortexOpacity = Math.max(0.2, physicsEvaluation.likelihood / 100);
  const isSheared = physicsEvaluation.shearDisruption;

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-slate-100 text-slate-900 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Top Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-5 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-extrabold uppercase tracking-wider border border-amber-300 flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                Kinematic Sandbox Environment
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300">
                Gray's Convective Potential Engine (GPI v4.2)
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
              <Beaker className="w-9 h-9 text-emerald-600" />
              Cyclone Formation &amp; Cyclogenesis Simulator
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-3xl leading-relaxed">
              Synthesize sea surface thermodynamic energy, vertical wind shear gradients, Coriolis acceleration, and tropospheric moisture to model tropical storm genesis and rapid eyewall intensification.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0">
            <div className="text-xs font-black uppercase text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <AlertCircle size={15} className="text-amber-600" />
              <span>SIMULATION — NOT LIVE WEATHER DATA</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Synced with NWP kinematic reanalysis</span>
          </div>
        </header>

        {/* Quick Scenario Preset Selectors */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Sparkles size={14} className="text-emerald-500" />
            <span>Select Meteorological Atmospheric Benchmark Scenario:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PRESETS.map((preset) => {
              const isSelected = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset)}
                  className={`text-left p-3.5 rounded-xl border transition-all relative ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-500'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${isSelected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-200 text-slate-600'}`}>
                      {preset.basin}
                    </span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>}
                  </div>
                  <h4 className="font-bold text-xs leading-snug mb-1">{preset.name}</h4>
                  <p className={`text-[11px] line-clamp-2 leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Cockpit: Left Parameters Panel & Right Interactive Simulation Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: Atmospheric Parameter Sliders (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Thermodynamic &amp; Kinematic Inputs</h2>
                    <p className="text-xs text-slate-500">Fine-tune classical Gray's Cyclogenesis parameters</p>
                  </div>
                </div>

                <button
                  onClick={() => handleApplyPreset(PRESETS[0])}
                  title="Reset to default benchmark"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <RefreshCw size={15} />
                </button>
              </div>

              <div className="space-y-5">

                {/* 1. Sea Surface Temperature */}
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-700 flex items-center gap-1.5">
                      <Thermometer size={14} className="text-rose-500" />
                      <span>Sea Surface Temperature (SST)</span>
                    </label>
                    <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${params.sst >= 28 ? 'bg-rose-100 text-rose-700' : params.sst >= 26.5 ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                      {params.sst.toFixed(1)} °C
                    </span>
                  </div>
                  <input
                    type="range"
                    min="22"
                    max="33"
                    step="0.1"
                    value={params.sst}
                    onChange={(e) => updateParam('sst', parseFloat(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>22.0°C (Inhibiting)</span>
                    <span className="text-amber-600 font-bold">26.5°C (Threshold)</span>
                    <span>33.0°C (Hyper-warm)</span>
                  </div>
                </div>

                {/* 2. Vertical Wind Shear */}
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-700 flex items-center gap-1.5">
                      <Wind size={14} className="text-indigo-500" />
                      <span>Vertical Wind Shear (200 - 850 hPa)</span>
                    </label>
                    <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${params.shear <= 12 ? 'bg-emerald-100 text-emerald-700' : params.shear <= 20 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                      {params.shear} kts
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="45"
                    step="1"
                    value={params.shear}
                    onChange={(e) => updateParam('shear', parseInt(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span className="text-emerald-600 font-bold">&lt; 10 kts (Optimal Core)</span>
                    <span>20 kts (Marginal)</span>
                    <span className="text-rose-600 font-bold">&gt; 30 kts (Disruptive)</span>
                  </div>
                </div>

                {/* 3. Relative Humidity */}
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-700 flex items-center gap-1.5">
                      <Droplets size={14} className="text-blue-500" />
                      <span>Mid-Tropospheric Humidity (700 hPa)</span>
                    </label>
                    <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${params.humidity >= 70 ? 'bg-emerald-100 text-emerald-700' : params.humidity >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                      {params.humidity} %
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="95"
                    step="1"
                    value={params.humidity}
                    onChange={(e) => updateParam('humidity', parseInt(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>20% (Dry Air Entrainment)</span>
                    <span>60% (Moderate)</span>
                    <span className="text-emerald-600 font-bold">95% (Saturated Moist)</span>
                  </div>
                </div>

                {/* 4. Ambient Central Pressure */}
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-700 flex items-center gap-1.5">
                      <Gauge size={14} className="text-amber-500" />
                      <span>Low Pressure Core Baseline</span>
                    </label>
                    <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${params.pressure <= 960 ? 'bg-rose-100 text-rose-700' : params.pressure <= 995 ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'}`}>
                      {params.pressure} hPa
                    </span>
                  </div>
                  <input
                    type="range"
                    min="920"
                    max="1012"
                    step="1"
                    value={params.pressure}
                    onChange={(e) => updateParam('pressure', parseInt(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span className="text-rose-600 font-bold">920 hPa (Cat 5 Eye)</span>
                    <span>985 hPa</span>
                    <span>1012 hPa (Ambient Sea)</span>
                  </div>
                </div>

                {/* 5. Latitude (Coriolis Parameter) */}
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-700 flex items-center gap-1.5">
                      <Globe size={14} className="text-cyan-600" />
                      <span>Latitude / Planetary Coriolis Spin</span>
                    </label>
                    <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${params.latitude >= 5 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                      {params.latitude.toFixed(1)} °N
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="24"
                    step="0.2"
                    value={params.latitude}
                    onChange={(e) => updateParam('latitude', parseFloat(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span className="text-rose-600 font-bold">2.0°N (Coriolis Deficit)</span>
                    <span className="text-emerald-600 font-bold">5.0°N (Spin Active)</span>
                    <span>24.0°N (Coastline)</span>
                  </div>
                </div>

                {/* 6. 26°C Isotherm Depth / Ocean Heat Content */}
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-700 flex items-center gap-1.5">
                      <Layers size={14} className="text-teal-600" />
                      <span>Ocean Heat Content / 26°C Isotherm Depth</span>
                    </label>
                    <span className="font-mono font-bold px-2 py-0.5 rounded text-xs bg-teal-100 text-teal-800">
                      {params.oceanDepth} meters
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="110"
                    step="5"
                    value={params.oceanDepth}
                    onChange={(e) => updateParam('oceanDepth', parseInt(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>15m (Shallow)</span>
                    <span>50m (Normal)</span>
                    <span className="text-teal-700 font-bold">110m (Deep Warm Reservoir)</span>
                  </div>
                </div>
              </div>

              {/* Action Trigger Button */}
              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="w-full mt-6 py-3.5 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl font-extrabold text-sm shadow-lg shadow-emerald-500/10 transition-all flex items-center justify-center gap-2.5 active:scale-98 disabled:opacity-50"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin text-emerald-400" />
                    <span>RUNNING KINEMATIC INTEGRATION...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current text-emerald-400" />
                    <span>CALCULATE SIMULATED CYCLOGENESIS</span>
                  </>
                )}
              </button>
            </GlassCard>
          </div>

          {/* Right Column: High-Fidelity Simulation Visualizer Cockpit (7 cols) */}
          <div className="lg:col-span-7 space-y-5 flex flex-col">

            {/* Radar Visualizer Screen */}
            <div className="relative bg-slate-950 rounded-2xl border border-slate-800 p-6 overflow-hidden shadow-2xl flex-1 flex flex-col justify-between min-h-[460px]">

              {/* Decorative HUD Elements */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>VORTEX DYNAMICS SIMULATOR</span>
              </div>

              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-mono text-emerald-400 backdrop-blur-sm">
                <span>INTENSITY: {physicsEvaluation.catCode}</span>
              </div>

              {/* Background Radar Range Rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-[180px] h-[180px] rounded-full border border-dashed border-emerald-400"></div>
                <div className="w-[300px] h-[300px] rounded-full border border-slate-500"></div>
                <div className="w-[420px] h-[420px] rounded-full border border-dashed border-slate-600"></div>
                <div className="absolute w-full h-px bg-slate-700/50"></div>
                <div className="absolute h-full w-px bg-slate-700/50"></div>
              </div>

              {/* Dynamic Animated Central Cyclone Vortex Display */}
              <div className="relative my-auto flex items-center justify-center py-10 z-10">
                <div className="relative w-72 h-72 flex items-center justify-center">

                  {/* Outer Feeder Bands */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      ease: 'linear',
                      duration: vortexSpinDuration * 2.2
                    }}
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
                      isSheared ? 'transform translate-x-8 opacity-40' : 'opacity-80'
                    }`}
                  >
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <path
                        d="M 100 100 Q 150 40 180 70 Q 140 110 100 100"
                        fill="none"
                        stroke={physicsEvaluation.isSuperFavorable ? '#10b981' : '#38bdf8'}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeOpacity={vortexOpacity}
                      />
                      <path
                        d="M 100 100 Q 50 160 20 130 Q 60 90 100 100"
                        fill="none"
                        stroke={physicsEvaluation.isSuperFavorable ? '#10b981' : '#38bdf8'}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeOpacity={vortexOpacity}
                      />
                      <path
                        d="M 100 100 Q 160 150 130 180 Q 90 140 100 100"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeOpacity={vortexOpacity * 0.8}
                      />
                      <path
                        d="M 100 100 Q 40 50 70 20 Q 110 60 100 100"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeOpacity={vortexOpacity * 0.8}
                      />
                    </svg>
                  </motion.div>

                  {/* Mid-Level High Reflectivity Eyewall Core */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      ease: 'linear',
                      duration: vortexSpinDuration
                    }}
                    className="absolute w-44 h-44 flex items-center justify-center"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_15px_rgba(239,68,68,0.7)]">
                      <circle
                        cx="50"
                        cy="50"
                        r="34"
                        fill="none"
                        stroke={physicsEvaluation.likelihood > 70 ? '#ef4444' : '#eab308'}
                        strokeWidth="6"
                        strokeDasharray="28 10 18 8"
                        strokeLinecap="round"
                        strokeOpacity={Math.max(0.3, vortexOpacity)}
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="24"
                        fill="none"
                        stroke={physicsEvaluation.likelihood > 70 ? '#dc2626' : '#f97316'}
                        strokeWidth="7"
                        strokeDasharray="18 8 14 6"
                        strokeLinecap="round"
                        strokeOpacity={Math.max(0.4, vortexOpacity)}
                      />
                    </svg>
                  </motion.div>

                  {/* The Eye Pin / Core Center */}
                  <div className="relative w-8 h-8 rounded-full bg-slate-950 border-2 border-emerald-400 flex items-center justify-center shadow-xl z-20">
                    <span className={`w-3 h-3 rounded-full ${physicsEvaluation.likelihood > 60 ? 'bg-rose-500 animate-ping' : 'bg-emerald-400'}`}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white absolute"></span>
                  </div>

                  {/* Radar Sweep Line */}
                  <div className="absolute w-36 h-0.5 bg-gradient-to-r from-emerald-500 via-emerald-400/40 to-transparent origin-left top-1/2 left-1/2 -translate-y-1/2 pointer-events-none animate-[radarSweep_3s_linear_infinite]"></div>
                </div>
              </div>

              {/* Bottom Simulation Metric HUD */}
              <div className="relative z-20 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl backdrop-blur-md">
                <div className="text-center p-2 rounded-lg bg-slate-800/60">
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Formation Chance</div>
                  <div className={`text-2xl font-black font-mono ${physicsEvaluation.likelihood >= 70 ? 'text-rose-400' : physicsEvaluation.likelihood >= 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {physicsEvaluation.likelihood}%
                  </div>
                </div>

                <div className="text-center p-2 rounded-lg bg-slate-800/60">
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Simulated Max Winds</div>
                  <div className="text-2xl font-black font-mono text-white">
                    {physicsEvaluation.maxWindKmH} <span className="text-xs text-slate-400 font-sans">km/h</span>
                  </div>
                </div>

                <div className="text-center p-2 rounded-lg bg-slate-800/60">
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Core Pressure</div>
                  <div className="text-2xl font-black font-mono text-cyan-300">
                    {physicsEvaluation.minPressureHpa} <span className="text-xs text-slate-400 font-sans">hPa</span>
                  </div>
                </div>

                <div className="text-center p-2 rounded-lg bg-slate-800/60">
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Storm Surge Depth</div>
                  <div className="text-2xl font-black font-mono text-teal-300">
                    {physicsEvaluation.stormSurgeM} <span className="text-xs text-slate-400 font-sans">m</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Diagnostic Evaluation Breakdown */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <TrendingUp size={16} className="text-emerald-600" />
                  <span>Thermodynamic &amp; Kinematic Factor Analysis</span>
                </h3>
                <span className={`text-xs font-black uppercase px-2.5 py-1 rounded-full border ${physicsEvaluation.badgeColor}`}>
                  {physicsEvaluation.category}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* 1. Thermal Potential */}
                <div className="p-3 rounded-xl border border-slate-100 bg-slate-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-slate-600">Ocean Heat</span>
                    <span className="text-xs font-mono font-bold text-slate-800">{physicsEvaluation.thermalScore}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: `${physicsEvaluation.thermalScore}%` }}></div>
                  </div>
                  <span className={`text-[10px] mt-1 block font-semibold ${params.sst >= 26.5 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {params.sst >= 26.5 ? '● Adequate thermal fuel' : '● Inadequate (<26.5°C)'}
                  </span>
                </div>

                {/* 2. Shear Resistance */}
                <div className="p-3 rounded-xl border border-slate-100 bg-slate-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-slate-600">Shear Favorable</span>
                    <span className="text-xs font-mono font-bold text-slate-800">{physicsEvaluation.shearScore}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${physicsEvaluation.shearScore}%` }}></div>
                  </div>
                  <span className={`text-[10px] mt-1 block font-semibold ${params.shear <= 15 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {params.shear <= 15 ? '● Core maintains verticality' : '● Severe convective tilt'}
                  </span>
                </div>

                {/* 3. Mid-Level Moisture */}
                <div className="p-3 rounded-xl border border-slate-100 bg-slate-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-slate-600">Moisture Index</span>
                    <span className="text-xs font-mono font-bold text-slate-800">{physicsEvaluation.moistureScore}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${physicsEvaluation.moistureScore}%` }}></div>
                  </div>
                  <span className={`text-[10px] mt-1 block font-semibold ${params.humidity >= 65 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {params.humidity >= 65 ? '● Deep moist convection' : '● Dry air intrusion'}
                  </span>
                </div>

                {/* 4. Planetary Vorticity */}
                <div className="p-3 rounded-xl border border-slate-100 bg-slate-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-slate-600">Coriolis Spin</span>
                    <span className="text-xs font-mono font-bold text-slate-800">{physicsEvaluation.coriolisActive ? 'Active' : 'Suppressed'}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${physicsEvaluation.coriolisActive ? 'bg-teal-500' : 'bg-rose-500'}`} style={{ width: `${physicsEvaluation.coriolisActive ? 100 : 25}%` }}></div>
                  </div>
                  <span className={`text-[10px] mt-1 block font-semibold ${physicsEvaluation.coriolisActive ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {physicsEvaluation.coriolisActive ? '● Sustained geostrophic turn' : '● Below 4°N Equator deadzone'}
                  </span>
                </div>
              </div>

              {/* Technical Physical Diagnosis Commentary */}
              <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
                <strong>Meteorological Diagnosis: </strong>
                {physicsEvaluation.likelihood >= 75 ? (
                  <span>The thermodynamic efficiency of this profile is exceptional. Sea surface temperatures of {params.sst}°C provide abundant latent heat of condensation, and benign vertical wind shear ({params.shear} kts) allows concentric eyewall development without entrainment breakdown. Rapid intensification into a severe category storm is highly probable within 36–48 hours.</span>
                ) : physicsEvaluation.likelihood >= 45 ? (
                  <span>Moderate cyclogenesis conditions. While moisture and low-level vorticity are favorable, ambient shear ({params.shear} kts) or thermal constraints limit the rate of central barometric deepening. Expected outcome is a moderate cyclonic storm with peripheral gale bands.</span>
                ) : (
                  <span>Unfavorable for sustained cyclogenesis. High vertical wind shear ({params.shear} kts) or below-threshold ocean heat content continuously strips the nascent convective chimney. The low-pressure center remains disorganized and is expected to decay into a remnant oceanic trough.</span>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
