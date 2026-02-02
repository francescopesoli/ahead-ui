'use client';

import {
  forwardRef,
  createContext,
  useContext,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Stepper Context
 * ------------------------------------------------------------------------------------------------*/

interface StepperContextValue {
  currentStep: number;
  orientation: 'horizontal' | 'vertical';
  size: 'sm' | 'md' | 'lg' | null | undefined;
  totalSteps: number;
  onStepClick?: (step: number) => void;
  clickable: boolean;
}

const StepperContext = createContext<StepperContextValue | null>(null);

const useStepperContext = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('Step must be used within a Stepper');
  }
  return context;
};

/* -------------------------------------------------------------------------------------------------
 * Stepper Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const stepperVariants = cva(
  ['flex'],
  {
    variants: {
      orientation: {
        horizontal: 'flex-row items-center',
        vertical: 'flex-col',
      },
      size: {
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      size: 'md',
    },
  }
);

const stepVariants = cva(
  ['flex items-center'],
  {
    variants: {
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col items-start',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

const stepIndicatorVariants = cva(
  [
    'flex items-center justify-center rounded-full',
    'font-medium',
    'transition-colors duration-fast',
    'shrink-0',
  ],
  {
    variants: {
      size: {
        sm: 'h-6 w-6 text-xs',
        md: 'h-8 w-8 text-sm',
        lg: 'h-10 w-10 text-base',
      },
      status: {
        complete: 'bg-[var(--success)] text-[var(--success-fg)]',
        current: 'bg-[var(--primary)] text-[var(--primary-fg)]',
        incomplete: 'bg-[var(--bg-muted)] text-[var(--fg-muted)] border border-[var(--border)]',
      },
      clickable: {
        true: 'cursor-pointer hover:ring-2 hover:ring-[var(--ring)] hover:ring-offset-2',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      status: 'incomplete',
    },
  }
);

const stepConnectorVariants = cva(
  ['transition-colors duration-fast'],
  {
    variants: {
      orientation: {
        horizontal: 'h-px flex-1 min-w-8',
        vertical: 'w-px h-8 ml-4',
      },
      status: {
        complete: 'bg-[var(--success)]',
        incomplete: 'bg-[var(--border)]',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      status: 'incomplete',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Stepper Types
 * ------------------------------------------------------------------------------------------------*/

export interface StepperProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperVariants> {
  /**
   * Current active step (0-indexed)
   */
  currentStep?: number;
  /**
   * Callback when a step is clicked
   */
  onStepClick?: (step: number) => void;
  /**
   * Whether steps are clickable
   */
  clickable?: boolean;
}

export interface StepProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Step index (auto-assigned by Stepper)
   */
  index?: number;
  /**
   * Custom icon for the step
   */
  icon?: ReactNode;
  /**
   * Title of the step
   */
  title?: ReactNode;
  /**
   * Description of the step
   */
  description?: ReactNode;
  /**
   * Override the status for this step
   */
  status?: 'complete' | 'current' | 'incomplete';
}

/* -------------------------------------------------------------------------------------------------
 * Stepper Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A stepper component for displaying progress through a multi-step process.
 *
 * Features:
 * - Horizontal and vertical orientations
 * - Clickable steps for navigation
 * - Custom icons
 * - Size variants
 *
 * @example
 * ```tsx
 * <Stepper currentStep={1}>
 *   <Step title="Account" description="Create your account" />
 *   <Step title="Profile" description="Add your details" />
 *   <Step title="Complete" description="Review and submit" />
 * </Stepper>
 *
 * // Vertical orientation
 * <Stepper orientation="vertical" currentStep={0}>
 *   <Step title="Step 1">Content for step 1</Step>
 *   <Step title="Step 2">Content for step 2</Step>
 * </Stepper>
 * ```
 */
