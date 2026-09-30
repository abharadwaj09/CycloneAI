'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Database, CheckCircle2, Cpu, LineChart, ShieldAlert, Layers, Activity, Server, AlertTriangle } from 'lucide-react';

const FallbackGlassCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/70 backdrop-blur-md border border-white/40 rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);
const Card = FallbackGlassCard;

const PIPELINE_STEPS = [
  { icon: Database, title: 'Data Collection', desc: 'Ingestion of multi-modal data including satellite imagery (INSAT-3D), atmospheric variables (pressure, wind, temperature) via IMD/NOAA APIs, and oceanographic data.' },
  { icon: CheckCircle2, title: 'Data Validation', desc: 'Automated quality control to detect missing values, outliers, and physical impossibilities in sensor data.' },
  { icon: Layers, title: 'Preprocessing & Feature Engineering', desc: 'Normalization, spatio-temporal alignment of disparate sources, and extraction of meteorological features (e.g., vertical wind shear, sea surface temperature anomalies).' },
  { icon: Cpu, title: 'AI/ML Modeling', desc: 'Ensemble models utilized: CNNs for satellite image feature extraction, LSTMs for time-series track prediction, and Gradient Boosting for intensity forecasting.' },
  { icon: LineChart, title: 'Prediction & Risk Analysis', desc: 'Generating probabilistic forecasts for track, intensity (wind speed), and rainfall. Computing localized risk scores.' },
  { icon: ShieldAlert, title: 'Alerting & Visualization', desc: 'Threshold-based alerting system and real-time map rendering using geospatial tools for situational awareness.' },
];

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 pt-24 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Settings className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-slate-900 mb-4">System Methodology</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Understanding the data pipeline and artificial intelligence architecture powering CYCLONEAI's meteorological insights.
          </p>
        </motion.div>

        <div className="relative pb-12">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-200 via-emerald-400 to-emerald-200 transform md:-translate-x-1/2 rounded-full" />

          <div className="space-y-12 relative z-10">
            {PIPELINE_STEPS.map((step, idx) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-full md:w-1/2 flex justify-start md:justify-end">
                  <div className={`w-full ${idx % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                    <Card className="p-6 hover:shadow-lg transition-shadow border-t-4 border-t-emerald-500">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                          <step.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">{step.title}</h3>
                      </div>
                      <p className="text-slate-600 leading-relaxed text-sm">
                        {step.desc}
                      </p>
                    </Card>
                  </div>
                </div>
                
                {/* Center Node */}
                <div className="absolute left-8 md:left-1/2 w-8 h-8 bg-white border-4 border-slate-500 rounded-full transform -translate-x-[14px] md:-translate-x-1/2 flex items-center justify-center shadow-lg">
                  <div className="w-2 h-2 bg-slate-900 rounded-full" />
                </div>
                
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        <Card className="p-8 mt-16 bg-amber-50 border-amber-200">
          <div className="flex gap-4">
            <AlertTriangle className="w-8 h-8 text-amber-500 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-amber-800 mb-2">Important Advisory</h3>
              <p className="text-amber-700 text-sm">
                This platform is designed for operational decision support, meteorological research, and situational awareness. It complements official meteorological warnings. Life-safety and emergency response decisions should always follow advisories from authoritative government bodies (e.g., IMD, NDMA).
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
