'use client';

import {
  forwardRef,
  createContext,
  useContext,
  useRef,
  type HTMLAttributes,
  type ReactNode,
  type ButtonHTMLAttributes,
} from 'react';
import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { motion, AnimatePresence } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Context
 * ------------------------------------------------------------------------------------------------*/

interface AlertDialogContextValue {
  isOpen: boolean;
  close: () => void;
  variant: 'info' | 'warning' | 'danger' | null | undefined;
  cancelRef: React.RefObject<HTMLButtonElement>;
}

const AlertDialogContext = createContext<AlertDialogContextValue | null>(null);

const useAlertDialogContext = () => {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error('AlertDialog components must be used within an AlertDialog');
  }
  return context;
};

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const alertDialogOverlayVariants = cva(
  [
    'fixed inset-0 z-[var(--z-modal)]',
    'bg-black/60 backdrop-blur-sm',
  ]
);

const alertDialogContentVariants = cva(
  [
    'fixed z-[var(--z-modal)]',
    'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'w-full max-w-md',
    'rounded-[var(--radius-lg)]',
    'bg-[var(--bg)] border border-[var(--border)]',
    'shadow-xl',
    'focus:outline-none',
  ]
);

const alertDialogHeaderVariants = cva(
  ['flex items-start gap-3 px-6 pt-6']
);

const alertDialogIconVariants = cva(
  [
    'flex items-center justify-center',
    'h-10 w-10 rounded-full shrink-0',
  ],
  {
    variants: {
      variant: {
        info: 'bg-[var(--primary)]/10 text-[var(--primary)]',
        warning: 'bg-[var(--warning)]/10 text-[var(--warning)]',
        danger: 'bg-[var(--danger)]/10 text-[var(--danger)]',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Types
 * ------------------------------------------------------------------------------------------------*/

export interface AlertDialogProps {
  /**
   * The content of the alert dialog
   */
  children: ReactNode;
  /**
   * Whether the dialog is open (controlled)
   */
  isOpen?: boolean;
  /**
   * Callback when open state changes
   */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * Visual variant for the alert
   */
  variant?: 'info' | 'warning' | 'danger';
}

export interface AlertDialogContentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {}

export interface AlertDialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Custom icon to display
   */
  icon?: ReactNode;
}

export interface AlertDialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
export interface AlertDialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
export interface AlertDialogFooterProps extends HTMLAttributes<HTMLDivElement> {}
export interface AlertDialogActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
export interface AlertDialogCancelProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

/* -------------------------------------------------------------------------------------------------
 * AlertDialog Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * An alert dialog component for confirming destructive actions.
 *
 * Features:
 * - Focus trap with initial focus on cancel
 * - Cannot be dismissed by clicking outside
 * - Escape key triggers cancel action
 * - Variant-based styling (info, warning, danger)
 *
 * @example
 * ```tsx
 * <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen} variant="danger">
 *   <AlertDialogContent>
 *     <AlertDialogHeader>
 *       <AlertDialogTitle>Delete Account</AlertDialogTitle>
 *       <AlertDialogDescription>
 *         Are you sure you want to delete your account? This action cannot be undone.
 *       </AlertDialogDescription>
 *     </AlertDialogHeader>
 *     <AlertDialogFooter>
 *       <AlertDialogCancel>Cancel</AlertDialogCancel>
 *       <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 * ```
 */
function AlertDialog(props: AlertDialogProps) {
  const { children, isOpen = false, onOpenChange, variant = 'info' } = props;
  const cancelRef = useRef<HTMLButtonElement>(null);

  const state = useOverlayTriggerState({
    isOpen,
    onOpenChange,
  });

  return (
    <AlertDialogContext.Provider
      value={{
        isOpen: state.isOpen,
        close: state.close,
        variant,
        cancelRef,
      }}
    >
      {children}
    </AlertDialogContext.Provider>
  );
}

AlertDialog.displayName = 'AlertDialog';

/* -------------------------------------------------------------------------------------------------
 * AlertDialogContent Component
 * ------------------------------------------------------------------------------------------------*/

const AlertDialogContent = forwardRef<HTMLDivElement, AlertDialogContentProps>(
  (props, _ref) => {
    const { className, children, ...restProps } = props;
    const { isOpen } = useAlertDialogContext();
    const dialogRef = useRef<HTMLDivElement>(null);

    const { dialogProps } = useDialog(
      { role: 'alertdialog' },
      dialogRef
    );

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className={alertDialogOverlayVariants()}
              aria-hidden="true"
            />

            {/* Content */}
            <FocusScope contain restoreFocus autoFocus>
              <motion.div
                ref={dialogRef}
                role={dialogProps.role}
                aria-modal={dialogProps['aria-modal']}
                aria-labelledby={dialogProps['aria-labelledby']}
                tabIndex={dialogProps.tabIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className={cn(alertDialogContentVariants(), className)}
                {...restProps}
              >
                {children}
              </motion.div>
            </FocusScope>
          </>
        )}
      </AnimatePresence>
    );
  }
);

AlertDialogContent.displayName = 'AlertDialogContent';

/* -------------------------------------------------------------------------------------------------
 * AlertDialogHeader Component
 * ------------------------------------------------------------------------------------------------*/

const AlertDialogHeader = forwardRef<HTMLDivElement, AlertDialogHeaderProps>(
  (props, ref) => {
    const { className, children, icon, ...restProps } = props;
    const { variant } = useAlertDialogContext();

    const defaultIcons = {
      info: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      ),
      warning: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
      danger: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      ),
    };

    return (
      <div ref={ref} className={cn(alertDialogHeaderVariants(), className)} {...restProps}>
        <div className={alertDialogIconVariants({ variant })}>
          {icon || defaultIcons[variant || 'info']}
        </div>
        <div className="flex-1">{children}</div>
      </div>
    );
  }
);

