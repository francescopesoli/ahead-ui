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
  type InputHTMLAttributes,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * PinInput Context
 * ------------------------------------------------------------------------------------------------*/

interface PinInputContextValue {
  values: string[];
  setValueAtIndex: (index: number, value: string) => void;
  focusIndex: (index: number) => void;
  registerInput: (index: number, ref: HTMLInputElement | null) => void;
  length: number;
  mask: boolean;
  isDisabled: boolean;
  isInvalid: boolean;
  autoFocus: boolean;
  type: 'text' | 'number';
  size: 'sm' | 'md' | 'lg' | null | undefined;
}

const PinInputContext = createContext<PinInputContextValue | null>(null);

const usePinInputContext = () => {
  const context = useContext(PinInputContext);
  if (!context) {
    throw new Error('PinInputField must be used within a PinInput');
  }
  return context;
};

/* -------------------------------------------------------------------------------------------------
 * PinInput Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const pinInputVariants = cva(
  ['inline-flex gap-2']
);

const pinInputFieldVariants = cva(
  [
    'text-center font-medium',
    'rounded-[var(--radius-md)]',
    'border border-[var(--border)]',
    'bg-[var(--bg)] text-[var(--fg)]',
    'transition-colors duration-fast',
    'focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
      },
      isInvalid: {
        true: 'border-[var(--danger)] focus:ring-[var(--danger)]',
      },
      isFilled: {
        true: 'border-[var(--primary)]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * PinInput Types
 * ------------------------------------------------------------------------------------------------*/

export interface PinInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof pinInputVariants> {
  /**
   * Number of input fields
   */
  length?: 4 | 5 | 6;
  /**
   * Current value (controlled)
   */
  value?: string;
  /**
   * Default value (uncontrolled)
   */
  defaultValue?: string;
  /**
   * Callback when value changes
   */
  onChange?: (value: string) => void;
  /**
   * Callback when all fields are filled
   */
  onComplete?: (value: string) => void;
  /**
   * Whether to mask the input (like a password)
   */
  mask?: boolean;
  /**
   * Whether the input is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether the input is invalid
   */
  isInvalid?: boolean;
  /**
   * Auto focus first field on mount
   */
  autoFocus?: boolean;
  /**
   * Input type - number restricts to digits only
   */
  type?: 'text' | 'number';
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Placeholder for each field
   */
  placeholder?: string;
}

export interface PinInputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Index of this field (auto-assigned)
   */
  index?: number;
}

/* -------------------------------------------------------------------------------------------------
 * PinInput Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A PIN/OTP input component with multiple fields.
 *
 * Features:
 * - Auto-focus next field on input
 * - Paste support
 * - Keyboard navigation
 * - Masked mode
 * - Completion callback
 *
 * @example
 * ```tsx
 * // Basic usage
 * <PinInput length={4} onComplete={(pin) => console.log(pin)} />
 *
 * // 6-digit OTP
 * <PinInput length={6} type="number" />
 *
 * // Masked PIN
 * <PinInput length={4} mask />
 *
 * // Controlled
 * <PinInput value={pin} onChange={setPin} />
 * ```
 */
