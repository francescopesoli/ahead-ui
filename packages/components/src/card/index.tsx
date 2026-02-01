'use client';

import {
  forwardRef,
  createContext,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Card Context (for compound components)
 * ------------------------------------------------------------------------------------------------*/

interface CardContextValue {
  variant: 'elevated' | 'outlined' | 'filled' | 'ghost';
}

const CardContext = createContext<CardContextValue>({ variant: 'elevated' });


/* -------------------------------------------------------------------------------------------------
 * Card Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const cardVariants = cva(
  // Base styles
  [
    'rounded-[var(--radius-lg)]',
    'transition-all duration-fast ease-out',
  ],
  {
    variants: {
      variant: {
        elevated: [
          'bg-[var(--bg)] border border-[var(--border-muted)]',
          'shadow-md',
        ],
        outlined: [
          'bg-[var(--bg)] border border-[var(--border)]',
        ],
        filled: [
          'bg-[var(--bg-muted)] border border-transparent',
        ],
        ghost: [
          'bg-transparent border border-transparent',
        ],
      },
      isHoverable: {
        true: 'cursor-pointer',
      },
      isPressable: {
        true: 'cursor-pointer active:scale-[0.99]',
      },
    },
    compoundVariants: [
      {
        variant: 'elevated',
        isHoverable: true,
        className: 'hover:shadow-lg hover:border-[var(--border)]',
      },
      {
        variant: 'outlined',
        isHoverable: true,
        className: 'hover:border-[var(--border-emphasized)] hover:bg-[var(--bg-subtle)]',
      },
      {
        variant: 'filled',
        isHoverable: true,
        className: 'hover:bg-[var(--bg-emphasized)]',
      },
      {
        variant: 'ghost',
        isHoverable: true,
        className: 'hover:bg-[var(--bg-subtle)]',
      },
    ],
    defaultVariants: {
      variant: 'elevated',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Card Types
 * ------------------------------------------------------------------------------------------------*/

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * Card content
   */
  children?: ReactNode;
  /**
   * Whether the card responds to hover
   */
  isHoverable?: boolean;
  /**
   * Whether the card responds to press (click)
   */
  isPressable?: boolean;
}

/* -------------------------------------------------------------------------------------------------
 * Card Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A card component for grouping related content.
 *
 * Uses the compound component pattern:
 * - Card.Header
 * - Card.Body
 * - Card.Footer
 *
 * @example
 * ```tsx
 * <Card>
 *   <Card.Header>
 *     <Card.Title>Card Title</Card.Title>
 *     <Card.Description>Card description here</Card.Description>
 *   </Card.Header>
 *   <Card.Body>
 *     Card content goes here
 *   </Card.Body>
 *   <Card.Footer>
 *     <Button>Action</Button>
 *   </Card.Footer>
 * </Card>
 * ```
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  (props, ref) => {
    const {
      className,
      children,
      variant = 'elevated',
      isHoverable,
      isPressable,
      ...restProps
    } = props;

    const resolvedVariant = variant ?? 'elevated';

    return (
      <CardContext.Provider value={{ variant: resolvedVariant }}>
        <div
          ref={ref}
          className={cn(
            cardVariants({ variant, isHoverable, isPressable }),
            className
          )}
          {...restProps}
        >
          {children}
        </div>
      </CardContext.Provider>
    );
  }
);

Card.displayName = 'Card';

/* -------------------------------------------------------------------------------------------------
 * Card.Header
 * ------------------------------------------------------------------------------------------------*/

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 p-6', className)}
        {...restProps}
      />
    );
  }
);

CardHeader.displayName = 'CardHeader';

/* -------------------------------------------------------------------------------------------------
 * Card.Title
 * ------------------------------------------------------------------------------------------------*/

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
  /**
   * Heading level (h1-h6)
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  (props, ref) => {
    const { className, as: Component = 'h3', ...restProps } = props;

    return (
      <Component
        ref={ref}
        className={cn(
          'text-lg font-semibold leading-none tracking-tight text-[var(--fg)]',
          className
        )}
        {...restProps}
      />
    );
  }
);

CardTitle.displayName = 'CardTitle';

/* -------------------------------------------------------------------------------------------------
 * Card.Description
 * ------------------------------------------------------------------------------------------------*/

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
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

CardDescription.displayName = 'CardDescription';

/* -------------------------------------------------------------------------------------------------
 * Card.Body
 * ------------------------------------------------------------------------------------------------*/

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn('p-6 pt-0', className)}
        {...restProps}
      />
    );
  }
);

CardBody.displayName = 'CardBody';

/* -------------------------------------------------------------------------------------------------
 * Card.Footer
 * ------------------------------------------------------------------------------------------------*/

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn('flex items-center p-6 pt-0', className)}
        {...restProps}
      />
    );
  }
);

CardFooter.displayName = 'CardFooter';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

// Attach compound components
const CardNamespace = Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
});

export { CardNamespace as Card, cardVariants };
