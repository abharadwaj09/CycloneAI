'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudRain, Wind, Waves, AlertTriangle, ShieldCheck, MapPin, Building, PowerOff, Shield, Radio, Activity, CheckCircle2 } from 'lucide-react';

interface DistrictImpact {
  id: string;
  name: string;
  state: string;
  alertLevel: 'RED' | 'ORANGE' | 'YELLOW';
  rainfall24hMm: number;
  rainfallRateMmH: number;
  rainfallCategory: string;
  maxWindGustKmH: number;
  stormSurgeHeightM: number;
  evacueeCount: number;
  sheltersOpen: number;
  groundStatus: string[];
  powerGridStatus: 'Outage Reported' | 'Unstable' | 'Operational';
  roadStatus: 'Severe Inundation' | 'Waterlogged' | 'Open with Caution';
}

const stateImpactData: Record<string, { summary: string; severeCount: number; districts: DistrictImpact[] }> = {
  Odisha: {
    summary: 'PRIMARY GROUND ZERO & LANDFALL PERIMETER. Maximum wind velocities up to 215 km/h with catastrophic coastal inundation.',
    severeCount: 4,
    districts: [
      {
        id: 'puri',
        name: 'Puri District',
        state: 'Odisha',
        alertLevel: 'RED',
        rainfall24hMm: 285,
        rainfallRateMmH: 185,
        rainfallCategory: 'Torrential / Cloudburst Grade',
        maxWindGustKmH: 215,
        stormSurgeHeightM: 4.2,
        evacueeCount: 320000,
        sheltersOpen: 840,
        groundStatus: [
          'Sea water entered 1.5 km inland near Astaranga & Brahmagiri',
          'Grand Road, Puri experiencing 3 to 4 feet waterlogging',
          '33kV power transmission feeder snapped; emergency backup active',
          'NH-16 Puri Bypass closed to all vehicular traffic'
        ],
        powerGridStatus: 'Outage Reported',
        roadStatus: 'Severe Inundation'
      },
      {
        id: 'balasore',
        name: 'Balasore / Dhamra',
        state: 'Odisha',
        alertLevel: 'RED',
        rainfall24hMm: 210,
        rainfallRateMmH: 95,
        rainfallCategory: 'Extremely Heavy Rainfall',
        maxWindGustKmH: 195,
        stormSurgeHeightM: 3.8,
        evacueeCount: 245000,
        sheltersOpen: 620,
        groundStatus: [
          'Dhamra Port operations completely suspended; berths secured',
          'Subarnarekha and Budhabalanga river water levels approaching danger mark',
          'Fallen saline embankments reported in Bhograi block'
        ],
        powerGridStatus: 'Outage Reported',
        roadStatus: 'Severe Inundation'
      },
      {
        id: 'bhadrak',
        name: 'Bhadrak Coast',
        state: 'Odisha',
        alertLevel: 'RED',
        rainfall24hMm: 195,
        rainfallRateMmH: 115,
        rainfallCategory: 'Extremely Heavy Rainfall',
        maxWindGustKmH: 180,
        stormSurgeHeightM: 3.5,
        evacueeCount: 190000,
        sheltersOpen: 510,
        groundStatus: [
          'Baitarani river at Anandapur rising rapidly at 0.15 m/hr',
          'Chandbali jetty inundated by high tidal backwaters',
          'Over 45 tree-clearing teams actively deploying chainsaw cutters'
        ],
        powerGridStatus: 'Outage Reported',
        roadStatus: 'Waterlogged'
      },
      {
        id: 'ganjam',
        name: 'Ganjam / Gopalpur',
        state: 'Odisha',
        alertLevel: 'RED',
        rainfall24hMm: 175,
        rainfallRateMmH: 135,
        rainfallCategory: 'Extremely Heavy Rainfall',
        maxWindGustKmH: 165,
        stormSurgeHeightM: 2.8,
        evacueeCount: 165000,
        sheltersOpen: 440,
        groundStatus: [
          'High tidal waves battering Gopalpur beach front and sea wall',
          'Rushikulya river catchment receiving continuous squall precipitation',
          'All mechanized fishing trawlers docked and lashed at port'
        ],
        powerGridStatus: 'Unstable',
        roadStatus: 'Waterlogged'
      }
    ]
  },
  'West Bengal': {
    summary: 'SEVERE TIDAL SURGE & RAIN SQUALL ZONE. Digha, Mandarmani and the Sundarbans mangrove fringe facing high tide amplification.',
    severeCount: 2,
    districts: [
      {
        id: 'east-medinipur',
        name: 'East Medinipur (Digha/Haldia)',
        state: 'West Bengal',
        alertLevel: 'RED',
        rainfall24hMm: 165,
        rainfallRateMmH: 80,
        rainfallCategory: 'Very Heavy Rainfall',
        maxWindGustKmH: 140,
        stormSurgeHeightM: 3.6,
        evacueeCount: 185000,
        sheltersOpen: 390,
        groundStatus: [
          'Massive sea waves crashing over Digha promenade and sea dyke',
          'Tourist hotels and beach resorts 100% evacuated and sealed',
          'Haldia Port Signal 10 hoisted; container vessels moved to outer anchorage'
        ],
        powerGridStatus: 'Unstable',
        roadStatus: 'Waterlogged'
      },
      {
        id: 'south-24-parganas',
        name: 'South 24 Parganas (Sundarbans)',
        state: 'West Bengal',
        alertLevel: 'ORANGE',
        rainfall24hMm: 140,
        rainfallRateMmH: 110,
        rainfallCategory: 'Heavy to Very Heavy',
        maxWindGustKmH: 125,
        stormSurgeHeightM: 3.2,
        evacueeCount: 140000,
        sheltersOpen: 310,
        groundStatus: [
          'Sagar Island ferry operations halted across Muriganga river',
          'Earthen embankments at Gosaba and Hingalganj heavily sandbagged',
          'Saltwater ingress threat to multi-crop agricultural paddies'
        ],
        powerGridStatus: 'Unstable',
        roadStatus: 'Waterlogged'
      },
      {
        id: 'kolkata',
        name: 'Kolkata Metropolitan Area',
        state: 'West Bengal',
        alertLevel: 'YELLOW',
        rainfall24hMm: 95,
        rainfallRateMmH: 35,
        rainfallCategory: 'Moderate to Heavy Showers',
        maxWindGustKmH: 85,
        stormSurgeHeightM: 0.5,
        evacueeCount: 15000,
        sheltersOpen: 45,
        groundStatus: [
          'Kolkata Airport (CCU) runway drainage pumps on 24x7 readiness',
          'Pumping stations in Thanthania and Alipore pumping out street runoff',
          'KMC emergency disaster control room operational round the clock'
        ],
        powerGridStatus: 'Operational',
        roadStatus: 'Open with Caution'
      }
    ]
  },
  'Andhra Pradesh': {
    summary: 'NORTH COASTAL SQUALL & HEAVY RAIN SECTOR. Heavy swell and gale-force wind warnings along northern districts.',
    severeCount: 1,
    districts: [
      {
        id: 'srikakulam',
        name: 'Srikakulam Coast',
        state: 'Andhra Pradesh',
        alertLevel: 'ORANGE',
        rainfall24hMm: 120,
        rainfallRateMmH: 85,
        rainfallCategory: 'Heavy Squall Precipitation',
        maxWindGustKmH: 110,
        stormSurgeHeightM: 2.2,
        evacueeCount: 45000,
        sheltersOpen: 120,
        groundStatus: [
          'Kalingapatnam light house reporting severe sea roughness',
          'Vamsadhara and Nagavali river channels monitored for runoff surges',
          'SDRF search and rescue units stationed at vulnerable habitations'
        ],
        powerGridStatus: 'Operational',
        roadStatus: 'Open with Caution'
      },
      {
        id: 'visakhapatnam',
        name: 'Visakhapatnam',
        state: 'Andhra Pradesh',
        alertLevel: 'YELLOW',
        rainfall24hMm: 65,
        rainfallRateMmH: 45,
        rainfallCategory: 'Moderate Downpour',
        maxWindGustKmH: 85,
        stormSurgeHeightM: 1.5,
        evacueeCount: 12000,
        sheltersOpen: 35,
        groundStatus: [
          'Visakhapatnam Port Signal 8 hoisted; naval disaster relief ships fueled',
          'RK Beach road cordoned off due to massive high-energy swells',
          'Heavy gusty conditions along Dolphin\'s Nose promontory'
        ],
        powerGridStatus: 'Operational',
        roadStatus: 'Open with Caution'
      }
    ]
  }
};

