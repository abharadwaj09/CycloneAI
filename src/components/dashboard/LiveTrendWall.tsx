'use client';
import { motion } from 'framer-motion';
import { Wind, Droplets, Thermometer, Gauge, Navigation2, Waves } from 'lucide-react';

export function LiveTrendWall() {
  const trends = [
    { label: 'WIND SPEED', value: '215', unit: 'km/h', change: '+15 km/h', icon: Wind, trend: 'up', color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'PRESSURE', value: '945', unit: 'hPa', change: '-5 hPa', icon: Gauge, trend: 'down', color: 'text-emerald-500', bg: 'bg-slate-100' },
    { label: 'RAINFALL', value: '24.5', unit: 'mm/hr', change: '+2.1 mm/hr', icon: Droplets, trend: 'up', color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'SST', value: '30.2', unit: '°C', change: '+0.1 °C', icon: Thermometer, trend: 'up', color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'WIND SHEAR', value: '12', unit: 'knots', change: '-2 knots', icon: Navigation2, trend: 'down', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'WAVE HEIGHT', value: '14', unit: 'm', change: '+1.5 m', icon: Waves, trend: 'up', color: 'text-indigo-500', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="mt-8 mb-6">
      <h3 className="text-sm font-extrabold text-slate-800 uppercase mb-4 flex items-center gap-2 tracking-wide">
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
        Live Meteorological Telemetry &amp; Field Sensor Stream
      </h3>
      
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {trends.map((t, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex-shrink-0 w-48 bg-white/60 backdrop-blur-md border border-slate-200 rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <div className={`p-2 rounded-lg ${t.bg} ${t.color}`}>
                <t.icon size={18} />
              </div>
              <div className={`text-xs font-medium ${t.trend === 'up' ? 'text-rose-500' : 'text-emerald-500'}`}>
                {t.trend === 'up' ? '↗' : '↘'} {t.change}
              </div>
            </div>
            
            <div className="text-slate-500 text-xs font-semibold mb-1">{t.label}</div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-800">{t.value}</span>
              <span className="text-sm font-medium text-slate-500">{t.unit}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default LiveTrendWall;
