'use client';

import {
  forwardRef,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { useSliderState } from '@react-stately/slider';
import { useSlider, useSliderThumb } from '@react-aria/slider';
import { useFocusRing } from '@react-aria/focus';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useNumberFormatter } from '@react-aria/i18n';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Slider Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const sliderTrackVariants = cva(
  ['relative rounded-full bg-[var(--bg-muted)]'],
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
      },
      orientation: {
        horizontal: 'w-full',
        vertical: 'h-full w-2',
      },
    },
    defaultVariants: {
      size: 'md',
      orientation: 'horizontal',
    },
  }
);

const sliderFilledTrackVariants = cva(
  ['absolute rounded-full'],
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
      },
      colorScheme: {
        primary: 'bg-[var(--primary)]',
        success: 'bg-[var(--success)]',
        warning: 'bg-[var(--warning)]',
        danger: 'bg-[var(--danger)]',
        accent: 'bg-[var(--accent)]',
      },
    },
    defaultVariants: {
      size: 'md',
      colorScheme: 'primary',
    },
  }
);

const sliderThumbVariants = cva(
  [
    'absolute rounded-full bg-white',
    'border-2 shadow-md',
    'transition-transform duration-fast',
    'hover:scale-110',
    'focus:outline-none',
  ],
  {
    variants: {
      size: {
        sm: 'h-3 w-3 -mt-1',
        md: 'h-4 w-4 -mt-1',
        lg: 'h-5 w-5 -mt-1',
      },
      colorScheme: {
        primary: 'border-[var(--primary)]',
        success: 'border-[var(--success)]',
        warning: 'border-[var(--warning)]',
        danger: 'border-[var(--danger)]',
        accent: 'border-[var(--accent)]',
      },
    },
    defaultVariants: {
      size: 'md',
      colorScheme: 'primary',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Slider Types
 * ------------------------------------------------------------------------------------------------*/

export interface SliderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>,
    VariantProps<typeof sliderTrackVariants> {
  /**
   * Label for the slider
   */
  label?: ReactNode;
  /**
   * The current value (controlled)
   */
  value?: number[];
  /**
   * Default value (uncontrolled)
   */
  defaultValue?: number[];
  /**
   * Callback when value changes
   */
  onChange?: (value: number[]) => void;
  /**
   * Callback when dragging ends
   */
  onChangeEnd?: (value: number[]) => void;
  /**
   * Minimum value
   */
  minValue?: number;
  /**
   * Maximum value
   */
  maxValue?: number;
  /**
   * Step value
   */
  step?: number;
  /**
   * Whether the slider is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether to show the value
   */
  showValue?: boolean;
  /**
   * Format options for the value
   */
  formatOptions?: Intl.NumberFormatOptions;
  /**
   * Color scheme
   */
  colorScheme?: 'primary' | 'success' | 'warning' | 'danger' | 'accent';
  /**
   * Name for form submission
   */
  name?: string;
}

/* -------------------------------------------------------------------------------------------------
 * Slider Component
 * ------------------------------------------------------------------------------------------------*/

const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (props, ref) => {
    const {
      className,
      size = 'md',
      colorScheme = 'primary',
      label,
      value,
      defaultValue,
      onChange,
      onChangeEnd,
      minValue = 0,
      maxValue = 100,
      step = 1,
      isDisabled,
      showValue = true,
      formatOptions,
      name,
      ...restProps
    } = props;

    const trackRef = useRef<HTMLDivElement>(null);
    const numberFormatter = useNumberFormatter(formatOptions);

    const state = useSliderState({
      value,
      defaultValue,
      onChange,
      onChangeEnd,
      minValue,
      maxValue,
      step,
      isDisabled,
      numberFormatter,
    });

    const { groupProps, trackProps, labelProps, outputProps } = useSlider(
      {
        label,
        value,
        defaultValue,
        onChange,
        onChangeEnd,
        minValue,
        maxValue,
        step,
        isDisabled,
      },
      state,
      trackRef
    );

    const filledWidth = `${state.getThumbPercent(0) * 100}%`;

    return (
      <div
        ref={ref}
        {...groupProps}
        className={cn(
          'flex flex-col gap-2',
          isDisabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...restProps}
      >
        {(label || showValue) && (
          <div className="flex justify-between">
            {label && (
              <label {...labelProps} className="text-sm font-medium text-[var(--fg)]">
                {label}
              </label>
            )}
            {showValue && (
              <output {...outputProps} className="text-sm text-[var(--fg-muted)]">
                {state.getThumbValueLabel(0)}
              </output>
            )}
          </div>
        )}

        <div
          {...trackProps}
          ref={trackRef}
          className={cn(
            sliderTrackVariants({ size }),
            'cursor-pointer',
            isDisabled && 'cursor-not-allowed'
          )}
        >
          {/* Filled track */}
          <div
            className={sliderFilledTrackVariants({ size, colorScheme })}
            style={{ width: filledWidth }}
          />

          {/* Thumb */}
          <Thumb
            index={0}
            state={state}
            trackRef={trackRef}
            size={size ?? undefined}
            colorScheme={colorScheme}
            name={name}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';

/* -------------------------------------------------------------------------------------------------
 * Thumb Component
 * ------------------------------------------------------------------------------------------------*/

interface ThumbProps {
  index: number;
  state: ReturnType<typeof useSliderState>;
  trackRef: React.RefObject<HTMLDivElement>;
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'primary' | 'success' | 'warning' | 'danger' | 'accent';
  name?: string;
}

function Thumb({ index, state, trackRef, size, colorScheme, name }: ThumbProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { thumbProps, inputProps } = useSliderThumb(
    { index, trackRef, inputRef, name },
    state
  );

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <div
      {...thumbProps}
      className={cn(
        sliderThumbVariants({ size, colorScheme }),
        isFocusVisible && 'ring-2 ring-[var(--ring)] ring-offset-2',
        state.isThumbDragging(index) && 'scale-110'
      )}
      style={{
        left: `${state.getThumbPercent(index) * 100}%`,
        transform: 'translateX(-50%)',
      }}
    >
      <VisuallyHidden>
        <input ref={inputRef} {...inputProps} {...focusProps} />
      </VisuallyHidden>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * RangeSlider Component (for two thumbs)
 * ------------------------------------------------------------------------------------------------*/

export interface RangeSliderProps extends Omit<SliderProps, 'value' | 'defaultValue' | 'onChange'> {
  /**
   * The current value (controlled)
   */
  value?: [number, number];
  /**
   * Default value (uncontrolled)
   */
  defaultValue?: [number, number];
  /**
   * Callback when value changes
   */
  onChange?: (value: [number, number]) => void;
}

const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>(
  (props, ref) => {
    const {
      className,
      size = 'md',
      colorScheme = 'primary',
      label,
      value,
      defaultValue = [25, 75],
      onChange,
      onChangeEnd,
      minValue = 0,
      maxValue = 100,
      step = 1,
      isDisabled,
      showValue = true,
      formatOptions,
      name,
      ...restProps
    } = props;

    const trackRef = useRef<HTMLDivElement>(null);
    const numberFormatter = useNumberFormatter(formatOptions);

    const state = useSliderState({
      value,
      defaultValue,
      onChange: onChange as ((value: number[]) => void) | undefined,
      onChangeEnd: onChangeEnd as ((value: number[]) => void) | undefined,
      minValue,
      maxValue,
      step,
      isDisabled,
      numberFormatter,
    });

    const { groupProps, trackProps, labelProps, outputProps } = useSlider(
      {
        label,
        value,
        defaultValue,
        onChange: onChange as ((value: number[]) => void) | undefined,
        onChangeEnd: onChangeEnd as ((value: number[]) => void) | undefined,
        minValue,
        maxValue,
        step,
        isDisabled,
      },
      state,
      trackRef
    );

    const filledStart = `${state.getThumbPercent(0) * 100}%`;
    const filledWidth = `${(state.getThumbPercent(1) - state.getThumbPercent(0)) * 100}%`;

    return (
      <div
        ref={ref}
        {...groupProps}
        className={cn(
          'flex flex-col gap-2',
          isDisabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...restProps}
      >
        {(label || showValue) && (
          <div className="flex justify-between">
            {label && (
              <label {...labelProps} className="text-sm font-medium text-[var(--fg)]">
                {label}
              </label>
            )}
            {showValue && (
              <output {...outputProps} className="text-sm text-[var(--fg-muted)]">
                {state.getThumbValueLabel(0)} - {state.getThumbValueLabel(1)}
              </output>
            )}
          </div>
        )}

        <div
          {...trackProps}
          ref={trackRef}
          className={cn(
            sliderTrackVariants({ size }),
            'cursor-pointer',
            isDisabled && 'cursor-not-allowed'
          )}
        >
          {/* Filled track */}
          <div
            className={sliderFilledTrackVariants({ size, colorScheme })}
            style={{ left: filledStart, width: filledWidth }}
          />

          {/* Thumbs */}
          <Thumb index={0} state={state} trackRef={trackRef} size={size ?? undefined} colorScheme={colorScheme} name={name} />
          <Thumb index={1} state={state} trackRef={trackRef} size={size ?? undefined} colorScheme={colorScheme} name={name} />
        </div>
      </div>
    );
  }
);

RangeSlider.displayName = 'RangeSlider';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export {
  Slider,
  RangeSlider,
  sliderTrackVariants,
  sliderFilledTrackVariants,
  sliderThumbVariants,
};
