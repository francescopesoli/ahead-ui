'use client';

import {
  forwardRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Alert Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const alertVariants = cva(
  [
    'relative flex gap-3 rounded-[var(--radius-lg)] p-4',
    'border',
  ],
  {
    variants: {
      variant: {
        subtle: '',
        solid: '',
        outline: 'bg-transparent',
        'left-accent': 'border-l-4 rounded-l-none',
      },
      status: {
        info: '',
        success: '',
        warning: '',
        danger: '',
      },
    },
    compoundVariants: [
      // Subtle variants
      { variant: 'subtle', status: 'info', className: 'bg-[var(--info)]/10 border-[var(--info)]/20 text-[var(--info)]' },
      { variant: 'subtle', status: 'success', className: 'bg-[var(--success)]/10 border-[var(--success)]/20 text-[var(--success)]' },
      { variant: 'subtle', status: 'warning', className: 'bg-[var(--warning)]/10 border-[var(--warning)]/20 text-[var(--warning)]' },
      { variant: 'subtle', status: 'danger', className: 'bg-[var(--danger)]/10 border-[var(--danger)]/20 text-[var(--danger)]' },
      // Solid variants
      { variant: 'solid', status: 'info', className: 'bg-[var(--info)] border-[var(--info)] text-white' },
      { variant: 'solid', status: 'success', className: 'bg-[var(--success)] border-[var(--success)] text-white' },
      { variant: 'solid', status: 'warning', className: 'bg-[var(--warning)] border-[var(--warning)] text-black' },
      { variant: 'solid', status: 'danger', className: 'bg-[var(--danger)] border-[var(--danger)] text-white' },
      // Outline variants
      { variant: 'outline', status: 'info', className: 'border-[var(--info)] text-[var(--info)]' },
      { variant: 'outline', status: 'success', className: 'border-[var(--success)] text-[var(--success)]' },
      { variant: 'outline', status: 'warning', className: 'border-[var(--warning)] text-[var(--warning)]' },
      { variant: 'outline', status: 'danger', className: 'border-[var(--danger)] text-[var(--danger)]' },
      // Left accent variants
      { variant: 'left-accent', status: 'info', className: 'bg-[var(--info)]/5 border-[var(--info)]/20 border-l-[var(--info)] text-[var(--fg)]' },
      { variant: 'left-accent', status: 'success', className: 'bg-[var(--success)]/5 border-[var(--success)]/20 border-l-[var(--success)] text-[var(--fg)]' },
      { variant: 'left-accent', status: 'warning', className: 'bg-[var(--warning)]/5 border-[var(--warning)]/20 border-l-[var(--warning)] text-[var(--fg)]' },
      { variant: 'left-accent', status: 'danger', className: 'bg-[var(--danger)]/5 border-[var(--danger)]/20 border-l-[var(--danger)] text-[var(--fg)]' },
    ],
    defaultVariants: {
      variant: 'subtle',
      status: 'info',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Alert Icons
 * ------------------------------------------------------------------------------------------------*/

const AlertIcons = {
  info: (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  success: (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  danger: (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
};

/* -------------------------------------------------------------------------------------------------
 * Alert Types
 * ------------------------------------------------------------------------------------------------*/

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof alertVariants> {
  /**
   * Title of the alert
   */
  title?: ReactNode;
  /**
   * Custom icon (overrides default status icon)
   */
  icon?: ReactNode;
  /**
   * Whether to show the icon
   */
  showIcon?: boolean;
  /**
   * Whether the alert is dismissible
   */
  isDismissible?: boolean;
  /**
   * Callback when alert is dismissed
   */
  onDismiss?: () => void;
}

/* -------------------------------------------------------------------------------------------------
 * Alert Component
 * ------------------------------------------------------------------------------------------------*/

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (props, ref) => {
    const {
      className,
      variant,
      status = 'info',
      title,
      icon,
      showIcon = true,
      isDismissible,
      onDismiss,
      children,
      id,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
    } = props;

    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };

    const displayIcon = icon ?? (status ? AlertIcons[status] : null);

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={ref}
            role="alert"
            id={id}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={cn(alertVariants({ variant, status }), className)}
          >
            {showIcon && displayIcon && (
              <span className="shrink-0">{displayIcon}</span>
            )}
            <div className="flex-1 min-w-0">
              {title && (
                <p className="font-semibold">{title}</p>
              )}
              {children && (
                <div className={cn(title && 'mt-1', 'text-sm opacity-90')}>
                  {children}
                </div>
              )}
            </div>
            {isDismissible && (
              <button
                type="button"
                onClick={handleDismiss}
                className={cn(
                  'shrink-0 rounded-md p-1 -m-1',
                  'hover:bg-black/10 dark:hover:bg-white/10',
                  'focus:outline-none focus:ring-2 focus:ring-current',
                  'transition-colors duration-fast'
                )}
                aria-label="Dismiss"
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
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

Alert.displayName = 'Alert';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Alert, alertVariants };
