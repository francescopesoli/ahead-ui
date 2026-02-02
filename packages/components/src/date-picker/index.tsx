'use client';

import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';
import { Calendar, CalendarRange } from '../calendar';

/* -------------------------------------------------------------------------------------------------
 * DatePicker Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const datePickerTriggerVariants = cva(
  [
    'inline-flex items-center justify-between gap-2 w-full',
    'rounded-[var(--radius-md)]',
    'border border-[var(--border)]',
    'bg-[var(--bg)] text-[var(--fg)]',
    'transition-colors duration-fast',
    'focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2',
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
        ],
        filled: [
          'bg-[var(--bg-muted)] border-transparent',
          'hover:bg-[var(--bg-subtle)]',
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

/* -------------------------------------------------------------------------------------------------
 * DatePicker Types
 * ------------------------------------------------------------------------------------------------*/

export interface DatePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>,
    VariantProps<typeof datePickerTriggerVariants> {
  /**
   * Selected date (controlled)
   */
  value?: Date | null;
  /**
   * Default selected date (uncontrolled)
   */
  defaultValue?: Date;
  /**
   * Callback when date is selected
   */
  onChange?: (date: Date | null) => void;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Date format for display
   */
  formatDate?: (date: Date) => string;
  /**
   * Minimum selectable date
   */
  minDate?: Date;
  /**
   * Maximum selectable date
   */
  maxDate?: Date;
  /**
   * Function to determine if a date is disabled
   */
  isDateDisabled?: (date: Date) => boolean;
  /**
   * Whether the picker is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether the picker is invalid
   */
  isInvalid?: boolean;
  /**
   * Whether the picker is clearable
   */
  isClearable?: boolean;
  /**
   * Label for the picker
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
   * Locale for formatting
   */
  locale?: string;
  /**
   * Number of months to show in calendar
   */
  numberOfMonths?: number;
}

export interface DateRangePickerProps
  extends Omit<DatePickerProps, 'value' | 'defaultValue' | 'onChange'> {
  /**
   * Selected date range (controlled)
   */
  value?: { start: Date | null; end: Date | null };
  /**
   * Default selected range (uncontrolled)
   */
  defaultValue?: { start: Date | null; end: Date | null };
  /**
   * Callback when range is selected
   */
  onChange?: (range: { start: Date | null; end: Date | null }) => void;
  /**
   * Separator between start and end date
   */
  separator?: ReactNode;
}

/* -------------------------------------------------------------------------------------------------
 * DatePicker Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A date picker component with calendar popup.
 *
 * Features:
 * - Calendar dropdown
 * - Custom date formatting
 * - Min/max date constraints
 * - Clearable
 * - Keyboard accessible
 *
 * @example
 * ```tsx
 * // Basic
 * <DatePicker value={date} onChange={setDate} />
 *
 * // With constraints
 * <DatePicker
 *   minDate={new Date()}
 *   maxDate={addMonths(new Date(), 3)}
 *   onChange={setDate}
 * />
 *
 * // Custom format
 * <DatePicker
 *   formatDate={(date) => date.toLocaleDateString('en-GB')}
 *   onChange={setDate}
 * />
 * ```
 */
