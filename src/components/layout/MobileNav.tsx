'use client';
import { LayoutDashboard, Map, Bell, Brain, Menu } from 'lucide-react';

export const MobileNav = ({ activeModule, onSelectModule, onMoreClick }: any) => {
  const items = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'ai', label: 'AI', icon: Brain },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full h-16 bg-white/90 backdrop-blur-xl border-t border-slate-200 flex items-center justify-around px-2 z-40 pb-safe shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
      {items.map(item => {
        const isActive = activeModule === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onSelectModule?.(item.id)}
            className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-500 hover:text-emerald-500'}`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'fill-emerald-100' : ''}`} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
      
      <button
        onClick={onMoreClick}
        className="flex flex-col items-center justify-center w-16 h-full gap-1 text-slate-500 hover:text-emerald-500 transition-colors"
      >
        <Menu className="w-5 h-5" />
        <span className="text-[10px] font-medium">More</span>
      </button>
    </div>
  );
};

export default MobileNav;
