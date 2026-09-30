'use client';
import { AlertCircle, RefreshCw } from 'lucide-react';

export interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[200px] p-8 text-center bg-red-50/50 rounded-xl border border-red-100">
      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4 text-red-500">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-red-800 font-semibold mb-2">Error Loading Data</h3>
      <p className="text-red-600 text-sm mb-4 max-w-sm">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors text-sm font-medium shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorState;
