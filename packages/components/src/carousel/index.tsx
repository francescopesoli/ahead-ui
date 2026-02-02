'use client';

import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Carousel Context
 * ------------------------------------------------------------------------------------------------*/

interface CarouselContextValue {
  currentIndex: number;
  totalSlides: number;
  setTotalSlides: (count: number) => void;
  goToSlide: (index: number) => void;
  goToNext: () => void;
  goToPrev: () => void;
  orientation: 'horizontal' | 'vertical';
  loop: boolean;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('Carousel components must be used within a Carousel');
  }
  return context;
};

/* -------------------------------------------------------------------------------------------------
 * Carousel Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const carouselVariants = cva(
  ['relative overflow-hidden'],
  {
    variants: {
      orientation: {
        horizontal: 'w-full',
        vertical: 'h-full',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Carousel Types
 * ------------------------------------------------------------------------------------------------*/

export interface CarouselProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof carouselVariants> {
  /**
   * Current slide index (controlled)
   */
  index?: number;
  /**
   * Default starting slide
   */
  defaultIndex?: number;
  /**
   * Callback when slide changes
   */
  onIndexChange?: (index: number) => void;
  /**
   * Enable autoplay
   */
  autoplay?: boolean;
  /**
   * Autoplay interval in ms
   */
  autoplayInterval?: number;
  /**
   * Pause autoplay on hover
   */
  pauseOnHover?: boolean;
  /**
   * Loop slides continuously
   */
  loop?: boolean;
  /**
   * Orientation of the carousel
   */
  orientation?: 'horizontal' | 'vertical';
}

export interface CarouselSlideProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Index of the slide (auto-assigned by Carousel)
   */
  index?: number;
}

export interface CarouselPreviousProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
export interface CarouselNextProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface CarouselDotsProps extends HTMLAttributes<HTMLDivElement> {}

/* -------------------------------------------------------------------------------------------------
 * Carousel Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A carousel component for cycling through slides.
 *
 * Features:
 * - Touch/swipe support
 * - Autoplay with pause on hover
 * - Loop mode
 * - Horizontal and vertical orientations
 * - Keyboard navigation
 *
 * @example
 * ```tsx
 * <Carousel autoplay loop>
 *   <CarouselSlide>
 *     <img src="/slide1.jpg" />
 *   </CarouselSlide>
 *   <CarouselSlide>
 *     <img src="/slide2.jpg" />
 *   </CarouselSlide>
 *   <CarouselPrevious />
 *   <CarouselNext />
 *   <CarouselDots />
 * </Carousel>
 * ```
 */
const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (props, ref) => {
    const {
      className,
      children,
      index: controlledIndex,
      defaultIndex = 0,
      onIndexChange,
      autoplay = false,
      autoplayInterval = 5000,
      pauseOnHover = true,
      loop = false,
      orientation = 'horizontal',
      ...restProps
    } = props;

    const [internalIndex, setInternalIndex] = useState(defaultIndex);
    const [totalSlides, setTotalSlides] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);

    const currentIndex = controlledIndex ?? internalIndex;

    const goToSlide = useCallback((index: number) => {
      let newIndex = index;

      if (loop) {
        if (index < 0) newIndex = totalSlides - 1;
        else if (index >= totalSlides) newIndex = 0;
      } else {
        newIndex = Math.max(0, Math.min(totalSlides - 1, index));
      }

      if (controlledIndex === undefined) {
        setInternalIndex(newIndex);
      }
      onIndexChange?.(newIndex);
    }, [totalSlides, loop, controlledIndex, onIndexChange]);

    const goToNext = useCallback(() => {
      goToSlide(currentIndex + 1);
    }, [currentIndex, goToSlide]);

    const goToPrev = useCallback(() => {
      goToSlide(currentIndex - 1);
    }, [currentIndex, goToSlide]);

    // Autoplay
    useEffect(() => {
      if (autoplay && !isPaused && totalSlides > 1) {
        autoplayRef.current = setInterval(goToNext, autoplayInterval);
        return () => {
          if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
      }
      return undefined;
    }, [autoplay, isPaused, totalSlides, goToNext, autoplayInterval]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (orientation === 'horizontal') {
        if (e.key === 'ArrowLeft') goToPrev();
        else if (e.key === 'ArrowRight') goToNext();
      } else {
        if (e.key === 'ArrowUp') goToPrev();
        else if (e.key === 'ArrowDown') goToNext();
      }
    };

    return (
      <CarouselContext.Provider
        value={{
          currentIndex,
          totalSlides,
          setTotalSlides,
          goToSlide,
          goToNext,
          goToPrev,
          orientation,
          loop,
        }}
      >
        <div
          ref={ref}
          role="region"
          aria-roledescription="carousel"
          aria-label="Carousel"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => pauseOnHover && setIsPaused(true)}
          onMouseLeave={() => pauseOnHover && setIsPaused(false)}
          className={cn(carouselVariants({ orientation }), className)}
          {...restProps}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);

