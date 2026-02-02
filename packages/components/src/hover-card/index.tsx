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
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * HoverCard Context
 * ------------------------------------------------------------------------------------------------*/

interface HoverCardContextValue {
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLElement>;
  placement: 'top' | 'bottom' | 'left' | 'right';
  openDelay: number;
  closeDelay: number;
  handleOpen: () => void;
  handleClose: () => void;
}

const HoverCardContext = createContext<HoverCardContextValue | null>(null);

const useHoverCardContext = () => {
  const context = useContext(HoverCardContext);
  if (!context) {
    throw new Error('HoverCard components must be used within a HoverCard');
  }
  return context;
};

/* -------------------------------------------------------------------------------------------------
 * HoverCard Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const hoverCardContentVariants = cva(
  [
    'z-50 rounded-[var(--radius-lg)]',
    'bg-[var(--bg)] border border-[var(--border)]',
    'shadow-lg',
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
 * HoverCard Types
 * ------------------------------------------------------------------------------------------------*/

export interface HoverCardProps {
  /**
   * The trigger and content elements
   */
  children: ReactNode;
  /**
   * Placement of the hover card
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Delay before opening (ms)
   */
  openDelay?: number;
  /**
   * Delay before closing (ms)
   */
  closeDelay?: number;
  /**
   * Whether the hover card is open (controlled)
   */
  isOpen?: boolean;
  /**
   * Callback when open state changes
   */
  onOpenChange?: (isOpen: boolean) => void;
}

export interface HoverCardTriggerProps {
  /**
   * The trigger element (must be a single React element)
   */
  children: ReactElement;
}

export interface HoverCardContentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'>,
    VariantProps<typeof hoverCardContentVariants> {}

/* -------------------------------------------------------------------------------------------------
 * HoverCard Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A hover card component for displaying preview content on hover.
 *
 * Features:
 * - Configurable open/close delays
 * - Multiple placement options
 * - Controlled and uncontrolled modes
 * - Stays open while hovering content
 *
 * @example
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger>
 *     <a href="/user/123">@username</a>
 *   </HoverCardTrigger>
 *   <HoverCardContent>
 *     <div className="flex gap-4">
 *       <Avatar src="/avatar.jpg" />
 *       <div>
 *         <h4>John Doe</h4>
 *         <p>Software Engineer</p>
 *       </div>
 *     </div>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 */
function HoverCard(props: HoverCardProps) {
  const {
    children,
    placement = 'bottom',
    openDelay = 400,
    closeDelay = 200,
    isOpen: controlledOpen,
    onOpenChange,
  } = props;

  const [internalOpen, setInternalOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isOpen = controlledOpen ?? internalOpen;

  const clearTimeouts = () => {
    if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };

  const handleOpen = () => {
    clearTimeouts();
    openTimeoutRef.current = setTimeout(() => {
      if (controlledOpen === undefined) {
        setInternalOpen(true);
      }
      onOpenChange?.(true);
    }, openDelay);
  };

  const handleClose = () => {
    clearTimeouts();
    closeTimeoutRef.current = setTimeout(() => {
      if (controlledOpen === undefined) {
        setInternalOpen(false);
      }
      onOpenChange?.(false);
    }, closeDelay);
  };

  useEffect(() => {
    return () => clearTimeouts();
  }, []);

  return (
    <HoverCardContext.Provider
      value={{
        isOpen,
        triggerRef,
        placement,
        openDelay,
        closeDelay,
        handleOpen,
        handleClose,
      }}
    >
      {children}
    </HoverCardContext.Provider>
  );
}

HoverCard.displayName = 'HoverCard';

/* -------------------------------------------------------------------------------------------------
 * HoverCardTrigger Component
 * ------------------------------------------------------------------------------------------------*/

const HoverCardTrigger = forwardRef<HTMLElement, HoverCardTriggerProps>(
  (props, _ref) => {
    const { children } = props;
    const { triggerRef, handleOpen, handleClose } = useHoverCardContext();

    if (!isValidElement(children)) {
      throw new Error('HoverCardTrigger expects a single React element as child');
    }

    return cloneElement(children, {
      ref: triggerRef,
      onMouseEnter: handleOpen,
      onMouseLeave: handleClose,
      onFocus: handleOpen,
      onBlur: handleClose,
    } as Record<string, unknown>);
  }
);

HoverCardTrigger.displayName = 'HoverCardTrigger';

/* -------------------------------------------------------------------------------------------------
 * HoverCardContent Component
 * ------------------------------------------------------------------------------------------------*/

const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>(
  (props, ref) => {
    const { className, children, size, ...restProps } = props;
    const { isOpen, triggerRef, placement, handleOpen, handleClose } = useHoverCardContext();
    const [position, setPosition] = useState({ top: 0, left: 0 });

    // Calculate position
    useEffect(() => {
      if (!isOpen || !triggerRef.current) return;

      const trigger = triggerRef.current;
      const rect = trigger.getBoundingClientRect();
      const offset = 8;

      let top = 0;
      let left = 0;

      switch (placement) {
        case 'top':
          top = rect.top - offset;
          left = rect.left + rect.width / 2;
          break;
        case 'bottom':
          top = rect.bottom + offset;
          left = rect.left + rect.width / 2;
          break;
        case 'left':
          top = rect.top + rect.height / 2;
          left = rect.left - offset;
          break;
        case 'right':
          top = rect.top + rect.height / 2;
          left = rect.right + offset;
          break;
      }

      setPosition({ top, left });
    }, [isOpen, triggerRef, placement]);

    const getTransform = () => {
      switch (placement) {
        case 'top':
          return 'translate(-50%, -100%)';
        case 'bottom':
          return 'translate(-50%, 0)';
        case 'left':
          return 'translate(-100%, -50%)';
        case 'right':
          return 'translate(0, -50%)';
        default:
          return 'translate(-50%, 0)';
      }
    };

    const getAnimationOrigin = () => {
      switch (placement) {
        case 'top':
          return { y: 8 };
        case 'bottom':
          return { y: -8 };
        case 'left':
          return { x: 8 };
        case 'right':
          return { x: -8 };
        default:
          return { y: -8 };
      }
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95, ...getAnimationOrigin() }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, ...getAnimationOrigin() }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
              transform: getTransform(),
            }}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            className={cn(hoverCardContentVariants({ size }), className)}
            {...restProps}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

HoverCardContent.displayName = 'HoverCardContent';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { HoverCard, HoverCardTrigger, HoverCardContent, hoverCardContentVariants };
