'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Stat Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const statVariants = cva(
  ['flex flex-col gap-1'],
  {
    variants: {
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const statValueVariants = cva(
  ['font-semibold text-[var(--fg)]'],
  {
    variants: {
      size: {
        sm: 'text-xl',
        md: 'text-2xl',
        lg: 'text-4xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const statLabelVariants = cva(
  ['font-medium text-[var(--fg-muted)]'],
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Stat Types
 * ------------------------------------------------------------------------------------------------*/

export interface StatProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statVariants> {}

export interface StatLabelProps extends HTMLAttributes<HTMLDivElement> {}

export interface StatValueProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statValueVariants> {}

export interface StatHelpTextProps extends HTMLAttributes<HTMLDivElement> {}

export interface StatArrowProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * The type of arrow to display
   */
  type: 'increase' | 'decrease';
}

/* -------------------------------------------------------------------------------------------------
 * Stat Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A stat component for displaying metrics and values.
 *
 * Features:
 * - Label, value, and help text sub-components
 * - Trend indicators with arrows
 * - Size variants
 *
 * @example
 * ```tsx
 * <Stat>
 *   <StatLabel>Total Sales</StatLabel>
 *   <StatValue>$45,670</StatValue>
 *   <StatHelpText>
 *     <StatArrow type="increase" />
 *     23.5% from last month
 *   </StatHelpText>
 * </Stat>
 * ```
 */
const Stat = forwardRef<HTMLDivElement, StatProps>(
  (props, ref) => {
    const { className, children, size, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn(statVariants({ size }), className)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

Stat.displayName = 'Stat';

/* -------------------------------------------------------------------------------------------------
 * StatLabel Component
 * ------------------------------------------------------------------------------------------------*/

const StatLabel = forwardRef<HTMLDivElement, StatLabelProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn(statLabelVariants({ size: 'md' }), className)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

StatLabel.displayName = 'StatLabel';

/* -------------------------------------------------------------------------------------------------
 * StatValue Component
 * ------------------------------------------------------------------------------------------------*/

const StatValue = forwardRef<HTMLDivElement, StatValueProps>(
  (props, ref) => {
    const { className, children, size, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn(statValueVariants({ size }), className)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

StatValue.displayName = 'StatValue';

/* -------------------------------------------------------------------------------------------------
 * StatHelpText Component
 * ------------------------------------------------------------------------------------------------*/

const StatHelpText = forwardRef<HTMLDivElement, StatHelpTextProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-1 text-sm text-[var(--fg-muted)]', className)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

StatHelpText.displayName = 'StatHelpText';

/* -------------------------------------------------------------------------------------------------
 * StatArrow Component
 * ------------------------------------------------------------------------------------------------*/

const StatArrow = forwardRef<HTMLSpanElement, StatArrowProps>(
  (props, ref) => {
    const { className, type, ...restProps } = props;

    return (
      <span
        ref={ref}
        aria-label={type === 'increase' ? 'Increased by' : 'Decreased by'}
        className={cn(
          'inline-flex items-center',
          type === 'increase' ? 'text-[var(--success)]' : 'text-[var(--danger)]',
          className
        )}
        {...restProps}
      >
        {type === 'increase' ? (
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        ) : (
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
      </span>
    );
  }
);

StatArrow.displayName = 'StatArrow';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Stat, StatLabel, StatValue, StatHelpText, StatArrow, statVariants };