const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (props, ref) => {
    const {
      className,
      size,
      variant,
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = 'Select date',
      formatDate,
      minDate,
      maxDate,
      isDateDisabled,
      isDisabled = false,
      isInvalid = false,
      isClearable = true,
      label,
      helperText,
      errorMessage,
      locale = 'en-US',
      numberOfMonths = 1,
      ...restProps
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<Date | null>(defaultValue || null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const defaultFormatDate = (date: Date) =>
      date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

    const displayValue = value ? (formatDate || defaultFormatDate)(value) : '';

    const handleDateSelect = (date: Date) => {
      if (controlledValue === undefined) {
        setInternalValue(date);
      }
      onChange?.(date);
      setIsOpen(false);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (controlledValue === undefined) {
        setInternalValue(null);
      }
      onChange?.(null);
    };

    // Close on click outside
    useEffect(() => {
      if (!isOpen) return;

      const handleClick = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          contentRef.current &&
          !contentRef.current.contains(target) &&
          triggerRef.current &&
          !triggerRef.current.contains(target)
        ) {
          setIsOpen(false);
        }
      };

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };

      document.addEventListener('mousedown', handleClick);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('mousedown', handleClick);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [isOpen]);

    return (
      <div ref={ref} className={cn('relative flex flex-col gap-1.5', className)} {...restProps}>
        {label && (
          <label className="text-sm font-medium text-[var(--fg)]">{label}</label>
        )}

        <button
          ref={triggerRef}
          type="button"
          onClick={() => !isDisabled && setIsOpen(!isOpen)}
          disabled={isDisabled}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className={cn(datePickerTriggerVariants({ size, variant, isInvalid }))}
        >
          <span className={cn(!value && 'text-[var(--fg-muted)]')}>
            {displayValue || placeholder}
          </span>
          <div className="flex items-center gap-1">
            {isClearable && value && (
              <span
                role="button"
                tabIndex={-1}
                onClick={handleClear}
                className="p-1 rounded-[var(--radius-sm)] hover:bg-[var(--bg-muted)] text-[var(--fg-muted)]"
              >
                <XIcon className="h-3 w-3" />
              </span>
            )}
            <CalendarIcon className="h-4 w-4 text-[var(--fg-muted)]" />
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={contentRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 top-full mt-1"
            >
              <Calendar
                value={value}
                onChange={handleDateSelect}
                minDate={minDate}
                maxDate={maxDate}
                isDateDisabled={isDateDisabled}
                locale={locale}
                numberOfMonths={numberOfMonths}
                size={size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'}
              />
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

DatePicker.displayName = 'DatePicker';

/* -------------------------------------------------------------------------------------------------
 * DateRangePicker Component
 * ------------------------------------------------------------------------------------------------*/

const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  (props, ref) => {
    const {
      className,
      size,
      variant,
      value: controlledValue,
      defaultValue = { start: null, end: null },
      onChange,
      placeholder = 'Select dates',
      formatDate,
      minDate,
      maxDate,
      isDateDisabled,
      isDisabled = false,
      isInvalid = false,
      isClearable = true,
      label,
      helperText,
      errorMessage,
      locale = 'en-US',
      numberOfMonths = 2,
      separator = ' - ',
      ...restProps
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const value = controlledValue ?? internalValue;

    const defaultFormatDate = (date: Date) =>
      date.toLocaleDateString(locale, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

    const format = formatDate || defaultFormatDate;

    const displayValue = value.start && value.end
      ? `${format(value.start)}${separator}${format(value.end)}`
      : value.start
      ? format(value.start)
      : '';

    const handleRangeSelect = (range: { start: Date | null; end: Date | null }) => {
      if (controlledValue === undefined) {
        setInternalValue(range);
      }
      onChange?.(range);

      // Close when range is complete
      if (range.start && range.end) {
        setIsOpen(false);
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      const empty = { start: null, end: null };
      if (controlledValue === undefined) {
        setInternalValue(empty);
      }
      onChange?.(empty);
    };

    // Close on click outside
    useEffect(() => {
      if (!isOpen) return;

      const handleClick = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          contentRef.current &&
          !contentRef.current.contains(target) &&
          triggerRef.current &&
          !triggerRef.current.contains(target)
        ) {
          setIsOpen(false);
        }
      };

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };

      document.addEventListener('mousedown', handleClick);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('mousedown', handleClick);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [isOpen]);

    return (
      <div ref={ref} className={cn('relative flex flex-col gap-1.5', className)} {...restProps}>
        {label && (
          <label className="text-sm font-medium text-[var(--fg)]">{label}</label>
        )}

        <button
          ref={triggerRef}
          type="button"
          onClick={() => !isDisabled && setIsOpen(!isOpen)}
          disabled={isDisabled}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className={cn(datePickerTriggerVariants({ size, variant, isInvalid }))}
        >
          <span className={cn(!displayValue && 'text-[var(--fg-muted)]')}>
            {displayValue || placeholder}
          </span>
          <div className="flex items-center gap-1">
            {isClearable && (value.start || value.end) && (
              <span
                role="button"
                tabIndex={-1}
                onClick={handleClear}
                className="p-1 rounded-[var(--radius-sm)] hover:bg-[var(--bg-muted)] text-[var(--fg-muted)]"
              >
                <XIcon className="h-3 w-3" />
              </span>
            )}
            <CalendarIcon className="h-4 w-4 text-[var(--fg-muted)]" />
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={contentRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 top-full mt-1"
            >
              <CalendarRange
                value={value}
                onChange={handleRangeSelect}
                minDate={minDate}
                maxDate={maxDate}
                isDateDisabled={isDateDisabled}
                locale={locale}
                numberOfMonths={numberOfMonths}
                size={size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'}
              />
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

DateRangePicker.displayName = 'DateRangePicker';

/* -------------------------------------------------------------------------------------------------
 * Icons
 * ------------------------------------------------------------------------------------------------*/

function CalendarIcon({ className }: { className?: string }) {
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
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { DatePicker, DateRangePicker, datePickerTriggerVariants };
