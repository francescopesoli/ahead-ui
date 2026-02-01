import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'button/index': 'src/button/index.tsx',
    'slot/index': 'src/slot/index.tsx',
    'input/index': 'src/input/index.tsx',
    'card/index': 'src/card/index.tsx',
    'badge/index': 'src/badge/index.tsx',
    'spinner/index': 'src/spinner/index.tsx',
    'switch/index': 'src/switch/index.tsx',
    'checkbox/index': 'src/checkbox/index.tsx',
    'avatar/index': 'src/avatar/index.tsx',
    'tooltip/index': 'src/tooltip/index.tsx',
    'dialog/index': 'src/dialog/index.tsx',
  },
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});