Carousel.displayName = 'Carousel';

/* -------------------------------------------------------------------------------------------------
 * CarouselSlides Component (Container for slides)
 * ------------------------------------------------------------------------------------------------*/

export interface CarouselSlidesProps extends HTMLAttributes<HTMLDivElement> {}

const CarouselSlides = forwardRef<HTMLDivElement, CarouselSlidesProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;
    const { currentIndex, setTotalSlides, orientation } = useCarouselContext();
    const childrenArray = Array.isArray(children) ? children : [children];

    useEffect(() => {
      setTotalSlides(childrenArray.length);
    }, [childrenArray.length, setTotalSlides]);

    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden', className)}
        {...restProps}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{
              opacity: 0,
              x: orientation === 'horizontal' ? 50 : 0,
              y: orientation === 'vertical' ? 50 : 0,
            }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{
              opacity: 0,
              x: orientation === 'horizontal' ? -50 : 0,
              y: orientation === 'vertical' ? -50 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {childrenArray[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
);

CarouselSlides.displayName = 'CarouselSlides';

/* -------------------------------------------------------------------------------------------------
 * CarouselSlide Component
 * ------------------------------------------------------------------------------------------------*/

const CarouselSlide = forwardRef<HTMLDivElement, CarouselSlideProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn('w-full', className)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

CarouselSlide.displayName = 'CarouselSlide';

/* -------------------------------------------------------------------------------------------------
 * CarouselPrevious Component
 * ------------------------------------------------------------------------------------------------*/

const CarouselPrevious = forwardRef<HTMLButtonElement, CarouselPreviousProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;
    const { goToPrev, currentIndex, loop } = useCarouselContext();

    const isDisabled = !loop && currentIndex === 0;

    return (
      <button
        ref={ref}
        type="button"
        onClick={goToPrev}
        disabled={isDisabled}
        aria-label="Previous slide"
        className={cn(
          'absolute left-2 top-1/2 -translate-y-1/2',
          'flex h-10 w-10 items-center justify-center rounded-full',
          'bg-[var(--bg)]/80 backdrop-blur-sm',
          'border border-[var(--border)]',
          'text-[var(--fg)] hover:bg-[var(--bg-muted)]',
          'transition-colors duration-fast',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]',
          className
        )}
        {...restProps}
      >
        {children || (
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        )}
      </button>
    );
  }
);

CarouselPrevious.displayName = 'CarouselPrevious';

/* -------------------------------------------------------------------------------------------------
 * CarouselNext Component
 * ------------------------------------------------------------------------------------------------*/

const CarouselNext = forwardRef<HTMLButtonElement, CarouselNextProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;
    const { goToNext, currentIndex, totalSlides, loop } = useCarouselContext();

    const isDisabled = !loop && currentIndex === totalSlides - 1;

    return (
      <button
        ref={ref}
        type="button"
        onClick={goToNext}
        disabled={isDisabled}
        aria-label="Next slide"
        className={cn(
          'absolute right-2 top-1/2 -translate-y-1/2',
          'flex h-10 w-10 items-center justify-center rounded-full',
          'bg-[var(--bg)]/80 backdrop-blur-sm',
          'border border-[var(--border)]',
          'text-[var(--fg)] hover:bg-[var(--bg-muted)]',
          'transition-colors duration-fast',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]',
          className
        )}
        {...restProps}
      >
        {children || (
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        )}
      </button>
    );
  }
);

CarouselNext.displayName = 'CarouselNext';

/* -------------------------------------------------------------------------------------------------
 * CarouselDots Component
 * ------------------------------------------------------------------------------------------------*/

const CarouselDots = forwardRef<HTMLDivElement, CarouselDotsProps>(
  (props, ref) => {
    const { className, ...restProps } = props;
    const { currentIndex, totalSlides, goToSlide } = useCarouselContext();

    return (
      <div
        ref={ref}
        role="tablist"
        aria-label="Slides"
        className={cn(
          'absolute bottom-4 left-1/2 -translate-x-1/2',
          'flex items-center gap-2',
          className
        )}
        {...restProps}
      >
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goToSlide(index)}
            className={cn(
              'h-2 rounded-full transition-all duration-200',
              index === currentIndex
                ? 'w-6 bg-[var(--primary)]'
                : 'w-2 bg-[var(--border-emphasized)] hover:bg-[var(--fg-muted)]',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]'
            )}
          />
        ))}
      </div>
    );
  }
);

CarouselDots.displayName = 'CarouselDots';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Carousel, CarouselSlides, CarouselSlide, CarouselPrevious, CarouselNext, CarouselDots, carouselVariants };
