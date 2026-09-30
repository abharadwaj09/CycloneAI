'use client';
import L from 'leaflet';

export interface SSTZone {
  id: string;
  name: string;
  coords: [number, number][];
  tempC: number;
  status: 'favorable' | 'moderate' | 'marginal';
  labelPos: [number, number];
}

export const oceanSSTZones: SSTZone[] = [
  {
    id: 'sst1',
    name: 'Bay of Bengal Warm Core',
    tempC: 30.5,
    status: 'favorable',
    labelPos: [16.5, 87.5],
    coords: [
      [14.0, 85.0], [16.0, 84.5], [18.5, 86.0], [19.0, 88.5], 
      [17.0, 90.5], [14.5, 89.5], [13.5, 87.0]
    ]
  },
  {
    id: 'sst2',
    name: 'North Bay Coastal Waters',
    tempC: 29.2,
    status: 'favorable',
    labelPos: [19.5, 88.0],
    coords: [
      [18.5, 85.5], [20.0, 86.0], [21.5, 87.5], [21.0, 90.0], 
      [19.0, 89.5], [18.0, 87.0]
    ]
  },
  {
    id: 'sst3',
    name: 'South East Arabian Sea',
    tempC: 29.8,
    status: 'favorable',
    labelPos: [11.0, 72.0],
    coords: [
      [9.0, 70.0], [12.0, 70.0], [13.5, 73.0], [11.5, 75.0], [8.5, 73.0]
    ]
  }
];

export interface WaveBuoy {
  id: string;
  name: string;
  pos: [number, number];
  waveHeightM: number;
  periodS: number;
  condition: string;
}

export const oceanWaveBuoys: WaveBuoy[] = [
  { id: 'b1', name: 'INCOIS Buoy BD09', pos: [17.5, 89.0], waveHeightM: 7.4, periodS: 12.5, condition: 'Phenomenal Seas' },
  { id: 'b2', name: 'Puri Coastal Buoy', pos: [19.2, 86.2], waveHeightM: 5.6, periodS: 10.2, condition: 'Very High Swell' },
  { id: 'b3', name: 'Vizag Deep Buoy', pos: [16.8, 84.2], waveHeightM: 4.2, periodS: 8.8, condition: 'Rough Seas' },
  { id: 'b4', name: 'Chennai Offshore', pos: [13.2, 82.5], waveHeightM: 2.8, periodS: 7.1, condition: 'Moderate Swell' },
];

export function createWaveBuoyIcon(buoy: WaveBuoy) {
  const isDangerous = buoy.waveHeightM >= 5.0;
  const badgeColor = isDangerous ? 'bg-indigo-700 text-white' : 'bg-emerald-700 text-white';
  
  const html = `
    <div class="relative flex flex-col items-center pointer-events-auto select-none" style="width: 110px; margin-left: -55px; margin-top: -30px;">
      <!-- Pulsing Wave Ring -->
      <div class="absolute -top-1 w-8 h-8 rounded-full border-2 border-cyan-400 opacity-60 animate-ping pointer-events-none"></div>
      
      <!-- Wave Icon Pin -->
      <div class="w-7 h-7 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-xs shadow-lg shadow-cyan-500/50 z-10">
        🌊
      </div>

      <!-- Live Ocean Swell Badge -->
      <div class="mt-1 ${badgeColor} text-[10px] font-bold px-2 py-0.5 rounded shadow-md border border-cyan-300/40 whitespace-nowrap flex flex-col items-center leading-tight">
        <span>${buoy.waveHeightM}m Swell</span>
        <span class="text-[8px] text-cyan-200">${buoy.condition}</span>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'bg-transparent',
    iconSize: [110, 40],
    iconAnchor: [55, 20]
  });
}
