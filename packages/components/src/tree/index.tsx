'use client';

import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Tree Context
 * ------------------------------------------------------------------------------------------------*/

interface TreeContextValue {
  expandedItems: Set<string>;
  selectedItems: Set<string>;
  toggleExpanded: (id: string) => void;
  toggleSelected: (id: string) => void;
  selectionMode: 'none' | 'single' | 'multiple';
  showCheckboxes: boolean;
}

const TreeContext = createContext<TreeContextValue | null>(null);

const useTreeContext = () => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error('TreeItem must be used within a Tree');
  }
  return context;
};

/* -------------------------------------------------------------------------------------------------
 * Tree Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const treeVariants = cva(
  ['flex flex-col'],
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const treeItemVariants = cva(
  [
    'flex items-center gap-1 py-1 px-2 rounded-[var(--radius-sm)]',
    'cursor-pointer select-none',
    'transition-colors duration-fast',
    'hover:bg-[var(--bg-muted)]',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-inset',
  ],
  {
    variants: {
      isSelected: {
        true: 'bg-[var(--primary)]/10 text-[var(--primary)]',
      },
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Tree Types
 * ------------------------------------------------------------------------------------------------*/

export interface TreeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof treeVariants> {
  /**
   * IDs of expanded items (controlled)
   */
  expandedItems?: string[];
  /**
   * Default expanded items (uncontrolled)
   */
  defaultExpandedItems?: string[];
  /**
   * Callback when expanded items change
   */
  onExpandedChange?: (items: string[]) => void;
  /**
   * IDs of selected items (controlled)
   */
  selectedItems?: string[];
  /**
   * Default selected items (uncontrolled)
   */
  defaultSelectedItems?: string[];
  /**
   * Callback when selected items change
   */
  onSelectedChange?: (items: string[]) => void;
  /**
   * Selection mode
   */
  selectionMode?: 'none' | 'single' | 'multiple';
  /**
   * Show checkboxes for selection
   */
  showCheckboxes?: boolean;
}

export interface TreeItemProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Unique identifier for the item
   */
  id: string;
  /**
   * Label text for the item
   */
  label: ReactNode;
  /**
   * Icon to display before the label
   */
  icon?: ReactNode;
  /**
   * Whether the item is disabled
   */
  isDisabled?: boolean;
  /**
   * Nested tree items
   */
  children?: ReactNode;
}

/* -------------------------------------------------------------------------------------------------
 * Tree Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A tree view component for displaying hierarchical data.
 *
 * Features:
 * - Expandable/collapsible nodes
 * - Single and multiple selection
 * - Checkbox selection mode
 * - Custom icons
 * - Keyboard navigation
 *
 * @example
 * ```tsx
 * <Tree selectionMode="single" defaultExpandedItems={['docs']}>
 *   <TreeItem id="docs" label="Documents">
 *     <TreeItem id="doc1" label="Document 1.pdf" />
 *     <TreeItem id="doc2" label="Document 2.pdf" />
 *   </TreeItem>
 *   <TreeItem id="images" label="Images">
 *     <TreeItem id="img1" label="Photo.jpg" />
 *   </TreeItem>
 * </Tree>
 * ```
 */
