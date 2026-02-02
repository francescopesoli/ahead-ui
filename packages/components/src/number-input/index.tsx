'use client';

import {
  forwardRef,
  useState,
  useCallback,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * NumberInput Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const numberInputWrapperVariants = cva(
  [
    'inline-flex items-center',
    'rounded-[var(--radius-md)]',
    'border border-[var(--border)]',
    'bg-[var(--bg)]',
    'transition-colors duration-fast',
    'focus-within:ring-2 focus-within:ring-[var(--ring)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--ring-offset)]',
  ],
  {
    variants: {
      size: {
        sm: 'h-8',
        md: 'h-10',
        lg: 'h-12',
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

const numberInputVariants = cva(
  [
    'flex-1 bg-transparent',
    'text-[var(--fg)] placeholder:text-[var(--fg-muted)]',
    'focus:outline-none',
    'disabled:cursor-not-allowed',
    'text-center',
    '[appearance:textfield]',
    '[&::-webkit-outer-spin-button]:appearance-none',
    '[&::-webkit-inner-spin-button]:appearance-none',
  ],
  {
    variants: {
      size: {
        sm: 'px-2 text-sm',
        md: 'px-3 text-base',
        lg: 'px-4 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const stepButtonVariants = cva(
  [
    'flex items-center justify-center',
    'text-[var(--fg-muted)]',
    'transition-colors duration-fast',
    'hover:text-[var(--fg)] hover:bg-[var(--bg-muted)]',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent',
    'focus:outline-none',
  ],
  {
    variants: {
      size: {
        sm: 'w-6 h-full',
        md: 'w-8 h-full',
        lg: 'w-10 h-full',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * NumberInput Types
 * ------------------------------------------------------------------------------------------------*/

export interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value'>,
    VariantProps<typeof numberInputWrapperVariants> {
  /**
   * Current value (controlled)
   */
  value?: number;
  /**
   * Default value (uncontrolled)
   */
  defaultValue?: number;
  /**
   * Callback when value changes
   */
  onChange?: (value: number) => void;
  /**
   * Minimum value
   */
  min?: number;
  /**
   * Maximum value
   */
  max?: number;
  /**
   * Step increment
   */
  step?: number;
  /**
   * Number of decimal places to allow
   */
  precision?: number;
  /**
   * Show increment/decrement buttons
   */
  showSteppers?: boolean;
  /**
   * Format the displayed value
   */
  formatValue?: (value: number) => string;
  /**
   * Parse the input value
   */
  parseValue?: (value: string) => number;
  /**
   * Whether the input is invalid
   */
  isInvalid?: boolean;
  /**
   * Error message
   */
  errorMessage?: ReactNode;
  /**
   * Label for the input
   */
  label?: ReactNode;
  /**
   * Helper text
   */
  helperText?: ReactNode;
}

/* -------------------------------------------------------------------------------------------------
 * NumberInput Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A number input component with increment/decrement controls.
 *
 * Features:
 * - Increment/decrement buttons
 * - Min/max constraints
 * - Step increments
 * - Precision control
 * - Keyboard support (arrow keys)
 * - Custom formatting
 *
 * @example
 * ```tsx
 * // Basic
 * <NumberInput defaultValue={0} />
 *
 * // With constraints
 * <NumberInput min={0} max={100} step={5} defaultValue={50} />
 *
 * // With precision
 * <NumberInput precision={2} step={0.1} defaultValue={0.5} />
 *
 * // Without steppers
 * <NumberInput showSteppers={false} />
 *
 * // Controlled
 * <NumberInput value={value} onChange={setValue} />
 * ```
 */
const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (props, ref) => {
    const {
      className,
      size,
      variant,
      value: controlledValue,
      defaultValue = 0,
      onChange,
      min = -Infinity,
      max = Infinity,
      step = 1,
      precision,
      showSteppers = true,
      formatValue,
      parseValue,
      isInvalid,
      isDisabled,
      disabled,
      errorMessage,
      label,
      helperText,
      id,
      ...restProps
    } = props;

    const [internalValue, setInternalValue] = useState(defaultValue);
    const [inputValue, setInputValue] = useState(String(defaultValue));

    const value = controlledValue ?? internalValue;
    const isActuallyDisabled = isDisabled || disabled;

    const { focusProps } = useFocusRing();

    const clampValue = useCallback((val: number): number => {
      let clamped = Math.max(min, Math.min(max, val));
      if (precision !== undefined) {
        clamped = Number(clamped.toFixed(precision));
      }
      return clamped;
    }, [min, max, precision]);

    const updateValue = useCallback((newValue: number) => {
      const clamped = clampValue(newValue);
      if (controlledValue === undefined) {
        setInternalValue(clamped);
      }
      setInputValue(formatValue ? formatValue(clamped) : String(clamped));
      onChange?.(clamped);
    }, [clampValue, controlledValue, formatValue, onChange]);

    const increment = () => {
      if (isActuallyDisabled) return;
      updateValue(value + step);
    };

    const decrement = () => {
      if (isActuallyDisabled) return;
      updateValue(value - step);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      setInputValue(raw);

      const parsed = parseValue ? parseValue(raw) : Number(raw);
      if (!isNaN(parsed)) {
        updateValue(parsed);
      }
    };

    const handleBlur = () => {
      // Reset to current value on blur if input is invalid
      setInputValue(formatValue ? formatValue(value) : String(value));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        increment();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        decrement();
      }
    };

    const canIncrement = value < max;
    const canDecrement = value > min;

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[var(--fg)]">
            {label}
          </label>
        )}

        <div
          className={cn(
            numberInputWrapperVariants({ size, variant, isInvalid, isDisabled: isActuallyDisabled })
          )}
        >
          {showSteppers && (
            <button
              type="button"
              onClick={decrement}
              disabled={isActuallyDisabled || !canDecrement}
              tabIndex={-1}
              aria-label="Decrease value"
              className={cn(
                stepButtonVariants({ size }),
                'border-r border-[var(--border)]'
              )}
            >
              <MinusIcon />
            </button>
          )}

          <input
            ref={ref}
            type="text"
            inputMode="decimal"
            id={id}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            disabled={isActuallyDisabled}
            aria-invalid={isInvalid}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            className={numberInputVariants({ size })}
            {...mergeProps(focusProps, restProps)}
          />

          {showSteppers && (
            <button
              type="button"
              onClick={increment}
              disabled={isActuallyDisabled || !canIncrement}
              tabIndex={-1}
              aria-label="Increase value"
              className={cn(
                stepButtonVariants({ size }),
                'border-l border-[var(--border)]'
              )}
            >
              <PlusIcon />
            </button>
          )}
        </div>

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

NumberInput.displayName = 'NumberInput';

/* -------------------------------------------------------------------------------------------------
 * Icons
 * ------------------------------------------------------------------------------------------------*/

function MinusIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { NumberInput, numberInputWrapperVariants, numberInputVariants };
