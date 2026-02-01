'use client';

import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { useSwitch } from '@react-aria/switch';
import { useFocusRing } from '@react-aria/focus';
import { useToggleState } from '@react-stately/toggle';
import { mergeProps } from '@react-aria/utils';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from '@ahead-ui/core';
import { useRef } from 'react';

/* -------------------------------------------------------------------------------------------------
 * Switch Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const switchTrackVariants = cva(
  // Base styles
  [
    'relative inline-flex shrink-0 cursor-pointer',
    'rounded-full border-2 border-transparent',
    'transition-colors duration-fast ease-out',
    'focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)]',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
      colorScheme: {
        primary: 'data-[state=checked]:bg-[var(--primary)] bg-[var(--bg-emphasized)]',
        success: 'data-[state=checked]:bg-[var(--success)] bg-[var(--bg-emphasized)]',
        danger: 'data-[state=checked]:bg-[var(--danger)] bg-[var(--bg-emphasized)]',
        accent: 'data-[state=checked]:bg-[var(--accent)] bg-[var(--bg-emphasized)]',
      },
    },
    defaultVariants: {
      size: 'md',
      colorScheme: 'primary',
    },
  }
);

const switchThumbVariants = cva(
  // Base styles
  [
    'pointer-events-none block rounded-full bg-white shadow-lg',
    'ring-0 transition-transform duration-fast ease-out',
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Switch Types
 * ------------------------------------------------------------------------------------------------*/

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>,
    VariantProps<typeof switchTrackVariants> {
  /**
   * Whether the switch is selected (controlled)
   */
  isSelected?: boolean;
  /**
   * Default selected state (uncontrolled)
   */
  defaultSelected?: boolean;
  /**
   * Handler called when selection changes
   */
  onChange?: (isSelected: boolean) => void;
  /**
   * Label for the switch
   */
  label?: ReactNode;
  /**
   * Description below the label
   */
  description?: ReactNode;
  /**
   * Whether the switch is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether the switch is read-only
   */
  isReadOnly?: boolean;
}

/* -------------------------------------------------------------------------------------------------
 * Switch Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * An accessible switch/toggle component.
 *
 * Features:
 * - Full keyboard navigation (Space to toggle)
 * - Screen reader support
 * - Controlled and uncontrolled modes
 * - Animated thumb with Framer Motion
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Switch label="Enable notifications" />
 *
 * // Controlled
 * const [enabled, setEnabled] = useState(false);
 * <Switch 
 *   isSelected={enabled} 
 *   onChange={setEnabled}
 *   label="Dark mode"
 * />
 *
 * // With description
 * <Switch
 *   label="Email notifications"
 *   description="Receive emails about your account activity"
 * />
 * ```
 */
const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (props, _forwardedRef) => {
    const {
      className,
      size,
      colorScheme,
      label,
      description,
      isSelected,
      defaultSelected,
      onChange,
      isDisabled,
      isReadOnly,
      id: idProp,
      value,
    } = props;

    // Generate unique ID
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const descriptionId = `${id}-description`;

    // Internal ref for React Aria
    const inputRef = useRef<HTMLInputElement>(null);

    // Use toggle state
    const state = useToggleState({
      isSelected,
      defaultSelected,
      onChange,
      isDisabled,
      isReadOnly,
    });

    // React Aria switch hook
    const { inputProps } = useSwitch(
      {
        'aria-describedby': description ? descriptionId : undefined,
        isDisabled,
        isReadOnly,
        value: typeof value === 'string' ? value : undefined,
      },
      state,
      inputRef
    );

    // Focus ring
    const { focusProps, isFocusVisible } = useFocusRing();

    // Thumb position based on size
    const thumbTranslate = {
      sm: state.isSelected ? 16 : 0,
      md: state.isSelected ? 20 : 0,
      lg: state.isSelected ? 28 : 0,
    };

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

        {/* Visual switch track */}
        <span
          className={cn(
            switchTrackVariants({ size, colorScheme }),
            isFocusVisible && 'ring-2 ring-[var(--ring)] ring-offset-2 ring-offset-[var(--ring-offset)]'
          )}
          data-state={state.isSelected ? 'checked' : 'unchecked'}
          data-disabled={isDisabled || undefined}
          data-readonly={isReadOnly || undefined}
        >
          {/* Animated thumb */}
          <motion.span
            className={cn(switchThumbVariants({ size }))}
            initial={false}
            animate={{
              x: thumbTranslate[size || 'md'],
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
          />
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

Switch.displayName = 'Switch';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Switch, switchTrackVariants, switchThumbVariants };
