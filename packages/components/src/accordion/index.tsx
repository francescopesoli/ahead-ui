'use client';

import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useId,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Accordion Context
 * ------------------------------------------------------------------------------------------------*/

interface AccordionContextValue {
  expandedItems: string[];
  toggleItem: (value: string) => void;
  allowMultiple: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }
  return context;
};

interface AccordionItemContextValue {
  value: string;
  isExpanded: boolean;
  isDisabled?: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('AccordionTrigger/AccordionContent must be used within an AccordionItem');
  }
  return context;
};

/* -------------------------------------------------------------------------------------------------
 * Accordion Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const accordionVariants = cva(
  ['divide-y divide-[var(--border)]'],
  {
    variants: {
      variant: {
        default: '',
        bordered: 'border border-[var(--border)] rounded-[var(--radius-lg)]',
        separated: 'space-y-2 divide-y-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const accordionItemVariants = cva(
  [''],
  {
    variants: {
      variant: {
        default: '',
        bordered: 'first:rounded-t-[var(--radius-lg)] last:rounded-b-[var(--radius-lg)]',
        separated: 'border border-[var(--border)] rounded-[var(--radius-lg)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Accordion Types
 * ------------------------------------------------------------------------------------------------*/

export interface AccordionProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  /**
   * Allow multiple items to be expanded at once
   */
  allowMultiple?: boolean;
  /**
   * Default expanded items
   */
  defaultExpandedItems?: string[];
  /**
   * Controlled expanded items
   */
  expandedItems?: string[];
  /**
   * Callback when expanded items change
   */
  onExpandedItemsChange?: (items: string[]) => void;
}

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Unique value for the item
   */
  value: string;
  /**
   * Whether the item is disabled
   */
  isDisabled?: boolean;
}

export interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Icon to show on the left
   */
  icon?: ReactNode;
}

export interface AccordionContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {}

/* -------------------------------------------------------------------------------------------------
 * Accordion Component
 * ------------------------------------------------------------------------------------------------*/

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    const {
      className,
      variant,
      allowMultiple = false,
      defaultExpandedItems = [],
      expandedItems: controlledExpandedItems,
      onExpandedItemsChange,
      children,
      ...restProps
    } = props;

    const [internalExpandedItems, setInternalExpandedItems] = useState<string[]>(defaultExpandedItems);
    const expandedItems = controlledExpandedItems ?? internalExpandedItems;

    const toggleItem = (value: string) => {
      let newItems: string[];

      if (expandedItems.includes(value)) {
        newItems = expandedItems.filter((item) => item !== value);
      } else {
        newItems = allowMultiple ? [...expandedItems, value] : [value];
      }

      if (controlledExpandedItems === undefined) {
        setInternalExpandedItems(newItems);
      }
      onExpandedItemsChange?.(newItems);
    };

    return (
      <AccordionContext.Provider value={{ expandedItems, toggleItem, allowMultiple }}>
        <div
          ref={ref}
          className={cn(accordionVariants({ variant }), className)}
          {...restProps}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = 'Accordion';

/* -------------------------------------------------------------------------------------------------
 * AccordionItem Component
 * ------------------------------------------------------------------------------------------------*/

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  (props, ref) => {
    const { className, value, isDisabled, children, ...restProps } = props;
    const { expandedItems } = useAccordionContext();
    const isExpanded = expandedItems.includes(value);

    return (
      <AccordionItemContext.Provider value={{ value, isExpanded, isDisabled }}>
        <div
          ref={ref}
          data-state={isExpanded ? 'open' : 'closed'}
          data-disabled={isDisabled || undefined}
          className={cn(accordionItemVariants({ variant: 'default' }), className)}
          {...restProps}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';

/* -------------------------------------------------------------------------------------------------
 * AccordionTrigger Component
 * ------------------------------------------------------------------------------------------------*/

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  (props, ref) => {
    const { className, icon, children, ...restProps } = props;
    const { toggleItem } = useAccordionContext();
    const { value, isExpanded, isDisabled } = useAccordionItemContext();
    const contentId = useId();

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={isExpanded}
        aria-controls={contentId}
        disabled={isDisabled}
        onClick={() => toggleItem(value)}
        className={cn(
          'flex w-full items-center justify-between gap-4 py-4 px-4',
          'text-left font-medium text-[var(--fg)]',
          'transition-colors duration-fast',
          'hover:bg-[var(--bg-muted)]',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-inset',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...restProps}
      >
        <span className="flex items-center gap-3">
          {icon && <span className="shrink-0">{icon}</span>}
          {children}
        </span>
        <motion.svg
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="h-4 w-4 shrink-0 text-[var(--fg-muted)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>
    );
  }
);

AccordionTrigger.displayName = 'AccordionTrigger';

/* -------------------------------------------------------------------------------------------------
 * AccordionContent Component
 * ------------------------------------------------------------------------------------------------*/

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  (props, ref) => {
    const {
      className,
      children,
      id,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
    } = props;
    const { isExpanded } = useAccordionItemContext();

    return (
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            ref={ref}
            id={id}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className={cn('px-4 pb-4 pt-0 text-[var(--fg-muted)]', className)}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

AccordionContent.displayName = 'AccordionContent';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, accordionVariants };
