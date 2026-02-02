'use client';

import {
  forwardRef,
  createContext,
  useContext,
  useId,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { useRadioGroup, useRadio } from '@react-aria/radio';
import { useFocusRing } from '@react-aria/focus';
import { useRadioGroupState } from '@react-stately/radio';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * RadioGroup Context
 * ------------------------------------------------------------------------------------------------*/

interface RadioGroupContextValue {
  state: ReturnType<typeof useRadioGroupState>;
  size: 'sm' | 'md' | 'lg';
  colorScheme: 'primary' | 'success' | 'danger' | 'accent';
  isDisabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('Radio must be used within a RadioGroup');
  }
  return context;
};

/* -------------------------------------------------------------------------------------------------
 * Radio Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const radioVariants = cva(
  [
    'relative inline-flex items-center justify-center shrink-0',
    'border-2 rounded-full',
    'transition-colors duration-fast ease-out',
    'cursor-pointer',
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
      colorScheme: {
        primary: [
          'border-[var(--border-emphasized)]',
          'data-[state=checked]:border-[var(--primary)]',
        ],
        success: [
          'border-[var(--border-emphasized)]',
          'data-[state=checked]:border-[var(--success)]',
        ],
        danger: [
          'border-[var(--border-emphasized)]',
          'data-[state=checked]:border-[var(--danger)]',
        ],
        accent: [
          'border-[var(--border-emphasized)]',
          'data-[state=checked]:border-[var(--accent)]',
        ],
      },
      isInvalid: {
        true: 'border-[var(--danger)]',
      },
    },
    defaultVariants: {
      size: 'md',
      colorScheme: 'primary',
    },
  }
);

const radioDotVariants = cva(
  ['rounded-full'],
  {
    variants: {
      size: {
        sm: 'h-2 w-2',
        md: 'h-2.5 w-2.5',
        lg: 'h-3 w-3',
      },
      colorScheme: {
        primary: 'bg-[var(--primary)]',
        success: 'bg-[var(--success)]',
        danger: 'bg-[var(--danger)]',
        accent: 'bg-[var(--accent)]',
      },
    },
    defaultVariants: {
      size: 'md',
      colorScheme: 'primary',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * RadioGroup Types
 * ------------------------------------------------------------------------------------------------*/

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Label for the radio group
   */
  label?: ReactNode;
  /**
   * The controlled value
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
   * Size of the radios
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Color scheme
   */
  colorScheme?: 'primary' | 'success' | 'danger' | 'accent';
  /**
   * Whether the group is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether the group is read-only
   */
  isReadOnly?: boolean;
  /**
   * Whether the group is required
   */
  isRequired?: boolean;
  /**
   * Orientation of the radio group
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Error message
   */
  errorMessage?: ReactNode;
  /**
   * Description text
   */
  description?: ReactNode;
  /**
   * Name for form submission
   */
  name?: string;
}

export interface RadioProps extends Omit<HTMLAttributes<HTMLLabelElement>, 'children'> {
  /**
   * Value of this radio option
   */
  value: string;
  /**
   * Label for the radio
   */
  children?: ReactNode;
  /**
   * Description below the label
   */
  description?: ReactNode;
  /**
   * Whether this radio is disabled
   */
  isDisabled?: boolean;
}

/* -------------------------------------------------------------------------------------------------
 * RadioGroup Component
 * ------------------------------------------------------------------------------------------------*/

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (props, ref) => {
    const {
      className,
      label,
      value,
      defaultValue,
      onChange,
      size = 'md',
      colorScheme = 'primary',
      isDisabled,
      isReadOnly,
      isRequired,
      orientation = 'vertical',
      errorMessage,
      description,
      name,
      children,
      ...restProps
    } = props;

    const state = useRadioGroupState({
      value,
      defaultValue,
      onChange,
      isDisabled,
      isReadOnly,
      isRequired,
      name,
    });

    const { radioGroupProps, labelProps, descriptionProps, errorMessageProps } = useRadioGroup(
      {
        label,
        value,
        defaultValue,
        onChange,
        isDisabled,
        isReadOnly,
        isRequired,
        name,
        orientation,
        errorMessage,
        description,
      },
      state
    );

    return (
      <RadioGroupContext.Provider value={{ state, size, colorScheme, isDisabled }}>
        <div
          ref={ref}
          {...radioGroupProps}
          className={cn('flex flex-col gap-2', className)}
          {...restProps}
        >
          {label && (
            <span {...labelProps} className="text-sm font-medium text-[var(--fg)]">
              {label}
              {isRequired && <span className="text-[var(--danger)] ml-1">*</span>}
            </span>
          )}
          {description && (
            <span {...descriptionProps} className="text-sm text-[var(--fg-muted)]">
              {description}
            </span>
          )}
          <div
            className={cn(
              'flex gap-3',
              orientation === 'vertical' && 'flex-col',
              orientation === 'horizontal' && 'flex-row flex-wrap'
            )}
          >
            {children}
          </div>
          {errorMessage && (
            <span {...errorMessageProps} className="text-sm text-[var(--danger)]">
              {errorMessage}
            </span>
          )}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

/* -------------------------------------------------------------------------------------------------
 * Radio Component
 * ------------------------------------------------------------------------------------------------*/

const Radio = forwardRef<HTMLLabelElement, RadioProps>(
  (props, ref) => {
    const { className, value, children, description, isDisabled: isDisabledProp, ...restProps } = props;
    const { state, size, colorScheme, isDisabled: groupDisabled } = useRadioGroupContext();

    const inputRef = useRef<HTMLInputElement>(null);
    const descriptionId = useId();

    const isDisabled = isDisabledProp || groupDisabled;
    const isSelected = state.selectedValue === value;

    const { inputProps } = useRadio(
      {
        value,
        isDisabled,
        'aria-describedby': description ? descriptionId : undefined,
      },
      state,
      inputRef
    );

    const { focusProps, isFocusVisible } = useFocusRing();

    return (
      <label
        ref={ref}
        className={cn(
          'inline-flex items-start gap-3 cursor-pointer',
          isDisabled && 'cursor-not-allowed opacity-50',
          className
        )}
        {...restProps}
      >
        <VisuallyHidden>
          <input {...inputProps} {...focusProps} ref={inputRef} />
        </VisuallyHidden>

        <span
          className={cn(
            radioVariants({ size, colorScheme }),
            isFocusVisible && 'ring-2 ring-[var(--ring)] ring-offset-2 ring-offset-[var(--ring-offset)]'
          )}
          data-state={isSelected ? 'checked' : 'unchecked'}
          data-disabled={isDisabled || undefined}
        >
          {isSelected && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={radioDotVariants({ size, colorScheme })}
            />
          )}
        </span>

        {(children || description) && (
          <span className="flex flex-col gap-0.5">
            {children && (
              <span className="text-sm font-medium text-[var(--fg)]">{children}</span>
            )}
            {description && (
              <span id={descriptionId} className="text-sm text-[var(--fg-muted)]">
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { RadioGroup, Radio, radioVariants, radioDotVariants };
