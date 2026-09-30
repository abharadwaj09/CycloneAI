'use client';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Map, CloudRain, Wind, Waves,
  FlaskConical, Gauge, TrendingUp, History, Bell,
  Route, Building2, Database, BookOpen, Search, Menu, X
} from 'lucide-react';

const GROUPS = [
  {
    name: 'MONITORING',
    items: [
      { id: '/', label: 'Command Center', icon: LayoutDashboard },
      { id: '/rainfall', label: 'Rainfall Monitor', icon: CloudRain },
      { id: '/wind', label: 'Wind & Atmosphere', icon: Wind },
      { id: '/ocean', label: 'Ocean Intelligence', icon: Waves },
    ]
  },
  {
    name: 'ANALYSIS',
    items: [
      { id: '/simulator', label: 'Cyclone Simulator', icon: FlaskConical },
      { id: '/parameters', label: 'Cyclone Parameters', icon: Gauge },
    ]
  },
  {
    name: 'INTELLIGENCE',
    items: [
      { id: '/prediction', label: 'Numerical Forecast', icon: TrendingUp },
      { id: '/patterns', label: 'Pattern Analysis', icon: History },
      { id: '/historical', label: 'Historical Cyclones', icon: History },
    ]
  },
  {
    name: 'RESPONSE',
    items: [
      { id: '/alerts', label: 'Alerts & Notifications', icon: Bell },
      { id: '/roads', label: 'Roads & Infrastructure', icon: Route },
      { id: '/emergency', label: 'Emergency Facilities', icon: Building2 },
      { id: '/location', label: 'Check My Location', icon: Map },
    ]
  },
  {
    name: 'SYSTEM',
    items: [
      { id: '/datacenter', label: 'Data Center', icon: Database },
      { id: '/methodology', label: 'Methodology', icon: BookOpen },
    ]
  }
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNav = (path: string) => {
    router.push(path);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div className={`flex flex-col h-full bg-slate-900 border-r border-slate-800 transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-[280px]'}`}>
      <div className="flex flex-col p-4 border-b border-slate-800 gap-3">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🌪️</span>
              <span className="text-lg font-extrabold text-white tracking-tight">
                CYCLONEAI
              </span>
            </div>
          )}
          {collapsed && <span className="text-2xl mx-auto">🌪️</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="hidden lg:flex p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
            <Menu className="w-5 h-5" />
          </button>
        </div>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-2.5 h-2.5 bg-emerald-500 rounded-full opacity-40 animate-ping" />
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">Live Radar</span>
          </div>
        )}
        {!collapsed && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search modules..."
              className="w-full pl-9 pr-4 py-2 bg-slate-800/60 border border-slate-700/50 rounded-lg text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 transition-all placeholder:text-slate-500"
            />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-3 scrollbar-thin">
        {GROUPS.map((group, idx) => (
          <div key={idx} className="mb-4 px-3">
            {!collapsed && (
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-3">
                {group.name}
              </h4>
            )}
            <div className="flex flex-col gap-0.5">
              {group.items.map(item => {
                const isActive = pathname === item.id || (item.id !== '/' && pathname.startsWith(item.id));
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative group ${isActive
                      ? 'bg-emerald-500/15 text-emerald-400 font-medium'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    title={collapsed ? item.label : undefined}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute left-0 top-2 bottom-2 w-1 bg-emerald-500 rounded-r-full"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                    {!collapsed && <span className="text-sm text-left truncate">{item.label}</span>}
                    {!collapsed && item.id === '/alerts' && (
                      <span className="ml-auto bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">3</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} text-sm`}>
          <div className="relative flex items-center justify-center">
            <div className="absolute w-3 h-3 bg-emerald-500 rounded-full opacity-40 animate-ping" />
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
          </div>
          {!collapsed && <span className="font-medium text-slate-300">System Online</span>}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block flex-shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900/90 backdrop-blur-lg rounded-xl shadow-lg text-emerald-400"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="h-full w-[280px]"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute right-4 top-4 z-50">
                <button onClick={() => setMobileOpen(false)} className="p-2 bg-slate-800 rounded-full shadow-md text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {sidebarContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
