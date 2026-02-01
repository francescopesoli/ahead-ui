/**
 * Ahead UI Design Tokens
 * 
 * Three-layer architecture:
 * 1. Primitives - Raw values (colors, spacing, typography)
 * 2. Semantic - Contextual aliases (primary, background, error)
 * 3. Component - Specific component tokens (button-bg, input-border)
 * 
 * Using OKLCH color space for perceptual uniformity
 */

// ============================================================================
// PRIMITIVE TOKENS - Raw design values
// ============================================================================

/**
 * Color primitives using OKLCH for perceptual uniformity
 * Format: oklch(lightness chroma hue)
 * - Lightness: 0-1 (0 = black, 1 = white)
 * - Chroma: 0-0.4 (0 = gray, higher = more saturated)
 * - Hue: 0-360 (color wheel angle)
 */
export const colorPrimitives = {
  // Neutral scale - carefully crafted for optimal contrast
  neutral: {
    0: 'oklch(1 0 0)',           // Pure white
    50: 'oklch(0.985 0 0)',      // Near white
    100: 'oklch(0.97 0.001 286)',
    200: 'oklch(0.92 0.004 286)',
    300: 'oklch(0.87 0.006 286)',
    400: 'oklch(0.71 0.01 286)',
    500: 'oklch(0.55 0.014 286)',
    600: 'oklch(0.45 0.016 286)',
    700: 'oklch(0.37 0.014 286)',
    800: 'oklch(0.27 0.01 286)',
    900: 'oklch(0.2 0.006 286)',
    950: 'oklch(0.14 0.004 286)',
    1000: 'oklch(0 0 0)',        // Pure black
  },

  // Primary - Vibrant blue with excellent contrast
  blue: {
    50: 'oklch(0.97 0.02 250)',
    100: 'oklch(0.93 0.04 250)',
    200: 'oklch(0.86 0.08 250)',
    300: 'oklch(0.76 0.12 250)',
    400: 'oklch(0.66 0.17 250)',
    500: 'oklch(0.55 0.2 250)',   // Primary
    600: 'oklch(0.47 0.19 250)',
    700: 'oklch(0.4 0.16 250)',
    800: 'oklch(0.33 0.13 250)',
    900: 'oklch(0.28 0.1 250)',
    950: 'oklch(0.2 0.07 250)',
  },

  // Success - Natural green
  green: {
    50: 'oklch(0.97 0.03 145)',
    100: 'oklch(0.93 0.06 145)',
    200: 'oklch(0.86 0.1 145)',
    300: 'oklch(0.76 0.14 145)',
    400: 'oklch(0.66 0.17 145)',
    500: 'oklch(0.55 0.18 145)',
    600: 'oklch(0.47 0.16 145)',
    700: 'oklch(0.4 0.14 145)',
    800: 'oklch(0.33 0.11 145)',
    900: 'oklch(0.28 0.08 145)',
    950: 'oklch(0.2 0.05 145)',
  },

  // Warning - Warm amber
  amber: {
    50: 'oklch(0.97 0.03 85)',
    100: 'oklch(0.93 0.07 85)',
    200: 'oklch(0.86 0.12 85)',
    300: 'oklch(0.79 0.16 85)',
    400: 'oklch(0.75 0.18 85)',
    500: 'oklch(0.7 0.18 70)',
    600: 'oklch(0.6 0.17 55)',
    700: 'oklch(0.5 0.15 50)',
    800: 'oklch(0.42 0.12 50)',
    900: 'oklch(0.35 0.1 50)',
    950: 'oklch(0.25 0.06 50)',
  },

  // Error - Vibrant red
  red: {
    50: 'oklch(0.97 0.02 25)',
    100: 'oklch(0.93 0.05 25)',
    200: 'oklch(0.86 0.1 25)',
    300: 'oklch(0.76 0.15 25)',
    400: 'oklch(0.66 0.2 25)',
    500: 'oklch(0.55 0.22 25)',
    600: 'oklch(0.47 0.2 25)',
    700: 'oklch(0.4 0.17 25)',
    800: 'oklch(0.33 0.14 25)',
    900: 'oklch(0.28 0.1 25)',
    950: 'oklch(0.2 0.07 25)',
  },

  // Accent - Purple for special interactions
  purple: {
    50: 'oklch(0.97 0.02 300)',
    100: 'oklch(0.93 0.05 300)',
    200: 'oklch(0.86 0.1 300)',
    300: 'oklch(0.76 0.15 300)',
    400: 'oklch(0.66 0.18 300)',
    500: 'oklch(0.55 0.2 300)',
    600: 'oklch(0.47 0.18 300)',
    700: 'oklch(0.4 0.15 300)',
    800: 'oklch(0.33 0.12 300)',
    900: 'oklch(0.28 0.09 300)',
    950: 'oklch(0.2 0.06 300)',
  },
} as const;

