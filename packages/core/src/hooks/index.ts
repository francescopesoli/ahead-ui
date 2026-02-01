'use client';

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  type RefObject,
} from 'react';

// ============================================================================
// CORE HOOKS
// ============================================================================

/**
 * Hook for detecting user's preferred color scheme
 */
export function useColorScheme(): 'light' | 'dark' {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setColorScheme(mediaQuery.matches ? 'dark' : 'light');

    const handler = (e: MediaQueryListEvent) => {
      setColorScheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return colorScheme;
}

/**
 * Hook for detecting reduced motion preference
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook for media queries
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/**
 * Hook for detecting if element is in viewport
 */
export function useInView(
  ref: RefObject<Element>,
  options?: IntersectionObserverInit
): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry?.isIntersecting ?? false);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options]);

  return isInView;
}

// ============================================================================
// ADAPTIVE BEHAVIOR HOOKS - The innovative part of Ahead UI
// ============================================================================

/**
 * Tracks user interaction patterns to detect behavior.
 * This is the foundation for adaptive UI.
 */
export interface UserBehaviorMetrics {
  /** Average time between clicks (ms) */
  avgClickInterval: number;
  /** Scroll speed (pixels/second) */
  scrollSpeed: number;
  /** Mouse movement speed (pixels/second) */
  mouseSpeed: number;
  /** Typing speed (characters/second) */
  typingSpeed: number;
  /** Time of day (hour 0-23) */
  timeOfDay: number;
  /** Session duration (seconds) */
  sessionDuration: number;
  /** Detected pace: 'fast' | 'normal' | 'slow' */
  detectedPace: 'fast' | 'normal' | 'slow';
  /** Confidence score (0-1) */
  confidence: number;
}

