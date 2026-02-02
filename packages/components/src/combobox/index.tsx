'use client';

import {
  forwardRef,
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Combobox Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const comboboxTriggerVariants = cva(
  [
    'flex items-center w-full',
    'rounded-[var(--radius-md)]',
    'border border-[var(--border)]',
    'bg-[var(--bg)] text-[var(--fg)]',
    'transition-colors duration-fast',
    'focus-within:ring-2 focus-within:ring-[var(--ring)] focus-within:ring-offset-2',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 text-sm',
        md: 'h-10 text-base',
        lg: 'h-12 text-lg',
      },
      variant: {
        default: [
          'hover:border-[var(--border-emphasized)]',
          'focus-within:border-[var(--primary)]',
        ],
        filled: [
          'bg-[var(--bg-muted)] border-transparent',
          'hover:bg-[var(--bg-subtle)]',
          'focus-within:bg-[var(--bg)] focus-within:border-[var(--primary)]',
        ],
      },
      isInvalid: {
        true: 'border-[var(--danger)] focus-within:ring-[var(--danger)]',
      },
      isDisabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

const comboboxContentVariants = cva(
  [
    'absolute z-50 w-full',
    'overflow-hidden rounded-[var(--radius-md)]',
    'border border-[var(--border)]',
    'bg-[var(--bg)] shadow-lg',
  ]
);

const comboboxItemVariants = cva(
  [
    'relative flex cursor-pointer items-center px-3 py-2',
    'text-sm text-[var(--fg)]',
    'outline-none',
    'transition-colors duration-fast',
  ],
  {
    variants: {
      isFocused: {
        true: 'bg-[var(--bg-muted)]',
      },
      isSelected: {
        true: 'bg-[var(--primary)]/10 text-[var(--primary)]',
      },
      isDisabled: {
        true: 'opacity-50 pointer-events-none',
      },
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Combobox Types
 * ------------------------------------------------------------------------------------------------*/

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof comboboxTriggerVariants> {
  /**
   * Options to display
   */
  options: ComboboxOption[];
  /**
   * Current value (controlled)
   */
  value?: string | string[];
  /**
   * Default value (uncontrolled)
   */
  defaultValue?: string | string[];
  /**
   * Callback when value changes
   */
  onChange?: (value: string | string[]) => void;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Allow multiple selection
   */
  multiple?: boolean;
  /**
   * Allow creating new items
   */
  allowCreate?: boolean;
  /**
   * Callback when creating new item
   */
  onCreate?: (value: string) => void;
  /**
   * Custom filter function
   */
  filterFn?: (option: ComboboxOption, inputValue: string) => boolean;
  /**
   * Whether the combobox is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether the combobox is invalid
   */
  isInvalid?: boolean;
  /**
   * Label for the combobox
   */
  label?: ReactNode;
  /**
   * Helper text
   */
  helperText?: ReactNode;
  /**
   * Error message
   */
  errorMessage?: ReactNode;
  /**
   * Text to show when no options match
   */
  emptyText?: string;
  /**
   * Text for create option
   */
  createText?: string;
}

/* -------------------------------------------------------------------------------------------------
 * Combobox Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A combobox component with search and autocomplete functionality.
 *
 * Features:
 * - Search filtering
 * - Single and multiple selection
 * - Create new items
 * - Keyboard navigation
 * - Custom filtering
 *
 * @example
 * ```tsx
 * // Basic
 * <Combobox
 *   options={[
 *     { value: 'react', label: 'React' },
 *     { value: 'vue', label: 'Vue' },
 *     { value: 'angular', label: 'Angular' },
 *   ]}
 *   onChange={(value) => console.log(value)}
 * />
 *
 * // Multiple selection
 * <Combobox
 *   multiple
 *   options={options}
 *   value={selectedValues}
 *   onChange={setSelectedValues}
 * />
 *
 * // With create
 * <Combobox
 *   options={options}
 *   allowCreate
 *   onCreate={(value) => addOption(value)}
 * />
 * ```
 */
const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (props, ref) => {
    const {
      className,
      size,
      variant,
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = 'Select...',
      multiple = false,
      allowCreate = false,
      onCreate,
      filterFn,
      isDisabled = false,
      isInvalid = false,
      label,
      helperText,
      errorMessage,
      emptyText = 'No options found',
      createText = 'Create',
      ...restProps
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [internalValue, setInternalValue] = useState<string | string[]>(
      defaultValue ?? (multiple ? [] : '')
    );

    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const value = controlledValue ?? internalValue;

    // Default filter function
    const defaultFilter = (option: ComboboxOption, search: string) => {
      return option.label.toLowerCase().includes(search.toLowerCase());
    };

    // Filtered options
    const filteredOptions = useMemo(() => {
      if (!inputValue) return options;
      const filter = filterFn || defaultFilter;
      return options.filter((option) => filter(option, inputValue));
    }, [options, inputValue, filterFn]);

    // Check if should show create option
    const showCreateOption = allowCreate &&
      inputValue &&
      !options.some(o => o.label.toLowerCase() === inputValue.toLowerCase());

    // Get display value
    const displayValue = useMemo(() => {
      if (multiple) {
        const values = Array.isArray(value) ? value : [];
        return values
          .map(v => options.find(o => o.value === v)?.label)
          .filter(Boolean)
          .join(', ');
      }
      const selected = options.find(o => o.value === value);
      return selected?.label || '';
    }, [value, options, multiple]);

    // Handle selection
    const handleSelect = useCallback((optionValue: string) => {
      if (multiple) {
        const currentValues = Array.isArray(value) ? value : [];
        const newValues = currentValues.includes(optionValue)
          ? currentValues.filter(v => v !== optionValue)
          : [...currentValues, optionValue];

        if (controlledValue === undefined) {
          setInternalValue(newValues);
        }
        onChange?.(newValues);
      } else {
        if (controlledValue === undefined) {
          setInternalValue(optionValue);
        }
        onChange?.(optionValue);
        setIsOpen(false);
        setInputValue('');
      }
    }, [value, multiple, controlledValue, onChange]);

    // Handle create
    const handleCreate = useCallback(() => {
      if (!inputValue) return;
      onCreate?.(inputValue);
      handleSelect(inputValue);
      setInputValue('');
    }, [inputValue, onCreate, handleSelect]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (isDisabled) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            const maxIndex = filteredOptions.length + (showCreateOption ? 1 : 0) - 1;
            setFocusedIndex(prev => Math.min(prev + 1, maxIndex));
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (isOpen) {
            if (showCreateOption && focusedIndex === filteredOptions.length) {
              handleCreate();
            } else if (filteredOptions[focusedIndex]) {
              handleSelect(filteredOptions[focusedIndex].value);
            }
          } else {
            setIsOpen(true);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setInputValue('');
          break;
      }
    };

    // Close on click outside
    useEffect(() => {
      if (!isOpen) return;

      const handleClick = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          listRef.current &&
          !listRef.current.contains(target) &&
          inputRef.current &&
          !inputRef.current.contains(target)
        ) {
          setIsOpen(false);
          setInputValue('');
        }
      };

      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }, [isOpen]);

    // Reset focused index when filtering
    useEffect(() => {
      setFocusedIndex(0);
    }, [inputValue]);

    return (
      <div ref={ref} className={cn('relative flex flex-col gap-1.5', className)} {...restProps}>
        {label && (
          <label className="text-sm font-medium text-[var(--fg)]">{label}</label>
        )}

        <div
          className={cn(
            comboboxTriggerVariants({ size, variant, isInvalid, isDisabled })
          )}
        >
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            value={isOpen ? inputValue : displayValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isDisabled}
            className={cn(
              'flex-1 bg-transparent px-3 h-full',
              'focus:outline-none',
              'placeholder:text-[var(--fg-muted)]',
              isDisabled && 'cursor-not-allowed'
            )}
          />

          <button
            type="button"
            onClick={() => !isDisabled && setIsOpen(!isOpen)}
            tabIndex={-1}
            className="px-2 text-[var(--fg-muted)]"
          >
            <motion.svg
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <polyline points="6 9 12 15 18 9" />
            </motion.svg>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={listRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className={cn(comboboxContentVariants(), 'top-full mt-1')}
              role="listbox"
            >
              <div className="max-h-60 overflow-auto py-1">
                {filteredOptions.length === 0 && !showCreateOption && (
                  <div className="px-3 py-2 text-sm text-[var(--fg-muted)]">
                    {emptyText}
                  </div>
                )}

                {filteredOptions.map((option, index) => {
                  const isSelected = multiple
                    ? (Array.isArray(value) && value.includes(option.value))
                    : value === option.value;

                  return (
                    <div
                      key={option.value}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => !option.disabled && handleSelect(option.value)}
                      onMouseEnter={() => setFocusedIndex(index)}
                      className={cn(
                        comboboxItemVariants({
                          isFocused: index === focusedIndex,
                          isSelected,
                          isDisabled: option.disabled,
                        })
                      )}
                    >
                      {multiple && (
                        <span className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                          isSelected
                            ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-fg)]'
                            : 'border-[var(--border)]'
                        )}>
                          {isSelected && <CheckIcon />}
                        </span>
                      )}
                      <span className="flex-1">{option.label}</span>
                      {!multiple && isSelected && (
                        <CheckIcon className="h-4 w-4 text-[var(--primary)]" />
                      )}
                    </div>
                  );
                })}

                {showCreateOption && (
                  <div
                    role="option"
                    onClick={handleCreate}
                    onMouseEnter={() => setFocusedIndex(filteredOptions.length)}
                    className={cn(
                      comboboxItemVariants({
                        isFocused: focusedIndex === filteredOptions.length,
                      }),
                      'text-[var(--primary)]'
                    )}
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    {createText} "{inputValue}"
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {errorMessage && isInvalid && (
          <p className="text-sm text-[var(--danger)]">{errorMessage}</p>
        )}

        {helperText && !errorMessage && (
          <p className="text-sm text-[var(--fg-muted)]">{helperText}</p>
        )}
      </div>
    );
  }
);

Combobox.displayName = 'Combobox';

/* -------------------------------------------------------------------------------------------------
 * Icons
 * ------------------------------------------------------------------------------------------------*/

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn('h-3 w-3', className)}
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

function PlusIcon({ className }: { className?: string }) {
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
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Combobox, comboboxTriggerVariants, comboboxContentVariants, comboboxItemVariants };
