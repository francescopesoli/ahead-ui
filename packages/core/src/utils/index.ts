import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines clsx and tailwind-merge for optimal class handling.
 * 
 * - clsx handles conditional classes
 * - tailwind-merge intelligently merges Tailwind classes
 * 
 * @example
 * cn('px-4 py-2', isActive && 'bg-primary', className)
 * cn('text-sm', 'text-lg') // → 'text-lg' (tailwind-merge dedupes)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Creates a variant resolver for CVA-style variant props.
 * Handles compound variants and default variants.
 */
export type VariantProps<T extends (...args: unknown[]) => unknown> = 
  Parameters<T>[0] extends infer P ? (P extends object ? P : never) : never;

/**
 * Type-safe object keys helper
 */
export function objectKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

/**
 * Type-safe object entries helper
 */
export function objectEntries<T extends object>(obj: T): Array<[keyof T, T[keyof T]]> {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}

/**
 * Creates a unique ID for accessibility purposes.
 * Uses a counter to ensure uniqueness without crypto.
 */
let idCounter = 0;
export function createId(prefix = 'ahead'): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

/**
 * Composes multiple event handlers into a single handler.
 * Useful for combining library handlers with user handlers.
 */
export function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
): (event: E) => void {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);

    if (
      checkForDefaultPrevented === false ||
      !(event as unknown as Event).defaultPrevented
    ) {
      ourEventHandler?.(event);
    }
  };
}

/**
 * Type guard for checking if a value is defined (not null or undefined)
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Type guard for checking if a value is a function
 */
export function isFunction<T extends (...args: unknown[]) => unknown>(
  value: unknown
): value is T {
  return typeof value === 'function';
}

/**
 * Picks specific properties from an object
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Omits specific properties from an object
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
}

/**
 * Debounces a function call
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function debounced(...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
}

/**
 * Throttles a function call
 */
export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;

  return function throttled(...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= ms) {
      lastCall = now;
      fn(...args);
    }
  };
}

/**
 * Clamps a number between a minimum and maximum value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values
 */
export function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

/**
 * Maps a value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
