import aheadPreset from '@ahead-ui/core/tailwind-preset';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [aheadPreset],
  content: [
    './src/**/*.{ts,tsx}',
    '../components/src/**/*.{ts,tsx}',
  ],
};
