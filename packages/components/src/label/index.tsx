'use client';

import { forwardRef, type LabelHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Label Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const labelVariants = cva(
  [
    'font-medium leading-none',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  ],
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
 * Label Types
 * ------------------------------------------------------------------------------------------------*/

export interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  /**
   * Whether the associated field is required
   */
  required?: boolean;
  /**
   * Custom required indicator
   */
  requiredIndicator?: ReactNode;
  /**
   * Whether the label is disabled
   */
  isDisabled?: boolean;
}

/* -------------------------------------------------------------------------------------------------
 * Label Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A label component for form fields with optional required indicator.
 *
 * Features:
 * - Accessible label element
 * - Required indicator support
 * - Size variants
 * - Disabled state styling
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Label htmlFor="email">Email address</Label>
 * <Input id="email" />
 *
 * // Required field
 * <Label htmlFor="name" required>Full name</Label>
 *
 * // Custom required indicator
 * <Label htmlFor="phone" required requiredIndicator=" (required)">
 *   Phone number
 * </Label>
 *
 * // Sizes
 * <Label size="sm">Small label</Label>
 * <Label size="lg">Large label</Label>
 * ```
 */
const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (props, ref) => {
    const {
      className,
      children,
      size,
      required,
      requiredIndicator = <span className="text-[var(--danger)] ml-0.5">*</span>,
      isDisabled,
      ...restProps
    } = props;

    return (
      <label
        ref={ref}
        className={cn(
          labelVariants({ size }),
          isDisabled && 'cursor-not-allowed opacity-70',
          'text-[var(--fg)]',
          className
        )}
        {...restProps}
      >
        {children}
        {required && requiredIndicator}
      </label>
    );
  }
);

Label.displayName = 'Label';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Label, labelVariants };
