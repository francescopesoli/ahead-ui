'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Divider Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const dividerVariants = cva(
  ['shrink-0 bg-[var(--border)]'],
  {
    variants: {
      orientation: {
        horizontal: 'h-px w-full',
        vertical: 'h-full w-px',
      },
      variant: {
        solid: '',
        dashed: 'bg-transparent border-dashed',
        dotted: 'bg-transparent border-dotted',
      },
    },
    compoundVariants: [
      { orientation: 'horizontal', variant: 'dashed', className: 'border-t border-[var(--border)]' },
      { orientation: 'horizontal', variant: 'dotted', className: 'border-t border-[var(--border)]' },
      { orientation: 'vertical', variant: 'dashed', className: 'border-l border-[var(--border)]' },
      { orientation: 'vertical', variant: 'dotted', className: 'border-l border-[var(--border)]' },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      variant: 'solid',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Divider Types
 * ------------------------------------------------------------------------------------------------*/

export interface DividerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  /**
   * Text or content to display in the divider
   */
  children?: React.ReactNode;
  /**
   * Position of the content
   */
  contentPosition?: 'start' | 'center' | 'end';
}

/* -------------------------------------------------------------------------------------------------
 * Divider Component
 * ------------------------------------------------------------------------------------------------*/

const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (props, ref) => {
    const {
      className,
      orientation = 'horizontal',
      variant,
      children,
      contentPosition = 'center',
      ...restProps
    } = props;

    // If no children, render simple divider
    if (!children) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation={orientation ?? 'horizontal'}
          className={cn(dividerVariants({ orientation, variant }), className)}
          {...restProps}
        />
      );
    }

    // With children, render divider with content (only horizontal supported)
    if (orientation === 'vertical') {
      console.warn('Divider with content only supports horizontal orientation');
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn(
          'flex items-center',
          contentPosition === 'start' && 'justify-start',
          contentPosition === 'center' && 'justify-center',
          contentPosition === 'end' && 'justify-end',
          className
        )}
        {...restProps}
      >
        <div
          className={cn(
            'h-px bg-[var(--border)]',
            contentPosition === 'start' && 'w-4',
            contentPosition === 'center' && 'flex-1',
            contentPosition === 'end' && 'flex-1'
          )}
        />
        <span className="px-3 text-sm text-[var(--fg-muted)]">{children}</span>
        <div
          className={cn(
            'h-px bg-[var(--border)]',
            contentPosition === 'start' && 'flex-1',
            contentPosition === 'center' && 'flex-1',
            contentPosition === 'end' && 'w-4'
          )}
        />
      </div>
    );
  }
);

Divider.displayName = 'Divider';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Divider, dividerVariants };
