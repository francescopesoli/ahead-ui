'use client';

import {
  forwardRef,
  createContext,
  useContext,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Menu Context
 * ------------------------------------------------------------------------------------------------*/

interface MenuContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('Menu components must be used within a Menu');
  }
  return context;
};

/* -------------------------------------------------------------------------------------------------
 * Menu Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const menuContentVariants = cva(
  [
    'absolute z-50 min-w-[180px]',
    'overflow-hidden rounded-[var(--radius-lg)]',
    'border border-[var(--border)]',
    'bg-[var(--bg)] shadow-lg',
    'py-1',
  ]
);

const menuItemVariants = cva(
  [
    'relative flex cursor-pointer select-none items-center gap-2',
    'px-3 py-2 text-sm',
    'outline-none transition-colors duration-fast',
  ],
  {
    variants: {
      variant: {
        default: [
          'text-[var(--fg)]',
          'hover:bg-[var(--bg-muted)]',
          'focus:bg-[var(--bg-muted)]',
          'data-[highlighted]:bg-[var(--bg-muted)]',
        ],
        danger: [
          'text-[var(--danger)]',
          'hover:bg-[var(--danger)]/10',
          'focus:bg-[var(--danger)]/10',
          'data-[highlighted]:bg-[var(--danger)]/10',
        ],
      },
      isDisabled: {
        true: 'pointer-events-none opacity-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Menu Types
 * ------------------------------------------------------------------------------------------------*/

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Controlled open state
   */
  isOpen?: boolean;
  /**
   * Default open state
   */
  defaultOpen?: boolean;
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;
}

export interface MenuTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Whether the trigger is disabled
   */
  isDisabled?: boolean;
}

export interface MenuContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
  /**
   * Alignment of the menu
   */
  align?: 'start' | 'center' | 'end';
  /**
   * Side of the trigger to render
   */
  side?: 'top' | 'bottom' | 'left' | 'right';
}

export interface MenuItemProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof menuItemVariants> {
  /**
   * Icon to display
   */
  icon?: ReactNode;
  /**
   * Keyboard shortcut to display
   */
  shortcut?: string;
  /**
   * Whether the item is disabled
   */
  isDisabled?: boolean;
  /**
   * Callback when item is selected
   */
  onSelect?: () => void;
}

export interface MenuGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Label for the group
   */
  label?: string;
}

export interface MenuSeparatorProps extends HTMLAttributes<HTMLDivElement> {}

/* -------------------------------------------------------------------------------------------------
 * Menu Component
 * ------------------------------------------------------------------------------------------------*/

const Menu = forwardRef<HTMLDivElement, MenuProps>(
  (props, ref) => {
    const {
      className,
      isOpen: controlledIsOpen,
      defaultOpen = false,
      onOpenChange,
      children,
      ...restProps
    } = props;

    const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
    const [activeIndex, setActiveIndex] = useState(-1);

    const isOpen = controlledIsOpen ?? internalIsOpen;

    const setIsOpen = (open: boolean) => {
      if (controlledIsOpen === undefined) {
        setInternalIsOpen(open);
      }
      onOpenChange?.(open);
      if (!open) {
        setActiveIndex(-1);
      }
    };

    return (
      <MenuContext.Provider value={{ isOpen, setIsOpen, activeIndex, setActiveIndex }}>
        <div ref={ref} className={cn('relative inline-block', className)} {...restProps}>
          {children}
        </div>
      </MenuContext.Provider>
    );
  }
);

Menu.displayName = 'Menu';

/* -------------------------------------------------------------------------------------------------
 * MenuTrigger Component
 * ------------------------------------------------------------------------------------------------*/

const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(
  (props, ref) => {
    const { className, isDisabled, children, ...restProps } = props;
    const { isOpen, setIsOpen } = useMenuContext();

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'inline-flex items-center justify-center',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]',
          className
        )}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);

MenuTrigger.displayName = 'MenuTrigger';

/* -------------------------------------------------------------------------------------------------
 * MenuContent Component
 * ------------------------------------------------------------------------------------------------*/

const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  (props, ref) => {
    const {
      className,
      align = 'start',
      side = 'bottom',
      children,
      id,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
    } = props;
    const { isOpen, setIsOpen } = useMenuContext();

    const alignmentClasses = {
      start: 'left-0',
      center: 'left-1/2 -translate-x-1/2',
      end: 'right-0',
    };

    const sideClasses = {
      top: 'bottom-full mb-1',
      bottom: 'top-full mt-1',
      left: 'right-full mr-1',
      right: 'left-full ml-1',
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    // Close on click outside
    const handleClickOutside = () => {
      setIsOpen(false);
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for click outside */}
            <div
              className="fixed inset-0 z-40"
              onClick={handleClickOutside}
              aria-hidden="true"
            />
            <motion.div
              ref={ref}
              id={id}
              role="menu"
              aria-label={ariaLabel}
              aria-describedby={ariaDescribedBy}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              onKeyDown={handleKeyDown}
              className={cn(
                menuContentVariants(),
                alignmentClasses[align],
                sideClasses[side],
                className
              )}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
);

MenuContent.displayName = 'MenuContent';

/* -------------------------------------------------------------------------------------------------
 * MenuItem Component
 * ------------------------------------------------------------------------------------------------*/

const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  (props, ref) => {
    const {
      className,
      variant,
      icon,
      shortcut,
      isDisabled,
      onSelect,
      children,
      onClick,
      ...restProps
    } = props;

    const { setIsOpen } = useMenuContext();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled) return;
      onClick?.(e);
      onSelect?.();
      setIsOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (isDisabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect?.();
        setIsOpen(false);
      }
    };

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={isDisabled ? -1 : 0}
        aria-disabled={isDisabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(menuItemVariants({ variant, isDisabled }), className)}
        {...restProps}
      >
        {icon && <span className="shrink-0 text-[var(--fg-muted)]">{icon}</span>}
        <span className="flex-1">{children}</span>
        {shortcut && (
          <span className="ml-auto text-xs text-[var(--fg-muted)]">{shortcut}</span>
        )}
      </div>
    );
  }
);

MenuItem.displayName = 'MenuItem';

/* -------------------------------------------------------------------------------------------------
 * MenuGroup Component
 * ------------------------------------------------------------------------------------------------*/

const MenuGroup = forwardRef<HTMLDivElement, MenuGroupProps>(
  (props, ref) => {
    const { className, label, children, ...restProps } = props;

    return (
      <div ref={ref} role="group" className={className} {...restProps}>
        {label && (
          <div className="px-3 py-1.5 text-xs font-semibold text-[var(--fg-muted)]">
            {label}
          </div>
        )}
        {children}
      </div>
    );
  }
);

MenuGroup.displayName = 'MenuGroup';

/* -------------------------------------------------------------------------------------------------
 * MenuSeparator Component
 * ------------------------------------------------------------------------------------------------*/

const MenuSeparator = forwardRef<HTMLDivElement, MenuSeparatorProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <div
        ref={ref}
        role="separator"
        className={cn('my-1 h-px bg-[var(--border)]', className)}
        {...restProps}
      />
    );
  }
);

MenuSeparator.displayName = 'MenuSeparator';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuGroup,
  MenuSeparator,
  menuContentVariants,
  menuItemVariants,
};
