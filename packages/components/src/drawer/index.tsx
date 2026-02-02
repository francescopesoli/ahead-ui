'use client';

import {
  forwardRef,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { useDialog } from '@react-aria/dialog';
import { useModal, useOverlay, usePreventScroll } from '@react-aria/overlays';
import { FocusScope } from '@react-aria/focus';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Drawer Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const drawerOverlayVariants = cva(
  ['fixed inset-0 z-50 bg-black/50']
);

const drawerContentVariants = cva(
  [
    'fixed z-50 flex flex-col',
    'bg-[var(--bg)] shadow-xl',
    'focus:outline-none',
  ],
  {
    variants: {
      placement: {
        left: 'inset-y-0 left-0 h-full w-full max-w-sm border-r border-[var(--border)]',
        right: 'inset-y-0 right-0 h-full w-full max-w-sm border-l border-[var(--border)]',
        top: 'inset-x-0 top-0 w-full max-h-[85vh] border-b border-[var(--border)]',
        bottom: 'inset-x-0 bottom-0 w-full max-h-[85vh] border-t border-[var(--border)]',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        full: '',
      },
    },
    compoundVariants: [
      { placement: 'left', size: 'sm', className: 'max-w-xs' },
      { placement: 'left', size: 'md', className: 'max-w-sm' },
      { placement: 'left', size: 'lg', className: 'max-w-lg' },
      { placement: 'left', size: 'full', className: 'max-w-full' },
      { placement: 'right', size: 'sm', className: 'max-w-xs' },
      { placement: 'right', size: 'md', className: 'max-w-sm' },
      { placement: 'right', size: 'lg', className: 'max-w-lg' },
      { placement: 'right', size: 'full', className: 'max-w-full' },
      { placement: 'top', size: 'sm', className: 'max-h-[30vh]' },
      { placement: 'top', size: 'md', className: 'max-h-[50vh]' },
      { placement: 'top', size: 'lg', className: 'max-h-[70vh]' },
      { placement: 'top', size: 'full', className: 'max-h-screen' },
      { placement: 'bottom', size: 'sm', className: 'max-h-[30vh]' },
      { placement: 'bottom', size: 'md', className: 'max-h-[50vh]' },
      { placement: 'bottom', size: 'lg', className: 'max-h-[70vh]' },
      { placement: 'bottom', size: 'full', className: 'max-h-screen' },
    ],
    defaultVariants: {
      placement: 'right',
      size: 'md',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Drawer Types
 * ------------------------------------------------------------------------------------------------*/

export interface DrawerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'>,
    VariantProps<typeof drawerContentVariants> {
  /**
   * Whether the drawer is open
   */
  isOpen: boolean;
  /**
   * Callback when the drawer should close
   */
  onClose: () => void;
  /**
   * Whether the drawer is dismissable by clicking outside
   */
  isDismissable?: boolean;
  /**
   * Whether to close on escape key
   */
  isKeyboardDismissDisabled?: boolean;
  /**
   * Content of the drawer
   */
  children: ReactNode;
  /**
   * Aria label
   */
  'aria-label'?: string;
  /**
   * Aria labelledby
   */
  'aria-labelledby'?: string;
}

export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export interface DrawerBodyProps extends HTMLAttributes<HTMLDivElement> {}
export interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {}

/* -------------------------------------------------------------------------------------------------
 * Animation Variants
 * ------------------------------------------------------------------------------------------------*/

const slideVariants = {
  left: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
  },
  right: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  },
  top: {
    initial: { y: '-100%' },
    animate: { y: 0 },
    exit: { y: '-100%' },
  },
  bottom: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
  },
};

/* -------------------------------------------------------------------------------------------------
 * Drawer Component
 * ------------------------------------------------------------------------------------------------*/

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (props, _ref) => {
    const {
      className,
      placement = 'right',
      size,
      isOpen,
      onClose,
      isDismissable = true,
      isKeyboardDismissDisabled = false,
      children,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      id,
    } = props;

    const overlayRef = useRef<HTMLDivElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);

    // Prevent body scroll when drawer is open
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
        role: 'dialog',
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
      },
      drawerRef
    );

    // Extract only ARIA props to avoid conflicts with Framer Motion
    const overlayAriaProps = {
      onKeyDown: underlayProps.onKeyDown,
    };
    const dialogAriaProps = {
      ...dialogProps,
      'aria-modal': modalProps['aria-modal'],
    };

    const placementKey = placement ?? 'right';
    const variants = slideVariants[placementKey];

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={drawerOverlayVariants()}
            onKeyDown={overlayAriaProps.onKeyDown}
          >
            <FocusScope contain restoreFocus autoFocus>
              <motion.div
                ref={drawerRef}
                id={id}
                role={dialogAriaProps.role}
                aria-label={dialogAriaProps['aria-label']}
                aria-labelledby={dialogAriaProps['aria-labelledby']}
                aria-describedby={dialogAriaProps['aria-describedby']}
                aria-modal={dialogAriaProps['aria-modal']}
                tabIndex={dialogAriaProps.tabIndex}
                initial={variants.initial}
                animate={variants.animate}
                exit={variants.exit}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className={cn(drawerContentVariants({ placement, size }), className)}
              >
                {children}
              </motion.div>
            </FocusScope>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

Drawer.displayName = 'Drawer';

/* -------------------------------------------------------------------------------------------------
 * DrawerHeader Component
 * ------------------------------------------------------------------------------------------------*/

const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between px-6 py-4',
          'border-b border-[var(--border)]',
          className
        )}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

DrawerHeader.displayName = 'DrawerHeader';

/* -------------------------------------------------------------------------------------------------
 * DrawerBody Component
 * ------------------------------------------------------------------------------------------------*/

const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn('flex-1 overflow-auto px-6 py-4', className)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

DrawerBody.displayName = 'DrawerBody';

/* -------------------------------------------------------------------------------------------------
 * DrawerFooter Component
 * ------------------------------------------------------------------------------------------------*/

const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-end gap-3 px-6 py-4',
          'border-t border-[var(--border)]',
          className
        )}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

DrawerFooter.displayName = 'DrawerFooter';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export {
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  drawerOverlayVariants,
  drawerContentVariants,
};
