'use client';
import { motion } from 'framer-motion';
import { AlertOctagon, CloudRain, Shield, Wind } from 'lucide-react';

export function QuickStats() {
  const stats = [
    { label: 'Active Systems', value: '1', suffix: '', icon: AlertOctagon, color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Max Sustained Wind', value: '215', suffix: ' km/h', icon: Wind, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Max Rainfall', value: '240', suffix: ' mm/d', icon: CloudRain, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Districts Under Alert', value: '6', suffix: '', icon: Shield, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 shadow-sm"
        >
          <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
            <stat.icon size={22} />
          </div>
          <div>
            <div className="text-slate-500 text-xs font-semibold mb-0.5">{stat.label}</div>
            <div className="text-2xl font-bold text-slate-800">
              {stat.value}<span className="text-sm font-medium text-slate-400">{stat.suffix}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default QuickStats;
