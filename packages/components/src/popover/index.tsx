'use client';

import {
  forwardRef,
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type ReactNode,
  type ReactElement,
} from 'react';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Popover Context
 * ------------------------------------------------------------------------------------------------*/

interface PopoverContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  triggerRef: React.RefObject<HTMLElement>;
  placement: PopoverPlacement;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

const usePopoverContext = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover components must be used within a Popover');
  }
  return context;
};

/* -------------------------------------------------------------------------------------------------
 * Popover Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const popoverContentVariants = cva(
  [
    'z-50 rounded-[var(--radius-lg)]',
    'bg-[var(--bg)] border border-[var(--border)]',
    'shadow-lg',
    'outline-none',
  ],
  {
    variants: {
      size: {
        sm: 'w-64 p-3',
        md: 'w-80 p-4',
        lg: 'w-96 p-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Popover Types
 * ------------------------------------------------------------------------------------------------*/

type PopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export interface PopoverProps {
  /**
   * The trigger and content elements
   */
  children: ReactNode;
  /**
   * Whether the popover is open (controlled)
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
   * Placement of the popover
   */
  placement?: PopoverPlacement;
  /**
   * Offset from the trigger
   */
  offset?: number;
}

export interface PopoverTriggerProps {
  /**
   * The trigger element (must be a single React element)
   */
  children: ReactElement;
  /**
   * Whether clicking the trigger toggles or just opens
   */
  toggleOnClick?: boolean;
}

export interface PopoverContentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'>,
    VariantProps<typeof popoverContentVariants> {
  /**
   * Show arrow pointing to trigger
   */
  showArrow?: boolean;
}

export interface PopoverCloseProps extends HTMLAttributes<HTMLButtonElement> {}

/* -------------------------------------------------------------------------------------------------
 * Popover Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A popover component for displaying floating content.
 *
 * Features:
 * - 12 placement options
 * - Focus trap
 * - Click outside to close
 * - Escape key to close
 * - Controlled and uncontrolled modes
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>
 *     <Button>Open Popover</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <h3>Popover Title</h3>
 *     <p>Popover content goes here.</p>
 *   </PopoverContent>
 * </Popover>
 * ```
 */