const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (props, ref) => {
    const {
      className,
      children,
      orientation = 'horizontal',
      size = 'md',
      currentStep = 0,
      onStepClick,
      clickable = false,
      ...restProps
    } = props;

    const childArray = Array.isArray(children) ? children : [children];
    const totalSteps = childArray.length;

    return (
      <StepperContext.Provider
        value={{
          currentStep,
          orientation: (orientation ?? 'horizontal') as 'horizontal' | 'vertical',
          size,
          totalSteps,
          onStepClick,
          clickable,
        }}
      >
        <div
          ref={ref}
          role="list"
          aria-label="Progress"
          className={cn(stepperVariants({ orientation, size }), className)}
          {...restProps}
        >
          {childArray.map((child, index) => {
            if (!child) return null;

            return (
              <div
                key={index}
                className={cn(
                  'flex items-center',
                  orientation === 'horizontal' && index < totalSteps - 1 && 'flex-1'
                )}
              >
                <Step
                  {...(child as React.ReactElement<StepProps>).props}
                  index={index}
                />
                {index < totalSteps - 1 && (
                  <StepConnector
                    orientation={(orientation ?? 'horizontal') as 'horizontal' | 'vertical'}
                    isComplete={index < currentStep}
                  />
                )}
              </div>
            );
          })}
        </div>
      </StepperContext.Provider>
    );
  }
);

Stepper.displayName = 'Stepper';

/* -------------------------------------------------------------------------------------------------
 * Step Component
 * ------------------------------------------------------------------------------------------------*/

const Step = forwardRef<HTMLDivElement, StepProps>(
  (props, ref) => {
    const {
      className,
      children,
      index = 0,
      icon,
      title,
      description,
      status: statusProp,
      ...restProps
    } = props;

    const { currentStep, orientation, size, onStepClick, clickable } = useStepperContext();

    const status = statusProp ?? (
      index < currentStep ? 'complete' :
      index === currentStep ? 'current' : 'incomplete'
    );

    const handleClick = () => {
      if (clickable && onStepClick) {
        onStepClick(index);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && clickable && onStepClick) {
        e.preventDefault();
        onStepClick(index);
      }
    };

    return (
      <div
        ref={ref}
        role="listitem"
        aria-current={status === 'current' ? 'step' : undefined}
        className={cn(
          stepVariants({ orientation }),
          orientation === 'horizontal' && 'gap-3',
          orientation === 'vertical' && 'gap-2',
          className
        )}
        {...restProps}
      >
        {/* Step Indicator */}
        <div
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          tabIndex={clickable ? 0 : -1}
          className={cn(
            stepIndicatorVariants({ size, status, clickable }),
            clickable && 'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2'
          )}
        >
          {status === 'complete' ? (
            icon || <CheckIcon />
          ) : (
            icon || <span>{index + 1}</span>
          )}
        </div>

        {/* Step Content */}
        <div className={cn(
          'flex flex-col',
          orientation === 'vertical' && 'ml-3'
        )}>
          {title && (
            <span className={cn(
              'font-medium',
              size === 'sm' && 'text-xs',
              size === 'md' && 'text-sm',
              size === 'lg' && 'text-base',
              status === 'current' ? 'text-[var(--fg)]' : 'text-[var(--fg-muted)]'
            )}>
              {title}
            </span>
          )}
          {description && (
            <span className="text-xs text-[var(--fg-muted)]">
              {description}
            </span>
          )}
          {children && orientation === 'vertical' && status === 'current' && (
            <div className="mt-2">{children}</div>
          )}
        </div>
      </div>
    );
  }
);

Step.displayName = 'Step';

/* -------------------------------------------------------------------------------------------------
 * StepConnector Component
 * ------------------------------------------------------------------------------------------------*/

interface StepConnectorProps {
  orientation: 'horizontal' | 'vertical';
  isComplete: boolean;
}

function StepConnector({ orientation, isComplete }: StepConnectorProps) {
  return (
    <div
      className={cn(
        stepConnectorVariants({
          orientation,
          status: isComplete ? 'complete' : 'incomplete',
        }),
        orientation === 'vertical' && 'ml-4'
      )}
      aria-hidden="true"
    />
  );
}

/* -------------------------------------------------------------------------------------------------
 * Check Icon
 * ------------------------------------------------------------------------------------------------*/

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Stepper, Step, stepperVariants, stepIndicatorVariants };
