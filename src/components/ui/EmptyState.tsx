'use client';
import { ReactNode } from 'react';

export interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const EmptyState = ({ icon, title, description }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[200px] p-8 text-center bg-slate-50/50 rounded-xl border border-slate-100 border-dashed">
      <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 text-slate-400">
        {icon}
      </div>
      <h3 className="text-slate-800 font-semibold mb-2">{title}</h3>
      <p className="text-slate-500 text-sm max-w-xs">{description}</p>
    </div>
  );
};

export default EmptyState;
