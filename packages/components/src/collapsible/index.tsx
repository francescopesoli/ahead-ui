'use client';

import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useId,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Collapsible Context
 * ------------------------------------------------------------------------------------------------*/

interface CollapsibleContextValue {
  isOpen: boolean;
  toggle: () => void;
  contentId: string;
  triggerId: string;
  disabled?: boolean;
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

const useCollapsibleContext = () => {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error('CollapsibleTrigger/CollapsibleContent must be used within a Collapsible');
  }
  return context;
};

/* -------------------------------------------------------------------------------------------------
 * Collapsible Types
 * ------------------------------------------------------------------------------------------------*/

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the collapsible is open (controlled)
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
   * Whether the collapsible is disabled
   */
  disabled?: boolean;
}

export interface CollapsibleTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Render as child element (for custom triggers)
   */
  asChild?: boolean;
}

export interface CollapsibleContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  /**
   * Force mount the content (useful for SEO or animations)
   */
  forceMount?: boolean;
}

/* -------------------------------------------------------------------------------------------------
 * Collapsible Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A collapsible container that can show/hide content.
 *
 * Features:
 * - Controlled and uncontrolled modes
 * - Animated height transitions
 * - Accessible with proper ARIA attributes
 *
 * @example
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>Toggle Content</CollapsibleTrigger>
 *   <CollapsibleContent>
 *     <p>This content can be collapsed.</p>
 *   </CollapsibleContent>
 * </Collapsible>
 *
 * // Controlled
 * <Collapsible isOpen={isOpen} onOpenChange={setIsOpen}>
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>Content</CollapsibleContent>
 * </Collapsible>
 * ```
 */
const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  (props, ref) => {
    const {
      className,
      children,
      isOpen: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      disabled,
      ...restProps
    } = props;

    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = controlledOpen ?? internalOpen;

    const contentId = useId();
    const triggerId = useId();

    const toggle = () => {
      if (disabled) return;
      const newOpen = !isOpen;
      if (controlledOpen === undefined) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    };

    return (
      <CollapsibleContext.Provider
        value={{ isOpen, toggle, contentId, triggerId, disabled }}
      >
        <div
          ref={ref}
          data-state={isOpen ? 'open' : 'closed'}
          data-disabled={disabled || undefined}
          className={cn(className)}
          {...restProps}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  }
);

Collapsible.displayName = 'Collapsible';

/* -------------------------------------------------------------------------------------------------
 * CollapsibleTrigger Component
 * ------------------------------------------------------------------------------------------------*/

const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  (props, ref) => {
    const { className, children, disabled: triggerDisabled, ...restProps } = props;
    const { isOpen, toggle, contentId, triggerId, disabled } = useCollapsibleContext();

    const isDisabled = disabled || triggerDisabled;

    return (
      <button
        ref={ref}
        type="button"
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        disabled={isDisabled}
        onClick={toggle}
        className={cn(
          'flex items-center',
          isDisabled && 'cursor-not-allowed opacity-50',
          className
        )}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);

CollapsibleTrigger.displayName = 'CollapsibleTrigger';

/* -------------------------------------------------------------------------------------------------
 * CollapsibleContent Component
 * ------------------------------------------------------------------------------------------------*/

const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  (props, ref) => {
    const { className, children, forceMount, ...restProps } = props;
    const { isOpen, contentId, triggerId } = useCollapsibleContext();

    const shouldRender = forceMount || isOpen;

    return (
      <AnimatePresence initial={false}>
        {shouldRender && (
          <motion.div
            ref={ref}
            id={contentId}
            role="region"
            aria-labelledby={triggerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className={cn('overflow-hidden', className)}
            {...restProps}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

CollapsibleContent.displayName = 'CollapsibleContent';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
