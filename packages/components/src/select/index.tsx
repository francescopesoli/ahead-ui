'use client';

import {
  forwardRef,
  useRef,
  useId,
  type ReactNode,
} from 'react';
import { useSelectState } from '@react-stately/select';
import { useSelect, HiddenSelect } from '@react-aria/select';
import { useButton } from '@react-aria/button';
import { useListBox, useOption } from '@react-aria/listbox';
import { useFocusRing } from '@react-aria/focus';
import { useOverlayTrigger } from '@react-aria/overlays';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { Item } from '@react-stately/collections';
import type { AriaSelectProps } from '@react-types/select';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Select Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const selectTriggerVariants = cva(
  [
    'inline-flex items-center justify-between gap-2 w-full',
    'rounded-[var(--radius-md)]',
    'border border-[var(--border)]',
    'bg-[var(--bg)] text-[var(--fg)]',
    'transition-colors duration-fast ease-out',
    'focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[var(--ring-offset)]',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-3 text-base',
        lg: 'h-12 px-4 text-lg',
      },
      variant: {
        default: [
          'hover:border-[var(--border-emphasized)]',
          'data-[state=open]:border-[var(--primary)]',
        ],
        filled: [
          'bg-[var(--bg-muted)] border-transparent',
          'hover:bg-[var(--bg-subtle)]',
          'data-[state=open]:bg-[var(--bg)] data-[state=open]:border-[var(--primary)]',
        ],
      },
      isInvalid: {
        true: 'border-[var(--danger)] focus:ring-[var(--danger)]',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

const selectContentVariants = cva(
  [
    'absolute z-50 w-full',
    'overflow-hidden rounded-[var(--radius-md)]',
    'border border-[var(--border)]',
    'bg-[var(--bg)] shadow-lg',
  ]
);

const selectItemVariants = cva(
  [
    'relative flex cursor-pointer items-center px-3 py-2',
    'text-sm text-[var(--fg)]',
    'outline-none',
    'transition-colors duration-fast',
    'data-[focused]:bg-[var(--bg-muted)]',
    'data-[selected]:bg-[var(--primary)]/10 data-[selected]:text-[var(--primary)]',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  ]
);

/* -------------------------------------------------------------------------------------------------
 * Select Types
 * ------------------------------------------------------------------------------------------------*/

export interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, 'children' | 'isInvalid'>,
    VariantProps<typeof selectTriggerVariants> {
  /**
   * Label for the select
   */
  label?: ReactNode;
  /**
   * Helper text
   */
  helperText?: ReactNode;
  /**
   * Error message (makes the select invalid)
   */
  errorMessage?: ReactNode;
  /**
   * Items to render in the select
   */
  items?: Iterable<T>;
  /**
   * Children (Item components)
   */
  children: ReactNode | ((item: T) => ReactNode);
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Additional className
   */
  className?: string;
}

/* -------------------------------------------------------------------------------------------------
 * Select Component
 * ------------------------------------------------------------------------------------------------*/

function SelectInner<T extends object>(
  props: SelectProps<T>,
  _ref: React.ForwardedRef<HTMLButtonElement>
) {
  const {
    size,
    variant,
    isInvalid: isInvalidProp,
    label,
    helperText,
    errorMessage,
    placeholder = 'Select an option',
    className,
    ...ariaProps
  } = props;

  const isInvalid = isInvalidProp || !!errorMessage;

  // Create state
  const state = useSelectState(ariaProps as AriaSelectProps<T>);

  // Get overlay trigger state
  const triggerState = useOverlayTriggerState({
    isOpen: state.isOpen,
    onOpenChange: state.setOpen,
  });

  // Refs
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);

  // IDs
  const generatedId = useId();
  const helperId = `${generatedId}-helper`;
  const errorId = `${generatedId}-error`;

  // Get select props
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    ariaProps as AriaSelectProps<T>,
    state,
    triggerRef
  );

  // Get button props
  const { buttonProps } = useButton(triggerProps, triggerRef);

  // Get overlay trigger props
  const { overlayProps } = useOverlayTrigger(
    { type: 'listbox' },
    triggerState,
    triggerRef
  );

  // Focus ring
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <div className={cn('relative flex flex-col gap-1.5', className)}>
      {label && (
        <label {...labelProps} className="text-sm font-medium text-[var(--fg)]">
          {label}
        </label>
      )}

      <HiddenSelect
        state={state}
        triggerRef={triggerRef}
        label={label?.toString()}
        name={ariaProps.name}
      />

      <button
        {...buttonProps}
        {...focusProps}
        ref={triggerRef}
        data-state={state.isOpen ? 'open' : 'closed'}
        className={cn(
          selectTriggerVariants({ size, variant, isInvalid }),
          isFocusVisible && 'ring-2 ring-[var(--ring)] ring-offset-2'
        )}
        aria-describedby={errorMessage ? errorId : helperText ? helperId : undefined}
      >
        <span {...valueProps} className={cn(!state.selectedItem && 'text-[var(--fg-muted)]')}>
          {state.selectedItem ? state.selectedItem.rendered : placeholder}
        </span>
        <motion.svg
          animate={{ rotate: state.isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="h-4 w-4 shrink-0 text-[var(--fg-muted)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {state.isOpen && (
          <motion.div
            {...overlayProps}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className={cn(selectContentVariants(), 'top-full mt-1')}
          >
            <ListBox
              {...menuProps}
              ref={listBoxRef}
              state={state}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {errorMessage && (
        <p id={errorId} className="text-sm text-[var(--danger)]">
          {errorMessage}
        </p>
      )}

      {helperText && !errorMessage && (
        <p id={helperId} className="text-sm text-[var(--fg-muted)]">
          {helperText}
        </p>
      )}
    </div>
  );
}

const Select = forwardRef(SelectInner) as <T extends object>(
  props: SelectProps<T> & { ref?: React.ForwardedRef<HTMLButtonElement> }
) => React.ReactElement;

/* -------------------------------------------------------------------------------------------------
 * ListBox Component
 * ------------------------------------------------------------------------------------------------*/

interface ListBoxProps<T extends object> {
  state: ReturnType<typeof useSelectState<T>>;
}

const ListBox = forwardRef<HTMLUListElement, ListBoxProps<object>>(
  (props, ref) => {
    const { state, ...restProps } = props;
    const { listBoxProps } = useListBox(restProps, state, ref as React.RefObject<HTMLUListElement>);

    return (
      <ul
        {...listBoxProps}
        ref={ref}
        className="max-h-60 overflow-auto py-1 focus:outline-none"
      >
        {[...state.collection].map((item) => (
          <Option key={item.key} item={item} state={state} />
        ))}
      </ul>
    );
  }
);

ListBox.displayName = 'ListBox';

/* -------------------------------------------------------------------------------------------------
 * Option Component
 * ------------------------------------------------------------------------------------------------*/

interface OptionProps<T extends object> {
  item: { key: React.Key; rendered: ReactNode };
  state: ReturnType<typeof useSelectState<T>>;
}

function Option<T extends object>({ item, state }: OptionProps<T>) {
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, isSelected, isFocused, isDisabled } = useOption(
    { key: item.key as string | number },
    state,
    ref
  );

  return (
    <li
      {...optionProps}
      ref={ref}
      data-selected={isSelected || undefined}
      data-focused={isFocused || undefined}
      data-disabled={isDisabled || undefined}
      className={selectItemVariants()}
    >
      <span className="flex-1">{item.rendered}</span>
      {isSelected && (
        <svg
          className="h-4 w-4 shrink-0 text-[var(--primary)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </li>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Select, Item as SelectItem, selectTriggerVariants, selectContentVariants, selectItemVariants };
