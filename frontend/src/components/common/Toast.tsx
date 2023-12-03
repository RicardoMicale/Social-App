'use client';

import React from 'react';
import CloseIcon from '../icons/CloseIcon';

interface ToastProps {
  message: string;
  type: 'success' | 'warning' | 'info' | 'error' | null;
  onDelete?: () => void;
}

export default function Toast({ type, message, onDelete }: ToastProps) {
  const getClass = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 text-emerald-500 border-emerald-200';
      case 'warning':
        return 'bg-yellow-50 text-yellow-500 border-yellow-400';
      case 'info':
        return 'bg-blue-50 text-blue-500 border-blue-200';
      case 'error':
        return 'bg-red-50 text-red-500 border-red-200';
      default:
        break;
    }
  };

  return (
    <div
      className={`${getClass()} flex items-center justify-between gap-8 max-w-sm px-8 py-3 rounded-md border`}
    >
      <div className="flex flex-col items-start justify-start">
        <span className="font-semibold mb-2">
          {`${type?.charAt(0)?.toUpperCase() ?? ''}${type?.slice(1) ?? ''}`}
        </span>
        <span>{message}</span>
      </div>
      <button type="button" onClick={onDelete} className="p-2 cursor-pointer">
        <CloseIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
