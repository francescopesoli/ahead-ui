'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Badge Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const badgeVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center gap-1',
    'font-medium whitespace-nowrap',
    'transition-colors duration-fast ease-out',
  ],
  {
    variants: {
      variant: {
        solid: '',
        subtle: '',
        outline: 'border bg-transparent',
      },
      colorScheme: {
        primary: '',
        secondary: '',
        success: '',
        warning: '',
        danger: '',
        accent: '',
      },
      size: {
        sm: 'text-xs px-2 py-0.5 rounded-[var(--radius-sm)]',
        md: 'text-xs px-2.5 py-0.5 rounded-[var(--radius-DEFAULT)]',
        lg: 'text-sm px-3 py-1 rounded-[var(--radius-DEFAULT)]',
      },
    },
    compoundVariants: [
      // Solid variants
      {
        variant: 'solid',
        colorScheme: 'primary',
        className: 'bg-[var(--primary)] text-[var(--primary-fg)]',
      },
      {
        variant: 'solid',
        colorScheme: 'secondary',
        className: 'bg-[var(--bg-emphasized)] text-[var(--fg)]',
      },
      {
        variant: 'solid',
        colorScheme: 'success',
        className: 'bg-[var(--success)] text-[var(--success-fg)]',
      },
      {
        variant: 'solid',
        colorScheme: 'warning',
        className: 'bg-[var(--warning)] text-[var(--warning-fg)]',
      },
      {
        variant: 'solid',
        colorScheme: 'danger',
        className: 'bg-[var(--danger)] text-[var(--danger-fg)]',
      },
      {
        variant: 'solid',
        colorScheme: 'accent',
        className: 'bg-[var(--accent)] text-[var(--accent-fg)]',
      },
      // Subtle variants
      {
        variant: 'subtle',
        colorScheme: 'primary',
        className: 'bg-[var(--primary-subtle)] text-[var(--primary)]',
      },
      {
        variant: 'subtle',
        colorScheme: 'secondary',
        className: 'bg-[var(--bg-muted)] text-[var(--fg-muted)]',
      },
      {
        variant: 'subtle',
        colorScheme: 'success',
        className: 'bg-[var(--success-subtle)] text-[var(--success)]',
      },
      {
        variant: 'subtle',
        colorScheme: 'warning',
        className: 'bg-[var(--warning-subtle)] text-[var(--warning)]',
      },
      {
        variant: 'subtle',
        colorScheme: 'danger',
        className: 'bg-[var(--danger-subtle)] text-[var(--danger)]',
      },
      {
        variant: 'subtle',
        colorScheme: 'accent',
        className: 'bg-[var(--accent-subtle)] text-[var(--accent)]',
      },
      // Outline variants
      {
        variant: 'outline',
        colorScheme: 'primary',
        className: 'border-[var(--primary)] text-[var(--primary)]',
      },
      {
        variant: 'outline',
        colorScheme: 'secondary',
        className: 'border-[var(--border)] text-[var(--fg-muted)]',
      },
      {
        variant: 'outline',
        colorScheme: 'success',
        className: 'border-[var(--success)] text-[var(--success)]',
      },
      {
        variant: 'outline',
        colorScheme: 'warning',
        className: 'border-[var(--warning)] text-[var(--warning)]',
      },
      {
        variant: 'outline',
        colorScheme: 'danger',
        className: 'border-[var(--danger)] text-[var(--danger)]',
      },
      {
        variant: 'outline',
        colorScheme: 'accent',
        className: 'border-[var(--accent)] text-[var(--accent)]',
      },
    ],
    defaultVariants: {
      variant: 'solid',
      colorScheme: 'primary',
      size: 'md',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Badge Types
 * ------------------------------------------------------------------------------------------------*/

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Badge content
   */
  children?: ReactNode;
  /**
   * Icon to show before the text
   */
  leftIcon?: ReactNode;
  /**
   * Icon to show after the text
   */
  rightIcon?: ReactNode;
}

/* -------------------------------------------------------------------------------------------------
 * Badge Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A badge component for labels, tags, and status indicators.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Badge>New</Badge>
 *
 * // With variants
 * <Badge variant="subtle" colorScheme="success">Active</Badge>
 *
 * // With icons
 * <Badge leftIcon={<CheckIcon />}>Completed</Badge>
 * ```
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (props, ref) => {
    const {
      className,
      children,
      variant,
      colorScheme,
      size,
      leftIcon,
      rightIcon,
      ...restProps
    } = props;

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, colorScheme, size }), className)}
        {...restProps}
      >
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Badge, badgeVariants };