export function useUserBehavior(): UserBehaviorMetrics {
  const [metrics, setMetrics] = useState<UserBehaviorMetrics>({
    avgClickInterval: 1000,
    scrollSpeed: 0,
    mouseSpeed: 0,
    typingSpeed: 0,
    timeOfDay: new Date().getHours(),
    sessionDuration: 0,
    detectedPace: 'normal',
    confidence: 0,
  });

  const clickTimestamps = useRef<number[]>([]);
  const scrollPositions = useRef<{ y: number; time: number }[]>([]);
  const mousePositions = useRef<{ x: number; y: number; time: number }[]>([]);
  const keyTimestamps = useRef<number[]>([]);
  const sessionStart = useRef(Date.now());

  useEffect(() => {
    // Track clicks
    const handleClick = () => {
      const now = Date.now();
      clickTimestamps.current.push(now);
      // Keep last 10 clicks
      if (clickTimestamps.current.length > 10) {
        clickTimestamps.current.shift();
      }
    };

    // Track scroll
    const handleScroll = () => {
      const now = Date.now();
      scrollPositions.current.push({ y: window.scrollY, time: now });
      // Keep last 20 positions
      if (scrollPositions.current.length > 20) {
        scrollPositions.current.shift();
      }
    };

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      mousePositions.current.push({ x: e.clientX, y: e.clientY, time: now });
      // Keep last 20 positions
      if (mousePositions.current.length > 20) {
        mousePositions.current.shift();
      }
    };

    // Track keyboard
    const handleKeyDown = () => {
      const now = Date.now();
      keyTimestamps.current.push(now);
      // Keep last 20 keypresses
      if (keyTimestamps.current.length > 20) {
        keyTimestamps.current.shift();
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('keydown', handleKeyDown);

    // Update metrics periodically
    const interval = setInterval(() => {
      const now = Date.now();

      // Calculate average click interval
      let avgClickInterval = 1000;
      if (clickTimestamps.current.length >= 2) {
        const intervals: number[] = [];
        for (let i = 1; i < clickTimestamps.current.length; i++) {
          const prev = clickTimestamps.current[i - 1];
          const curr = clickTimestamps.current[i];
          if (prev !== undefined && curr !== undefined) {
            intervals.push(curr - prev);
          }
        }
        if (intervals.length > 0) {
          avgClickInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        }
      }

      // Calculate scroll speed
      let scrollSpeed = 0;
      if (scrollPositions.current.length >= 2) {
        const first = scrollPositions.current[0];
        const last = scrollPositions.current[scrollPositions.current.length - 1];
        if (first && last) {
          const timeDiff = (last.time - first.time) / 1000;
          if (timeDiff > 0) {
            scrollSpeed = Math.abs(last.y - first.y) / timeDiff;
          }
        }
      }

      // Calculate mouse speed
      let mouseSpeed = 0;
      if (mousePositions.current.length >= 2) {
        let totalDistance = 0;
        for (let i = 1; i < mousePositions.current.length; i++) {
          const prev = mousePositions.current[i - 1];
          const curr = mousePositions.current[i];
          if (prev && curr) {
            totalDistance += Math.sqrt(
              Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2)
            );
          }
        }
        const first = mousePositions.current[0];
        const last = mousePositions.current[mousePositions.current.length - 1];
        if (first && last) {
          const timeDiff = (last.time - first.time) / 1000;
          if (timeDiff > 0) {
            mouseSpeed = totalDistance / timeDiff;
          }
        }
      }

      // Calculate typing speed
      let typingSpeed = 0;
      if (keyTimestamps.current.length >= 2) {
        const first = keyTimestamps.current[0];
        const last = keyTimestamps.current[keyTimestamps.current.length - 1];
        if (first && last) {
          const timeDiff = (last - first) / 1000;
          if (timeDiff > 0) {
            typingSpeed = keyTimestamps.current.length / timeDiff;
          }
        }
      }

      // Calculate session duration
      const sessionDuration = (now - sessionStart.current) / 1000;

      // Determine pace based on metrics
      let detectedPace: 'fast' | 'normal' | 'slow' = 'normal';
      let confidence = 0;

      // Fast user indicators
      const fastIndicators = [
        avgClickInterval < 500,
        scrollSpeed > 500,
        mouseSpeed > 800,
        typingSpeed > 5,
      ].filter(Boolean).length;

      // Slow user indicators
      const slowIndicators = [
        avgClickInterval > 2000,
        scrollSpeed < 100,
        mouseSpeed < 200,
        typingSpeed < 2,
      ].filter(Boolean).length;

      if (fastIndicators >= 2) {
        detectedPace = 'fast';
        confidence = Math.min(0.9, fastIndicators * 0.25);
      } else if (slowIndicators >= 2) {
        detectedPace = 'slow';
        confidence = Math.min(0.9, slowIndicators * 0.25);
      } else {
        detectedPace = 'normal';
        confidence = 0.5;
      }

      // Increase confidence over time
      confidence = Math.min(1, confidence + sessionDuration / 300);

      setMetrics({
        avgClickInterval,
        scrollSpeed,
        mouseSpeed,
        typingSpeed,
        timeOfDay: new Date().getHours(),
        sessionDuration,
        detectedPace,
        confidence,
      });
    }, 2000);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, []);

  return metrics;
}

/**
 * Returns adaptive values based on user behavior.
 * Use this to adjust UI density, animation speed, etc.
 */
export interface AdaptiveConfig {
  /** Animation duration multiplier */
  animationMultiplier: number;
  /** Content density: 'compact' | 'normal' | 'comfortable' */
  density: 'compact' | 'normal' | 'comfortable';
  /** Whether to show optional content/hints */
  showHints: boolean;
  /** Recommended debounce time for inputs */
  debounceMs: number;
}

export function useAdaptiveConfig(
  behavior: UserBehaviorMetrics
): AdaptiveConfig {
  return useMemo(() => {
    const { detectedPace, confidence, timeOfDay } = behavior;

    // Base config for normal pace
    let config: AdaptiveConfig = {
      animationMultiplier: 1,
      density: 'normal',
      showHints: true,
      debounceMs: 300,
    };

    // Only apply adaptations if we're confident enough
    if (confidence < 0.4) return config;

    if (detectedPace === 'fast') {
      config = {
        animationMultiplier: 0.6, // Faster animations
        density: 'compact', // Denser layout
        showHints: false, // Hide optional hints
        debounceMs: 150, // Faster input response
      };
    } else if (detectedPace === 'slow') {
      config = {
        animationMultiplier: 1.2, // Slower, smoother animations
        density: 'comfortable', // More spacing
        showHints: true, // Show all hints
        debounceMs: 500, // More forgiving debounce
      };
    }

    // Late night adjustments (after 10pm or before 6am)
    if (timeOfDay >= 22 || timeOfDay < 6) {
      config.animationMultiplier *= 0.8; // Calmer animations at night
    }

    return config;
  }, [behavior]);
}

/**
 * Tracks element focus state with additional metadata
 */
export interface FocusState {
  isFocused: boolean;
  isFocusVisible: boolean;
  focusOrigin: 'keyboard' | 'mouse' | 'touch' | 'program' | null;
}

export function useFocusState(): [
  FocusState,
  {
    onFocus: () => void;
    onBlur: () => void;
    onKeyDown: () => void;
    onMouseDown: () => void;
    onTouchStart: () => void;
  }
] {
  const [state, setState] = useState<FocusState>({
    isFocused: false,
    isFocusVisible: false,
    focusOrigin: null,
  });

  const lastInteraction = useRef<'keyboard' | 'mouse' | 'touch'>('mouse');

  const handlers = useMemo(
    () => ({
      onFocus: () => {
        setState({
          isFocused: true,
          isFocusVisible: lastInteraction.current === 'keyboard',
          focusOrigin: lastInteraction.current,
        });
      },
      onBlur: () => {
        setState({
          isFocused: false,
          isFocusVisible: false,
          focusOrigin: null,
        });
      },
      onKeyDown: () => {
        lastInteraction.current = 'keyboard';
      },
      onMouseDown: () => {
        lastInteraction.current = 'mouse';
      },
      onTouchStart: () => {
        lastInteraction.current = 'touch';
      },
    }),
    []
  );

  return [state, handlers];
}

/**
 * Controllable state hook - supports both controlled and uncontrolled patterns
 */
export function useControllableState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
): [T, (value: T | ((prev: T) => T)) => void] {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : uncontrolledValue;

  const setValue = useCallback(
    (nextValue: T | ((prev: T) => T)) => {
      const resolvedValue =
        typeof nextValue === 'function'
          ? (nextValue as (prev: T) => T)(currentValue)
          : nextValue;

      if (!isControlled) {
        setUncontrolledValue(resolvedValue);
      }
      onChange?.(resolvedValue);
    },
    [isControlled, onChange, currentValue]
  );

  return [currentValue, setValue];
}

/**
 * Previous value hook - tracks the previous value of a state
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

/**
 * Debounced value hook
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Local storage hook with SSR support
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue =
          typeof value === 'function'
            ? (value as (prev: T) => T)(prev)
            : value;

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(nextValue));
        }

        return nextValue;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}
