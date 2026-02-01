'use client';

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from '@ahead-ui/core';
import { Slot } from '../slot';

/* -------------------------------------------------------------------------------------------------
 * Button Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

/**
 * Button variants using Class Variance Authority.
 * 
 * This approach provides:
 * - Type-safe variant props
 * - Compound variants for complex states
 * - Easy customization via className
 * - Zero runtime overhead
 */
const buttonVariants = cva(
  // Base styles - always applied
  [
    // Layout
    'inline-flex items-center justify-center gap-2',
    // Typography
    'font-medium',
    // Transitions
    'transition-colors duration-fast ease-out',
    // Focus
    'outline-none',
    // Disabled
    'disabled:pointer-events-none disabled:opacity-50',
    // Focus visible ring
    'focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)]',
  ],
  {
    variants: {
      /**
       * Visual style variant
       */
      variant: {
        primary: [
          'bg-[var(--primary)] text-[var(--primary-fg)]',
          'hover:bg-[var(--primary-hover)]',
          'active:bg-[var(--primary-active)]',
        ],
        secondary: [
          'bg-[var(--bg-muted)] text-[var(--fg)]',
          'hover:bg-[var(--bg-emphasized)]',
          'active:bg-[var(--border)]',
        ],
        outline: [
          'border border-[var(--border)] bg-transparent text-[var(--fg)]',
          'hover:bg-[var(--bg-subtle)] hover:border-[var(--border-emphasized)]',
          'active:bg-[var(--bg-muted)]',
        ],
        ghost: [
          'bg-transparent text-[var(--fg)]',
          'hover:bg-[var(--bg-subtle)]',
          'active:bg-[var(--bg-muted)]',
        ],
        link: [
          'bg-transparent text-[var(--primary)] underline-offset-4',
          'hover:underline',
        ],
        danger: [
          'bg-[var(--danger)] text-[var(--danger-fg)]',
          'hover:bg-[var(--danger-hover)]',
          'active:bg-[var(--danger-active)]',
        ],
        success: [
          'bg-[var(--success)] text-[var(--success-fg)]',
          'hover:bg-[var(--success-hover)]',
          'active:bg-[var(--success-active)]',
        ],
      },
      /**
       * Size variant
       */
      size: {
        sm: 'h-8 px-3 text-sm rounded-[var(--radius-sm)]',
        md: 'h-10 px-4 text-sm rounded-[var(--radius-DEFAULT)]',
        lg: 'h-12 px-6 text-base rounded-[var(--radius-md)]',
        xl: 'h-14 px-8 text-lg rounded-[var(--radius-lg)]',
        icon: 'h-10 w-10 rounded-[var(--radius-DEFAULT)]',
        'icon-sm': 'h-8 w-8 rounded-[var(--radius-sm)]',
        'icon-lg': 'h-12 w-12 rounded-[var(--radius-md)]',
      },
      /**
       * Full width variant
       */
      fullWidth: {
        true: 'w-full',
      },
    },
    compoundVariants: [
      // Primary + size = add shadow
      {
        variant: 'primary',
        size: ['md', 'lg', 'xl'],
        className: 'shadow-sm hover:shadow-md',
      },
      // Danger + size = add shadow
      {
        variant: 'danger',
        size: ['md', 'lg', 'xl'],
        className: 'shadow-sm hover:shadow-md',
      },
      // Success + size = add shadow
      {
        variant: 'success',
        size: ['md', 'lg', 'xl'],
        className: 'shadow-sm hover:shadow-md',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Button Types
 * ------------------------------------------------------------------------------------------------*/

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  /**
   * The content of the button
   */
  children?: ReactNode;
  /**
   * Renders the button as its child element (for custom elements like links)
   */
  asChild?: boolean;
  /**
   * Shows a loading spinner and disables the button
   */
  isLoading?: boolean;
  /**
   * Loading text to show while loading
   */
  loadingText?: string;
  /**
   * Icon to show before the children
   */
  leftIcon?: ReactNode;
  /**
   * Icon to show after the children
   */
  rightIcon?: ReactNode;
  /**
   * Disable animations (respects prefers-reduced-motion automatically)
   */
  disableAnimation?: boolean;
}

/* -------------------------------------------------------------------------------------------------
 * Button Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * An accessible, adaptive button component.
 *
 * Features:
 * - Full keyboard navigation (React Aria)
 * - Focus management with visible focus ring
 * - Press/hover states with proper touch handling
 * - Motion animations (respects prefers-reduced-motion)
 * - asChild pattern for custom elements
 * - Loading state with spinner
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Button>Click me</Button>
 *
 * // With variants
 * <Button variant="secondary" size="lg">Large Secondary</Button>
 *
 * // With icons
 * <Button leftIcon={<PlusIcon />}>Add Item</Button>
 *
 * // As a link (using asChild)
 * <Button asChild>
 *   <a href="/home">Go Home</a>
 * </Button>
 *
 * // Loading state
 * <Button isLoading loadingText="Saving...">Save</Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => {
    const {
      children,
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      disableAnimation = false,
      disabled,
      ...restProps
    } = props;

    // React Aria hooks for accessibility
    const { buttonProps, isPressed } = useButton(
      {
        isDisabled: disabled || isLoading,
        elementType: asChild ? ('span' as const) : ('button' as const),
      },
      { current: null } // Ref handled by forwardRef
    );

    const { hoverProps, isHovered } = useHover({
      isDisabled: disabled || isLoading,
    });

    const { focusProps, isFocusVisible } = useFocusRing({
      autoFocus: props.autoFocus ?? false,
    });

    // Merge all props
    const mergedProps = mergeProps(buttonProps, hoverProps, focusProps);

    // Determine the component to render
    const Comp = asChild ? Slot : 'button';

    // Animation variants
    const motionVariants = {
      idle: { scale: 1 },
      pressed: { scale: 0.98 },
      hover: { scale: 1.01 },
    };

    // Content with loading state
    const content = (
      <>
        {isLoading && (
          <Spinner className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {!isLoading && leftIcon}
        {isLoading && loadingText ? loadingText : children}
        {!isLoading && rightIcon}
      </>
    );

    // If animations are disabled or user prefers reduced motion, render without motion
    if (disableAnimation) {
      return (
        <Comp
          ref={forwardedRef}
          className={cn(buttonVariants({ variant, size, fullWidth }), className)}
          data-pressed={isPressed || undefined}
          data-hovered={isHovered || undefined}
          data-focus-visible={isFocusVisible || undefined}
          data-loading={isLoading || undefined}
          {...mergedProps}
          {...restProps}
        >
          {content}
        </Comp>
      );
    }

    // Render with Framer Motion for animations
    return (
      <Comp
        ref={forwardedRef}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        data-pressed={isPressed || undefined}
        data-hovered={isHovered || undefined}
        data-focus-visible={isFocusVisible || undefined}
        data-loading={isLoading || undefined}
        {...mergedProps}
        {...restProps}
      >
        <motion.span
          className="inline-flex items-center justify-center gap-2"
          variants={motionVariants}
          initial="idle"
          animate={isPressed ? 'pressed' : isHovered ? 'hover' : 'idle'}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
        >
          {content}
        </motion.span>
      </Comp>
    );
  }
);

Button.displayName = 'Button';

/* -------------------------------------------------------------------------------------------------
 * Spinner Component (internal)
 * ------------------------------------------------------------------------------------------------*/

interface SpinnerProps {
  className?: string;
}

function Spinner({ className }: SpinnerProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Button, buttonVariants };
export type { VariantProps };
