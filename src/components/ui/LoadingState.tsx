'use client';
import { motion } from 'framer-motion';

export const LoadingState = ({ moduleName, message }: { moduleName?: string; message?: string }) => {
  const displayText = message || moduleName || 'data';
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[200px] p-8">
      <div className="relative w-16 h-16 mb-4 overflow-hidden rounded-full border-4 border-slate-200 flex items-center justify-center bg-white shadow-inner">
        <motion.div 
          className="absolute w-32 h-32 bg-emerald-400 rounded-[40%] opacity-40"
          animate={{ rotate: 360, y: [10, -5, 10] }}
          transition={{ rotate: { duration: 3, repeat: Infinity, ease: 'linear' }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
          style={{ bottom: -10 }}
        />
        <motion.div 
          className="absolute w-32 h-32 bg-blue-500 rounded-[45%] opacity-40"
          animate={{ rotate: -360, y: [5, -10, 5] }}
          transition={{ rotate: { duration: 4, repeat: Infinity, ease: 'linear' }, y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } }}
          style={{ bottom: -15 }}
        />
      </div>
      <motion.p 
        className="text-slate-700 font-medium tracking-wide animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Loading {displayText}...
      </motion.p>
    </div>
  );
};

export default LoadingState;
