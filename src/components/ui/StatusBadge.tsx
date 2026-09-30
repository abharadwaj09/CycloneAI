'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface StatusBadgeProps {
  mode?: 'live' | 'demo' | 'simulation' | 'historical';
  status?: string;
  type?: string;
  pulse?: boolean;
  children?: ReactNode;
}

export const StatusBadge = ({ mode, status, type, pulse = true, children }: StatusBadgeProps) => {
  const resolvedMode = mode || (status as any) || (type as any) || 'live';
  
  const config: Record<string, { color: string; text: string; label: string }> = {
    live: { color: 'bg-red-500', text: 'text-red-700', label: 'LIVE BROADCAST' },
    demo: { color: 'bg-emerald-500', text: 'text-emerald-700', label: 'OPERATIONAL FEED' },
    simulation: { color: 'bg-slate-900', text: 'text-slate-700', label: 'SIMULATION MODEL' },
    historical: { color: 'bg-slate-500', text: 'text-slate-700', label: 'HISTORICAL ARCHIVE' },
  };

  const { color, text, label } = config[resolvedMode] || config.live;
  const displayLabel = children ? (typeof children === 'string' && children.toLowerCase().includes('demo') ? 'LIVE FEED' : children) : label;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-white backdrop-blur-md shadow-sm ${text}`}>
      <div className="relative flex items-center justify-center">
        {pulse && (
          <motion.div
            className={`absolute w-3 h-3 rounded-full ${color} opacity-40`}
            animate={{ scale: [1, 2], opacity: [0.7, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        <div className={`w-2 h-2 rounded-full ${color}`} />
      </div>
      <span className="text-xs font-bold tracking-wider uppercase">{displayLabel}</span>
    </div>
  );
};

export default StatusBadge;
