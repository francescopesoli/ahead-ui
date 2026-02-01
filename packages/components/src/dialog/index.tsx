'use client';

import {
  forwardRef,
  createContext,
  useContext,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { useDialog } from '@react-aria/dialog';
import { useModal, useOverlay, usePreventScroll } from '@react-aria/overlays';
import { FocusScope } from '@react-aria/focus';
import { AnimatePresence, motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Dialog Context
 * ------------------------------------------------------------------------------------------------*/

interface DialogContextValue {
  onClose?: () => void;
  isDismissable?: boolean;
}

const DialogContext = createContext<DialogContextValue>({});

const useDialogContext = () => useContext(DialogContext);

/* -------------------------------------------------------------------------------------------------
 * Dialog Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const dialogOverlayVariants = cva(
  // Base styles
  [
    'fixed inset-0 z-[var(--z-overlay)]',
    'flex items-center justify-center',
    'p-4',
  ],
  {
    variants: {
      blur: {
        none: 'bg-black/50',
        sm: 'bg-black/50 backdrop-blur-sm',
        md: 'bg-black/50 backdrop-blur-md',
        lg: 'bg-black/50 backdrop-blur-lg',
      },
    },
    defaultVariants: {
      blur: 'sm',
    },
  }
);

const dialogContentVariants = cva(
  // Base styles
  [
    'relative z-[var(--z-modal)]',
    'bg-[var(--bg)] rounded-[var(--radius-lg)]',
    'shadow-2xl',
    'w-full',
    'outline-none',
    'max-h-[85vh] overflow-auto',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        full: 'max-w-[95vw] max-h-[95vh]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Dialog Types
 * ------------------------------------------------------------------------------------------------*/

export interface DialogProps
  extends VariantProps<typeof dialogContentVariants>,
    VariantProps<typeof dialogOverlayVariants> {
  /**
   * Whether the dialog is open
   */
  isOpen: boolean;
  /**
   * Callback when the dialog should close
   */
  onClose?: () => void;
  /**
   * Dialog content
   */
  children: ReactNode;
  /**
   * Whether clicking outside closes the dialog
   */
  isDismissable?: boolean;
  /**
   * Whether pressing Escape closes the dialog
   */
  isKeyboardDismissDisabled?: boolean;
  /**
   * ARIA role (dialog or alertdialog)
   */
  role?: 'dialog' | 'alertdialog';
  /**
   * Accessible title (required for accessibility)
   */
  'aria-label'?: string;
  /**
   * ID of element that labels the dialog
   */
  'aria-labelledby'?: string;
}

/* -------------------------------------------------------------------------------------------------
 * Dialog Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * An accessible modal dialog component.
 *
 * Features:
 * - Focus trap (focus stays within dialog)
 * - Escape key to close
 * - Click outside to close (optional)
 * - Scroll lock when open
 * - Animated with Framer Motion
 *
 * Uses compound component pattern:
 * - Dialog.Header
 * - Dialog.Title
 * - Dialog.Description
 * - Dialog.Body
 * - Dialog.Footer
 * - Dialog.CloseButton
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
 *
 * <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *   <Dialog.Header>
 *     <Dialog.Title>Confirm Action</Dialog.Title>
 *     <Dialog.Description>
 *       Are you sure you want to continue?
 *     </Dialog.Description>
 *   </Dialog.Header>
 *   <Dialog.Body>
 *     Dialog content here
 *   </Dialog.Body>
 *   <Dialog.Footer>
 *     <Button variant="ghost" onClick={() => setIsOpen(false)}>
 *       Cancel
 *     </Button>
 *     <Button>Confirm</Button>
 *   </Dialog.Footer>
 * </Dialog>
 * ```
 */
const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (props, _ref) => {
    const {
      isOpen,
      onClose,
      children,
      size,
      blur,
      isDismissable = true,
      isKeyboardDismissDisabled = false,
      role = 'dialog',
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
    } = props;

    const overlayRef = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);

    // Prevent body scroll when dialog is open
    usePreventScroll({ isDisabled: !isOpen });

    // Overlay behavior (click outside, escape key)
    const { underlayProps } = useOverlay(
      {
        isOpen,
        onClose,
        isDismissable,
        isKeyboardDismissDisabled,
        shouldCloseOnBlur: false,
      },
      overlayRef
    );

    // Modal behavior (hide content behind)
    const { modalProps } = useModal();

    // Dialog behavior (ARIA attributes)
    const { dialogProps } = useDialog(
      {
        role,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
      },
      dialogRef
    );

    // Extract only ARIA props to avoid conflicts with Framer Motion
    const overlayAriaProps = {
      onKeyDown: underlayProps.onKeyDown,
    };
    const dialogAriaProps = {
      ...dialogProps,
      'aria-modal': modalProps['aria-modal'],
    };

    // Animation variants
    const overlayAnimation = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    };

    const contentAnimation = {
      initial: { opacity: 0, scale: 0.95, y: 10 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: 10 },
    };

    return (
      <DialogContext.Provider value={{ onClose, isDismissable }}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={overlayRef}
              className={cn(dialogOverlayVariants({ blur }))}
              onKeyDown={overlayAriaProps.onKeyDown}
              variants={overlayAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              <FocusScope contain restoreFocus autoFocus>
                <motion.div
                  ref={dialogRef}
                  className={cn(dialogContentVariants({ size }))}
                  role={dialogAriaProps.role}
                  aria-label={dialogAriaProps['aria-label']}
                  aria-labelledby={dialogAriaProps['aria-labelledby']}
                  aria-describedby={dialogAriaProps['aria-describedby']}
                  aria-modal={dialogAriaProps['aria-modal']}
                  tabIndex={dialogAriaProps.tabIndex}
                  variants={contentAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                  }}
                >
                  {children}
                </motion.div>
              </FocusScope>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContext.Provider>
    );
  }
);

