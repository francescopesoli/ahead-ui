'use client';

import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useId,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
} from 'react';
import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Tabs Context
 * ------------------------------------------------------------------------------------------------*/

interface TabsContextValue {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  variant: 'line' | 'enclosed' | 'soft-rounded' | 'solid-rounded';
  orientation: 'horizontal' | 'vertical';
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
};

/* -------------------------------------------------------------------------------------------------
 * Tabs Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const tabsListVariants = cva(
  ['flex'],
  {
    variants: {
      variant: {
        line: 'border-b border-[var(--border)]',
        enclosed: 'border-b border-[var(--border)]',
        'soft-rounded': 'gap-1 p-1 bg-[var(--bg-muted)] rounded-[var(--radius-lg)]',
        'solid-rounded': 'gap-1',
      },
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col border-b-0 border-r border-[var(--border)]',
      },
    },
    compoundVariants: [
      { variant: 'line', orientation: 'vertical', className: 'border-b-0 border-r' },
      { variant: 'enclosed', orientation: 'vertical', className: 'border-b-0 border-r' },
    ],
    defaultVariants: {
      variant: 'line',
      orientation: 'horizontal',
    },
  }
);

const tabTriggerVariants = cva(
  [
    'relative flex items-center justify-center gap-2 px-4 py-2',
    'text-sm font-medium',
    'transition-colors duration-fast ease-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        line: [
          'text-[var(--fg-muted)] -mb-px',
          'hover:text-[var(--fg)]',
          'data-[state=active]:text-[var(--primary)]',
        ],
        enclosed: [
          'text-[var(--fg-muted)] -mb-px rounded-t-[var(--radius-md)]',
          'hover:text-[var(--fg)]',
          'data-[state=active]:text-[var(--fg)] data-[state=active]:bg-[var(--bg)] data-[state=active]:border data-[state=active]:border-b-transparent data-[state=active]:border-[var(--border)]',
        ],
        'soft-rounded': [
          'text-[var(--fg-muted)] rounded-[var(--radius-md)]',
          'hover:text-[var(--fg)]',
          'data-[state=active]:text-[var(--fg)] data-[state=active]:bg-[var(--bg)] data-[state=active]:shadow-sm',
        ],
        'solid-rounded': [
          'text-[var(--fg-muted)] rounded-full',
          'hover:text-[var(--fg)] hover:bg-[var(--bg-muted)]',
          'data-[state=active]:text-white data-[state=active]:bg-[var(--primary)]',
        ],
      },
    },
    defaultVariants: {
      variant: 'line',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Tabs Types
 * ------------------------------------------------------------------------------------------------*/

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The controlled value of the selected tab
   */
  value?: string;
  /**
   * The default value of the selected tab
   */
  defaultValue?: string;
  /**
   * Callback when the selected tab changes
   */
  onValueChange?: (value: string) => void;
  /**
   * Visual variant of the tabs
   */
  variant?: 'line' | 'enclosed' | 'soft-rounded' | 'solid-rounded';
  /**
   * Orientation of the tabs
   */
  orientation?: 'horizontal' | 'vertical';
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}

export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Unique value for this tab
   */
  value: string;
  /**
   * Whether the tab is disabled
   */
  disabled?: boolean;
  /**
   * Icon to display before the label
   */
  icon?: ReactNode;
}

export interface TabsContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
  /**
   * Value that matches the trigger
   */
  value: string;
}

/* -------------------------------------------------------------------------------------------------
 * Tabs Component
 * ------------------------------------------------------------------------------------------------*/

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (props, ref) => {
    const {
      className,
      value,
      defaultValue = '',
      onValueChange,
      variant = 'line',
      orientation = 'horizontal',
      children,
      ...restProps
    } = props;

    const [internalValue, setInternalValue] = useState(defaultValue);
    const selectedValue = value ?? internalValue;
    const baseId = useId();

    const setSelectedValue = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <TabsContext.Provider value={{ selectedValue, setSelectedValue, variant, orientation, baseId }}>
        <div
          ref={ref}
          className={cn(
            'flex',
            orientation === 'horizontal' ? 'flex-col' : 'flex-row',
            className
          )}
          data-orientation={orientation}
          {...restProps}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

/* -------------------------------------------------------------------------------------------------
 * TabsList Component
 * ------------------------------------------------------------------------------------------------*/

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;
    const { variant, orientation } = useTabsContext();

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={orientation}
        className={cn(tabsListVariants({ variant, orientation }), className)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

TabsList.displayName = 'TabsList';

/* -------------------------------------------------------------------------------------------------
 * TabsTrigger Component
 * ------------------------------------------------------------------------------------------------*/

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  (props, ref) => {
    const { className, value, disabled, icon, children, ...restProps } = props;
    const { selectedValue, setSelectedValue, variant, baseId } = useTabsContext();

    const isSelected = selectedValue === value;

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      // Keyboard navigation is handled by the browser with proper role="tab"
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setSelectedValue(value);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={`${baseId}-trigger-${value}`}
        aria-controls={`${baseId}-content-${value}`}
        aria-selected={isSelected}
        data-state={isSelected ? 'active' : 'inactive'}
        disabled={disabled}
        tabIndex={isSelected ? 0 : -1}
        onClick={() => setSelectedValue(value)}
        onKeyDown={handleKeyDown}
        className={cn(tabTriggerVariants({ variant }), className)}
        {...restProps}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
        {variant === 'line' && isSelected && (
          <motion.div
            layoutId={`${baseId}-indicator`}
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)]"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
      </button>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

/* -------------------------------------------------------------------------------------------------
 * TabsContent Component
 * ------------------------------------------------------------------------------------------------*/

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  (props, ref) => {
    const {
      className,
      value,
      children,
      id: customId,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
    } = props;
    const { selectedValue, baseId } = useTabsContext();

    const isSelected = selectedValue === value;

    if (!isSelected) return null;

    return (
      <motion.div
        ref={ref}
        role="tabpanel"
        id={customId ?? `${baseId}-content-${value}`}
        aria-labelledby={`${baseId}-trigger-${value}`}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        tabIndex={0}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={cn('mt-4 focus:outline-none', className)}
      >
        {children}
      </motion.div>
    );
  }
);

TabsContent.displayName = 'TabsContent';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabTriggerVariants };
