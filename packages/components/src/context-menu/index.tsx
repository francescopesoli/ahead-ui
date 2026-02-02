'use client';

import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * ContextMenu Context
 * ------------------------------------------------------------------------------------------------*/

interface ContextMenuContextValue {
  isOpen: boolean;
  position: { x: number; y: number };
  close: () => void;
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null);

const useContextMenuContext = () => {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error('ContextMenu components must be used within a ContextMenu');
  }
  return context;
};

/* -------------------------------------------------------------------------------------------------
 * ContextMenu Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const contextMenuContentVariants = cva(
  [
    'z-50 min-w-[180px]',
    'rounded-[var(--radius-lg)]',
    'bg-[var(--bg)] border border-[var(--border)]',
    'shadow-lg',
    'py-1',
    'focus:outline-none',
  ]
);

const contextMenuItemVariants = cva(
  [
    'relative flex items-center gap-2 px-3 py-2',
    'text-sm text-[var(--fg)]',
    'cursor-pointer select-none outline-none',
    'transition-colors duration-fast',
  ],
  {
    variants: {
      variant: {
        default: 'hover:bg-[var(--bg-muted)] focus:bg-[var(--bg-muted)]',
        danger: 'text-[var(--danger)] hover:bg-[var(--danger)]/10 focus:bg-[var(--danger)]/10',
      },
      isDisabled: {
        true: 'opacity-50 pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * ContextMenu Types
 * ------------------------------------------------------------------------------------------------*/

export interface ContextMenuProps {
  /**
   * The trigger and menu content
   */
  children: ReactNode;
}

export interface ContextMenuTriggerProps extends HTMLAttributes<HTMLDivElement> {}

export interface ContextMenuContentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {}

export interface ContextMenuItemProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contextMenuItemVariants> {
  /**
   * Whether the item is disabled
   */
  isDisabled?: boolean;
  /**
   * Keyboard shortcut to display
   */
  shortcut?: string;
  /**
   * Icon to display before the label
   */
  icon?: ReactNode;
  /**
   * Close menu on click (default: true)
   */
  closeOnClick?: boolean;
}

export interface ContextMenuSeparatorProps extends HTMLAttributes<HTMLDivElement> {}

export interface ContextMenuSubProps {
  /**
   * Sub-menu trigger and content
   */
  children: ReactNode;
}

export interface ContextMenuSubTriggerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Icon to display before the label
   */
  icon?: ReactNode;
}

export interface ContextMenuSubContentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {}

export interface ContextMenuGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Group label
   */
  label?: string;
}

/* -------------------------------------------------------------------------------------------------
 * ContextMenu Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A context menu component that appears on right-click.
 *
 * Features:
 * - Right-click trigger
 * - Nested sub-menus
 * - Keyboard navigation
 * - Keyboard shortcuts display
 *
 * @example
 * ```tsx
 * <ContextMenu>
 *   <ContextMenuTrigger>
 *     <div className="w-full h-64 border rounded">
 *       Right click here
 *     </div>
 *   </ContextMenuTrigger>
 *   <ContextMenuContent>
 *     <ContextMenuItem onClick={() => console.log('Edit')}>
 *       Edit
 *     </ContextMenuItem>
 *     <ContextMenuItem shortcut="⌘C">Copy</ContextMenuItem>
 *     <ContextMenuSeparator />
 *     <ContextMenuItem variant="danger">Delete</ContextMenuItem>
 *   </ContextMenuContent>
 * </ContextMenu>
 * ```
 */
function ContextMenu(props: ContextMenuProps) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = () => close();
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, close]);

  return (
    <ContextMenuContext.Provider value={{ isOpen, position, close }}>
      <div onContextMenu={handleContextMenu}>{children}</div>
    </ContextMenuContext.Provider>
  );
}

ContextMenu.displayName = 'ContextMenu';

/* -------------------------------------------------------------------------------------------------
 * ContextMenuTrigger Component
 * ------------------------------------------------------------------------------------------------*/

const ContextMenuTrigger = forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  (props, ref) => {
    const { children, ...restProps } = props;

    return (
      <div ref={ref} {...restProps}>
        {children}
      </div>
    );
  }
);

ContextMenuTrigger.displayName = 'ContextMenuTrigger';

/* -------------------------------------------------------------------------------------------------
 * ContextMenuContent Component
 * ------------------------------------------------------------------------------------------------*/

