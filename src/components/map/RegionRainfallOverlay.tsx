'use client';
import L from 'leaflet';

export interface DistrictRainfallData {
  id: string;
  name: string;
  state: string;
  center: [number, number];
  intensityMmPerHour: number;
  level: 'extreme' | 'heavy' | 'moderate' | 'light';
}

export function createRegionRainfallIcon(district: DistrictRainfallData) {
  const isExtreme = district.level === 'extreme';
  const isHeavy = district.level === 'heavy';
  
  // Rain streak density and velocity based on intensity
  const streakCount = isExtreme ? 16 : isHeavy ? 10 : 6;
  const speed = isExtreme ? '0.45s' : isHeavy ? '0.65s' : '0.9s';
  const radarColor = isExtreme ? 'rgba(220, 38, 38, 0.45)' : isHeavy ? 'rgba(249, 115, 22, 0.35)' : 'rgba(234, 179, 8, 0.25)';
  const badgeBg = isExtreme ? 'bg-red-600' : isHeavy ? 'bg-orange-600' : 'bg-amber-600';

  let streaksHtml = '';
  for (let i = 0; i < streakCount; i++) {
    const left = 8 + (i * (90 / streakCount)) + (Math.sin(i) * 4);
    const top = 10 + ((i % 4) * 15);
    const height = 18 + (i % 3) * 8;
    const delay = ((i * 0.11) % 0.7).toFixed(2);
    
    streaksHtml += `
      <div 
        class="rain-streak" 
        style="
          left: ${left}%; 
          top: ${top}%; 
          height: ${height}px; 
          animation-duration: ${speed}; 
          animation-delay: -${delay}s;
        "
      ></div>
    `;
  }

  // Splashes on the ground
  let splashesHtml = '';
  for (let j = 0; j < 4; j++) {
    const splashLeft = 20 + j * 20;
    const splashDelay = (j * 0.25).toFixed(2);
    splashesHtml += `
      <div 
        class="absolute bottom-4 rounded-full border border-slate-300 pointer-events-none" 
        style="
          left: ${splashLeft}%; 
          width: 14px; 
          height: 6px; 
          animation: rainSplash 1.2s ease-out infinite -${splashDelay}s;
        "
      ></div>
    `;
  }

  const html = `
    <div class="relative w-[150px] h-[130px] -ml-[75px] -mt-[65px] pointer-events-none select-none">
      
      <!-- Doppler Radar Reflectivity Aura over the affected region -->
      <div 
        class="absolute inset-2 rounded-3xl blur-md pointer-events-none animate-pulse"
        style="background: radial-gradient(ellipse at center, ${radarColor} 0%, rgba(56, 189, 248, 0.2) 65%, transparent 100%);"
      ></div>

      <!-- Falling rain particle field -->
      <div class="relative w-full h-full overflow-hidden rounded-2xl border border-slate-300 bg-slate-900/10 backdrop-blur-[0.5px]">
        ${streaksHtml}
        ${splashesHtml}
      </div>

      <!-- Live Regional Rainfall Intensity Pill -->
      <div class="absolute -top-3 left-1/2 -translate-x-1/2 ${badgeBg} text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-lg shadow-slate-900/30 flex items-center gap-1 whitespace-nowrap pointer-events-auto border border-white/40">
        <span class="animate-bounce">🌧️</span>
        <span>${district.name}: ${district.intensityMmPerHour} mm/h</span>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'bg-transparent',
    iconSize: [150, 130],
    iconAnchor: [75, 65]
  });
}

export default createRegionRainfallIcon;
