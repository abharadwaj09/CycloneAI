'use client';

import { NewsBroadcastTicker } from '@/components/dashboard/NewsBroadcastTicker';
import { CommandCenterHeader } from '@/components/dashboard/CommandCenterHeader';
import { QuickStats } from '@/components/dashboard/QuickStats';
import { CycloneMap } from '@/components/map/CycloneMap';
import { RegionalStateImpactDesk } from '@/components/dashboard/RegionalStateImpactDesk';
import { AlertCards } from '@/components/dashboard/AlertCards';
import { LiveTrendWall } from '@/components/dashboard/LiveTrendWall';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 p-3 md:p-5 lg:p-6 font-sans">
      <div className="max-w-[1600px] mx-auto">
        
        {/* 24x7 News Channel Breaking Disaster Broadcast Ticker */}
        <NewsBroadcastTicker />

        {/* Command Center Executive Meteorological Header */}
        <CommandCenterHeader />
        
        {/* Quick Operational Telemetry Cards */}
        <div className="mt-5">
          <QuickStats />
        </div>
        
        {/* Central India Cyclone & Ocean Tracking Map (Full-Scale 88vh GIS View) */}
        <div className="mt-5 w-full">
          <CycloneMap height="88vh" />
        </div>
        
        {/* Regional & State Impact Desk (News Channel Style Ground Zero Damage & Rainfall Monitor) */}
        <div className="mt-6">
          <RegionalStateImpactDesk />
        </div>

        {/* National Disaster Alert Severity Cards */}
        <div className="mt-5">
          <AlertCards />
        </div>
        
        {/* Meteorological Sensor Stream */}
        <div className="mt-6">
          <LiveTrendWall />
        </div>
      </div>
    </main>
  );
}
