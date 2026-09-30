'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { LoadingState } from '../ui/LoadingState';

const CycloneMapInner = dynamic(() => import('./CycloneMapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-slate-800/20 backdrop-blur-md rounded-2xl border border-slate-300">
      <div className="flex flex-col items-center gap-4 text-slate-700">
        <LoadingState message="Loading Full-Scale Cyclone & Ocean Intelligence Map..." />
      </div>
    </div>
  ),
});

interface CycloneMapProps {
  className?: string;
  height?: string;
}

export function CycloneMap({ className = '', height = '88vh' }: CycloneMapProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div 
      className={`relative w-full transition-all duration-300 ${
        isFullscreen 
          ? 'fixed inset-0 z-[9999] w-screen h-screen rounded-none bg-slate-950' 
          : `rounded-2xl overflow-hidden border border-slate-300 shadow-lg ${className}`
      }`}
      style={{ height: isFullscreen ? '100vh' : height }}
    >
      <CycloneMapInner isFullscreen={isFullscreen} onToggleFullscreen={() => setIsFullscreen(!isFullscreen)} />
    </div>
  );
}

export default CycloneMap;