export function RegionalStateImpactDesk() {
  const [selectedState, setSelectedState] = useState<string>('Odisha');
  const currentState = stateImpactData[selectedState];

  return (
    <div className="w-full bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-2xl mb-8 font-sans">
      
      {/* Broadcast Studio Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-red-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              NEWSROOM SPECIAL REPORT
            </span>
            <span className="text-slate-400 text-xs font-semibold">|</span>
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">
              GROUND ZERO STATE &amp; DISTRICT IMPACT
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Live Regional Cyclone &amp; Rainfall Damage Monitor
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-3xl">
            Television news bulletin feed detailing localized rain inundation, storm surge wave penetration, wind gusts, and emergency evacuation status by state and district.
          </p>
        </div>

        {/* State Switcher Tabs */}
        <div className="flex items-center bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 flex-wrap">
          {Object.keys(stateImpactData).map(state => {
            const isSelected = selectedState === state;
            const isRed = state === 'Odisha';
            return (
              <button
                key={state}
                onClick={() => setSelectedState(state)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                  isSelected
                    ? isRed
                      ? 'bg-red-600 text-white shadow-md shadow-red-500/30'
                      : 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <span>{state === 'Odisha' ? '🔴' : state === 'West Bengal' ? '🟠' : '🟡'}</span>
                <span>{state}</span>
                {isSelected && (
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full">Active</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* State Executive Briefing Banner */}
      <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-700 shadow-md">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-600/30 border border-red-500 flex items-center justify-center flex-shrink-0 text-red-400 mt-0.5">
            <Radio size={20} className="animate-pulse" />
          </div>
          <div>
            <div className="text-[11px] font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <span>CRITICAL SITUATION ADVISORY FOR {selectedState.toUpperCase()}</span>
            </div>
            <p className="text-xs md:text-sm text-slate-200 font-medium mt-0.5 leading-snug">
              {currentState.summary}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0 border-t md:border-t-0 md:border-l border-slate-700 pt-3 md:pt-0 md:pl-5">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">High-Alert Districts</div>
            <div className="text-xl font-black text-red-400">{currentState.severeCount} Districts</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Field Bulletins</div>
            <div className="text-xl font-black text-cyan-300">Live Sweep</div>
          </div>
        </div>
      </div>

      {/* Districts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {currentState.districts.map(district => {
          const isRed = district.alertLevel === 'RED';
          const isOrange = district.alertLevel === 'ORANGE';
          const alertBadgeClass = isRed
            ? 'bg-red-600 text-white border-red-500'
            : isOrange
            ? 'bg-orange-600 text-white border-orange-500'
            : 'bg-yellow-500 text-slate-950 border-yellow-400';

          return (
            <div
              key={district.id}
              className={`rounded-2xl border p-5 transition-all hover:shadow-xl bg-gradient-to-b from-white to-slate-50/60 ${
                isRed ? 'border-red-300 shadow-red-500/5 ring-1 ring-red-400/20' : 'border-slate-200 shadow-sm'
              }`}
            >
              {/* District Card Header */}
              <div className="flex items-start justify-between pb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className={`w-3.5 h-3.5 rounded-full ${isRed ? 'bg-red-600 animate-ping' : 'bg-orange-500'}`}></div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 leading-tight flex items-center gap-1.5">
                      <span>{district.name}</span>
                    </h3>
                    <span className="text-[11px] text-slate-500 font-semibold">{district.state} • Coastal Sector</span>
                  </div>
                </div>

                <div className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-sm ${alertBadgeClass}`}>
                  {district.alertLevel} WARNING
                </div>
              </div>

              {/* Broadcast Numbers Banner */}
              <div className="grid grid-cols-3 gap-2.5 my-4">
                {/* 24h Rain Accumulation */}
                <div className="bg-blue-50/80 border border-blue-200/80 rounded-xl p-2.5">
                  <div className="flex items-center gap-1 text-blue-700 text-[10px] font-bold uppercase mb-0.5">
                    <CloudRain size={13} />
                    <span>24h Rainfall</span>
                  </div>
                  <div className="text-xl font-black text-blue-900 leading-none">
                    {district.rainfall24hMm}<span className="text-xs font-bold text-blue-700"> mm</span>
                  </div>
                  <div className="text-[10px] text-blue-600 font-bold mt-1 truncate">
                    Rate: {district.rainfallRateMmH} mm/h
                  </div>
                </div>

                {/* Peak Wind Gusts */}
                <div className="bg-rose-50/80 border border-rose-200/80 rounded-xl p-2.5">
                  <div className="flex items-center gap-1 text-rose-700 text-[10px] font-bold uppercase mb-0.5">
                    <Wind size={13} />
                    <span>Peak Gusts</span>
                  </div>
                  <div className="text-xl font-black text-rose-900 leading-none">
                    {district.maxWindGustKmH}<span className="text-xs font-bold text-rose-700"> km/h</span>
                  </div>
                  <div className="text-[10px] text-rose-600 font-bold mt-1 truncate">
                    Cat 4 Core Storm
                  </div>
                </div>

                {/* Storm Surge Ingress */}
                <div className="bg-indigo-50/80 border border-indigo-200/80 rounded-xl p-2.5">
                  <div className="flex items-center gap-1 text-indigo-700 text-[10px] font-bold uppercase mb-0.5">
                    <Waves size={13} />
                    <span>Storm Surge</span>
                  </div>
                  <div className="text-xl font-black text-indigo-900 leading-none">
                    {district.stormSurgeHeightM}<span className="text-xs font-bold text-indigo-700"> m</span>
                  </div>
                  <div className="text-[10px] text-indigo-600 font-bold mt-1 truncate">
                    Sea Ingress Active
                  </div>
                </div>
              </div>

              {/* Rainfall Intensity Severity Bar */}
              <div className="mb-4 bg-slate-50 border border-slate-200/70 p-3 rounded-xl">
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <span className="text-blue-500">🌧️</span>
                    <span>Precipitation Danger Index:</span>
                    <span className="text-red-600">{district.rainfallCategory}</span>
                  </span>
                  <span className="text-slate-500 text-[11px] font-mono">
                    {Math.min(100, Math.round((district.rainfall24hMm / 300) * 100))}% Capacity
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isRed ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-gradient-to-r from-sky-400 to-blue-600'
                    }`}
                    style={{ width: `${Math.min(100, Math.round((district.rainfall24hMm / 300) * 100))}%` }}
                  ></div>
                </div>
              </div>

              {/* News Channel Ground Zero Situation Points */}
              <div className="space-y-1.5 mb-4">
                <div className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                  Ground Zero Impact Bulletins:
                </div>
                {district.groundStatus.map((status, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-white p-2 rounded-lg border border-slate-100 shadow-2xs">
                    <span className="text-red-500 font-black mt-0.5">●</span>
                    <span className="font-medium leading-relaxed">{status}</span>
                  </div>
                ))}
              </div>

              {/* Infrastructure Lower Third Status */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2 bg-slate-100/70 px-2.5 py-1.5 rounded-lg">
                  <PowerOff size={14} className={district.powerGridStatus === 'Outage Reported' ? 'text-red-500' : 'text-slate-500'} />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Power Grid</span>
                    <span className="font-bold text-slate-800">{district.powerGridStatus}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-slate-100/70 px-2.5 py-1.5 rounded-lg">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">Shelters Active</span>
                    <span className="font-bold text-slate-800">{district.evacueeCount.toLocaleString()} Evacuated</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RegionalStateImpactDesk;
