'use client';

import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Tag Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const tagVariants = cva(
  // Base styles
  [
    'inline-flex items-center gap-1.5 font-medium',
    'rounded-full',
    'transition-colors duration-fast ease-out',
  ],
  {
    variants: {
      size: {
        sm: 'h-5 px-2 text-xs',
        md: 'h-6 px-2.5 text-sm',
        lg: 'h-7 px-3 text-sm',
      },
      variant: {
        solid: '',
        subtle: '',
        outline: 'border bg-transparent',
      },
      colorScheme: {
        default: '',
        primary: '',
        success: '',
        warning: '',
        danger: '',
        info: '',
      },
    },
    compoundVariants: [
      // Solid variants
      { variant: 'solid', colorScheme: 'default', className: 'bg-[var(--bg-muted)] text-[var(--fg)]' },
      { variant: 'solid', colorScheme: 'primary', className: 'bg-[var(--primary)] text-white' },
      { variant: 'solid', colorScheme: 'success', className: 'bg-[var(--success)] text-white' },
      { variant: 'solid', colorScheme: 'warning', className: 'bg-[var(--warning)] text-black' },
      { variant: 'solid', colorScheme: 'danger', className: 'bg-[var(--danger)] text-white' },
      { variant: 'solid', colorScheme: 'info', className: 'bg-[var(--info)] text-white' },
      // Subtle variants
      { variant: 'subtle', colorScheme: 'default', className: 'bg-[var(--bg-muted)] text-[var(--fg)]' },
      { variant: 'subtle', colorScheme: 'primary', className: 'bg-[var(--primary)]/10 text-[var(--primary)]' },
      { variant: 'subtle', colorScheme: 'success', className: 'bg-[var(--success)]/10 text-[var(--success)]' },
      { variant: 'subtle', colorScheme: 'warning', className: 'bg-[var(--warning)]/10 text-[var(--warning)]' },
      { variant: 'subtle', colorScheme: 'danger', className: 'bg-[var(--danger)]/10 text-[var(--danger)]' },
      { variant: 'subtle', colorScheme: 'info', className: 'bg-[var(--info)]/10 text-[var(--info)]' },
      // Outline variants
      { variant: 'outline', colorScheme: 'default', className: 'border-[var(--border)] text-[var(--fg)]' },
      { variant: 'outline', colorScheme: 'primary', className: 'border-[var(--primary)] text-[var(--primary)]' },
      { variant: 'outline', colorScheme: 'success', className: 'border-[var(--success)] text-[var(--success)]' },
      { variant: 'outline', colorScheme: 'warning', className: 'border-[var(--warning)] text-[var(--warning)]' },
      { variant: 'outline', colorScheme: 'danger', className: 'border-[var(--danger)] text-[var(--danger)]' },
      { variant: 'outline', colorScheme: 'info', className: 'border-[var(--info)] text-[var(--info)]' },
    ],
    defaultVariants: {
      size: 'md',
      variant: 'subtle',
      colorScheme: 'default',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Tag Types
 * ------------------------------------------------------------------------------------------------*/

export interface TagProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  /**
   * Icon to display before the label
   */
  startIcon?: ReactNode;
  /**
   * Icon to display after the label
   */
  endIcon?: ReactNode;
  /**
   * Whether the tag is removable
   */
  isRemovable?: boolean;
  /**
   * Callback when remove button is clicked
   */
  onRemove?: () => void;
  /**
   * Whether to animate on mount/unmount
   */
  animated?: boolean;
}

/* -------------------------------------------------------------------------------------------------
 * Tag Component
 * ------------------------------------------------------------------------------------------------*/

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (props, ref) => {
    const {
      className,
      size,
      variant,
      colorScheme,
      children,
      startIcon,
      endIcon,
      isRemovable,
      onRemove,
      animated = false,
      ...restProps
    } = props;

    const content = (
      <span
        ref={ref}
        className={cn(tagVariants({ size, variant, colorScheme }), className)}
        {...restProps}
      >
        {startIcon && <span className="shrink-0">{startIcon}</span>}
        <span>{children}</span>
        {endIcon && !isRemovable && <span className="shrink-0">{endIcon}</span>}
        {isRemovable && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            className={cn(
              'shrink-0 rounded-full p-0.5 -mr-1',
              'hover:bg-black/10 dark:hover:bg-white/10',
              'focus:outline-none focus:ring-1 focus:ring-current',
              'transition-colors duration-fast'
            )}
            aria-label="Remove"
          >
            <svg
              className={cn(
                size === 'sm' && 'h-3 w-3',
                size === 'md' && 'h-3.5 w-3.5',
                size === 'lg' && 'h-4 w-4'
              )}
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
      </span>
    );

    if (animated) {
      return (
        <AnimatePresence>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            {content}
          </motion.span>
        </AnimatePresence>
      );
    }

    return content;
  }
);

Tag.displayName = 'Tag';

/* -------------------------------------------------------------------------------------------------
 * TagGroup Component
 * ------------------------------------------------------------------------------------------------*/

export interface TagGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Spacing between tags
   */
  spacing?: 'sm' | 'md' | 'lg';
}

const TagGroup = forwardRef<HTMLDivElement, TagGroupProps>(
  (props, ref) => {
    const { className, spacing = 'md', children, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-wrap',
          spacing === 'sm' && 'gap-1',
          spacing === 'md' && 'gap-2',
          spacing === 'lg' && 'gap-3',
          className
        )}
        role="group"
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

TagGroup.displayName = 'TagGroup';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Tag, TagGroup, tagVariants };
