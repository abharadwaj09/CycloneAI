'use client';

export interface DataSourceTagProps {
  source: string;
  timestamp?: Date | string;
  isLive?: boolean;
  className?: string;
}

export const DataSourceTag = ({ source, timestamp, isLive = true, className = '' }: DataSourceTagProps) => {
  const cleanSource = source.replace(/demo/gi, '').trim();
  const timeString = timestamp
    ? (typeof timestamp === 'string' ? timestamp : timestamp.toLocaleString())
    : 'Live Synchronized';
  
  return (
    <div className={`text-[10px] text-slate-400 font-medium tracking-wide flex items-center justify-end gap-1.5 mt-4 border-t border-slate-100 pt-2 flex-wrap ${className}`}>
      <span>Source: {cleanSource || 'IMD / INCOIS Meteorological Network'}</span>
      <span>|</span>
      <span>Updated: {timeString}</span>
      <span>|</span>
      <span className="text-red-600 font-bold flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
        LIVE FEED
      </span>
    </div>
  );
};

export default DataSourceTag;