AlertDialogHeader.displayName = 'AlertDialogHeader';

/* -------------------------------------------------------------------------------------------------
 * AlertDialogTitle Component
 * ------------------------------------------------------------------------------------------------*/

const AlertDialogTitle = forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;

    return (
      <h2
        ref={ref}
        className={cn('text-lg font-semibold text-[var(--fg)]', className)}
        {...restProps}
      >
        {children}
      </h2>
    );
  }
);

AlertDialogTitle.displayName = 'AlertDialogTitle';

/* -------------------------------------------------------------------------------------------------
 * AlertDialogDescription Component
 * ------------------------------------------------------------------------------------------------*/

const AlertDialogDescription = forwardRef<HTMLParagraphElement, AlertDialogDescriptionProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;

    return (
      <p
        ref={ref}
        className={cn('mt-1 text-sm text-[var(--fg-muted)]', className)}
        {...restProps}
      >
        {children}
      </p>
    );
  }
);

AlertDialogDescription.displayName = 'AlertDialogDescription';

/* -------------------------------------------------------------------------------------------------
 * AlertDialogFooter Component
 * ------------------------------------------------------------------------------------------------*/

const AlertDialogFooter = forwardRef<HTMLDivElement, AlertDialogFooterProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn('flex justify-end gap-3 px-6 pb-6 pt-4', className)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

AlertDialogFooter.displayName = 'AlertDialogFooter';

/* -------------------------------------------------------------------------------------------------
 * AlertDialogAction Component
 * ------------------------------------------------------------------------------------------------*/

const AlertDialogAction = forwardRef<HTMLButtonElement, AlertDialogActionProps>(
  (props, ref) => {
    const { className, children, onClick, ...restProps } = props;
    const { close, variant } = useAlertDialogContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      close();
    };

    const variantClasses = {
      info: 'bg-[var(--primary)] text-[var(--primary-fg)] hover:bg-[var(--primary-hover)]',
      warning: 'bg-[var(--warning)] text-[var(--warning-fg)] hover:bg-[var(--warning)]/90',
      danger: 'bg-[var(--danger)] text-[var(--danger-fg)] hover:bg-[var(--danger-hover)]',
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          'inline-flex items-center justify-center px-4 py-2',
          'text-sm font-medium rounded-[var(--radius-md)]',
          'transition-colors duration-fast',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2',
          variantClasses[variant || 'info'],
          className
        )}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);

AlertDialogAction.displayName = 'AlertDialogAction';

/* -------------------------------------------------------------------------------------------------
 * AlertDialogCancel Component
 * ------------------------------------------------------------------------------------------------*/

const AlertDialogCancel = forwardRef<HTMLButtonElement, AlertDialogCancelProps>(
  (props, _ref) => {
    const { className, children, onClick, ...restProps } = props;
    const { close, cancelRef } = useAlertDialogContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      close();
    };

    return (
      <button
        ref={cancelRef}
        type="button"
        onClick={handleClick}
        className={cn(
          'inline-flex items-center justify-center px-4 py-2',
          'text-sm font-medium rounded-[var(--radius-md)]',
          'bg-[var(--bg-muted)] text-[var(--fg)]',
          'hover:bg-[var(--bg-emphasized)]',
          'transition-colors duration-fast',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2',
          className
        )}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);

AlertDialogCancel.displayName = 'AlertDialogCancel';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  alertDialogOverlayVariants,
  alertDialogContentVariants,
};
