'use client';

import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
} from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Input Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const inputVariants = cva(
  // Base styles
  [
    'flex w-full bg-transparent text-[var(--fg)]',
    'placeholder:text-[var(--fg-subtle)]',
    'transition-colors duration-fast ease-out',
    'outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    // File input reset
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const inputWrapperVariants = cva(
  // Base styles
  [
    'flex items-center w-full',
    'border bg-[var(--bg)]',
    'transition-all duration-fast ease-out',
  ],
  {
    variants: {
      size: {
        sm: 'rounded-[var(--radius-sm)]',
        md: 'rounded-[var(--radius-DEFAULT)]',
        lg: 'rounded-[var(--radius-md)]',
      },
      variant: {
        default: [
          'border-[var(--border)]',
          'hover:border-[var(--border-emphasized)]',
          'focus-within:border-[var(--border-focus)] focus-within:ring-2 focus-within:ring-[var(--ring)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--ring-offset)]',
        ],
        filled: [
          'border-transparent bg-[var(--bg-muted)]',
          'hover:bg-[var(--bg-emphasized)]',
          'focus-within:border-[var(--border-focus)] focus-within:ring-2 focus-within:ring-[var(--ring)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--ring-offset)]',
        ],
        flushed: [
          'border-0 border-b rounded-none',
          'border-[var(--border)]',
          'hover:border-[var(--border-emphasized)]',
          'focus-within:border-[var(--border-focus)]',
        ],
        unstyled: 'border-0 bg-transparent',
      },
      isInvalid: {
        true: '',
      },
      isDisabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        isInvalid: true,
        className: 'border-[var(--danger)] focus-within:border-[var(--danger)] focus-within:ring-[var(--danger)]',
      },
      {
        variant: 'filled',
        isInvalid: true,
        className: 'border-[var(--danger)] focus-within:border-[var(--danger)] focus-within:ring-[var(--danger)]',
      },
      {
        variant: 'flushed',
        isInvalid: true,
        className: 'border-[var(--danger)] focus-within:border-[var(--danger)]',
      },
    ],
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Input Types
 * ------------------------------------------------------------------------------------------------*/

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /**
   * Visual style variant
   */
  variant?: 'default' | 'filled' | 'flushed' | 'unstyled';
  /**
   * Label for the input
   */
  label?: string;
  /**
   * Helper text below the input
   */
  helperText?: string;
  /**
   * Error message (also sets invalid state)
   */
  errorMessage?: string;
  /**
   * Whether the input is in an invalid state
   */
  isInvalid?: boolean;
  /**
   * Element to show on the left side of the input
   */
  leftElement?: ReactNode;
  /**
   * Element to show on the right side of the input
   */
  rightElement?: ReactNode;
  /**
   * Addon on the left (different from leftElement - has background)
   */
  leftAddon?: ReactNode;
  /**
   * Addon on the right (different from rightElement - has background)
   */
  rightAddon?: ReactNode;
  /**
   * Container className
   */
  containerClassName?: string;
  /**
   * Wrapper className (around input + elements)
   */
  wrapperClassName?: string;
}

/* -------------------------------------------------------------------------------------------------
 * Input Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * An accessible, adaptive input component.
 *
 * Features:
 * - Full keyboard navigation
 * - Focus management with visible focus ring
 * - Multiple variants (default, filled, flushed, unstyled)
 * - Left/right elements and addons
 * - Error and helper text support
 * - Labels with proper accessibility
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Input placeholder="Enter your name" />
 *
 * // With label
 * <Input label="Email" type="email" placeholder="you@example.com" />
 *
 * // With error
 * <Input 
 *   label="Password" 
 *   type="password" 
 *   isInvalid 
 *   errorMessage="Password must be at least 8 characters" 
 * />
 *
 * // With icons
 * <Input 
 *   leftElement={<SearchIcon className="h-4 w-4" />}
 *   placeholder="Search..."
 * />
 * ```
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, forwardedRef) => {
    const {
      className,
      containerClassName,
      wrapperClassName,
      size,
      variant = 'default',
      label,
      helperText,
      errorMessage,
      isInvalid: isInvalidProp,
      leftElement,
      rightElement,
      leftAddon,
      rightAddon,
      disabled,
      id: idProp,
      'aria-describedby': ariaDescribedBy,
      ...restProps
    } = props;

    // Generate unique IDs
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    // Determine invalid state
    const isInvalid = isInvalidProp || !!errorMessage;

    // React Aria hooks
    const { hoverProps, isHovered } = useHover({
      isDisabled: disabled,
    });

    const { focusProps, isFocusVisible } = useFocusRing({
      isTextInput: true,
    });

    // Merge props
    const mergedProps = mergeProps(hoverProps, focusProps);

    // Build aria-describedby
    const describedBy = [
      ariaDescribedBy,
      helperText && !isInvalid ? helperId : null,
      isInvalid && errorMessage ? errorId : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className={cn('flex flex-col gap-1.5', containerClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'text-sm font-medium text-[var(--fg)]',
              disabled && 'opacity-50'
            )}
          >
            {label}
          </label>
        )}

        {/* Input Group (addons + wrapper) */}
        <div className="flex">
          {/* Left Addon */}
          {leftAddon && (
            <div
              className={cn(
                'flex items-center justify-center px-3',
                'bg-[var(--bg-muted)] border border-r-0 border-[var(--border)]',
                'text-[var(--fg-muted)] text-sm',
                size === 'sm' && 'rounded-l-[var(--radius-sm)]',
                size === 'md' && 'rounded-l-[var(--radius-DEFAULT)]',
                size === 'lg' && 'rounded-l-[var(--radius-md)]'
              )}
            >
              {leftAddon}
            </div>
          )}

          {/* Input Wrapper */}
          <div
            className={cn(
              inputWrapperVariants({
                size,
                variant,
                isInvalid,
                isDisabled: disabled,
              }),
              leftAddon && 'rounded-l-none',
              rightAddon && 'rounded-r-none',
              wrapperClassName
            )}
            data-hovered={isHovered || undefined}
            data-focus-visible={isFocusVisible || undefined}
            data-invalid={isInvalid || undefined}
          >
            {/* Left Element */}
            {leftElement && (
              <span className="flex items-center pl-3 text-[var(--fg-muted)]">
                {leftElement}
              </span>
            )}

            {/* Input */}
            <input
              ref={forwardedRef}
              id={id}
              className={cn(inputVariants({ size }), className)}
              disabled={disabled}
              aria-invalid={isInvalid || undefined}
              aria-describedby={describedBy}
              {...mergedProps}
              {...restProps}
            />

            {/* Right Element */}
            {rightElement && (
              <span className="flex items-center pr-3 text-[var(--fg-muted)]">
                {rightElement}
              </span>
            )}
          </div>

          {/* Right Addon */}
          {rightAddon && (
            <div
              className={cn(
                'flex items-center justify-center px-3',
                'bg-[var(--bg-muted)] border border-l-0 border-[var(--border)]',
                'text-[var(--fg-muted)] text-sm',
                size === 'sm' && 'rounded-r-[var(--radius-sm)]',
                size === 'md' && 'rounded-r-[var(--radius-DEFAULT)]',
                size === 'lg' && 'rounded-r-[var(--radius-md)]'
              )}
            >
              {rightAddon}
            </div>
          )}
        </div>

        {/* Helper Text */}
        {helperText && !isInvalid && (
          <p
            id={helperId}
            className="text-sm text-[var(--fg-muted)]"
          >
            {helperText}
          </p>
        )}

        {/* Error Message */}
        {isInvalid && errorMessage && (
          <p
            id={errorId}
            className="text-sm text-[var(--danger)]"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Input, inputVariants, inputWrapperVariants };
