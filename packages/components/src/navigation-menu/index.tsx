'use client';

import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  type HTMLAttributes,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * NavigationMenu Context
 * ------------------------------------------------------------------------------------------------*/

interface NavigationMenuContextValue {
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
  orientation: 'horizontal' | 'vertical';
}

const NavigationMenuContext = createContext<NavigationMenuContextValue | null>(null);

const useNavigationMenuContext = () => {
  const context = useContext(NavigationMenuContext);
  if (!context) {
    throw new Error('NavigationMenu components must be used within a NavigationMenu');
  }
  return context;
};

/* -------------------------------------------------------------------------------------------------
 * NavigationMenu Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const navigationMenuVariants = cva(
  ['relative'],
  {
    variants: {
      orientation: {
        horizontal: 'flex items-center',
        vertical: 'flex flex-col',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

const navigationMenuListVariants = cva(
  ['flex list-none'],
  {
    variants: {
      orientation: {
        horizontal: 'flex-row items-center gap-1',
        vertical: 'flex-col gap-1',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

const navigationMenuTriggerVariants = cva(
  [
    'group inline-flex items-center justify-center gap-1.5 px-4 py-2',
    'text-sm font-medium',
    'rounded-[var(--radius-md)]',
    'transition-colors duration-fast',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2',
  ],
  {
    variants: {
      isActive: {
        true: 'bg-[var(--bg-muted)] text-[var(--fg)]',
        false: 'text-[var(--fg-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--fg)]',
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

const navigationMenuContentVariants = cva(
  [
    'absolute left-0 top-full mt-2',
    'w-full min-w-[300px]',
    'rounded-[var(--radius-lg)]',
    'bg-[var(--bg)] border border-[var(--border)]',
    'shadow-lg',
    'z-50',
  ]
);

const navigationMenuLinkVariants = cva(
  [
    'block px-4 py-2',
    'text-sm',
    'rounded-[var(--radius-md)]',
    'transition-colors duration-fast',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-inset',
  ],
  {
    variants: {
      isActive: {
        true: 'bg-[var(--primary)]/10 text-[var(--primary)]',
        false: 'text-[var(--fg)] hover:bg-[var(--bg-muted)]',
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * NavigationMenu Types
 * ------------------------------------------------------------------------------------------------*/

export interface NavigationMenuProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof navigationMenuVariants> {}

export interface NavigationMenuListProps extends HTMLAttributes<HTMLUListElement> {}

export interface NavigationMenuItemProps extends HTMLAttributes<HTMLLIElement> {
  /**
   * Unique value for the item
   */
  value?: string;
}

export interface NavigationMenuTriggerProps extends HTMLAttributes<HTMLButtonElement> {}

export interface NavigationMenuContentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {}

export interface NavigationMenuLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  /**
   * href for the link
   */
  href?: string;
  /**
   * Whether this link is currently active
   */
  isActive?: boolean;
}

export interface NavigationMenuIndicatorProps extends HTMLAttributes<HTMLDivElement> {}

/* -------------------------------------------------------------------------------------------------
 * NavigationMenu Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A navigation menu component with support for mega menus.
 *
 * Features:
 * - Horizontal and vertical orientations
 * - Hover or click triggers
 * - Active state indicators
 * - Mega menu content support
 *
 * @example
 * ```tsx
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem value="products">
 *       <NavigationMenuTrigger>Products</NavigationMenuTrigger>
 *       <NavigationMenuContent>
 *         <div className="grid grid-cols-2 gap-4 p-4">
 *           <NavigationMenuLink href="/products/a">Product A</NavigationMenuLink>
 *           <NavigationMenuLink href="/products/b">Product B</NavigationMenuLink>
 *         </div>
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *     <NavigationMenuItem>
 *       <NavigationMenuLink href="/about">About</NavigationMenuLink>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * ```
 */
const NavigationMenu = forwardRef<HTMLElement, NavigationMenuProps>(
  (props, ref) => {
    const { className, children, orientation = 'horizontal', ...restProps } = props;
    const [activeItem, setActiveItem] = useState<string | null>(null);

    return (
      <NavigationMenuContext.Provider value={{ activeItem, setActiveItem, orientation: orientation as 'horizontal' | 'vertical' }}>
        <nav
          ref={ref}
          className={cn(navigationMenuVariants({ orientation: orientation ?? 'horizontal' }), className)}
          {...restProps}
        >
          {children}
        </nav>
      </NavigationMenuContext.Provider>
    );
  }
);

NavigationMenu.displayName = 'NavigationMenu';

/* -------------------------------------------------------------------------------------------------
 * NavigationMenuList Component
 * ------------------------------------------------------------------------------------------------*/

