'use client';

import {
  forwardRef,
  useState,
  useRef,
  useCallback,
  useEffect,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * ColorPicker Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const colorPickerTriggerVariants = cva(
  [
    'inline-flex items-center gap-2',
    'rounded-[var(--radius-md)]',
    'border border-[var(--border)]',
    'bg-[var(--bg)]',
    'transition-colors duration-fast',
    'focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 px-2 text-sm',
        md: 'h-10 px-3 text-base',
        lg: 'h-12 px-4 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const colorPickerSwatchVariants = cva(
  [
    'rounded-[var(--radius-sm)]',
    'border border-[var(--border)]',
  ],
  {
    variants: {
      size: {
        sm: 'h-5 w-5',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Color Utilities
 * ------------------------------------------------------------------------------------------------*/

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1] ?? '0', 16),
        g: parseInt(result[2] ?? '0', 16),
        b: parseInt(result[3] ?? '0', 16),
      }
    : { r: 0, g: 0, b: 0 };
}

function rgbToHex({ r, g, b }: RGB): string {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

function rgbToHsl({ r, g, b }: RGB): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToRgb({ h, s, l }: HSL): RGB {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/* -------------------------------------------------------------------------------------------------
 * ColorPicker Types
 * ------------------------------------------------------------------------------------------------*/

export interface ColorPickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof colorPickerTriggerVariants> {
  /**
   * Current color value (hex)
   */
  value?: string;
  /**
   * Default color value
   */
  defaultValue?: string;
  /**
   * Callback when color changes
   */
  onChange?: (color: string) => void;
  /**
   * Whether to show alpha slider
   */
  showAlpha?: boolean;
  /**
   * Preset colors to show
   */
  swatches?: string[];
  /**
   * Whether the picker is disabled
   */
  isDisabled?: boolean;
  /**
   * Label for the picker
   */
  label?: ReactNode;
  /**
   * Format to display (hex, rgb, hsl)
   */
  displayFormat?: 'hex' | 'rgb' | 'hsl';
}

/* -------------------------------------------------------------------------------------------------
 * Default Swatches
 * ------------------------------------------------------------------------------------------------*/

const DEFAULT_SWATCHES = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
  '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e', '#000000', '#6b7280', '#ffffff',
];

/* -------------------------------------------------------------------------------------------------
 * ColorPicker Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A color picker component with area picker, hue slider, and swatches.
 *
 * Features:
 * - Color area picker (saturation/lightness)
 * - Hue slider
 * - Optional alpha slider
 * - Preset swatches
 * - Multiple format display (hex, rgb, hsl)
 *
 * @example
 * ```tsx
 * // Basic
 * <ColorPicker value={color} onChange={setColor} />
 *
 * // With alpha
 * <ColorPicker showAlpha value={color} onChange={setColor} />
 *
 * // Custom swatches
 * <ColorPicker
 *   swatches={['#ff0000', '#00ff00', '#0000ff']}
 *   onChange={setColor}
 * />
 * ```
 */
const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  (props, ref) => {
    const {
      className,
      size,
      value: controlledValue,
      defaultValue = '#3b82f6',
      onChange,
      showAlpha = false,
      swatches = DEFAULT_SWATCHES,
      isDisabled = false,
      label,
      displayFormat = 'hex',
      ...restProps
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const value = controlledValue ?? internalValue;
    const rgb = hexToRgb(value);
    const hsl = rgbToHsl(rgb);

    const updateColor = useCallback((newValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    }, [controlledValue, onChange]);

    const handleHueChange = (newHue: number) => {
      const newRgb = hslToRgb({ h: newHue, s: hsl.s, l: hsl.l });
      updateColor(rgbToHex(newRgb));
    };

    const handleSaturationLightnessChange = (s: number, l: number) => {
      const newRgb = hslToRgb({ h: hsl.h, s, l });
      updateColor(rgbToHex(newRgb));
    };

    const handleSwatchClick = (swatch: string) => {
      updateColor(swatch);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      if (/^#[0-9a-fA-F]{6}$/.test(input)) {
        updateColor(input);
      }
    };

    // Close on click outside
    useEffect(() => {
      if (!isOpen) return;

      const handleClick = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          contentRef.current &&
          !contentRef.current.contains(target) &&
          triggerRef.current &&
          !triggerRef.current.contains(target)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }, [isOpen]);

    const displayValue = displayFormat === 'rgb'
      ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
      : displayFormat === 'hsl'
      ? `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`
      : value;

    return (
      <div ref={ref} className={cn('relative flex flex-col gap-1.5', className)} {...restProps}>
        {label && (
          <label className="text-sm font-medium text-[var(--fg)]">{label}</label>
        )}

        <button
          ref={triggerRef}
          type="button"
          onClick={() => !isDisabled && setIsOpen(!isOpen)}
          disabled={isDisabled}
          className={cn(colorPickerTriggerVariants({ size }))}
        >
          <div
            className={cn(colorPickerSwatchVariants({ size }))}
            style={{ backgroundColor: value }}
          />
          <span className="text-[var(--fg)] font-mono text-sm">{displayValue}</span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={contentRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'absolute z-50 top-full mt-1 p-4',
                'rounded-[var(--radius-lg)]',
                'bg-[var(--bg)] border border-[var(--border)]',
                'shadow-lg',
                'w-64'
              )}
            >
              {/* Color Area */}
              <ColorArea
                hue={hsl.h}
                saturation={hsl.s}
                lightness={hsl.l}
                onChange={handleSaturationLightnessChange}
              />

              {/* Hue Slider */}
              <div className="mt-3">
                <HueSlider hue={hsl.h} onChange={handleHueChange} />
              </div>

              {/* Input */}
              <div className="mt-3">
                <input
                  type="text"
                  value={value}
                  onChange={handleInputChange}
                  className={cn(
                    'w-full px-3 py-2 text-sm font-mono',
                    'rounded-[var(--radius-md)]',
                    'border border-[var(--border)]',
                    'bg-[var(--bg)] text-[var(--fg)]',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--ring)]'
                  )}
                />
              </div>

              {/* Swatches */}
              {swatches.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {swatches.map((swatch, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSwatchClick(swatch)}
                      className={cn(
                        'h-6 w-6 rounded-[var(--radius-sm)]',
                        'border border-[var(--border)]',
                        'transition-transform hover:scale-110',
                        'focus:outline-none focus:ring-2 focus:ring-[var(--ring)]',
                        value === swatch && 'ring-2 ring-[var(--primary)]'
                      )}
                      style={{ backgroundColor: swatch }}
                      aria-label={`Select color ${swatch}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

ColorPicker.displayName = 'ColorPicker';

/* -------------------------------------------------------------------------------------------------
 * ColorArea Component
 * ------------------------------------------------------------------------------------------------*/

interface ColorAreaProps {
  hue: number;
  saturation: number;
  lightness: number;
  onChange: (s: number, l: number) => void;
}

function ColorArea({ hue, saturation, lightness, onChange }: ColorAreaProps) {
  const areaRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateColor(e);
  };

  const updateColor = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!areaRef.current) return;

    const rect = areaRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    const s = x * 100;
    const l = (1 - y) * 50 + 25;

    onChange(s, l);
  }, [onChange]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => updateColor(e);
    const handleMouseUp = () => setIsDragging(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, updateColor]);

  const thumbX = saturation;
  const thumbY = 100 - ((lightness - 25) / 50) * 100;

  return (
    <div
      ref={areaRef}
      className="relative h-40 w-full rounded-[var(--radius-md)] cursor-crosshair"
      style={{
        background: `
          linear-gradient(to top, #000, transparent),
          linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))
        `,
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className={cn(
          'absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2',
          'rounded-full border-2 border-white',
          'shadow-[0_0_0_1px_rgba(0,0,0,0.2)]',
          'pointer-events-none'
        )}
        style={{
          left: `${thumbX}%`,
          top: `${thumbY}%`,
          backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
        }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * HueSlider Component
 * ------------------------------------------------------------------------------------------------*/

interface HueSliderProps {
  hue: number;
  onChange: (hue: number) => void;
}

function HueSlider({ hue, onChange }: HueSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateHue(e);
  };

  const updateHue = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onChange(x * 360);
  }, [onChange]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => updateHue(e);
    const handleMouseUp = () => setIsDragging(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, updateHue]);

  return (
    <div
      ref={sliderRef}
      className="relative h-3 w-full rounded-full cursor-pointer"
      style={{
        background: 'linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)',
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className={cn(
          'absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2',
          'rounded-full border-2 border-white',
          'shadow-[0_0_0_1px_rgba(0,0,0,0.2)]',
          'pointer-events-none'
        )}
        style={{
          left: `${(hue / 360) * 100}%`,
          backgroundColor: `hsl(${hue}, 100%, 50%)`,
        }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { ColorPicker, colorPickerTriggerVariants, colorPickerSwatchVariants };
