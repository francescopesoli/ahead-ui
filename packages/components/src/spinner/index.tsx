'use client';

import { forwardRef, type SVGAttributes, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Spinner Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const spinnerVariants = cva(
  // Base styles
  'animate-spin',
  {
    variants: {
      size: {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
      colorScheme: {
        primary: 'text-[var(--primary)]',
        secondary: 'text-[var(--fg-muted)]',
        white: 'text-white',
        current: 'text-current',
      },
    },
    defaultVariants: {
      size: 'md',
      colorScheme: 'primary',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Spinner Types
 * ------------------------------------------------------------------------------------------------*/

export interface SpinnerProps
  extends Omit<SVGAttributes<SVGSVGElement>, 'children'>,
    VariantProps<typeof spinnerVariants> {
  /**
   * Accessible label for screen readers
   */
  label?: string;
  /**
   * Track color (the background circle)
   */
  trackColor?: string;
  /**
   * Spinner thickness
   */
  thickness?: number;
  /**
   * Animation speed (in seconds)
   */
  speed?: number;
}

/* -------------------------------------------------------------------------------------------------
 * Spinner Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A loading spinner component.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Spinner />
 *
 * // With size and color
 * <Spinner size="lg" colorScheme="primary" />
 *
 * // With custom thickness
 * <Spinner thickness={4} />
 *
 * // Inside a button
 * <Button disabled>
 *   <Spinner size="sm" colorScheme="white" />
 *   Loading...
 * </Button>
 * ```
 */
const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
  (props, ref) => {
    const {
      className,
      size,
      colorScheme,
      label = 'Loading',
      trackColor = 'currentColor',
      thickness = 3,
      speed = 0.75,
      style,
      ...restProps
    } = props;

    return (
      <svg
        ref={ref}
        className={cn(spinnerVariants({ size, colorScheme }), className)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        role="status"
        aria-label={label}
        style={{
          animationDuration: `${speed}s`,
          ...style,
        }}
        {...restProps}
      >
        {/* Track (background circle) */}
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r={10}
          stroke={trackColor}
          strokeWidth={thickness}
        />
        {/* Spinner arc */}
        <path
          className="opacity-100"
          fill="currentColor"
          d={`M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z`}
        />
      </svg>
    );
  }
);

Spinner.displayName = 'Spinner';

/* -------------------------------------------------------------------------------------------------
 * Dots Spinner Variant
 * ------------------------------------------------------------------------------------------------*/

export interface DotsSpinnerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Size of the spinner
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Color scheme
   */
  colorScheme?: 'primary' | 'secondary' | 'white' | 'current';
  /**
   * Accessible label for screen readers
   */
  label?: string;
}

const dotsSizes = {
  xs: 'h-3 gap-0.5',
  sm: 'h-4 gap-1',
  md: 'h-6 gap-1.5',
  lg: 'h-8 gap-2',
  xl: 'h-12 gap-3',
};

const dotsColors = {
  primary: 'bg-[var(--primary)]',
  secondary: 'bg-[var(--fg-muted)]',
  white: 'bg-white',
  current: 'bg-current',
};

/**
 * A dots-style loading spinner.
 *
 * @example
 * ```tsx
 * <DotsSpinner size="md" colorScheme="primary" />
 * ```
 */
const DotsSpinner = forwardRef<HTMLDivElement, DotsSpinnerProps>(
  (props, ref) => {
    const {
      className,
      size = 'md',
      colorScheme = 'primary',
      label = 'Loading',
      ...restProps
    } = props;

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center',
          dotsSizes[size],
          className
        )}
        role="status"
        aria-label={label}
        {...restProps}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              'aspect-square rounded-full',
              size === 'xs' && 'h-1',
              size === 'sm' && 'h-1.5',
              size === 'md' && 'h-2',
              size === 'lg' && 'h-2.5',
              size === 'xl' && 'h-4',
              dotsColors[colorScheme],
              'animate-pulse'
            )}
            style={{
              animationDelay: `${i * 150}ms`,
              animationDuration: '600ms',
            }}
          />
        ))}
      </div>
    );
  }
);

DotsSpinner.displayName = 'DotsSpinner';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Spinner, DotsSpinner, spinnerVariants };
