'use client';
import { useEffect, useState } from 'react';

export const OceanBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#f0f9ff]">
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #e0f2fe 0%, #f0f9ff 50%, transparent 100%)',
          animation: 'pulse 15s infinite alternate ease-in-out'
        }}
      />
      <div 
        className="absolute w-[150%] h-[150%] -top-[25%] -left-[25%] opacity-30 mix-blend-multiply"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, #bae6fd 0%, #e0f2fe 25%, #f0f9ff 50%, #e0f2fe 75%, #bae6fd 100%)',
          animation: 'spin 60s infinite linear'
        }}
      />
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
};

export default OceanBackground;