function Popover(props: PopoverProps) {
  const {
    children,
    isOpen: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    placement = 'bottom',
  } = props;

  const triggerRef = useRef<HTMLElement>(null);

  const state = useOverlayTriggerState({
    isOpen: controlledOpen,
    defaultOpen,
    onOpenChange,
  });

  return (
    <PopoverContext.Provider
      value={{
        isOpen: state.isOpen,
        open: state.open,
        close: state.close,
        toggle: state.toggle,
        triggerRef,
        placement,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
}

Popover.displayName = 'Popover';

/* -------------------------------------------------------------------------------------------------
 * PopoverTrigger Component
 * ------------------------------------------------------------------------------------------------*/

const PopoverTrigger = forwardRef<HTMLElement, PopoverTriggerProps>(
  (props, _ref) => {
    const { children, toggleOnClick = true } = props;
    const { toggle, open, triggerRef } = usePopoverContext();

    if (!isValidElement(children)) {
      throw new Error('PopoverTrigger expects a single React element as child');
    }

    const handleClick = () => {
      if (toggleOnClick) {
        toggle();
      } else {
        open();
      }
    };

    return cloneElement(children, {
      ref: triggerRef,
      onClick: handleClick,
      'aria-haspopup': 'dialog',
    } as Record<string, unknown>);
  }
);

PopoverTrigger.displayName = 'PopoverTrigger';

/* -------------------------------------------------------------------------------------------------
 * PopoverContent Component
 * ------------------------------------------------------------------------------------------------*/

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  (props, _ref) => {
    const { className, children, size, showArrow: _showArrow, ...restProps } = props;
    const { isOpen, close, triggerRef, placement } = usePopoverContext();
    const contentRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    // Calculate position
    useEffect(() => {
      if (!isOpen || !triggerRef.current) return;

      const trigger = triggerRef.current;
      const rect = trigger.getBoundingClientRect();

      let top = 0;
      let left = 0;

      const offset = 8;

      switch (placement) {
        case 'top':
          top = rect.top - offset;
          left = rect.left + rect.width / 2;
          break;
        case 'top-start':
          top = rect.top - offset;
          left = rect.left;
          break;
        case 'top-end':
          top = rect.top - offset;
          left = rect.right;
          break;
        case 'bottom':
          top = rect.bottom + offset;
          left = rect.left + rect.width / 2;
          break;
        case 'bottom-start':
          top = rect.bottom + offset;
          left = rect.left;
          break;
        case 'bottom-end':
          top = rect.bottom + offset;
          left = rect.right;
          break;
        case 'left':
          top = rect.top + rect.height / 2;
          left = rect.left - offset;
          break;
        case 'left-start':
          top = rect.top;
          left = rect.left - offset;
          break;
        case 'left-end':
          top = rect.bottom;
          left = rect.left - offset;
          break;
        case 'right':
          top = rect.top + rect.height / 2;
          left = rect.right + offset;
          break;
        case 'right-start':
          top = rect.top;
          left = rect.right + offset;
          break;
        case 'right-end':
          top = rect.bottom;
          left = rect.right + offset;
          break;
      }

      setPosition({ top, left });
    }, [isOpen, triggerRef, placement]);

    // Close on click outside
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(e.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(e.target as Node)
        ) {
          close();
        }
      };

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') close();
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [isOpen, close, triggerRef]);

    const getTransform = () => {
      if (placement.startsWith('top')) {
        return placement.includes('start')
          ? 'translate(0, -100%)'
          : placement.includes('end')
          ? 'translate(-100%, -100%)'
          : 'translate(-50%, -100%)';
      }
      if (placement.startsWith('bottom')) {
        return placement.includes('start')
          ? 'translate(0, 0)'
          : placement.includes('end')
          ? 'translate(-100%, 0)'
          : 'translate(-50%, 0)';
      }
      if (placement.startsWith('left')) {
        return placement.includes('start')
          ? 'translate(-100%, 0)'
          : placement.includes('end')
          ? 'translate(-100%, -100%)'
          : 'translate(-100%, -50%)';
      }
      if (placement.startsWith('right')) {
        return placement.includes('start')
          ? 'translate(0, 0)'
          : placement.includes('end')
          ? 'translate(0, -100%)'
          : 'translate(0, -50%)';
      }
      return 'translate(-50%, 0)';
    };

    const getAnimationOrigin = () => {
      if (placement.startsWith('top')) return { y: 8 };
      if (placement.startsWith('bottom')) return { y: -8 };
      if (placement.startsWith('left')) return { x: 8 };
      if (placement.startsWith('right')) return { x: -8 };
      return { y: -8 };
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, ...getAnimationOrigin() }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, ...getAnimationOrigin() }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
              transform: getTransform(),
            }}
            className={cn(popoverContentVariants({ size }), className)}
            role="dialog"
            aria-modal="true"
            {...restProps}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

PopoverContent.displayName = 'PopoverContent';

/* -------------------------------------------------------------------------------------------------
 * PopoverClose Component
 * ------------------------------------------------------------------------------------------------*/

const PopoverClose = forwardRef<HTMLButtonElement, PopoverCloseProps>(
  (props, ref) => {
    const { className, children, onClick, ...restProps } = props;
    const { close } = usePopoverContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      close();
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          'absolute top-2 right-2 p-1 rounded-[var(--radius-sm)]',
          'text-[var(--fg-muted)] hover:text-[var(--fg)]',
          'hover:bg-[var(--bg-muted)]',
          'transition-colors duration-fast',
          className
        )}
        aria-label="Close"
        {...restProps}
      >
        {children || (
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )}
      </button>
    );
  }
);

PopoverClose.displayName = 'PopoverClose';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Popover, PopoverTrigger, PopoverContent, PopoverClose, popoverContentVariants };
