'use client';

import React from 'react';
import { ToastContext } from '@/context/ToastContext.context';

export function useNotify(
  content: string,
  type: 'success' | 'warning' | 'info' | 'error'
) {
  const { notify } = React.useContext(ToastContext);
  return notify ? notify(content, type) : null;
}
