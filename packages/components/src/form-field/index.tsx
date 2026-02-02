'use client';

import {
  forwardRef,
  createContext,
  useContext,
  useId,
  type HTMLAttributes,
  type ReactNode,
  type LabelHTMLAttributes,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * FormField Context
 * ------------------------------------------------------------------------------------------------*/

interface FormFieldContextValue {
  id: string;
  labelId: string;
  helperId: string;
  errorId: string;
  isRequired: boolean;
  isDisabled: boolean;
  isInvalid: boolean;
  isReadOnly: boolean;
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

const useFormFieldContext = () => {
  const context = useContext(FormFieldContext);
  return context;
};

/* -------------------------------------------------------------------------------------------------
 * FormField Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const formFieldVariants = cva(
  ['flex flex-col gap-1.5'],
  {
    variants: {
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * FormField Types
 * ------------------------------------------------------------------------------------------------*/

export interface FormFieldProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formFieldVariants> {
  /**
   * Whether the field is required
   */
  isRequired?: boolean;
  /**
   * Whether the field is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether the field is invalid
   */
  isInvalid?: boolean;
  /**
   * Whether the field is read-only
   */
  isReadOnly?: boolean;
}

export interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Custom required indicator
   */
  requiredIndicator?: ReactNode;
  /**
   * Optional indicator for non-required fields
   */
  optionalIndicator?: ReactNode;
}

export interface FormHelperTextProps extends HTMLAttributes<HTMLParagraphElement> {}

export interface FormErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {}

/* -------------------------------------------------------------------------------------------------
 * FormField Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A form field wrapper that provides context for label, input, helper text, and error message.
 *
 * Features:
 * - Automatic ID generation for accessibility
 * - Shared state for required, disabled, invalid, and read-only
 * - Consistent spacing and layout
 *
 * @example
 * ```tsx
 * <FormField isRequired>
 *   <FormLabel>Email</FormLabel>
 *   <Input type="email" />
 *   <FormHelperText>We'll never share your email.</FormHelperText>
 * </FormField>
 *
 * // With error
 * <FormField isInvalid>
 *   <FormLabel>Password</FormLabel>
 *   <Input type="password" />
 *   <FormErrorMessage>Password is required</FormErrorMessage>
 * </FormField>
 * ```
 */
const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (props, ref) => {
    const {
      className,
      children,
      size,
      isRequired = false,
      isDisabled = false,
      isInvalid = false,
      isReadOnly = false,
      ...restProps
    } = props;

    const generatedId = useId();
    const id = `field-${generatedId}`;

    const contextValue: FormFieldContextValue = {
      id,
      labelId: `${id}-label`,
      helperId: `${id}-helper`,
      errorId: `${id}-error`,
      isRequired,
      isDisabled,
      isInvalid,
      isReadOnly,
    };

    return (
      <FormFieldContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="group"
          className={cn(formFieldVariants({ size }), className)}
          data-disabled={isDisabled || undefined}
          data-invalid={isInvalid || undefined}
          data-readonly={isReadOnly || undefined}
          {...restProps}
        >
          {children}
        </div>
      </FormFieldContext.Provider>
    );
  }
);

FormField.displayName = 'FormField';

/* -------------------------------------------------------------------------------------------------
 * FormLabel Component
 * ------------------------------------------------------------------------------------------------*/

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  (props, ref) => {
    const {
      className,
      children,
      requiredIndicator = <span className="text-[var(--danger)] ml-0.5">*</span>,
      optionalIndicator,
      ...restProps
    } = props;

    const context = useFormFieldContext();

    return (
      <label
        ref={ref}
        id={context?.labelId}
        htmlFor={context?.id}
        className={cn(
          'text-sm font-medium text-[var(--fg)]',
          context?.isDisabled && 'opacity-70 cursor-not-allowed',
          className
        )}
        {...restProps}
      >
        {children}
        {context?.isRequired && requiredIndicator}
        {!context?.isRequired && optionalIndicator}
      </label>
    );
  }
);

FormLabel.displayName = 'FormLabel';

/* -------------------------------------------------------------------------------------------------
 * FormHelperText Component
 * ------------------------------------------------------------------------------------------------*/

const FormHelperText = forwardRef<HTMLParagraphElement, FormHelperTextProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;
    const context = useFormFieldContext();

    // Don't render if there's an error (error message takes precedence)
    if (context?.isInvalid) {
      return null;
    }

    return (
      <p
        ref={ref}
        id={context?.helperId}
        className={cn('text-sm text-[var(--fg-muted)]', className)}
        {...restProps}
      >
        {children}
      </p>
    );
  }
);

FormHelperText.displayName = 'FormHelperText';

/* -------------------------------------------------------------------------------------------------
 * FormErrorMessage Component
 * ------------------------------------------------------------------------------------------------*/

const FormErrorMessage = forwardRef<HTMLParagraphElement, FormErrorMessageProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;
    const context = useFormFieldContext();

    // Only render if invalid
    if (!context?.isInvalid) {
      return null;
    }

    return (
      <p
        ref={ref}
        id={context?.errorId}
        role="alert"
        aria-live="polite"
        className={cn('text-sm text-[var(--danger)]', className)}
        {...restProps}
      >
        {children}
      </p>
    );
  }
);

FormErrorMessage.displayName = 'FormErrorMessage';

/* -------------------------------------------------------------------------------------------------
 * Hook for consuming form field context
 * ------------------------------------------------------------------------------------------------*/

/**
 * Hook to access FormField context values.
 * Useful for building custom form components that integrate with FormField.
 */
function useFormField() {
  const context = useFormFieldContext();

  if (!context) {
    return {
      id: undefined,
      'aria-describedby': undefined,
      'aria-invalid': undefined,
      'aria-required': undefined,
      disabled: undefined,
      readOnly: undefined,
    };
  }

  const describedBy = [
    context.isInvalid ? context.errorId : context.helperId,
  ].filter(Boolean).join(' ') || undefined;

  return {
    id: context.id,
    'aria-describedby': describedBy,
    'aria-invalid': context.isInvalid || undefined,
    'aria-required': context.isRequired || undefined,
    disabled: context.isDisabled || undefined,
    readOnly: context.isReadOnly || undefined,
  };
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export {
  FormField,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  useFormField,
  formFieldVariants,
};
