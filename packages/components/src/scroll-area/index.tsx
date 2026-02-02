'use client';

import {
  forwardRef,
  useRef,
  useEffect,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * ScrollArea Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const scrollAreaVariants = cva(
  ['relative overflow-hidden'],
  {
    variants: {
      type: {
        auto: '',
        always: '',
        scroll: '',
        hover: '',
      },
    },
    defaultVariants: {
      type: 'hover',
    },
  }
);

const scrollbarVariants = cva(
  [
    'flex touch-none select-none transition-colors duration-150',
  ],
  {
    variants: {
      orientation: {
        vertical: 'h-full w-2.5 border-l border-l-transparent p-px',
        horizontal: 'h-2.5 w-full border-t border-t-transparent p-px flex-col',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  }
);

const scrollThumbVariants = cva(
  [
    'relative flex-1 rounded-full',
    'bg-[var(--border-emphasized)]',
    'transition-colors duration-150',
    'hover:bg-[var(--fg-muted)]',
  ]
);

/* -------------------------------------------------------------------------------------------------
 * ScrollArea Types
 * ------------------------------------------------------------------------------------------------*/

export interface ScrollAreaProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof scrollAreaVariants> {
  /**
   * The content to be scrolled
   */
  children?: ReactNode;
  /**
   * The orientation of the scroll area
   */
  orientation?: 'vertical' | 'horizontal' | 'both';
  /**
   * Maximum height of the scroll area
   */
  maxHeight?: string | number;
  /**
   * Maximum width of the scroll area
   */
  maxWidth?: string | number;
}

/* -------------------------------------------------------------------------------------------------
 * ScrollArea Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A scroll area with custom styled scrollbars.
 *
 * Features:
 * - Custom scrollbar styling
 * - Horizontal and vertical scroll support
 * - Auto-hide scrollbars on hover
 * - Keyboard accessible
 *
 * @example
 * ```tsx
 * // Basic vertical scroll
 * <ScrollArea maxHeight={300}>
 *   <div>Long content...</div>
 * </ScrollArea>
 *
 * // Horizontal scroll
 * <ScrollArea orientation="horizontal" maxWidth={400}>
 *   <div className="flex gap-4">
 *     {items.map(item => <Card key={item.id} />)}
 *   </div>
 * </ScrollArea>
 *
 * // Both directions
 * <ScrollArea orientation="both" maxHeight={400} maxWidth={600}>
 *   <div>Wide and tall content...</div>
 * </ScrollArea>
 * ```
 */
const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  (props, ref) => {
    const {
      className,
      children,
      type = 'hover',
      orientation = 'vertical',
      maxHeight,
      maxWidth,
      style,
      ...restProps
    } = props;

    const viewportRef = useRef<HTMLDivElement>(null);
    const [showVertical, setShowVertical] = useState(false);
    const [showHorizontal, setShowHorizontal] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Vertical scrollbar state
    const [verticalThumbHeight, setVerticalThumbHeight] = useState(0);
    const [verticalThumbTop, setVerticalThumbTop] = useState(0);

    // Horizontal scrollbar state
    const [horizontalThumbWidth, setHorizontalThumbWidth] = useState(0);
    const [horizontalThumbLeft, setHorizontalThumbLeft] = useState(0);

    const updateScrollbars = () => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      // Vertical
      const canScrollVertical = viewport.scrollHeight > viewport.clientHeight;
      setShowVertical(canScrollVertical && (orientation === 'vertical' || orientation === 'both'));

      if (canScrollVertical) {
        const thumbHeight = Math.max(
          (viewport.clientHeight / viewport.scrollHeight) * viewport.clientHeight,
          30
        );
        setVerticalThumbHeight(thumbHeight);

        const scrollRatio = viewport.scrollTop / (viewport.scrollHeight - viewport.clientHeight);
        const maxTop = viewport.clientHeight - thumbHeight;
        setVerticalThumbTop(scrollRatio * maxTop);
      }

      // Horizontal
      const canScrollHorizontal = viewport.scrollWidth > viewport.clientWidth;
      setShowHorizontal(canScrollHorizontal && (orientation === 'horizontal' || orientation === 'both'));

      if (canScrollHorizontal) {
        const thumbWidth = Math.max(
          (viewport.clientWidth / viewport.scrollWidth) * viewport.clientWidth,
          30
        );
        setHorizontalThumbWidth(thumbWidth);

        const scrollRatio = viewport.scrollLeft / (viewport.scrollWidth - viewport.clientWidth);
        const maxLeft = viewport.clientWidth - thumbWidth;
        setHorizontalThumbLeft(scrollRatio * maxLeft);
      }
    };

    useEffect(() => {
      updateScrollbars();
      window.addEventListener('resize', updateScrollbars);
      return () => window.removeEventListener('resize', updateScrollbars);
    }, [orientation]);

    const handleVerticalScroll = (e: React.MouseEvent) => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      const track = e.currentTarget;
      const rect = track.getBoundingClientRect();
      const clickPosition = e.clientY - rect.top;
      const scrollRatio = clickPosition / rect.height;
      viewport.scrollTop = scrollRatio * (viewport.scrollHeight - viewport.clientHeight);
    };

    const handleHorizontalScroll = (e: React.MouseEvent) => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      const track = e.currentTarget;
      const rect = track.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const scrollRatio = clickPosition / rect.width;
      viewport.scrollLeft = scrollRatio * (viewport.scrollWidth - viewport.clientWidth);
    };

    const shouldShowScrollbars = type === 'always' || (type === 'hover' && isHovered) || type === 'scroll';

    return (
      <div
        ref={ref}
        className={cn(scrollAreaVariants({ type }), className)}
        style={{
          ...style,
          maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
          maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...restProps}
      >
        <div
          ref={viewportRef}
          className={cn(
            'h-full w-full overflow-auto scrollbar-none',
            showVertical && 'pr-3',
            showHorizontal && 'pb-3'
          )}
          onScroll={updateScrollbars}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children}
        </div>

        {/* Vertical Scrollbar */}
        {showVertical && (
          <div
            className={cn(
              scrollbarVariants({ orientation: 'vertical' }),
              'absolute right-0 top-0 bottom-0',
              !shouldShowScrollbars && 'opacity-0'
            )}
            onClick={handleVerticalScroll}
          >
            <div
              className={scrollThumbVariants()}
              style={{
                height: verticalThumbHeight,
                transform: `translateY(${verticalThumbTop}px)`,
              }}
            />
          </div>
        )}

        {/* Horizontal Scrollbar */}
        {showHorizontal && (
          <div
            className={cn(
              scrollbarVariants({ orientation: 'horizontal' }),
              'absolute bottom-0 left-0 right-0',
              !shouldShowScrollbars && 'opacity-0'
            )}
            onClick={handleHorizontalScroll}
          >
            <div
              className={scrollThumbVariants()}
              style={{
                width: horizontalThumbWidth,
                transform: `translateX(${horizontalThumbLeft}px)`,
              }}
            />
          </div>
        )}
      </div>
    );
  }
);

ScrollArea.displayName = 'ScrollArea';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { ScrollArea, scrollAreaVariants };
