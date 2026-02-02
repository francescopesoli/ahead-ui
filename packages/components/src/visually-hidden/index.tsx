'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { VisuallyHidden as AriaVisuallyHidden } from '@react-aria/visually-hidden';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * VisuallyHidden Types
 * ------------------------------------------------------------------------------------------------*/

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * The content to be visually hidden but accessible to screen readers
   */
  children: ReactNode;
  /**
   * Whether the element should become visible when focused
   */
  isFocusable?: boolean;
}

/* -------------------------------------------------------------------------------------------------
 * VisuallyHidden Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A component that hides content visually while keeping it accessible to screen readers.
 *
 * Features:
 * - Content is not visible but readable by assistive technologies
 * - Optional focusable mode for skip links and similar patterns
 * - Zero visual footprint
 *
 * @example
 * ```tsx
 * // Basic usage - hidden label
 * <VisuallyHidden>Close modal</VisuallyHidden>
 *
 * // Focusable skip link
 * <VisuallyHidden isFocusable>
 *   <a href="#main">Skip to main content</a>
 * </VisuallyHidden>
 * ```
 */
const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  (props, ref) => {
    const { children, className, isFocusable, ...restProps } = props;

    if (isFocusable) {
      return (
        <span
          ref={ref}
          className={cn(
            'absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0',
            '[clip:rect(0,0,0,0)]',
            'focus:static focus:m-0 focus:h-auto focus:w-auto focus:overflow-visible focus:whitespace-normal focus:[clip:auto]',
            className
          )}
          {...restProps}
        >
          {children}
        </span>
      );
    }

    return (
      <AriaVisuallyHidden>
        <span ref={ref} className={className} {...restProps}>
          {children}
        </span>
      </AriaVisuallyHidden>
    );
  }
);

VisuallyHidden.displayName = 'VisuallyHidden';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { VisuallyHidden };