const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>(
  (props, _ref) => {
    const { className, children, ...restProps } = props;
    const { isOpen, position } = useContextMenuContext();
    const contentRef = useRef<HTMLDivElement>(null);
    const [adjustedPosition, setAdjustedPosition] = useState(position);

    // Adjust position to keep menu in viewport
    useEffect(() => {
      if (!isOpen || !contentRef.current) {
        setAdjustedPosition(position);
        return;
      }

      const rect = contentRef.current.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      let x = position.x;
      let y = position.y;

      // Adjust horizontal position
      if (x + rect.width > viewport.width) {
        x = viewport.width - rect.width - 8;
      }

      // Adjust vertical position
      if (y + rect.height > viewport.height) {
        y = viewport.height - rect.height - 8;
      }

      setAdjustedPosition({ x, y });
    }, [isOpen, position]);

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            style={{
              position: 'fixed',
              top: adjustedPosition.y,
              left: adjustedPosition.x,
            }}
            className={cn(contextMenuContentVariants(), className)}
            role="menu"
            {...restProps}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

ContextMenuContent.displayName = 'ContextMenuContent';

/* -------------------------------------------------------------------------------------------------
 * ContextMenuItem Component
 * ------------------------------------------------------------------------------------------------*/

const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  (props, ref) => {
    const {
      className,
      children,
      variant,
      isDisabled,
      shortcut,
      icon,
      closeOnClick = true,
      onClick,
      ...restProps
    } = props;
    const { close } = useContextMenuContext();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled) return;
      onClick?.(e);
      if (closeOnClick) close();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
      }
    };

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={isDisabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(contextMenuItemVariants({ variant, isDisabled }), className)}
        aria-disabled={isDisabled}
        {...restProps}
      >
        {icon && <span className="w-4 h-4 text-[var(--fg-muted)]">{icon}</span>}
        <span className="flex-1">{children}</span>
        {shortcut && (
          <span className="ml-auto text-xs text-[var(--fg-muted)]">{shortcut}</span>
        )}
      </div>
    );
  }
);

ContextMenuItem.displayName = 'ContextMenuItem';

/* -------------------------------------------------------------------------------------------------
 * ContextMenuSeparator Component
 * ------------------------------------------------------------------------------------------------*/

const ContextMenuSeparator = forwardRef<HTMLDivElement, ContextMenuSeparatorProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <div
        ref={ref}
        role="separator"
        className={cn('h-px my-1 bg-[var(--border)]', className)}
        {...restProps}
      />
    );
  }
);

ContextMenuSeparator.displayName = 'ContextMenuSeparator';

/* -------------------------------------------------------------------------------------------------
 * ContextMenuGroup Component
 * ------------------------------------------------------------------------------------------------*/

const ContextMenuGroup = forwardRef<HTMLDivElement, ContextMenuGroupProps>(
  (props, ref) => {
    const { className, children, label, ...restProps } = props;

    return (
      <div ref={ref} role="group" className={className} {...restProps}>
        {label && (
          <div className="px-3 py-1.5 text-xs font-medium text-[var(--fg-muted)]">
            {label}
          </div>
        )}
        {children}
      </div>
    );
  }
);

ContextMenuGroup.displayName = 'ContextMenuGroup';

/* -------------------------------------------------------------------------------------------------
 * ContextMenuSub Component
 * ------------------------------------------------------------------------------------------------*/

interface ContextMenuSubContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ContextMenuSubContext = createContext<ContextMenuSubContextValue | null>(null);

function ContextMenuSub(props: ContextMenuSubProps) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ContextMenuSubContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      <div className="relative">{children}</div>
    </ContextMenuSubContext.Provider>
  );
}

ContextMenuSub.displayName = 'ContextMenuSub';

/* -------------------------------------------------------------------------------------------------
 * ContextMenuSubTrigger Component
 * ------------------------------------------------------------------------------------------------*/

const ContextMenuSubTrigger = forwardRef<HTMLDivElement, ContextMenuSubTriggerProps>(
  (props, ref) => {
    const { className, children, icon, ...restProps } = props;
    const context = useContext(ContextMenuSubContext);

    return (
      <div
        ref={ref}
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={context?.isOpen}
        onMouseEnter={context?.open}
        onMouseLeave={context?.close}
        className={cn(
          contextMenuItemVariants({ variant: 'default' }),
          className
        )}
        {...restProps}
      >
        {icon && <span className="w-4 h-4 text-[var(--fg-muted)]">{icon}</span>}
        <span className="flex-1">{children}</span>
        <svg
          className="h-4 w-4 text-[var(--fg-muted)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    );
  }
);

ContextMenuSubTrigger.displayName = 'ContextMenuSubTrigger';

/* -------------------------------------------------------------------------------------------------
 * ContextMenuSubContent Component
 * ------------------------------------------------------------------------------------------------*/

const ContextMenuSubContent = forwardRef<HTMLDivElement, ContextMenuSubContentProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;
    const context = useContext(ContextMenuSubContext);

    return (
      <AnimatePresence>
        {context?.isOpen && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.1 }}
            onMouseEnter={context.open}
            onMouseLeave={context.close}
            className={cn(
              contextMenuContentVariants(),
              'absolute left-full top-0 ml-1',
              className
            )}
            role="menu"
            {...restProps}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

ContextMenuSubContent.displayName = 'ContextMenuSubContent';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  contextMenuContentVariants,
  contextMenuItemVariants,
};
