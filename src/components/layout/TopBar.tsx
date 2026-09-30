'use client';
import { Menu, Search, Bell, MapPin, ChevronDown } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';

export const TopBar = ({ onMenuClick, title = 'Command Center' }: any) => {
  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden md:flex relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search data..." 
            className="w-full pl-9 pr-4 py-2 bg-slate-100/50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
          />
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100/50 border border-slate-200 rounded-full text-sm font-medium text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span>India &gt; Odisha</span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>

        <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full" />
        </button>
        
        <div className="hidden sm:block">
          <StatusBadge mode="live" pulse />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
