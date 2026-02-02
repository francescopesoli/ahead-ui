'use client';

import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Command Context
 * ------------------------------------------------------------------------------------------------*/

interface CommandContextValue {
  search: string;
  setSearch: (search: string) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  items: string[];
  registerItem: (id: string) => void;
  unregisterItem: (id: string) => void;
  onSelect?: (value: string) => void;
}

const CommandContext = createContext<CommandContextValue | null>(null);

const useCommandContext = () => {
  const context = useContext(CommandContext);
  if (!context) {
    throw new Error('Command components must be used within a Command');
  }
  return context;
};

/* -------------------------------------------------------------------------------------------------
 * Command Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const commandVariants = cva(
  [
    'flex flex-col overflow-hidden',
    'rounded-[var(--radius-lg)]',
    'bg-[var(--bg)] border border-[var(--border)]',
    'shadow-lg',
  ],
  {
    variants: {
      size: {
        sm: 'w-[300px] max-h-[300px]',
        md: 'w-[400px] max-h-[400px]',
        lg: 'w-[500px] max-h-[500px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const commandItemVariants = cva(
  [
    'relative flex items-center gap-3 px-3 py-2',
    'text-sm text-[var(--fg)]',
    'cursor-pointer select-none outline-none',
    'transition-colors duration-fast',
  ],
  {
    variants: {
      isSelected: {
        true: 'bg-[var(--bg-muted)]',
        false: 'hover:bg-[var(--bg-subtle)]',
      },
      isDisabled: {
        true: 'opacity-50 pointer-events-none',
      },
    },
    defaultVariants: {
      isSelected: false,
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Command Types
 * ------------------------------------------------------------------------------------------------*/

export interface CommandProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof commandVariants> {
  /**
   * Callback when an item is selected
   */
  onSelect?: (value: string) => void;
  /**
   * Filter function for items
   */
  filter?: (value: string, search: string) => boolean;
  /**
   * Whether the command palette is in a dialog
   */
  shouldFilter?: boolean;
}

export interface CommandInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /**
   * Callback when input changes
   */
  onValueChange?: (value: string) => void;
}

export interface CommandListProps extends HTMLAttributes<HTMLDivElement> {}

export interface CommandEmptyProps extends HTMLAttributes<HTMLDivElement> {}

export interface CommandGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Group heading
   */
  heading?: ReactNode;
}

export interface CommandItemProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Value used for filtering and selection
   */
  value?: string;
  /**
   * Whether the item is disabled
   */
  isDisabled?: boolean;
  /**
   * Icon to display
   */
  icon?: ReactNode;
  /**
   * Keyboard shortcut to display
   */
  shortcut?: string;
  /**
   * Callback when item is selected
   */
  onSelect?: () => void;
}

export interface CommandSeparatorProps extends HTMLAttributes<HTMLDivElement> {}

export interface CommandShortcutProps extends HTMLAttributes<HTMLSpanElement> {}

/* -------------------------------------------------------------------------------------------------
 * Command Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A command palette component for quick actions and search.
 *
 * Features:
 * - Fuzzy search filtering
 * - Keyboard navigation
 * - Grouped items
 * - Keyboard shortcuts display
 *
 * @example
 * ```tsx
 * <Command>
 *   <CommandInput placeholder="Type a command or search..." />
 *   <CommandList>
 *     <CommandEmpty>No results found.</CommandEmpty>
 *     <CommandGroup heading="Suggestions">
 *       <CommandItem icon={<SearchIcon />}>Search</CommandItem>
 *       <CommandItem icon={<FileIcon />}>New File</CommandItem>
 *     </CommandGroup>
 *     <CommandSeparator />
 *     <CommandGroup heading="Settings">
 *       <CommandItem shortcut="⌘,">Preferences</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 * ```
 */
const Command = forwardRef<HTMLDivElement, CommandProps>(
  (props, ref) => {
    const {
      className,
      children,
      size,
      onSelect,
      filter,
      shouldFilter = true,
      ...restProps
    } = props;

    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [items, setItems] = useState<string[]>([]);

    const registerItem = (id: string) => {
      setItems(prev => [...prev, id]);
    };

    const unregisterItem = (id: string) => {
      setItems(prev => prev.filter(item => item !== id));
    };

    // Reset selection when search changes
    useEffect(() => {
      setSelectedIndex(0);
    }, [search]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (items[selectedIndex]) {
            onSelect?.(items[selectedIndex]);
          }
          break;
      }
    };

    return (
      <CommandContext.Provider
        value={{
          search,
          setSearch,
          selectedIndex,
          setSelectedIndex,
          items,
          registerItem,
          unregisterItem,
          onSelect,
        }}
      >
        <div
          ref={ref}
          onKeyDown={handleKeyDown}
          className={cn(commandVariants({ size }), className)}
          {...restProps}
        >
          {children}
        </div>
      </CommandContext.Provider>
    );
  }
);

Command.displayName = 'Command';

/* -------------------------------------------------------------------------------------------------
 * CommandInput Component
 * ------------------------------------------------------------------------------------------------*/

const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  (props, ref) => {
    const { className, onValueChange, placeholder = 'Search...', ...restProps } = props;
    const { search, setSearch } = useCommandContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearch(value);
      onValueChange?.(value);
    };

    return (
      <div className="flex items-center gap-2 px-3 border-b border-[var(--border)]">
        <SearchIcon className="h-4 w-4 text-[var(--fg-muted)] shrink-0" />
        <input
          ref={ref}
          type="text"
          value={search}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            'flex-1 h-11 bg-transparent',
            'text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)]',
            'focus:outline-none',
            className
          )}
          {...restProps}
        />
      </div>
    );
  }
);

