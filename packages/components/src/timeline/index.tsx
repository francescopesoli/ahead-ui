'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Timeline Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const timelineVariants = cva(
  ['relative flex flex-col'],
  {
    variants: {
      variant: {
        default: '',
        alternating: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const timelineItemVariants = cva(
  ['relative flex gap-4'],
  {
    variants: {
      variant: {
        default: '',
        alternating: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Timeline Types
 * ------------------------------------------------------------------------------------------------*/

export interface TimelineProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {}

export interface TimelineItemProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineItemVariants> {
  /**
   * Custom icon or indicator for the timeline point
   */
  icon?: ReactNode;
  /**
   * Color of the timeline dot
   */
  dotColor?: 'primary' | 'success' | 'warning' | 'danger' | 'default';
  /**
   * Whether this is the last item (hides the connector line)
   */
  isLast?: boolean;
  /**
   * Position in alternating layout
   */
  position?: 'left' | 'right';
}

export interface TimelineConnectorProps extends HTMLAttributes<HTMLDivElement> {}

export interface TimelineDotProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Custom icon to render inside the dot
   */
  icon?: ReactNode;
  /**
   * Color scheme for the dot
   */
  colorScheme?: 'primary' | 'success' | 'warning' | 'danger' | 'default';
}

export interface TimelineContentProps extends HTMLAttributes<HTMLDivElement> {}

/* -------------------------------------------------------------------------------------------------
 * Timeline Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A timeline component for displaying sequential events.
 *
 * Features:
 * - Vertical layout
 * - Custom icons
 * - Alternating layout
 * - Color variants
 *
 * @example
 * ```tsx
 * <Timeline>
 *   <TimelineItem>
 *     <TimelineDot colorScheme="success" />
 *     <TimelineContent>
 *       <h4>Order placed</h4>
 *       <p>January 1, 2024</p>
 *     </TimelineContent>
 *   </TimelineItem>
 *   <TimelineItem>
 *     <TimelineDot colorScheme="primary" />
 *     <TimelineContent>
 *       <h4>Processing</h4>
 *       <p>January 2, 2024</p>
 *     </TimelineContent>
 *   </TimelineItem>
 *   <TimelineItem isLast>
 *     <TimelineDot />
 *     <TimelineContent>
 *       <h4>Delivered</h4>
 *       <p>January 5, 2024</p>
 *     </TimelineContent>
 *   </TimelineItem>
 * </Timeline>
 * ```
 */
const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  (props, ref) => {
    const { className, children, variant, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn(timelineVariants({ variant }), className)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

Timeline.displayName = 'Timeline';

/* -------------------------------------------------------------------------------------------------
 * TimelineItem Component
 * ------------------------------------------------------------------------------------------------*/

const TimelineItem = forwardRef<HTMLDivElement, TimelineItemProps>(
  (props, ref) => {
    const {
      className,
      children,
      icon,
      dotColor = 'default',
      isLast = false,
      variant,
      position,
      ...restProps
    } = props;

    const colorClasses = {
      primary: 'bg-[var(--primary)]',
      success: 'bg-[var(--success)]',
      warning: 'bg-[var(--warning)]',
      danger: 'bg-[var(--danger)]',
      default: 'bg-[var(--border-emphasized)]',
    };

    return (
      <div
        ref={ref}
        className={cn(
          timelineItemVariants({ variant }),
          variant === 'alternating' && position === 'right' && 'flex-row-reverse text-right',
          className
        )}
        {...restProps}
      >
        {/* Timeline indicator column */}
        <div className="relative flex flex-col items-center">
          {/* Dot */}
          {icon ? (
            <div className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full',
              'bg-[var(--bg-muted)] border-2 border-[var(--border)]',
              'text-[var(--fg-muted)] z-10'
            )}>
              {icon}
            </div>
          ) : (
            <div className={cn(
              'h-3 w-3 rounded-full z-10',
              colorClasses[dotColor]
            )} />
          )}

          {/* Connector line */}
          {!isLast && (
            <div className="absolute top-3 h-full w-px bg-[var(--border)]" style={{ left: '50%', transform: 'translateX(-50%)' }} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pb-8">
          {children}
        </div>
      </div>
    );
  }
);

TimelineItem.displayName = 'TimelineItem';

/* -------------------------------------------------------------------------------------------------
 * TimelineConnector Component
 * ------------------------------------------------------------------------------------------------*/

const TimelineConnector = forwardRef<HTMLDivElement, TimelineConnectorProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn('flex-1 w-px bg-[var(--border)] min-h-4', className)}
        {...restProps}
      />
    );
  }
);

TimelineConnector.displayName = 'TimelineConnector';

/* -------------------------------------------------------------------------------------------------
 * TimelineDot Component
 * ------------------------------------------------------------------------------------------------*/

const TimelineDot = forwardRef<HTMLDivElement, TimelineDotProps>(
  (props, ref) => {
    const { className, icon, colorScheme = 'default', ...restProps } = props;

    const colorClasses = {
      primary: 'bg-[var(--primary)] text-[var(--primary-fg)]',
      success: 'bg-[var(--success)] text-[var(--success-fg)]',
      warning: 'bg-[var(--warning)] text-[var(--warning-fg)]',
      danger: 'bg-[var(--danger)] text-[var(--danger-fg)]',
      default: 'bg-[var(--border-emphasized)] text-[var(--fg)]',
    };

    if (icon) {
      return (
        <div
          ref={ref}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full',
            colorClasses[colorScheme],
            className
          )}
          {...restProps}
        >
          {icon}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'h-3 w-3 rounded-full',
          colorClasses[colorScheme],
          className
        )}
        {...restProps}
      />
    );
  }
);

TimelineDot.displayName = 'TimelineDot';

/* -------------------------------------------------------------------------------------------------
 * TimelineContent Component
 * ------------------------------------------------------------------------------------------------*/

const TimelineContent = forwardRef<HTMLDivElement, TimelineContentProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;

    return (
      <div
        ref={ref}
        className={cn('flex-1', className)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

TimelineContent.displayName = 'TimelineContent';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Timeline, TimelineItem, TimelineConnector, TimelineDot, TimelineContent, timelineVariants };
