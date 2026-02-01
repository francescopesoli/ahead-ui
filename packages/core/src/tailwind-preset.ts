/**
 * Ahead UI - Tailwind CSS Preset
 * 
 * This preset extends Tailwind with Ahead UI's design tokens.
 * Use this in your tailwind.config.js:
 * 
 * @example
 * ```js
 * import aheadPreset from '@ahead-ui/core/tailwind-preset';
 * 
 * export default {
 *   presets: [aheadPreset],
 *   // your config...
 * }
 * ```
 */

import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const aheadPreset: Partial<Config> = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      // Colors using CSS custom properties
      colors: {
        // Semantic colors
        bg: {
          DEFAULT: 'var(--bg)',
          subtle: 'var(--bg-subtle)',
          muted: 'var(--bg-muted)',
          emphasized: 'var(--bg-emphasized)',
          inverse: 'var(--bg-inverse)',
        },
        fg: {
          DEFAULT: 'var(--fg)',
          muted: 'var(--fg-muted)',
          subtle: 'var(--fg-subtle)',
          inverse: 'var(--fg-inverse)',
          disabled: 'var(--fg-disabled)',
        },
        border: {
          DEFAULT: 'var(--border)',
          muted: 'var(--border-muted)',
          emphasized: 'var(--border-emphasized)',
          focus: 'var(--border-focus)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          active: 'var(--primary-active)',
          subtle: 'var(--primary-subtle)',
          fg: 'var(--primary-fg)',
        },
        success: {
          DEFAULT: 'var(--success)',
          hover: 'var(--success-hover)',
          active: 'var(--success-active)',
          subtle: 'var(--success-subtle)',
          fg: 'var(--success-fg)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          hover: 'var(--warning-hover)',
          active: 'var(--warning-active)',
          subtle: 'var(--warning-subtle)',
          fg: 'var(--warning-fg)',
        },
        danger: {
          DEFAULT: 'var(--danger)',
          hover: 'var(--danger-hover)',
          active: 'var(--danger-active)',
          subtle: 'var(--danger-subtle)',
          fg: 'var(--danger-fg)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          active: 'var(--accent-active)',
          subtle: 'var(--accent-subtle)',
          fg: 'var(--accent-fg)',
        },
        ring: 'var(--ring)',
      },

      // Spacing using CSS custom properties
      spacing: {
        '0': 'var(--spacing-0)',
        'px': 'var(--spacing-px)',
        '0.5': 'var(--spacing-0-5)',
        '1': 'var(--spacing-1)',
        '1.5': 'var(--spacing-1-5)',
        '2': 'var(--spacing-2)',
        '2.5': 'var(--spacing-2-5)',
        '3': 'var(--spacing-3)',
        '3.5': 'var(--spacing-3-5)',
        '4': 'var(--spacing-4)',
        '5': 'var(--spacing-5)',
        '6': 'var(--spacing-6)',
        '7': 'var(--spacing-7)',
        '8': 'var(--spacing-8)',
        '9': 'var(--spacing-9)',
        '10': 'var(--spacing-10)',
        '11': 'var(--spacing-11)',
        '12': 'var(--spacing-12)',
        '14': 'var(--spacing-14)',
        '16': 'var(--spacing-16)',
        '20': 'var(--spacing-20)',
        '24': 'var(--spacing-24)',
      },

      // Border radius
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-DEFAULT)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        full: 'var(--radius-full)',
      },

      // Box shadow
      boxShadow: {
        none: 'var(--shadow-none)',
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-DEFAULT)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        inner: 'var(--shadow-inner)',
        'glow-blue': 'var(--shadow-glow-blue)',
        'glow-green': 'var(--shadow-glow-green)',
        'glow-red': 'var(--shadow-glow-red)',
        'glow-purple': 'var(--shadow-glow-purple)',
      },

      // Font family
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
        display: 'var(--font-display)',
      },

      // Font size
      fontSize: {
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
        '6xl': 'var(--text-6xl)',
        '7xl': 'var(--text-7xl)',
      },

      // Line height
      lineHeight: {
        none: 'var(--leading-none)',
        tight: 'var(--leading-tight)',
        snug: 'var(--leading-snug)',
        normal: 'var(--leading-normal)',
        relaxed: 'var(--leading-relaxed)',
        loose: 'var(--leading-loose)',
      },

      // Letter spacing
      letterSpacing: {
        tighter: 'var(--tracking-tighter)',
        tight: 'var(--tracking-tight)',
        normal: 'var(--tracking-normal)',
        wide: 'var(--tracking-wide)',
        wider: 'var(--tracking-wider)',
        widest: 'var(--tracking-widest)',
      },

      // Z-index
      zIndex: {
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        modal: 'var(--z-modal)',
        popover: 'var(--z-popover)',
        tooltip: 'var(--z-tooltip)',
        toast: 'var(--z-toast)',
        overlay: 'var(--z-overlay)',
        max: 'var(--z-max)',
      },

      // Transition duration
      transitionDuration: {
        instant: 'var(--duration-instant)',
        fastest: 'var(--duration-fastest)',
        faster: 'var(--duration-faster)',
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)',
        slower: 'var(--duration-slower)',
        slowest: 'var(--duration-slowest)',
      },

      // Transition timing function
      transitionTimingFunction: {
        linear: 'var(--ease-linear)',
        out: 'var(--ease-out)',
        'out-expo': 'var(--ease-out-expo)',
        in: 'var(--ease-in)',
        'in-expo': 'var(--ease-in-expo)',
        'in-out': 'var(--ease-in-out)',
        spring: 'var(--ease-spring)',
        bounce: 'var(--ease-bounce)',
      },

      // Animation
      animation: {
        'spin': 'spin 1s linear infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
        'fade-in': 'fade-in var(--duration-normal) var(--ease-out)',
        'fade-out': 'fade-out var(--duration-normal) var(--ease-in)',
        'slide-in-up': 'slide-in-up var(--duration-normal) var(--ease-out)',
        'slide-in-down': 'slide-in-down var(--duration-normal) var(--ease-out)',
        'slide-in-left': 'slide-in-left var(--duration-normal) var(--ease-out)',
        'slide-in-right': 'slide-in-right var(--duration-normal) var(--ease-out)',
        'scale-in': 'scale-in var(--duration-normal) var(--ease-out)',
        'scale-out': 'scale-out var(--duration-normal) var(--ease-in)',
      },

      // Keyframes
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-in-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'scale-out': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
      },
    },
  },
  plugins: [
    // Custom plugin for data attributes
    plugin(({ addVariant }) => {
      // Pressed state
      addVariant('pressed', '&[data-pressed]');
      // Hovered state (not applied on touch)
      addVariant('hovered', '&[data-hovered]');
      // Focus visible (keyboard only)
      addVariant('focus-visible-within', '&:has(:focus-visible)');
      // Loading state
      addVariant('loading', '&[data-loading]');
      // Density variants
      addVariant('density-compact', '[data-density="compact"] &');
      addVariant('density-comfortable', '[data-density="comfortable"] &');
    }),
  ],
};

export default aheadPreset;
