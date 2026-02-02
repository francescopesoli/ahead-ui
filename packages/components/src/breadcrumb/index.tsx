'use client';

import {
  forwardRef,
  Children,
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type ReactNode,
  type ReactElement,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Breadcrumb Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const breadcrumbVariants = cva(
  ['flex items-center'],
  {
    variants: {
      size: {
        sm: 'text-xs gap-1',
        md: 'text-sm gap-2',
        lg: 'text-base gap-2',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const breadcrumbItemVariants = cva(
  ['inline-flex items-center gap-1.5'],
  {
    variants: {
      isCurrent: {
        true: 'text-[var(--fg)] font-medium',
        false: 'text-[var(--fg-muted)]',
      },
    },
    defaultVariants: {
      isCurrent: false,
    },
  }
);

const breadcrumbLinkVariants = cva(
  [
    'inline-flex items-center gap-1.5',
    'transition-colors duration-fast',
    'hover:text-[var(--fg)]',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:rounded-sm',
  ],
  {
    variants: {
      isCurrent: {
        true: 'pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      isCurrent: false,
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Breadcrumb Types
 * ------------------------------------------------------------------------------------------------*/

export interface BreadcrumbProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbVariants> {
  /**
   * Custom separator between items
   */
  separator?: ReactNode;
}

export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
  /**
   * Whether this is the current/active item
   */
  isCurrent?: boolean;
}

export interface BreadcrumbLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  /**
   * The URL to link to
   */
  href?: string;
  /**
   * Whether this is the current/active link
   */
  isCurrent?: boolean;
  /**
   * Icon to display before the text
   */
  icon?: ReactNode;
  /**
   * Custom component to render (for framework routing)
   */
  as?: React.ElementType;
}

export interface BreadcrumbSeparatorProps extends HTMLAttributes<HTMLSpanElement> {}

/* -------------------------------------------------------------------------------------------------
 * Default Separator
 * ------------------------------------------------------------------------------------------------*/

const DefaultSeparator = () => (
  <svg
    className="h-4 w-4 text-[var(--fg-muted)]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* -------------------------------------------------------------------------------------------------
 * Breadcrumb Component
 * ------------------------------------------------------------------------------------------------*/

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (props, ref) => {
    const {
      className,
      size,
      separator = <DefaultSeparator />,
      children,
      ...restProps
    } = props;

    const childArray = Children.toArray(children);

    return (
      <nav ref={ref} aria-label="Breadcrumb" {...restProps}>
        <ol className={cn(breadcrumbVariants({ size }), className)}>
          {childArray.map((child, index) => {
            if (!isValidElement(child)) return child;

            const isLast = index === childArray.length - 1;

            return (
              <li key={index} className="inline-flex items-center gap-2">
                {cloneElement(child as ReactElement<BreadcrumbItemProps>, {
                  isCurrent: isLast ? true : (child as ReactElement<BreadcrumbItemProps>).props.isCurrent,
                })}
                {!isLast && (
                  <span aria-hidden="true" className="shrink-0">
                    {separator}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

/* -------------------------------------------------------------------------------------------------
 * BreadcrumbItem Component
 * ------------------------------------------------------------------------------------------------*/

const BreadcrumbItem = forwardRef<HTMLSpanElement, BreadcrumbItemProps>(
  (props, ref) => {
    const { className, isCurrent, children, ...restProps } = props;

    return (
      <span
        ref={ref}
        className={cn(breadcrumbItemVariants({ isCurrent }), className)}
        aria-current={isCurrent ? 'page' : undefined}
        {...restProps}
      >
        {children}
      </span>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

/* -------------------------------------------------------------------------------------------------
 * BreadcrumbLink Component
 * ------------------------------------------------------------------------------------------------*/

const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  (props, ref) => {
    const {
      className,
      href,
      isCurrent,
      icon,
      as: Component = 'a',
      children,
      ...restProps
    } = props;

    if (isCurrent) {
      return (
        <span
          className={cn(breadcrumbItemVariants({ isCurrent: true }), className)}
          aria-current="page"
        >
          {icon && <span className="shrink-0">{icon}</span>}
          {children}
        </span>
      );
    }

    return (
      <Component
        ref={ref}
        href={href}
        className={cn(breadcrumbLinkVariants({ isCurrent }), className)}
        {...restProps}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </Component>
    );
  }
);

BreadcrumbLink.displayName = 'BreadcrumbLink';

/* -------------------------------------------------------------------------------------------------
 * BreadcrumbSeparator Component
 * ------------------------------------------------------------------------------------------------*/

const BreadcrumbSeparator = forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;

    return (
      <span
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={cn('text-[var(--fg-muted)]', className)}
        {...restProps}
      >
        {children || <DefaultSeparator />}
      </span>
    );
  }
);

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  breadcrumbVariants,
  breadcrumbItemVariants,
  breadcrumbLinkVariants,
};
