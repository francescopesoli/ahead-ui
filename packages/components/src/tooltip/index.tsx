'use client';

import {
  forwardRef,
  useState,
  useRef,
  cloneElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from 'react';
import { useTooltipTrigger, useTooltip } from '@react-aria/tooltip';
import { useTooltipTriggerState } from '@react-stately/tooltip';
import { mergeProps } from '@react-aria/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Tooltip Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const tooltipVariants = cva(
  // Base styles
  [
    'z-[var(--z-tooltip)] px-3 py-1.5',
    'text-sm font-medium',
    'rounded-[var(--radius-DEFAULT)]',
    'shadow-lg',
    'max-w-xs',
  ],
  {
    variants: {
      variant: {
        dark: 'bg-[var(--fg)] text-[var(--bg)]',
        light: 'bg-[var(--bg)] text-[var(--fg)] border border-[var(--border)]',
      },
    },
    defaultVariants: {
      variant: 'dark',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Tooltip Types
 * ------------------------------------------------------------------------------------------------*/

export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  /**
   * Trigger element (must be a single React element that accepts ref)
   */
  children: ReactElement;
  /**
   * Tooltip content
   */
  content: ReactNode;
  /**
   * Placement of the tooltip
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Delay before showing tooltip (ms)
   */
  delay?: number;
  /**
   * Delay before hiding tooltip (ms)
   */
  closeDelay?: number;
  /**
   * Whether the tooltip is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether the tooltip is open (controlled)
   */
  isOpen?: boolean;
  /**
   * Default open state (uncontrolled)
   */
  defaultOpen?: boolean;
  /**
   * Callback when open state changes
   */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * Whether to show arrow
   */
  showArrow?: boolean;
  /**
   * Offset from trigger (px)
   */
  offset?: number;
}

/* -------------------------------------------------------------------------------------------------
 * Tooltip Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A tooltip component for displaying additional information on hover.
 *
 * Features:
 * - Keyboard accessible (shows on focus)
 * - Customizable delay
 * - Multiple placements
 * - Animated with Framer Motion
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Tooltip content="This is a tooltip">
 *   <Button>Hover me</Button>
 * </Tooltip>
 *
 * // With placement
 * <Tooltip content="Bottom tooltip" placement="bottom">
 *   <Button>Bottom</Button>
 * </Tooltip>
 *
 * // With custom delay
 * <Tooltip content="Slow tooltip" delay={500}>
 *   <Button>Hover for 500ms</Button>
 * </Tooltip>
 * ```
 */
const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (props, _ref) => {
    const {
      children,
      content,
      variant,
      placement = 'top',
      delay = 200,
      closeDelay = 0,
      isDisabled,
      isOpen: isOpenProp,
      defaultOpen,
      onOpenChange,
      showArrow = false,
      offset = 8,
    } = props;

    const triggerRef = useRef<HTMLElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // React Aria tooltip state
    const state = useTooltipTriggerState({
      isOpen: isOpenProp,
      defaultOpen,
      onOpenChange,
      delay,
      closeDelay,
      isDisabled,
    });

    // React Aria tooltip trigger
    const { triggerProps, tooltipProps: ariaTooltipProps } = useTooltipTrigger(
      { isDisabled },
      state,
      triggerRef
    );

    // React Aria tooltip - extract only ARIA props to avoid conflicts with Framer Motion
    const { tooltipProps: rawTooltipProps } = useTooltip(ariaTooltipProps, state);
    const tooltipAriaProps = {
      id: rawTooltipProps.id,
      role: rawTooltipProps.role,
    };

    // Calculate position when tooltip opens
    const updatePosition = () => {
      if (!triggerRef.current) return;

      const rect = triggerRef.current.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      let x = 0;
      let y = 0;

      switch (placement) {
        case 'top':
          x = rect.left + rect.width / 2 + scrollX;
          y = rect.top - offset + scrollY;
          break;
        case 'bottom':
          x = rect.left + rect.width / 2 + scrollX;
          y = rect.bottom + offset + scrollY;
          break;
        case 'left':
          x = rect.left - offset + scrollX;
          y = rect.top + rect.height / 2 + scrollY;
          break;
        case 'right':
          x = rect.right + offset + scrollX;
          y = rect.top + rect.height / 2 + scrollY;
          break;
      }

      setPosition({ x, y });
    };

    // Animation variants based on placement
    const animationVariants = {
      initial: {
        opacity: 0,
        scale: 0.95,
        ...(placement === 'top' && { y: 4 }),
        ...(placement === 'bottom' && { y: -4 }),
        ...(placement === 'left' && { x: 4 }),
        ...(placement === 'right' && { x: -4 }),
      },
      animate: {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.1 },
      },
    };

    // Transform origin based on placement
    const transformOrigin = {
      top: 'bottom center',
      bottom: 'top center',
      left: 'right center',
      right: 'left center',
    };

    // Position styles
    const positionStyles = {
      top: { left: position.x, top: position.y, transform: 'translate(-50%, -100%)' },
      bottom: { left: position.x, top: position.y, transform: 'translate(-50%, 0)' },
      left: { left: position.x, top: position.y, transform: 'translate(-100%, -50%)' },
      right: { left: position.x, top: position.y, transform: 'translate(0, -50%)' },
    };

    // Clone trigger with merged props
    const trigger = isValidElement(children)
      ? cloneElement(children, {
          ...mergeProps(triggerProps, children.props as Record<string, unknown>),
          ref: triggerRef,
          onMouseEnter: () => {
            updatePosition();
            (children.props as { onMouseEnter?: () => void })?.onMouseEnter?.();
          },
          onFocus: () => {
            updatePosition();
            (children.props as { onFocus?: () => void })?.onFocus?.();
          },
        } as Record<string, unknown>)
      : children;

    return (
      <>
        {trigger}
        <AnimatePresence>
          {state.isOpen && (
            <motion.div
              {...tooltipAriaProps}
              className={cn(tooltipVariants({ variant }))}
              style={{
                position: 'fixed',
                ...positionStyles[placement],
                transformOrigin: transformOrigin[placement],
              }}
              variants={animationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
            >
              {content}
              {showArrow && (
                <TooltipArrow placement={placement} variant={variant} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }
);

Tooltip.displayName = 'Tooltip';

/* -------------------------------------------------------------------------------------------------
 * Tooltip Arrow
 * ------------------------------------------------------------------------------------------------*/

interface TooltipArrowProps {
  placement: 'top' | 'bottom' | 'left' | 'right';
  variant?: 'dark' | 'light' | null;
}

function TooltipArrow({ placement, variant }: TooltipArrowProps) {
  const arrowStyles = {
    top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-current border-x-transparent border-b-transparent',
    bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-current border-x-transparent border-t-transparent',
    left: 'right-0 top-1/2 -translate-y-1/2 translate-x-full border-l-current border-y-transparent border-r-transparent',
    right: 'left-0 top-1/2 -translate-y-1/2 -translate-x-full border-r-current border-y-transparent border-l-transparent',
  };

  return (
    <span
      className={cn(
        'absolute w-0 h-0 border-4',
        variant === 'dark' ? 'text-[var(--fg)]' : 'text-[var(--bg)]',
        arrowStyles[placement]
      )}
    />
  );
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Tooltip, tooltipVariants };
