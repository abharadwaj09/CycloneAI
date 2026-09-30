'use client';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, ShieldAlert, ShieldCheck } from 'lucide-react';

export function AlertCards() {
  const cards = [
    {
      level: 'red',
      title: 'RED WARNING (SEVERE)',
      count: 2,
      desc: 'Extreme wind & heavy rainfall expected. Take immediate action.',
      states: 'Odisha',
      icon: ShieldAlert,
      bg: 'bg-red-50/80',
      border: 'border-red-200',
      text: 'text-red-700',
      pulse: true
    },
    {
      level: 'orange',
      title: 'ORANGE ALERT (WATCH)',
      count: 2,
      desc: 'High wind and localized flooding possible. Be prepared.',
      states: 'Odisha, Andhra Pradesh',
      icon: AlertTriangle,
      bg: 'bg-orange-50/80',
      border: 'border-orange-200',
      text: 'text-orange-700',
      pulse: false
    },
    {
      level: 'yellow',
      title: 'YELLOW ALERT (ADVISORY)',
      count: 2,
      desc: 'Conditions being monitored. Stay updated.',
      states: 'Andhra Pradesh, West Bengal',
      icon: Info,
      bg: 'bg-yellow-50/80',
      border: 'border-yellow-200',
      text: 'text-yellow-700',
      pulse: false
    },
    {
      level: 'green',
      title: 'ALL CLEAR',
      count: 25,
      desc: 'No immediate threat to coastal regions.',
      states: 'Tamil Nadu, Maharashtra',
      icon: ShieldCheck,
      bg: 'bg-green-50/80',
      border: 'border-green-200',
      text: 'text-green-700',
      pulse: false
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6"
    >
      {cards.map((card, i) => (
        <motion.div 
          key={i} 
          variants={item}
          className={`${card.bg} backdrop-blur-md border ${card.border} rounded-xl p-4 flex flex-col justify-between ${card.pulse ? 'ring-2 ring-red-400 ring-offset-2 animate-pulse-slow' : ''}`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className={`p-2 rounded-lg ${card.bg} ${card.text}`}>
              <card.icon size={20} />
            </div>
            <div className={`text-3xl font-bold ${card.text}`}>{card.count}</div>
          </div>
          
          <div>
            <h3 className={`font-bold text-sm mb-1 ${card.text}`}>{card.title}</h3>
            <p className="text-slate-600 text-xs mb-2 leading-relaxed">{card.desc}</p>
            <div className="text-[10px] text-slate-500 font-medium uppercase">
              States: {card.states}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default AlertCards;