Dialog.displayName = 'Dialog';

/* -------------------------------------------------------------------------------------------------
 * Dialog.Header
 * ------------------------------------------------------------------------------------------------*/

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;
    const { onClose, isDismissable } = useDialogContext();

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-1.5 p-6 pb-0',
          'relative',
          className
        )}
        {...restProps}
      >
        {children}
        {isDismissable && onClose && (
          <button
            type="button"
            onClick={onClose}
            className={cn(
              'absolute right-4 top-4 p-1',
              'rounded-[var(--radius-sm)]',
              'text-[var(--fg-muted)] hover:text-[var(--fg)]',
              'hover:bg-[var(--bg-subtle)]',
              'transition-colors duration-fast',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]'
            )}
            aria-label="Close dialog"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

DialogHeader.displayName = 'DialogHeader';

/* -------------------------------------------------------------------------------------------------
 * Dialog.Title
 * ------------------------------------------------------------------------------------------------*/

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  (props, ref) => {
    const { className, as: Component = 'h2', ...restProps } = props;

    return (
      <Component
        ref={ref}
        className={cn(
          'text-lg font-semibold text-[var(--fg)]',
          className
        )}
        {...restProps}
      />
    );
  }
);

DialogTitle.displayName = 'DialogTitle';

/* -------------------------------------------------------------------------------------------------
 * Dialog.Description
 * ------------------------------------------------------------------------------------------------*/

export interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <p
        ref={ref}
        className={cn('text-sm text-[var(--fg-muted)]', className)}
        {...restProps}
      />
    );
  }
);

DialogDescription.displayName = 'DialogDescription';

/* -------------------------------------------------------------------------------------------------
 * Dialog.Body
 * ------------------------------------------------------------------------------------------------*/

export interface DialogBodyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn('p-6', className)}
        {...restProps}
      />
    );
  }
);

DialogBody.displayName = 'DialogBody';

/* -------------------------------------------------------------------------------------------------
 * Dialog.Footer
 * ------------------------------------------------------------------------------------------------*/

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-end gap-3 p-6 pt-0',
          className
        )}
        {...restProps}
      />
    );
  }
);

DialogFooter.displayName = 'DialogFooter';

/* -------------------------------------------------------------------------------------------------
 * Close Icon
 * ------------------------------------------------------------------------------------------------*/

function CloseIcon({ className }: { className?: string }) {
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

// Attach compound components
const DialogNamespace = Object.assign(Dialog, {
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Body: DialogBody,
  Footer: DialogFooter,
});

export { DialogNamespace as Dialog, dialogOverlayVariants, dialogContentVariants };
