'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Kbd Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const kbdVariants = cva(
  [
    'inline-flex items-center justify-center gap-1',
    'font-mono font-medium',
    'rounded-[var(--radius-sm)]',
    'border border-[var(--border)]',
    'bg-[var(--bg-muted)]',
    'text-[var(--fg)]',
    'shadow-[0_2px_0_0_var(--border)]',
  ],
  {
    variants: {
      size: {
        sm: 'h-5 min-w-5 px-1 text-[10px]',
        md: 'h-6 min-w-6 px-1.5 text-xs',
        lg: 'h-7 min-w-7 px-2 text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Kbd Types
 * ------------------------------------------------------------------------------------------------*/

export interface KbdProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {
  /**
   * The keyboard key(s) to display
   */
  children?: ReactNode;
  /**
   * Shorthand for common modifier keys
   */
  keys?: Array<'cmd' | 'ctrl' | 'alt' | 'shift' | 'enter' | 'tab' | 'space' | 'esc' | 'up' | 'down' | 'left' | 'right'>;
}

/* -------------------------------------------------------------------------------------------------
 * Key Symbols
 * ------------------------------------------------------------------------------------------------*/

const keySymbols: Record<string, string> = {
  cmd: '⌘',
  ctrl: '⌃',
  alt: '⌥',
  shift: '⇧',
  enter: '↵',
  tab: '⇥',
  space: '␣',
  esc: '⎋',
  up: '↑',
  down: '↓',
  left: '←',
  right: '→',
};

/* -------------------------------------------------------------------------------------------------
 * Kbd Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A component for displaying keyboard keys and shortcuts.
 *
 * Features:
 * - Common modifier key symbols
 * - Size variants
 * - Keyboard-style visual appearance
 *
 * @example
 * ```tsx
 * // Single key
 * <Kbd>K</Kbd>
 *
 * // Key combination using keys prop
 * <Kbd keys={['cmd', 'shift']}>P</Kbd>
 *
 * // Multiple keys inline
 * <span>Press <Kbd>Cmd</Kbd> + <Kbd>K</Kbd> to search</span>
 *
 * // Different sizes
 * <Kbd size="sm">S</Kbd>
 * <Kbd size="lg">Enter</Kbd>
 * ```
 */
const Kbd = forwardRef<HTMLElement, KbdProps>(
  (props, ref) => {
    const { className, children, keys, size, ...restProps } = props;

    // Render key symbols
    const keyElements = keys?.map((key, index) => (
      <span key={index}>{keySymbols[key] || key}</span>
    ));

    return (
      <kbd
        ref={ref}
        className={cn(kbdVariants({ size }), className)}
        {...restProps}
      >
        {keyElements}
        {children}
      </kbd>
    );
  }
);

Kbd.displayName = 'Kbd';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Kbd, kbdVariants };
