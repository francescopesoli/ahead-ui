'use client';

import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useCallback,
  useId,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Toast Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const toastVariants = cva(
  [
    'relative flex items-start gap-3 w-full max-w-sm',
    'rounded-[var(--radius-lg)] p-4 shadow-lg',
    'border',
  ],
  {
    variants: {
      variant: {
        default: 'bg-[var(--bg)] border-[var(--border)] text-[var(--fg)]',
        success: 'bg-[var(--success)] border-[var(--success)] text-white',
        danger: 'bg-[var(--danger)] border-[var(--danger)] text-white',
        warning: 'bg-[var(--warning)] border-[var(--warning)] text-black',
        info: 'bg-[var(--info)] border-[var(--info)] text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Toast Types
 * ------------------------------------------------------------------------------------------------*/

export interface ToastData {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
}

export interface ToastProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'>,
    VariantProps<typeof toastVariants> {
  /**
   * Toast data
   */
  toast: ToastData;
  /**
   * Callback to remove toast
   */
  onRemove: (id: string) => void;
}

export interface ToastProviderProps {
  children: ReactNode;
  /**
   * Position of toasts
   */
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  /**
   * Maximum number of toasts to show
   */
  maxToasts?: number;
}

/* -------------------------------------------------------------------------------------------------
 * Toast Context
 * ------------------------------------------------------------------------------------------------*/

interface ToastContextValue {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, 'id'>) => string;
  removeToast: (id: string) => void;
  removeAllToasts: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

/* -------------------------------------------------------------------------------------------------
 * Toast Icons
 * ------------------------------------------------------------------------------------------------*/

const ToastIcons = {
  success: (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  danger: (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  info: (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

/* -------------------------------------------------------------------------------------------------
 * Toast Component
 * ------------------------------------------------------------------------------------------------*/

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (props, ref) => {
    const {
      className,
      toast,
      onRemove,
      variant,
      id,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
    } = props;

    const toastVariant = variant ?? toast.variant ?? 'default';
    const icon = toastVariant !== 'default' ? ToastIcons[toastVariant] : null;

    return (
      <motion.div
        ref={ref}
        id={id}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        layout
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
        className={cn(toastVariants({ variant: toastVariant }), className)}
        role="alert"
      >
        {icon && <span className="shrink-0 mt-0.5">{icon}</span>}

        <div className="flex-1 min-w-0">
          {toast.title && (
            <p className="font-semibold">{toast.title}</p>
          )}
          {toast.description && (
            <p className={cn('text-sm', toast.title && 'mt-1', toastVariant === 'default' && 'text-[var(--fg-muted)]')}>
              {toast.description}
            </p>
          )}
          {toast.action && (
            <button
              type="button"
              onClick={() => {
                toast.action?.onClick();
                onRemove(toast.id);
              }}
              className={cn(
                'mt-2 text-sm font-medium underline underline-offset-2',
                'hover:no-underline',
                'focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2 rounded'
              )}
            >
              {toast.action.label}
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => onRemove(toast.id)}
          className={cn(
            'shrink-0 rounded-md p-1 -m-1',
            'hover:bg-black/10 dark:hover:bg-white/10',
            'focus:outline-none focus:ring-2 focus:ring-current',
            'transition-colors duration-fast'
          )}
          aria-label="Close"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </motion.div>
    );
  }
);

Toast.displayName = 'Toast';

/* -------------------------------------------------------------------------------------------------
 * ToastProvider Component
 * ------------------------------------------------------------------------------------------------*/

const positionClasses = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
};

const ToastProvider = ({ children, position = 'bottom-right', maxToasts = 5 }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const generateId = useId();

  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = `${generateId}-${Date.now()}`;
    const newToast: ToastData = { ...toast, id };

    setToasts((prev) => {
      const updated = [...prev, newToast];
      return updated.slice(-maxToasts);
    });

    // Auto dismiss
    if (toast.duration !== 0) {
      const duration = toast.duration ?? 5000;
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        toast.onClose?.();
      }, duration);
    }

    return id;
  }, [generateId, maxToasts]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => {
      const toast = prev.find((t) => t.id === id);
      toast?.onClose?.();
      return prev.filter((t) => t.id !== id);
    });
  }, []);

  const removeAllToasts = useCallback(() => {
    setToasts((prev) => {
      prev.forEach((t) => t.onClose?.());
      return [];
    });
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, removeAllToasts }}>
      {children}
      <div
        className={cn(
          'fixed z-50 flex flex-col gap-2',
          positionClasses[position]
        )}
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onRemove={removeToast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Toast, ToastProvider, toastVariants };
