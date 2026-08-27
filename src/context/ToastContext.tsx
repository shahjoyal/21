import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

interface ToastData {
  id: number;
  title: string;
  subtitle?: string;
  image?: string;
}

interface ToastContextValue {
  showToast: (title: string, subtitle?: string, image?: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const idRef = useRef(0);

  const showToast = useCallback((title: string, subtitle?: string, image?: string) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, title, subtitle, image }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const dismiss = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Viewport */}
      <div
        className="fixed z-[100] top-[4.5rem] sm:top-24 right-3 sm:right-6 flex flex-col gap-2.5 items-end pointer-events-none w-[calc(100%-1.5rem)] sm:w-auto max-w-sm"
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -16, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9, transition: { duration: 0.25 } }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className="pointer-events-auto relative w-full sm:w-80 bg-[#134e48] text-white rounded-2xl shadow-2xl border border-[#E89A25]/40 overflow-hidden flex items-center gap-3 p-3 pr-2.5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E89A25] text-[#134e48] flex items-center justify-center shrink-0 shadow-inner">
                <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[#F5EEDB] flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#E89A25] shrink-0" />
                  <span>{toast.title}</span>
                </p>
                {toast.subtitle && (
                  <p className="text-[11px] text-white/70 truncate mt-0.5">{toast.subtitle}</p>
                )}
              </div>

              <button
                onClick={() => dismiss(toast.id)}
                className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                aria-label="Dismiss notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Auto-dismiss progress bar */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-[#E89A25]"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 3.2, ease: 'linear' }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}
