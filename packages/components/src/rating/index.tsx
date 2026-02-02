'use client';

import {
  forwardRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Rating Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const ratingVariants = cva(
  ['inline-flex items-center gap-0.5'],
  {
    variants: {
      size: {
        sm: '[&_svg]:h-4 [&_svg]:w-4',
        md: '[&_svg]:h-5 [&_svg]:w-5',
        lg: '[&_svg]:h-6 [&_svg]:w-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Rating Types
 * ------------------------------------------------------------------------------------------------*/

export interface RatingProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof ratingVariants> {
  /**
   * The current value (controlled)
   */
  value?: number;
  /**
   * Default value (uncontrolled)
   */
  defaultValue?: number;
  /**
   * Maximum rating value
   */
  max?: number;
  /**
   * Callback when value changes
   */
  onChange?: (value: number) => void;
  /**
   * Whether the rating is read-only
   */
  isReadOnly?: boolean;
  /**
   * Whether to allow half stars
   */
  allowHalf?: boolean;
  /**
   * Custom icon for filled state
   */
  filledIcon?: ReactNode;
  /**
   * Custom icon for empty state
   */
  emptyIcon?: ReactNode;
  /**
   * Custom icon for half-filled state
   */
  halfFilledIcon?: ReactNode;
  /**
   * Color scheme
   */
  colorScheme?: 'yellow' | 'orange' | 'red' | 'primary';
  /**
   * Whether to show value preview on hover
   */
  showPreview?: boolean;
}

/* -------------------------------------------------------------------------------------------------
 * Default Icons
 * ------------------------------------------------------------------------------------------------*/

function StarFilledIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={1}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function StarEmptyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function StarHalfIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <defs>
        <linearGradient id="half-star-gradient">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        fill="url(#half-star-gradient)"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Rating Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A rating component for displaying and collecting star ratings.
 *
 * Features:
 * - Read-only and interactive modes
 * - Half-star support
 * - Custom icons
 * - Hover preview
 * - Keyboard accessible
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Rating value={3.5} isReadOnly />
 *
 * // Interactive
 * <Rating
 *   defaultValue={0}
 *   onChange={(value) => console.log(value)}
 * />
 *
 * // With half stars
 * <Rating allowHalf value={3.5} />
 *
 * // Custom size and color
 * <Rating size="lg" colorScheme="orange" value={4} />
 * ```
 */
const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (props, ref) => {
    const {
      className,
      value: controlledValue,
      defaultValue = 0,
      max = 5,
      onChange,
      isReadOnly = false,
      allowHalf = false,
      filledIcon,
      emptyIcon,
      halfFilledIcon,
      colorScheme = 'yellow',
      showPreview = true,
      size,
      ...restProps
    } = props;

    const [internalValue, setInternalValue] = useState(defaultValue);
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const value = controlledValue ?? internalValue;
    const displayValue = showPreview && hoverValue !== null ? hoverValue : value;

    const colorClasses = {
      yellow: 'text-yellow-400',
      orange: 'text-orange-400',
      red: 'text-red-400',
      primary: 'text-[var(--primary)]',
    };

    const handleClick = (newValue: number) => {
      if (isReadOnly) return;

      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleMouseEnter = (starValue: number) => {
      if (isReadOnly || !showPreview) return;
      setHoverValue(starValue);
    };

    const handleMouseLeave = () => {
      setHoverValue(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent, starValue: number) => {
      if (isReadOnly) return;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick(starValue);
      }
    };

    const FilledIcon = filledIcon ? () => <>{filledIcon}</> : StarFilledIcon;
    const EmptyIcon = emptyIcon ? () => <>{emptyIcon}</> : StarEmptyIcon;
    const HalfIcon = halfFilledIcon ? () => <>{halfFilledIcon}</> : StarHalfIcon;

    const stars = Array.from({ length: max }, (_, index) => {
      const starValue = index + 1;
      const isFullyFilled = displayValue >= starValue;
      const isHalfFilled = allowHalf && displayValue >= starValue - 0.5 && displayValue < starValue;

      return (
        <span
          key={index}
          role={isReadOnly ? 'img' : 'button'}
          tabIndex={isReadOnly ? -1 : 0}
          aria-label={`${starValue} star${starValue !== 1 ? 's' : ''}`}
          onClick={() => handleClick(starValue)}
          onMouseEnter={() => handleMouseEnter(starValue)}
          onMouseLeave={handleMouseLeave}
          onKeyDown={(e) => handleKeyDown(e, starValue)}
          className={cn(
            'cursor-pointer transition-transform duration-fast',
            !isReadOnly && 'hover:scale-110',
            isReadOnly && 'cursor-default',
            isFullyFilled || isHalfFilled ? colorClasses[colorScheme] : 'text-[var(--border-emphasized)]'
          )}
        >
          {isFullyFilled ? (
            <FilledIcon />
          ) : isHalfFilled ? (
            <HalfIcon />
          ) : (
            <EmptyIcon />
          )}
        </span>
      );
    });

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label="Rating"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-readonly={isReadOnly}
        className={cn(ratingVariants({ size }), className)}
        {...restProps}
      >
        {stars}
      </div>
    );
  }
);

Rating.displayName = 'Rating';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Rating, ratingVariants };
