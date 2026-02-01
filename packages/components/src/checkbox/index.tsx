'use client';

import {
  forwardRef,
  useId,
  useRef,
  useImperativeHandle,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { useCheckbox } from '@react-aria/checkbox';
import { useFocusRing } from '@react-aria/focus';
import { useToggleState } from '@react-stately/toggle';
import { mergeProps } from '@react-aria/utils';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Checkbox Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const checkboxVariants = cva(
  // Base styles
  [
    'relative inline-flex items-center justify-center shrink-0',
    'border-2 rounded-[var(--radius-sm)]',
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
          'data-[state=checked]:bg-[var(--primary)] data-[state=checked]:border-[var(--primary)]',
          'data-[state=indeterminate]:bg-[var(--primary)] data-[state=indeterminate]:border-[var(--primary)]',
        ],
        success: [
          'border-[var(--border-emphasized)]',
          'data-[state=checked]:bg-[var(--success)] data-[state=checked]:border-[var(--success)]',
          'data-[state=indeterminate]:bg-[var(--success)] data-[state=indeterminate]:border-[var(--success)]',
        ],
        danger: [
          'border-[var(--border-emphasized)]',
          'data-[state=checked]:bg-[var(--danger)] data-[state=checked]:border-[var(--danger)]',
          'data-[state=indeterminate]:bg-[var(--danger)] data-[state=indeterminate]:border-[var(--danger)]',
        ],
        accent: [
          'border-[var(--border-emphasized)]',
          'data-[state=checked]:bg-[var(--accent)] data-[state=checked]:border-[var(--accent)]',
          'data-[state=indeterminate]:bg-[var(--accent)] data-[state=indeterminate]:border-[var(--accent)]',
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

/* -------------------------------------------------------------------------------------------------
 * Checkbox Types
 * ------------------------------------------------------------------------------------------------*/

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>,
    VariantProps<typeof checkboxVariants> {
  /**
   * Whether the checkbox is selected (controlled)
   */
  isSelected?: boolean;
  /**
   * Default selected state (uncontrolled)
   */
  defaultSelected?: boolean;
  /**
   * Whether the checkbox is in an indeterminate state
   */
  isIndeterminate?: boolean;
  /**
   * Handler called when selection changes
   */
  onChange?: (isSelected: boolean) => void;
  /**
   * Label for the checkbox
   */
  label?: ReactNode;
  /**
   * Description below the label
   */
  description?: ReactNode;
  /**
   * Whether the checkbox is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether the checkbox is read-only
   */
  isReadOnly?: boolean;
  /**
   * Whether the checkbox is in an invalid state
   */
  isInvalid?: boolean;
}

/* -------------------------------------------------------------------------------------------------
 * Checkbox Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * An accessible checkbox component.
 *
 * Features:
 * - Full keyboard navigation (Space to toggle)
 * - Screen reader support
 * - Indeterminate state support
 * - Animated checkmark with Framer Motion
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Checkbox label="Accept terms" />
 *
 * // Controlled
 * const [checked, setChecked] = useState(false);
 * <Checkbox 
 *   isSelected={checked} 
 *   onChange={setChecked}
 *   label="Remember me"
 * />
 *
 * // Indeterminate (for "select all" patterns)
 * <Checkbox isIndeterminate label="Select all" />
 * ```
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const {
      className,
      size,
      colorScheme,
      label,
      description,
      isSelected,
      defaultSelected,
      isIndeterminate,
      onChange,
      isDisabled,
      isReadOnly,
      isInvalid,
      id: idProp,
      value,
    } = props;

    // Generate unique ID
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const descriptionId = `${id}-description`;

    // Internal ref for React Aria
    const inputRef = useRef<HTMLInputElement>(null);

    // Forward the ref
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    // Use toggle state
    const state = useToggleState({
      isSelected,
      defaultSelected,
      onChange,
      isDisabled,
      isReadOnly,
    });

    // React Aria checkbox hook
    const { inputProps } = useCheckbox(
      {
        'aria-describedby': description ? descriptionId : undefined,
        isDisabled,
        isReadOnly,
        isIndeterminate,
        value: typeof value === 'string' ? value : undefined,
      },
      state,
      inputRef
    );

    // Focus ring
    const { focusProps, isFocusVisible } = useFocusRing();

    // Determine visual state
    const visualState = isIndeterminate
      ? 'indeterminate'
      : state.isSelected
      ? 'checked'
      : 'unchecked';

    return (
      <label
        className={cn(
          'inline-flex items-start gap-3 cursor-pointer',
          isDisabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        {/* Hidden input for accessibility */}
        <VisuallyHidden>
          <input
            {...mergeProps(inputProps, focusProps)}
            ref={inputRef}
          />
        </VisuallyHidden>

        {/* Visual checkbox */}
        <span
          className={cn(
            checkboxVariants({ size, colorScheme, isInvalid }),
            isFocusVisible && 'ring-2 ring-[var(--ring)] ring-offset-2 ring-offset-[var(--ring-offset)]'
          )}
          data-state={visualState}
          data-disabled={isDisabled || undefined}
          data-readonly={isReadOnly || undefined}
          data-invalid={isInvalid || undefined}
        >
          {/* Animated check/indeterminate icon */}
          <AnimatePresence mode="wait">
            {visualState === 'checked' && (
              <motion.svg
                key="check"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={cn(
                  'text-white',
                  size === 'sm' && 'h-3 w-3',
                  size === 'md' && 'h-3.5 w-3.5',
                  size === 'lg' && 'h-4 w-4'
                )}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.path
                  d="M5 12l5 5L20 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                />
              </motion.svg>
            )}
            {visualState === 'indeterminate' && (
              <motion.svg
                key="indeterminate"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={cn(
                  'text-white',
                  size === 'sm' && 'h-3 w-3',
                  size === 'md' && 'h-3.5 w-3.5',
                  size === 'lg' && 'h-4 w-4'
                )}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
              >
                <line x1="6" y1="12" x2="18" y2="12" />
              </motion.svg>
            )}
          </AnimatePresence>
        </span>

        {/* Label and description */}
        {(label || description) && (
          <span className="flex flex-col gap-0.5">
            {label && (
              <span className="text-sm font-medium text-[var(--fg)]">
                {label}
              </span>
            )}
            {description && (
              <span
                id={descriptionId}
                className="text-sm text-[var(--fg-muted)]"
              >
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Checkbox, checkboxVariants };
