'use client';

import {
  forwardRef,
  useId,
  useRef,
  useEffect,
  useCallback,
  type TextareaHTMLAttributes,
  type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Textarea Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const textareaVariants = cva(
  // Base styles
  [
    'flex w-full rounded-[var(--radius-md)]',
    'bg-[var(--bg)] text-[var(--fg)]',
    'border border-[var(--border)]',
    'placeholder:text-[var(--fg-muted)]',
    'transition-colors duration-fast ease-out',
    'focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[var(--ring-offset)]',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'resize-none',
  ],
  {
    variants: {
      size: {
        sm: 'min-h-[60px] px-3 py-2 text-sm',
        md: 'min-h-[80px] px-3 py-2.5 text-base',
        lg: 'min-h-[100px] px-4 py-3 text-lg',
      },
      variant: {
        default: [
          'border-[var(--border)]',
          'hover:border-[var(--border-emphasized)]',
          'focus:border-[var(--primary)]',
        ],
        filled: [
          'bg-[var(--bg-muted)] border-transparent',
          'hover:bg-[var(--bg-subtle)]',
          'focus:bg-[var(--bg)] focus:border-[var(--primary)]',
        ],
        ghost: [
          'border-transparent bg-transparent',
          'hover:bg-[var(--bg-muted)]',
          'focus:bg-[var(--bg-muted)] focus:border-[var(--primary)]',
        ],
      },
      isInvalid: {
        true: [
          'border-[var(--danger)]',
          'focus:ring-[var(--danger)]',
        ],
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      resize: 'none',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Textarea Types
 * ------------------------------------------------------------------------------------------------*/

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  /**
   * Label for the textarea
   */
  label?: ReactNode;
  /**
   * Helper text below the textarea
   */
  helperText?: ReactNode;
  /**
   * Error message (makes the textarea invalid)
   */
  errorMessage?: ReactNode;
  /**
   * Whether to auto-resize based on content
   */
  autoResize?: boolean;
  /**
   * Maximum height when auto-resizing (in pixels)
   */
  maxAutoHeight?: number;
}

/* -------------------------------------------------------------------------------------------------
 * Textarea Component
 * ------------------------------------------------------------------------------------------------*/

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const {
      className,
      size,
      variant,
      resize,
      isInvalid: isInvalidProp,
      label,
      helperText,
      errorMessage,
      autoResize,
      maxAutoHeight = 300,
      id: idProp,
      onChange,
      ...restProps
    } = props;

    const generatedId = useId();
    const id = idProp ?? generatedId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;

    const isInvalid = isInvalidProp || !!errorMessage;

    // Auto-resize logic
    const adjustHeight = useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea || !autoResize) return;

      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, maxAutoHeight);
      textarea.style.height = `${newHeight}px`;
    }, [autoResize, maxAutoHeight, textareaRef]);

    useEffect(() => {
      adjustHeight();
    }, [adjustHeight, restProps.value, restProps.defaultValue]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);
      adjustHeight();
    };

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-[var(--fg)]"
          >
            {label}
          </label>
        )}

        <textarea
          ref={textareaRef}
          id={id}
          className={cn(
            textareaVariants({ size, variant, isInvalid, resize: autoResize ? 'none' : resize }),
            className
          )}
          aria-invalid={isInvalid || undefined}
          aria-describedby={
            errorMessage ? errorId : helperText ? helperId : undefined
          }
          onChange={handleChange}
          {...restProps}
        />

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
);

Textarea.displayName = 'Textarea';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Textarea, textareaVariants };
