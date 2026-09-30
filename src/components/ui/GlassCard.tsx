'use client';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  animate?: boolean;
  delay?: number;
}

export const GlassCard = ({ children, className = '', hover = false, onClick, animate = false, delay = 0 }: GlassCardProps) => {
  const content = (
    <div
      className={`relative bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden ${hover ? 'hover:shadow-md hover:border-slate-300 transition-all cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        whileHover={hover ? { scale: 1.02 } : {}}
      >
        {content}
      </motion.div>
    );
  }

  return hover ? (
    <motion.div whileHover={{ scale: 1.02 }} className="w-full h-full">
      {content}
    </motion.div>
  ) : (
    content
  );
};

export default GlassCard;
