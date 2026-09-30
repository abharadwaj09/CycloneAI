import L from 'leaflet';

export interface CycloneMarkerProps {
  name?: string;
  category?: string;
  windSpeed?: number;
  pressure?: number;
  movement?: string;
}

export function CycloneMarker({
  name = 'DANA',
  category = 'Cat 4 (Extremely Severe)',
  windSpeed = 215,
  pressure = 948,
  movement = 'NW at 18 km/h'
}: CycloneMarkerProps = {}) {
  const html = `
    <div class="relative flex items-center justify-center pointer-events-none select-none" style="width: 220px; height: 220px; margin-left: -78px; margin-top: -78px;">
      
      <!-- Outer Gale Force Wind Pulse Rings (64kt & 50kt radius) -->
      <div class="absolute inset-0 rounded-full border border-slate-400/30 animate-gale-ring-1 pointer-events-none"></div>
      <div class="absolute inset-0 rounded-full border border-red-500/30 animate-gale-ring-2 pointer-events-none"></div>

      <!-- Outer Convective Feeder Band Spirals (Large Radius 180px) -->
      <div class="absolute w-[180px] h-[180px] animate-cyclone-outer pointer-events-none opacity-50">
        <svg viewBox="0 0 200 200" class="w-full h-full">
          <!-- Spiral feeder clouds -->
          <path d="M100 100 C 130 50, 180 60, 195 90 C 170 80, 130 85, 100 100 Z" fill="url(#outerCloudGrad)" filter="blur(2px)"/>
          <path d="M100 100 C 70 150, 20 140, 5 110 C 30 120, 70 115, 100 100 Z" fill="url(#outerCloudGrad)" filter="blur(2px)"/>
          <path d="M100 100 C 50 70, 60 20, 90 5 C 80 30, 85 70, 100 100 Z" fill="url(#outerCloudGrad)" filter="blur(2px)"/>
          <path d="M100 100 C 150 130, 140 180, 110 195 C 120 170, 115 130, 100 100 Z" fill="url(#outerCloudGrad)" filter="blur(2px)"/>
          <defs>
            <radialGradient id="outerCloudGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8"/>
              <stop offset="60%" stop-color="#bae6fd" stop-opacity="0.5"/>
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
            </radialGradient>
          </defs>
        </svg>
      </div>

      <!-- Mid-Level Torrential Rain Bands (Radius 130px, Faster Spin) -->
      <div class="absolute w-[130px] h-[130px] animate-cyclone-feeder pointer-events-none opacity-80">
        <svg viewBox="0 0 200 200" class="w-full h-full filter drop-shadow-[0_0_12px_rgba(249,115,22,0.6)]">
          <!-- Convective Rain Bands -->
          <path d="M100,100 Q145,55 175,70 Q140,85 100,100" fill="none" stroke="#ea580c" stroke-width="8" stroke-linecap="round" stroke-opacity="0.85"/>
          <path d="M100,100 Q55,145 25,130 Q60,115 100,100" fill="none" stroke="#ea580c" stroke-width="8" stroke-linecap="round" stroke-opacity="0.85"/>
          <path d="M100,100 Q145,145 130,175 Q115,140 100,100" fill="none" stroke="#f97316" stroke-width="6" stroke-linecap="round" stroke-opacity="0.75"/>
          <path d="M100,100 Q55,55 70,25 Q85,60 100,100" fill="none" stroke="#f97316" stroke-width="6" stroke-linecap="round" stroke-opacity="0.75"/>
        </svg>
      </div>

      <!-- Intense Core Eyewall Vorticity (Radius 76px, Rapid Rotation) -->
      <div class="absolute w-[76px] h-[76px] animate-cyclone-core pointer-events-none">
        <svg viewBox="0 0 100 100" class="w-full h-full filter drop-shadow-[0_0_15px_rgba(220,38,38,0.9)]">
          <!-- Deep eyewall convection spiral arms -->
          <circle cx="50" cy="50" r="30" fill="none" stroke="#dc2626" stroke-width="5" stroke-dasharray="28 12 18 8" stroke-linecap="round"/>
          <circle cx="50" cy="50" r="22" fill="none" stroke="#b91c1c" stroke-width="6" stroke-dasharray="18 10 14 6" stroke-linecap="round"/>
          <path d="M50 50 C 65 30, 80 40, 85 50 C 75 48, 60 52, 50 50 Z" fill="#ef4444" opacity="0.9"/>
          <path d="M50 50 C 35 70, 20 60, 15 50 C 25 52, 40 48, 50 50 Z" fill="#ef4444" opacity="0.9"/>
        </svg>
      </div>

      <!-- The Calm Central Cyclone Eye -->
      <div class="relative w-5 h-5 rounded-full bg-slate-900 border-2 border-red-500 flex items-center justify-center animate-cyclone-eye z-20">
        <div class="w-2 h-2 rounded-full bg-red-400 animate-ping"></div>
        <div class="w-1.5 h-1.5 rounded-full bg-white z-10"></div>
      </div>

      <!-- Radar Beam Sweep Line -->
      <div class="absolute w-36 h-0.5 bg-gradient-to-r from-red-500/80 via-yellow-400/40 to-transparent origin-left top-1/2 left-1/2 -translate-y-1/2 pointer-events-none animate-[radarSweep_4s_linear_infinite]"></div>

      <!-- High-End Meteorological HUD Badge -->
      <div class="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border border-red-300 px-3 py-1.5 rounded-xl shadow-xl shadow-red-500/20 whitespace-nowrap text-xs font-sans z-30 pointer-events-auto transition-transform hover:scale-105">
        <div class="flex items-center gap-1.5 font-extrabold text-slate-900 leading-tight">
          <span class="inline-block w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
          <span class="text-red-600 tracking-wide">${name}</span>
          <span class="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded font-bold uppercase">${category.split(' ')[0]}</span>
        </div>
        <div class="flex items-center gap-2 text-[10px] text-slate-600 font-semibold mt-0.5">
          <span class="text-orange-600">⚡ ${windSpeed} km/h</span>
          <span class="text-slate-300">|</span>
          <span class="text-blue-600">🌀 ${pressure} hPa</span>
          <span class="text-slate-300">|</span>
          <span>${movement}</span>
        </div>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'bg-transparent',
    iconSize: [64, 64],
    iconAnchor: [32, 32],
    popupAnchor: [0, -40]
  });
}

export default CycloneMarker;