const NavigationMenuList = forwardRef<HTMLUListElement, NavigationMenuListProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;
    const { orientation } = useNavigationMenuContext();

    return (
      <ul
        ref={ref}
        className={cn(navigationMenuListVariants({ orientation }), className)}
        {...restProps}
      >
        {children}
      </ul>
    );
  }
);

NavigationMenuList.displayName = 'NavigationMenuList';

/* -------------------------------------------------------------------------------------------------
 * NavigationMenuItem Component
 * ------------------------------------------------------------------------------------------------*/

interface NavigationMenuItemContextValue {
  value: string;
  isOpen: boolean;
}

const NavigationMenuItemContext = createContext<NavigationMenuItemContextValue | null>(null);

let itemIdCounter = 0;

const NavigationMenuItem = forwardRef<HTMLLIElement, NavigationMenuItemProps>(
  (props, ref) => {
    const { className, children, value: valueProp, ...restProps } = props;
    const { activeItem, setActiveItem } = useNavigationMenuContext();
    const valueRef = useRef(valueProp || `nav-item-${itemIdCounter++}`);
    const value = valueRef.current;
    const isOpen = activeItem === value;
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      setActiveItem(value);
    };

    const handleMouseLeave = () => {
      closeTimeoutRef.current = setTimeout(() => {
        setActiveItem(null);
      }, 150);
    };

    useEffect(() => {
      return () => {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
        }
      };
    }, []);

    return (
      <NavigationMenuItemContext.Provider value={{ value, isOpen }}>
        <li
          ref={ref}
          className={cn('relative', className)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...restProps}
        >
          {children}
        </li>
      </NavigationMenuItemContext.Provider>
    );
  }
);

NavigationMenuItem.displayName = 'NavigationMenuItem';

/* -------------------------------------------------------------------------------------------------
 * NavigationMenuTrigger Component
 * ------------------------------------------------------------------------------------------------*/

const NavigationMenuTrigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;
    const itemContext = useContext(NavigationMenuItemContext);
    const { setActiveItem } = useNavigationMenuContext();

    const handleClick = () => {
      if (itemContext) {
        setActiveItem(itemContext.isOpen ? null : itemContext.value);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={itemContext?.isOpen}
        onClick={handleClick}
        className={cn(
          navigationMenuTriggerVariants({ isActive: itemContext?.isOpen }),
          className
        )}
        {...restProps}
      >
        {children}
        <ChevronIcon isOpen={itemContext?.isOpen} />
      </button>
    );
  }
);

NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';

/* -------------------------------------------------------------------------------------------------
 * NavigationMenuContent Component
 * ------------------------------------------------------------------------------------------------*/

const NavigationMenuContent = forwardRef<HTMLDivElement, NavigationMenuContentProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;
    const itemContext = useContext(NavigationMenuItemContext);

    return (
      <AnimatePresence>
        {itemContext?.isOpen && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className={cn(navigationMenuContentVariants(), className)}
            {...restProps}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

NavigationMenuContent.displayName = 'NavigationMenuContent';

/* -------------------------------------------------------------------------------------------------
 * NavigationMenuLink Component
 * ------------------------------------------------------------------------------------------------*/

const NavigationMenuLink = forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  (props, ref) => {
    const { className, children, href, isActive, ...restProps } = props;

    return (
      <a
        ref={ref}
        href={href}
        className={cn(navigationMenuLinkVariants({ isActive }), className)}
        {...restProps}
      >
        {children}
      </a>
    );
  }
);

NavigationMenuLink.displayName = 'NavigationMenuLink';

/* -------------------------------------------------------------------------------------------------
 * NavigationMenuIndicator Component
 * ------------------------------------------------------------------------------------------------*/

const NavigationMenuIndicator = forwardRef<HTMLDivElement, NavigationMenuIndicatorProps>(
  (props, ref) => {
    const { className, ...restProps } = props;
    const { activeItem } = useNavigationMenuContext();

    if (!activeItem) return null;

    // Extract only the props that are safe to pass to motion.div
    const { onAnimationStart: _a, onDrag: _d, onDragStart: _ds, onDragEnd: _de, ...safeProps } = restProps as Record<string, unknown>;

    return (
      <motion.div
        ref={ref}
        layoutId="navigation-indicator"
        className={cn(
          'absolute bottom-0 h-0.5 bg-[var(--primary)]',
          className
        )}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        {...safeProps}
      />
    );
  }
);

NavigationMenuIndicator.displayName = 'NavigationMenuIndicator';

/* -------------------------------------------------------------------------------------------------
 * Chevron Icon
 * ------------------------------------------------------------------------------------------------*/

function ChevronIcon({ isOpen }: { isOpen?: boolean }) {
  return (
    <motion.svg
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.15 }}
      className="h-3 w-3 text-[var(--fg-muted)]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  navigationMenuVariants,
  navigationMenuTriggerVariants,
  navigationMenuLinkVariants,
};