/**
 * Spacing scale - based on 4px grid with harmonious ratios
 */
export const spacingPrimitives = {
  0: '0px',
  px: '1px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
  36: '144px',
  40: '160px',
  44: '176px',
  48: '192px',
  52: '208px',
  56: '224px',
  60: '240px',
  64: '256px',
  72: '288px',
  80: '320px',
  96: '384px',
} as const;

/**
 * Typography scale
 */
export const typographyPrimitives = {
  fontFamily: {
    sans: 'var(--font-sans, ui-sans-serif, system-ui, sans-serif)',
    mono: 'var(--font-mono, ui-monospace, monospace)',
    display: 'var(--font-display, var(--font-sans))',
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],
    sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.005em' }],
    base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
    lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.005em' }],
    xl: ['1.25rem', { lineHeight: '1.875rem', letterSpacing: '-0.01em' }],
    '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.015em' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.025em' }],
    '5xl': ['3rem', { lineHeight: '3rem', letterSpacing: '-0.025em' }],
    '6xl': ['3.75rem', { lineHeight: '3.75rem', letterSpacing: '-0.03em' }],
    '7xl': ['4.5rem', { lineHeight: '4.5rem', letterSpacing: '-0.03em' }],
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
} as const;

/**
 * Border radius scale
 */
export const radiusPrimitives = {
  none: '0',
  sm: '0.25rem',
  DEFAULT: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  full: '9999px',
} as const;

/**
 * Shadow scale - using OKLCH for consistent appearance
 */
export const shadowPrimitives = {
  none: 'none',
  xs: '0 1px 2px 0 oklch(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 oklch(0 0 0 / 0.1), 0 1px 2px -1px oklch(0 0 0 / 0.1)',
  DEFAULT: '0 4px 6px -1px oklch(0 0 0 / 0.1), 0 2px 4px -2px oklch(0 0 0 / 0.1)',
  md: '0 4px 6px -1px oklch(0 0 0 / 0.1), 0 2px 4px -2px oklch(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px oklch(0 0 0 / 0.1), 0 4px 6px -4px oklch(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px oklch(0 0 0 / 0.1), 0 8px 10px -6px oklch(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px oklch(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 oklch(0 0 0 / 0.05)',
  // Colored shadows for elevated interactions
  glow: {
    blue: '0 0 20px oklch(0.55 0.2 250 / 0.3)',
    green: '0 0 20px oklch(0.55 0.18 145 / 0.3)',
    red: '0 0 20px oklch(0.55 0.22 25 / 0.3)',
    purple: '0 0 20px oklch(0.55 0.2 300 / 0.3)',
  },
} as const;

/**
 * Animation/Motion tokens
 */
