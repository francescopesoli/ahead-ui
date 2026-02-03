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
        // Elevation shadows for layered UI
        'elevation-1': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
        'elevation-2': '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)',
        'elevation-3': '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04)',
        'elevation-4': '0 20px 25px -5px rgba(0,0,0,0.08), 0 10px 10px -5px rgba(0,0,0,0.04)',
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
        // Additional spring-like easings
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'bounce-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // =====================================================================
      // ANIMATIONS - Comprehensive animation system
      // =====================================================================
      animation: {
        // === Standard Tailwind animations ===
        'spin': 'spin 1s linear infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',

        // === Entrance animations ===
        'fade-in': 'fade-in var(--duration-normal) var(--ease-out)',
        'fade-in-up': 'fade-in-up var(--duration-normal) var(--ease-out)',
        'fade-in-down': 'fade-in-down var(--duration-normal) var(--ease-out)',
        'fade-in-left': 'fade-in-left var(--duration-normal) var(--ease-out)',
        'fade-in-right': 'fade-in-right var(--duration-normal) var(--ease-out)',
        'slide-in-up': 'slide-in-up var(--duration-normal) var(--ease-out)',
        'slide-in-down': 'slide-in-down var(--duration-normal) var(--ease-out)',
        'slide-in-left': 'slide-in-left var(--duration-normal) var(--ease-out)',
        'slide-in-right': 'slide-in-right var(--duration-normal) var(--ease-out)',
        'scale-in': 'scale-in var(--duration-normal) var(--ease-out)',
        'scale-in-bounce': 'scale-in-bounce var(--duration-slow) var(--ease-bounce)',
        'zoom-in': 'zoom-in var(--duration-normal) var(--ease-out)',

        // === Exit animations ===
        'fade-out': 'fade-out var(--duration-normal) var(--ease-in)',
        'fade-out-up': 'fade-out-up var(--duration-normal) var(--ease-in)',
        'fade-out-down': 'fade-out-down var(--duration-normal) var(--ease-in)',
        'scale-out': 'scale-out var(--duration-normal) var(--ease-in)',
        'zoom-out': 'zoom-out var(--duration-normal) var(--ease-in)',

        // === Continuous/Ambient animations ===
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounce-soft 1s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
        'breathe': 'breathe 4s ease-in-out infinite',

        // === Interaction animations ===
        'press': 'press 0.15s var(--ease-out)',
        'pop': 'pop 0.3s var(--ease-bounce)',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'shake': 'shake 0.5s ease-in-out',
        'jiggle': 'jiggle 0.3s ease-in-out',
        'rubber-band': 'rubber-band 0.6s ease-out',
        'tada': 'tada 0.8s ease-in-out',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',

        // === Task/Completion animations ===
        'check': 'check 0.4s var(--ease-bounce)',
        'success-pulse': 'success-pulse 0.5s var(--ease-out)',
        'confetti': 'confetti 0.6s var(--ease-out)',

        // === Loading animations ===
        'loading-dots': 'loading-dots 1.4s ease-in-out infinite',
        'loading-bar': 'loading-bar 2s ease-in-out infinite',
        'skeleton': 'shimmer 1.5s ease-in-out infinite',
      },

      // =====================================================================
      // KEYFRAMES
      // =====================================================================
      keyframes: {
        // === Entrance keyframes ===
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'scale-in-bounce': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'zoom-in': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },

        // === Exit keyframes ===
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'fade-out-up': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' },
        },
        'fade-out-down': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(10px)' },
        },
        'scale-out': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        'zoom-out': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0)', opacity: '0' },
        },

        // === Continuous keyframes ===
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'breathe': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },

        // === Interaction keyframes ===
        'press': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.97)' },
          '100%': { transform: 'scale(1)' },
        },
        'pop': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
        'jiggle': {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-1deg) scale(1.01)' },
          '50%': { transform: 'rotate(1deg) scale(1.01)' },
          '75%': { transform: 'rotate(-1deg) scale(1.01)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'rubber-band': {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.25, 0.75)' },
          '40%': { transform: 'scale(0.75, 1.25)' },
          '50%': { transform: 'scale(1.15, 0.85)' },
          '65%': { transform: 'scale(0.95, 1.05)' },
          '75%': { transform: 'scale(1.05, 0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        'tada': {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '10%, 20%': { transform: 'scale(0.9) rotate(-3deg)' },
          '30%, 50%, 70%, 90%': { transform: 'scale(1.1) rotate(3deg)' },
          '40%, 60%, 80%': { transform: 'scale(1.1) rotate(-3deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        'heartbeat': {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.1)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.1)' },
          '70%': { transform: 'scale(1)' },
        },

        // === Task/Completion keyframes ===
        'check': {
          '0%': { transform: 'scale(0) rotate(45deg)', opacity: '0' },
          '50%': { transform: 'scale(1.2) rotate(45deg)' },
          '100%': { transform: 'scale(1) rotate(45deg)', opacity: '1' },
        },
        'success-pulse': {
          '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 var(--success)' },
          '50%': { transform: 'scale(1.02)', boxShadow: '0 0 0 10px transparent' },
          '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 transparent' },
        },
        'confetti': {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(200px) rotate(720deg)', opacity: '0' },
        },

        // === Loading keyframes ===
        'loading-dots': {
          '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: '0.5' },
          '40%': { transform: 'scale(1)', opacity: '1' },
        },
        'loading-bar': {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [
    // Custom plugin for data attributes and utilities
    plugin(({ addVariant, addUtilities }) => {
      // === Data attribute variants ===
      addVariant('pressed', '&[data-pressed]');
      addVariant('hovered', '&[data-hovered]');
      addVariant('focus-visible-within', '&:has(:focus-visible)');
      addVariant('loading', '&[data-loading]');
      addVariant('density-compact', '[data-density="compact"] &');
      addVariant('density-comfortable', '[data-density="comfortable"] &');
      addVariant('entering', '&[data-entering]');
      addVariant('exiting', '&[data-exiting]');
      addVariant('expanded', '&[data-expanded]');
      addVariant('selected', '&[data-selected]');
      addVariant('checked', '&[data-checked]');

      // === Interactive utility classes ===
      addUtilities({
        // Pressable effect (button-like)
        '.pressable': {
          transition: 'transform 150ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0) scale(0.98)',
          },
        },

        // Hover lift effect
        '.hover-lift': {
          transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 20px -10px rgba(0, 0, 0, 0.15)',
          },
        },

        // Hover scale effect
        '.hover-scale': {
          transition: 'transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        },

        // Glow effect on hover
        '.hover-glow': {
          transition: 'box-shadow 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          '&:hover': {
            boxShadow: '0 0 30px -10px var(--primary)',
          },
        },

        // Glass/Glassmorphism effect
        '.glass': {
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        },
        '.dark .glass': {
          backgroundColor: 'rgba(30, 30, 30, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },

        // Skeleton loading
        '.skeleton': {
          background: 'linear-gradient(90deg, var(--bg-muted) 0%, var(--bg) 50%, var(--bg-muted) 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s ease-in-out infinite',
          borderRadius: 'var(--radius-DEFAULT)',
        },

        // Stagger animation children
        '.stagger-children': {
          '& > *': {
            animation: 'fade-in-up 0.4s ease-out both',
          },
          '& > *:nth-child(1)': { animationDelay: '0ms' },
          '& > *:nth-child(2)': { animationDelay: '50ms' },
          '& > *:nth-child(3)': { animationDelay: '100ms' },
          '& > *:nth-child(4)': { animationDelay: '150ms' },
          '& > *:nth-child(5)': { animationDelay: '200ms' },
          '& > *:nth-child(6)': { animationDelay: '250ms' },
          '& > *:nth-child(7)': { animationDelay: '300ms' },
          '& > *:nth-child(8)': { animationDelay: '350ms' },
          '& > *:nth-child(9)': { animationDelay: '400ms' },
          '& > *:nth-child(10)': { animationDelay: '450ms' },
        },

        // Badge pulse (for notifications/alerts)
        '.badge-pulse': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '0',
            borderRadius: 'inherit',
            background: 'inherit',
            animation: 'pulse-ring 2s ease-in-out infinite',
            pointerEvents: 'none',
          },
        },

        // Loading dots
        '.loading-dots': {
          display: 'inline-flex',
          gap: '4px',
          '& span': {
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'currentColor',
            animation: 'loading-dots 1.4s ease-in-out infinite',
          },
          '& span:nth-child(1)': { animationDelay: '0s' },
          '& span:nth-child(2)': { animationDelay: '0.2s' },
          '& span:nth-child(3)': { animationDelay: '0.4s' },
        },
      });
    }),
  ],
};

export default aheadPreset;