CommandInput.displayName = 'CommandInput';

/* -------------------------------------------------------------------------------------------------
 * CommandList Component
 * ------------------------------------------------------------------------------------------------*/

const CommandList = forwardRef<HTMLDivElement, CommandListProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn('overflow-y-auto overflow-x-hidden py-2', className)}
        role="listbox"
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

CommandList.displayName = 'CommandList';

/* -------------------------------------------------------------------------------------------------
 * CommandEmpty Component
 * ------------------------------------------------------------------------------------------------*/

const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;
    const { search, items } = useCommandContext();

    if (!search || items.length > 0) return null;

    return (
      <div
        ref={ref}
        className={cn('py-6 text-center text-sm text-[var(--fg-muted)]', className)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

CommandEmpty.displayName = 'CommandEmpty';

/* -------------------------------------------------------------------------------------------------
 * CommandGroup Component
 * ------------------------------------------------------------------------------------------------*/

const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(
  (props, ref) => {
    const { className, children, heading, ...restProps } = props;

    return (
      <div ref={ref} role="group" className={cn('', className)} {...restProps}>
        {heading && (
          <div className="px-3 py-1.5 text-xs font-medium text-[var(--fg-muted)]">
            {heading}
          </div>
        )}
        {children}
      </div>
    );
  }
);

CommandGroup.displayName = 'CommandGroup';

/* -------------------------------------------------------------------------------------------------
 * CommandItem Component
 * ------------------------------------------------------------------------------------------------*/

let itemIdCounter = 0;

const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  (props, ref) => {
    const {
      className,
      children,
      value,
      isDisabled,
      icon,
      shortcut,
      onSelect: onItemSelect,
      ...restProps
    } = props;

    const {
      search,
      selectedIndex,
      setSelectedIndex,
      items,
      registerItem,
      unregisterItem,
      onSelect,
    } = useCommandContext();

    const idRef = useRef(`command-item-${itemIdCounter++}`);
    const itemValue = value || (typeof children === 'string' ? children : idRef.current);

    // Filter based on search
    const isVisible = useMemo(() => {
      if (!search) return true;
      return itemValue.toLowerCase().includes(search.toLowerCase());
    }, [search, itemValue]);

    // Register/unregister item
    useEffect(() => {
      if (isVisible && !isDisabled) {
        registerItem(itemValue);
        return () => unregisterItem(itemValue);
      }
      return undefined;
    }, [isVisible, isDisabled, itemValue, registerItem, unregisterItem]);

    if (!isVisible) return null;

    const itemIndex = items.indexOf(itemValue);
    const isSelected = itemIndex === selectedIndex;

    const handleClick = () => {
      if (isDisabled) return;
      onItemSelect?.();
      onSelect?.(itemValue);
    };

    const handleMouseEnter = () => {
      if (!isDisabled) {
        setSelectedIndex(itemIndex);
      }
    };

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        aria-disabled={isDisabled}
        data-selected={isSelected}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className={cn(commandItemVariants({ isSelected, isDisabled }), className)}
        {...restProps}
      >
        {icon && (
          <span className="flex h-5 w-5 items-center justify-center text-[var(--fg-muted)]">
            {icon}
          </span>
        )}
        <span className="flex-1">{children}</span>
        {shortcut && (
          <span className="ml-auto text-xs text-[var(--fg-muted)]">{shortcut}</span>
        )}
      </div>
    );
  }
);

CommandItem.displayName = 'CommandItem';

/* -------------------------------------------------------------------------------------------------
 * CommandSeparator Component
 * ------------------------------------------------------------------------------------------------*/

const CommandSeparator = forwardRef<HTMLDivElement, CommandSeparatorProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn('h-px my-1 mx-2 bg-[var(--border)]', className)}
        {...restProps}
      />
    );
  }
);

CommandSeparator.displayName = 'CommandSeparator';

/* -------------------------------------------------------------------------------------------------
 * CommandShortcut Component
 * ------------------------------------------------------------------------------------------------*/

const CommandShortcut = forwardRef<HTMLSpanElement, CommandShortcutProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;

    return (
      <span
        ref={ref}
        className={cn('ml-auto text-xs text-[var(--fg-muted)]', className)}
        {...restProps}
      >
        {children}
      </span>
    );
  }
);

CommandShortcut.displayName = 'CommandShortcut';

/* -------------------------------------------------------------------------------------------------
 * CommandDialog Component
 * ------------------------------------------------------------------------------------------------*/

export interface CommandDialogProps extends CommandProps {
  /**
   * Whether the dialog is open
   */
  isOpen?: boolean;
  /**
   * Callback when dialog should close
   */
  onClose?: () => void;
}

const CommandDialog = forwardRef<HTMLDivElement, CommandDialogProps>(
  (props, ref) => {
    const { isOpen, onClose, children, ...restProps } = props;

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose?.();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
      }
      return undefined;
    }, [isOpen, onClose]);

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="fixed left-1/2 top-1/4 z-50 -translate-x-1/2"
            >
              <Command ref={ref} {...restProps}>
                {children}
              </Command>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
);

CommandDialog.displayName = 'CommandDialog';

/* -------------------------------------------------------------------------------------------------
 * Search Icon
 * ------------------------------------------------------------------------------------------------*/

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  CommandDialog,
  commandVariants,
  commandItemVariants,
};
