'use client';
import { AlertTriangle, AlertCircle, Info, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export type AlertLevel = 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED' | 'green' | 'yellow' | 'orange' | 'red' | 'high' | 'medium' | 'low' | 'none';

export interface AlertBadgeProps {
  level: string;
  text?: string;
}

const normalizeLevel = (level: string): 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED' => {
  const upper = level.toUpperCase();
  if (upper === 'RED' || upper === 'HIGH') return 'RED';
  if (upper === 'ORANGE' || upper === 'MEDIUM') return 'ORANGE';
  if (upper === 'YELLOW' || upper === 'LOW') return 'YELLOW';
  return 'GREEN';
};

export const AlertBadge = ({ level, text }: AlertBadgeProps) => {
  const normalizedLevel = normalizeLevel(level);

  const config = {
    GREEN: { color: 'bg-green-100 text-green-700 border-green-200', icon: Info, label: 'GREEN' },
    YELLOW: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: AlertTriangle, label: 'YELLOW' },
    ORANGE: { color: 'bg-orange-100 text-orange-700 border-orange-200', icon: AlertCircle, label: 'ORANGE' },
    RED: { color: 'bg-red-100 text-red-700 border-red-200', icon: ShieldAlert, label: 'RED' }
  };

  const { color, icon: Icon, label } = config[normalizedLevel];

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${color} font-medium text-sm`}>
      {normalizedLevel === 'RED' ? (
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <Icon className="w-4 h-4" />
        </motion.div>
      ) : (
        <Icon className="w-4 h-4" />
      )}
      <span>{text || `${label} ALERT`}</span>
    </div>
  );
};

export default AlertBadge;