const Tree = forwardRef<HTMLDivElement, TreeProps>(
  (props, ref) => {
    const {
      className,
      children,
      size,
      expandedItems: controlledExpanded,
      defaultExpandedItems = [],
      onExpandedChange,
      selectedItems: controlledSelected,
      defaultSelectedItems = [],
      onSelectedChange,
      selectionMode = 'none',
      showCheckboxes = false,
      ...restProps
    } = props;

    const [internalExpanded, setInternalExpanded] = useState<Set<string>>(
      new Set(defaultExpandedItems)
    );
    const [internalSelected, setInternalSelected] = useState<Set<string>>(
      new Set(defaultSelectedItems)
    );

    const expandedItems = controlledExpanded
      ? new Set(controlledExpanded)
      : internalExpanded;

    const selectedItems = controlledSelected
      ? new Set(controlledSelected)
      : internalSelected;

    const toggleExpanded = useCallback((id: string) => {
      const newExpanded = new Set(expandedItems);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }

      if (controlledExpanded === undefined) {
        setInternalExpanded(newExpanded);
      }
      onExpandedChange?.([...newExpanded]);
    }, [expandedItems, controlledExpanded, onExpandedChange]);

    const toggleSelected = useCallback((id: string) => {
      if (selectionMode === 'none') return;

      const newSelected = new Set(selectionMode === 'multiple' ? selectedItems : []);

      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }

      if (controlledSelected === undefined) {
        setInternalSelected(newSelected);
      }
      onSelectedChange?.([...newSelected]);
    }, [selectionMode, selectedItems, controlledSelected, onSelectedChange]);

    return (
      <TreeContext.Provider
        value={{
          expandedItems,
          selectedItems,
          toggleExpanded,
          toggleSelected,
          selectionMode,
          showCheckboxes,
        }}
      >
        <div
          ref={ref}
          role="tree"
          className={cn(treeVariants({ size }), className)}
          {...restProps}
        >
          {children}
        </div>
      </TreeContext.Provider>
    );
  }
);

Tree.displayName = 'Tree';

/* -------------------------------------------------------------------------------------------------
 * TreeItem Component
 * ------------------------------------------------------------------------------------------------*/

const TreeItem = forwardRef<HTMLDivElement, TreeItemProps>(
  (props, ref) => {
    const {
      className,
      id,
      label,
      icon,
      isDisabled,
      children,
      ...restProps
    } = props;

    const {
      expandedItems,
      selectedItems,
      toggleExpanded,
      toggleSelected,
      selectionMode,
      showCheckboxes,
    } = useTreeContext();

    const hasChildren = !!children;
    const isExpanded = expandedItems.has(id);
    const isSelected = selectedItems.has(id);

    const handleClick = () => {
      if (isDisabled) return;

      if (hasChildren) {
        toggleExpanded(id);
      }
      toggleSelected(id);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (isDisabled) return;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
      if (e.key === 'ArrowRight' && hasChildren && !isExpanded) {
        toggleExpanded(id);
      }
      if (e.key === 'ArrowLeft' && hasChildren && isExpanded) {
        toggleExpanded(id);
      }
    };

    return (
      <div
        ref={ref}
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-selected={selectionMode !== 'none' ? isSelected : undefined}
        aria-disabled={isDisabled}
        {...restProps}
      >
        <div
          tabIndex={isDisabled ? -1 : 0}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={cn(
            treeItemVariants({ isSelected }),
            isDisabled && 'opacity-50 cursor-not-allowed',
            className
          )}
        >
          {/* Expand/Collapse chevron */}
          {hasChildren ? (
            <motion.span
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.15 }}
              className="flex h-4 w-4 items-center justify-center text-[var(--fg-muted)]"
            >
              <ChevronIcon />
            </motion.span>
          ) : (
            <span className="w-4" />
          )}

          {/* Checkbox */}
          {showCheckboxes && selectionMode !== 'none' && (
            <span
              className={cn(
                'flex h-4 w-4 items-center justify-center rounded-sm border',
                isSelected
                  ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-fg)]'
                  : 'border-[var(--border)]'
              )}
            >
              {isSelected && <CheckIcon />}
            </span>
          )}

          {/* Icon */}
          {icon && (
            <span className="flex h-4 w-4 items-center justify-center text-[var(--fg-muted)]">
              {icon}
            </span>
          )}

          {/* Label */}
          <span className="flex-1">{label}</span>
        </div>

        {/* Children */}
        <AnimatePresence initial={false}>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pl-4 border-l border-[var(--border)] ml-2">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

TreeItem.displayName = 'TreeItem';

/* -------------------------------------------------------------------------------------------------
 * Icons
 * ------------------------------------------------------------------------------------------------*/

function ChevronIcon() {
  return (
    <svg
      className="h-3 w-3"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-3 w-3"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Tree, TreeItem, treeVariants };
