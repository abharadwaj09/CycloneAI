'use client';
import { ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-react';

export interface TrendIndicatorProps {
  current: number;
  previous: number;
  unit?: string;
  label?: string;
  inverse?: boolean; // If true, up is green, down is red. Defaults to up is red (worsening).
}

export const TrendIndicator = ({ current, previous, unit = '', label, inverse = false }: TrendIndicatorProps) => {
  const diff = current - previous;
  const isUp = diff > 0;
  const isDown = diff < 0;

  let color = 'text-blue-500'; // neutral
  if (isUp) color = inverse ? 'text-green-500' : 'text-red-500';
  if (isDown) color = inverse ? 'text-red-500' : 'text-green-500';
  
  const Icon = isUp ? ArrowUpRight : isDown ? ArrowDownRight : ArrowRight;

  return (
    <div className="flex flex-col">
      {label && <span className="text-xs text-slate-500 uppercase font-semibold">{label}</span>}
      <div className={`flex items-center gap-1 ${color}`}>
        <Icon className="w-4 h-4" />
        <span className="font-medium text-sm">
          {Math.abs(diff).toFixed(1)}{unit}
        </span>
      </div>
    </div>
  );
};

export default TrendIndicator;
