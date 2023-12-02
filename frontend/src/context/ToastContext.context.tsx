'use client';

import Toast from '@/components/common/Toast';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface ToastContextProps {
  children: React.ReactNode;
}

export type AlertType = {
  type?: 'success' | 'warning' | 'info' | 'error';
  message?: string;
};

export type ToastType = {
  alert?: AlertType;
  notify?: (
    content: string,
    type: 'success' | 'warning' | 'info' | 'error',
    err?: Error
  ) => void;
};

export const ToastContext = React.createContext<ToastType>({
  alert: {},
  notify: (content, type, err?) => {
    console.log('');
  },
});

export function ToastContextProvider({ children }: ToastContextProps) {
  const [alert, setAlert] = React.useState<AlertType>();

  const notify = React.useCallback(
    (
      content: string,
      type: 'success' | 'warning' | 'info' | 'error',
      err?: Error
    ) => {
      if (err) console.log(err.message);
      setAlert({
        type,
        message: content,
      });
    },
    []
  );

  const onDelete = () => {
    setAlert(undefined);
  };

  const context = React.useMemo(() => ({ alert, notify }), [alert, notify]);
  return (
    <ToastContext.Provider value={context}>
      {alert ? (
        <div
          className="absolute top-10 right-4 -z-50"
          style={{
            zIndex: 200,
          }}
        >
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1.0 }}
              exit={{
                opacity: 0,
                scale: 0.5,
                transition: { duration: 0.2 },
              }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              <Toast
                message={alert?.message ?? ''}
                type={alert?.type ?? null}
                onDelete={onDelete}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      ) : null}
      {children}
    </ToastContext.Provider>
  );
}