export const motionPrimitives = {
  duration: {
    instant: '0ms',
    fastest: '50ms',
    faster: '100ms',
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '400ms',
    slowest: '500ms',
  },
  easing: {
    // Standard easings
    linear: 'linear',
    // Entrance - elements appearing
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeOutExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
    // Exit - elements disappearing
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeInExpo: 'cubic-bezier(0.7, 0, 0.84, 0)',
    // Standard - general transitions
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Spring-like
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  // Framer Motion spring configurations
  spring: {
    snappy: { type: 'spring', stiffness: 400, damping: 30 },
    bouncy: { type: 'spring', stiffness: 300, damping: 20 },
    gentle: { type: 'spring', stiffness: 200, damping: 25 },
    slow: { type: 'spring', stiffness: 100, damping: 20 },
  },
} as const;

/**
 * Z-index scale
 */
export const zIndexPrimitives = {
  auto: 'auto',
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  dropdown: '1000',
  sticky: '1100',
  modal: '1300',
  popover: '1400',
  tooltip: '1500',
  toast: '1600',
  overlay: '1700',
  max: '9999',
} as const;

// ============================================================================
// SEMANTIC TOKENS - Contextual aliases
// ============================================================================

export const semanticTokens = {
  light: {
    // Background colors
    bg: {
      DEFAULT: colorPrimitives.neutral[0],
      subtle: colorPrimitives.neutral[50],
      muted: colorPrimitives.neutral[100],
      emphasized: colorPrimitives.neutral[200],
      inverse: colorPrimitives.neutral[900],
    },
    // Foreground/text colors
    fg: {
      DEFAULT: colorPrimitives.neutral[950],
      muted: colorPrimitives.neutral[600],
      subtle: colorPrimitives.neutral[400],
      inverse: colorPrimitives.neutral[0],
      disabled: colorPrimitives.neutral[300],
    },
    // Border colors
    border: {
      DEFAULT: colorPrimitives.neutral[200],
      muted: colorPrimitives.neutral[100],
      emphasized: colorPrimitives.neutral[300],
      focus: colorPrimitives.blue[500],
    },
    // Interactive states
    primary: {
      DEFAULT: colorPrimitives.blue[500],
      hover: colorPrimitives.blue[600],
      active: colorPrimitives.blue[700],
      subtle: colorPrimitives.blue[50],
      fg: colorPrimitives.neutral[0],
    },
    success: {
      DEFAULT: colorPrimitives.green[500],
      hover: colorPrimitives.green[600],
      active: colorPrimitives.green[700],
      subtle: colorPrimitives.green[50],
      fg: colorPrimitives.neutral[0],
    },
    warning: {
      DEFAULT: colorPrimitives.amber[500],
      hover: colorPrimitives.amber[600],
      active: colorPrimitives.amber[700],
      subtle: colorPrimitives.amber[50],
      fg: colorPrimitives.neutral[950],
    },
    danger: {
      DEFAULT: colorPrimitives.red[500],
      hover: colorPrimitives.red[600],
      active: colorPrimitives.red[700],
      subtle: colorPrimitives.red[50],
      fg: colorPrimitives.neutral[0],
    },
    accent: {
      DEFAULT: colorPrimitives.purple[500],
      hover: colorPrimitives.purple[600],
      active: colorPrimitives.purple[700],
      subtle: colorPrimitives.purple[50],
      fg: colorPrimitives.neutral[0],
    },
  },
  dark: {
    // Background colors
    bg: {
      DEFAULT: colorPrimitives.neutral[950],
      subtle: colorPrimitives.neutral[900],
      muted: colorPrimitives.neutral[800],
      emphasized: colorPrimitives.neutral[700],
      inverse: colorPrimitives.neutral[50],
    },
    // Foreground/text colors
    fg: {
      DEFAULT: colorPrimitives.neutral[50],
      muted: colorPrimitives.neutral[400],
      subtle: colorPrimitives.neutral[500],
      inverse: colorPrimitives.neutral[950],
      disabled: colorPrimitives.neutral[600],
    },
    // Border colors
    border: {
      DEFAULT: colorPrimitives.neutral[800],
      muted: colorPrimitives.neutral[900],
      emphasized: colorPrimitives.neutral[700],
      focus: colorPrimitives.blue[400],
    },
    // Interactive states - adjusted for dark mode
    primary: {
      DEFAULT: colorPrimitives.blue[400],
      hover: colorPrimitives.blue[300],
      active: colorPrimitives.blue[200],
      subtle: colorPrimitives.blue[950],
      fg: colorPrimitives.neutral[950],
    },
    success: {
      DEFAULT: colorPrimitives.green[400],
      hover: colorPrimitives.green[300],
      active: colorPrimitives.green[200],
      subtle: colorPrimitives.green[950],
      fg: colorPrimitives.neutral[950],
    },
    warning: {
      DEFAULT: colorPrimitives.amber[400],
      hover: colorPrimitives.amber[300],
      active: colorPrimitives.amber[200],
      subtle: colorPrimitives.amber[950],
      fg: colorPrimitives.neutral[950],
    },
    danger: {
      DEFAULT: colorPrimitives.red[400],
      hover: colorPrimitives.red[300],
      active: colorPrimitives.red[200],
      subtle: colorPrimitives.red[950],
      fg: colorPrimitives.neutral[950],
    },
    accent: {
      DEFAULT: colorPrimitives.purple[400],
      hover: colorPrimitives.purple[300],
      active: colorPrimitives.purple[200],
      subtle: colorPrimitives.purple[950],
      fg: colorPrimitives.neutral[950],
    },
  },
} as const;

// Type exports for full TypeScript support
export type ColorPrimitives = typeof colorPrimitives;
export type SpacingPrimitives = typeof spacingPrimitives;
export type TypographyPrimitives = typeof typographyPrimitives;
export type RadiusPrimitives = typeof radiusPrimitives;
export type ShadowPrimitives = typeof shadowPrimitives;
export type MotionPrimitives = typeof motionPrimitives;
export type ZIndexPrimitives = typeof zIndexPrimitives;
export type SemanticTokens = typeof semanticTokens;
