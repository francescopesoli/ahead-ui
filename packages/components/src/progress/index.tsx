'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Progress Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const progressTrackVariants = cva(
  ['relative w-full overflow-hidden rounded-full bg-[var(--bg-muted)]'],
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
        xl: 'h-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const progressBarVariants = cva(
  ['h-full rounded-full transition-all duration-300 ease-out'],
  {
    variants: {
      colorScheme: {
        primary: 'bg-[var(--primary)]',
        success: 'bg-[var(--success)]',
        warning: 'bg-[var(--warning)]',
        danger: 'bg-[var(--danger)]',
        info: 'bg-[var(--info)]',
      },
      isIndeterminate: {
        true: 'animate-indeterminate',
      },
    },
    defaultVariants: {
      colorScheme: 'primary',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Progress Types
 * ------------------------------------------------------------------------------------------------*/

export interface ProgressProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof progressTrackVariants>,
    VariantProps<typeof progressBarVariants> {
  /**
   * The current value (0-100)
   */
  value?: number;
  /**
   * Minimum value
   */
  min?: number;
  /**
   * Maximum value
   */
  max?: number;
  /**
   * Whether the progress is indeterminate
   */
  isIndeterminate?: boolean;
  /**
   * Whether to show the value label
   */
  showValue?: boolean;
  /**
   * Format function for the value label
   */
  formatValue?: (value: number, max: number) => string;
  /**
   * Whether to animate value changes
   */
  animated?: boolean;
}

/* -------------------------------------------------------------------------------------------------
 * Progress Component
 * ------------------------------------------------------------------------------------------------*/

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (props, ref) => {
    const {
      className,
      size,
      colorScheme,
      value = 0,
      min = 0,
      max = 100,
      isIndeterminate,
      showValue,
      formatValue = (v, m) => `${Math.round((v / m) * 100)}%`,
      animated = true,
      ...restProps
    } = props;

    const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);

    return (
      <div className={cn('flex flex-col gap-1', className)} ref={ref} {...restProps}>
        {showValue && !isIndeterminate && (
          <div className="flex justify-between text-sm">
            <span className="text-[var(--fg-muted)]">Progress</span>
            <span className="font-medium text-[var(--fg)]">
              {formatValue(value, max)}
            </span>
          </div>
        )}
        <div
          className={progressTrackVariants({ size })}
          role="progressbar"
          aria-valuenow={isIndeterminate ? undefined : value}
          aria-valuemin={min}
          aria-valuemax={max}
        >
          {animated && !isIndeterminate ? (
            <motion.div
              className={progressBarVariants({ colorScheme })}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            />
          ) : (
            <div
              className={cn(
                progressBarVariants({ colorScheme, isIndeterminate }),
                isIndeterminate && 'w-1/3'
              )}
              style={!isIndeterminate ? { width: `${percentage}%` } : undefined}
            />
          )}
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

/* -------------------------------------------------------------------------------------------------
 * CircularProgress Component
 * ------------------------------------------------------------------------------------------------*/

export interface CircularProgressProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * The current value (0-100)
   */
  value?: number;
  /**
   * Size of the circular progress
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Color scheme
   */
  colorScheme?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  /**
   * Whether the progress is indeterminate
   */
  isIndeterminate?: boolean;
  /**
   * Whether to show the value label
   */
  showValue?: boolean;
  /**
   * Stroke width
   */
  strokeWidth?: number;
}

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 80,
};

const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  (props, ref) => {
    const {
      className,
      size = 'md',
      colorScheme = 'primary',
      value = 0,
      isIndeterminate,
      showValue,
      strokeWidth = 4,
      ...restProps
    } = props;

    const dimension = sizeMap[size];
    const radius = (dimension - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const percentage = Math.min(Math.max(value, 0), 100);
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const colorClass = {
      primary: 'stroke-[var(--primary)]',
      success: 'stroke-[var(--success)]',
      warning: 'stroke-[var(--warning)]',
      danger: 'stroke-[var(--danger)]',
      info: 'stroke-[var(--info)]',
    }[colorScheme];

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex items-center justify-center', className)}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={100}
        {...restProps}
      >
        <svg
          width={dimension}
          height={dimension}
          className={cn(isIndeterminate && 'animate-spin')}
        >
          {/* Background circle */}
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className="stroke-[var(--bg-muted)]"
          />
          {/* Progress circle */}
          <motion.circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className={colorClass}
            style={{
              transformOrigin: 'center',
              transform: 'rotate(-90deg)',
            }}
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={{
              strokeDasharray: circumference,
              strokeDashoffset: isIndeterminate ? circumference * 0.75 : strokeDashoffset,
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
        </svg>
        {showValue && !isIndeterminate && (
          <span
            className={cn(
              'absolute font-medium text-[var(--fg)]',
              size === 'sm' && 'text-xs',
              size === 'md' && 'text-sm',
              size === 'lg' && 'text-base',
              size === 'xl' && 'text-lg'
            )}
          >
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);

CircularProgress.displayName = 'CircularProgress';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Progress, CircularProgress, progressTrackVariants, progressBarVariants };