const PinInput = forwardRef<HTMLDivElement, PinInputProps>(
  (props, ref) => {
    const {
      className,
      length = 4,
      value: controlledValue,
      defaultValue = '',
      onChange,
      onComplete,
      mask = false,
      isDisabled = false,
      isInvalid = false,
      autoFocus = false,
      type = 'text',
      size = 'md',
      placeholder,
      ...restProps
    } = props;

    const [internalValues, setInternalValues] = useState<string[]>(() => {
      const initial = (controlledValue || defaultValue).split('').slice(0, length);
      return [...initial, ...Array(length - initial.length).fill('')];
    });

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const values = controlledValue !== undefined
      ? [...controlledValue.split('').slice(0, length), ...Array(length).fill('')].slice(0, length)
      : internalValues;

    const registerInput = useCallback((index: number, inputRef: HTMLInputElement | null) => {
      inputRefs.current[index] = inputRef;
    }, []);

    const focusIndex = useCallback((index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, length - 1));
      inputRefs.current[clampedIndex]?.focus();
    }, [length]);

    const setValueAtIndex = useCallback((index: number, value: string) => {
      const newValues = [...values];
      newValues[index] = value;

      if (controlledValue === undefined) {
        setInternalValues(newValues);
      }

      const fullValue = newValues.join('');
      onChange?.(fullValue);

      // Check if complete
      if (newValues.every(v => v.length > 0)) {
        onComplete?.(fullValue);
      }
    }, [values, controlledValue, onChange, onComplete]);

    // Auto-focus first field
    useEffect(() => {
      if (autoFocus) {
        inputRefs.current[0]?.focus();
      }
    }, [autoFocus]);

    // Handle paste on the container
    const handlePaste = useCallback((e: React.ClipboardEvent) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text').slice(0, length);

      if (type === 'number' && !/^\d*$/.test(pastedData)) {
        return;
      }

      const newValues = [...Array(length).fill('')];
      pastedData.split('').forEach((char, i) => {
        newValues[i] = char;
      });

      if (controlledValue === undefined) {
        setInternalValues(newValues);
      }

      const fullValue = newValues.join('');
      onChange?.(fullValue);

      // Focus the next empty field or the last filled one
      const nextEmptyIndex = newValues.findIndex(v => v === '');
      focusIndex(nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex);

      if (newValues.every(v => v.length > 0)) {
        onComplete?.(fullValue);
      }
    }, [length, type, controlledValue, onChange, onComplete, focusIndex]);

    return (
      <PinInputContext.Provider
        value={{
          values,
          setValueAtIndex,
          focusIndex,
          registerInput,
          length,
          mask,
          isDisabled,
          isInvalid,
          autoFocus,
          type,
          size,
        }}
      >
        <div
          ref={ref}
          className={cn(pinInputVariants(), className)}
          onPaste={handlePaste}
          {...restProps}
        >
          {Array.from({ length }).map((_, index) => (
            <PinInputField key={index} index={index} placeholder={placeholder} />
          ))}
        </div>
      </PinInputContext.Provider>
    );
  }
);

PinInput.displayName = 'PinInput';

/* -------------------------------------------------------------------------------------------------
 * PinInputField Component
 * ------------------------------------------------------------------------------------------------*/

const PinInputField = forwardRef<HTMLInputElement, PinInputFieldProps>(
  (props, _ref) => {
    const { className, index = 0, placeholder = '○', ...restProps } = props;
    const {
      values,
      setValueAtIndex,
      focusIndex,
      registerInput,
      length,
      mask,
      isDisabled,
      isInvalid,
      type,
      size,
    } = usePinInputContext();

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      registerInput(index, inputRef.current);
    }, [index, registerInput]);

    const value = values[index] || '';
    const isFilled = value.length > 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      // Only take the last character if multiple were entered
      const newValue = inputValue.slice(-1);

      // Validate for number type
      if (type === 'number' && newValue && !/^\d$/.test(newValue)) {
        return;
      }

      setValueAtIndex(index, newValue);

      // Auto-focus next field
      if (newValue && index < length - 1) {
        focusIndex(index + 1);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        if (!value && index > 0) {
          // Focus previous field when backspacing on empty field
          focusIndex(index - 1);
        } else {
          setValueAtIndex(index, '');
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        focusIndex(index - 1);
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        focusIndex(index + 1);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.select();
    };

    return (
      <input
        ref={inputRef}
        type={mask ? 'password' : 'text'}
        inputMode={type === 'number' ? 'numeric' : 'text'}
        autoComplete="one-time-code"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        disabled={isDisabled}
        placeholder={placeholder}
        aria-label={`PIN digit ${index + 1}`}
        className={cn(
          pinInputFieldVariants({ size, isInvalid, isFilled }),
          className
        )}
        {...restProps}
      />
    );
  }
);

PinInputField.displayName = 'PinInputField';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { PinInput, PinInputField, pinInputVariants, pinInputFieldVariants };
