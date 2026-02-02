'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Skeleton Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const skeletonVariants = cva(
  [
    'animate-pulse bg-[var(--bg-muted)]',
  ],
  {
    variants: {
      variant: {
        rectangular: 'rounded-[var(--radius-md)]',
        circular: 'rounded-full',
        text: 'rounded-[var(--radius-sm)] h-4',
      },
    },
    defaultVariants: {
      variant: 'rectangular',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Skeleton Types
 * ------------------------------------------------------------------------------------------------*/

export interface SkeletonProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  /**
   * Width of the skeleton
   */
  width?: string | number;
  /**
   * Height of the skeleton
   */
  height?: string | number;
  /**
   * Whether animation is enabled
   */
  isAnimated?: boolean;
}

/* -------------------------------------------------------------------------------------------------
 * Skeleton Component
 * ------------------------------------------------------------------------------------------------*/

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (props, ref) => {
    const {
      className,
      variant,
      width,
      height,
      isAnimated = true,
      style,
      ...restProps
    } = props;

    return (
      <div
        ref={ref}
        className={cn(
          skeletonVariants({ variant }),
          !isAnimated && 'animate-none',
          className
        )}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          ...style,
        }}
        aria-hidden="true"
        {...restProps}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

/* -------------------------------------------------------------------------------------------------
 * SkeletonText Component
 * ------------------------------------------------------------------------------------------------*/

export interface SkeletonTextProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Number of lines
   */
  lines?: number;
  /**
   * Gap between lines
   */
  spacing?: 'sm' | 'md' | 'lg';
  /**
   * Whether animation is enabled
   */
  isAnimated?: boolean;
}

const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  (props, ref) => {
    const {
      className,
      lines = 3,
      spacing = 'md',
      isAnimated = true,
      ...restProps
    } = props;

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col',
          spacing === 'sm' && 'gap-2',
          spacing === 'md' && 'gap-3',
          spacing === 'lg' && 'gap-4',
          className
        )}
        aria-hidden="true"
        {...restProps}
      >
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            isAnimated={isAnimated}
            style={{
              width: index === lines - 1 ? '80%' : '100%',
            }}
          />
        ))}
      </div>
    );
  }
);

SkeletonText.displayName = 'SkeletonText';

/* -------------------------------------------------------------------------------------------------
 * SkeletonCircle Component
 * ------------------------------------------------------------------------------------------------*/

export interface SkeletonCircleProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Size of the circle
   */
  size?: string | number;
  /**
   * Whether animation is enabled
   */
  isAnimated?: boolean;
}

const SkeletonCircle = forwardRef<HTMLDivElement, SkeletonCircleProps>(
  (props, ref) => {
    const { size = 40, isAnimated = true, ...restProps } = props;

    return (
      <Skeleton
        ref={ref}
        variant="circular"
        width={size}
        height={size}
        isAnimated={isAnimated}
        {...restProps}
      />
    );
  }
);

SkeletonCircle.displayName = 'SkeletonCircle';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Skeleton, SkeletonText, SkeletonCircle, skeletonVariants };
