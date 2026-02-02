'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * AspectRatio Types
 * ------------------------------------------------------------------------------------------------*/

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The aspect ratio (width / height)
   * Can be a number (e.g., 16/9) or a preset string
   */
  ratio?: number | '16/9' | '4/3' | '1/1' | '21/9' | '9/16';
  /**
   * The content to render with the aspect ratio
   */
  children?: ReactNode;
}

/* -------------------------------------------------------------------------------------------------
 * AspectRatio Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A component that maintains a consistent aspect ratio for its content.
 *
 * Features:
 * - Preset ratios (16/9, 4/3, 1/1, etc.)
 * - Custom numeric ratios
 * - Responsive by default
 *
 * @example
 * ```tsx
 * // 16:9 video
 * <AspectRatio ratio="16/9">
 *   <video src="/video.mp4" className="object-cover" />
 * </AspectRatio>
 *
 * // Square image
 * <AspectRatio ratio="1/1">
 *   <img src="/avatar.jpg" className="object-cover" />
 * </AspectRatio>
 *
 * // Custom ratio
 * <AspectRatio ratio={2.35}>
 *   <img src="/cinematic.jpg" />
 * </AspectRatio>
 * ```
 */
const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  (props, ref) => {
    const { className, ratio = '16/9', children, style, ...restProps } = props;

    // Convert preset strings to numbers
    const getRatioValue = (r: AspectRatioProps['ratio']): number => {
      if (typeof r === 'number') return r;
      switch (r) {
        case '16/9':
          return 16 / 9;
        case '4/3':
          return 4 / 3;
        case '1/1':
          return 1;
        case '21/9':
          return 21 / 9;
        case '9/16':
          return 9 / 16;
        default:
          return 16 / 9;
      }
    };

    const ratioValue = getRatioValue(ratio);

    return (
      <div
        ref={ref}
        className={cn('relative w-full', className)}
        style={{
          ...style,
          paddingBottom: `${(1 / ratioValue) * 100}%`,
        }}
        {...restProps}
      >
        <div className="absolute inset-0">
          {children}
        </div>
      </div>
    );
  }
);

AspectRatio.displayName = 'AspectRatio';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { AspectRatio };
