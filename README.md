# Ahead UI

<p align="center">
  <strong>Always one step ahead</strong>
  <br />
  AI-enhanced adaptive design system for React
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#components">Components</a> •
  <a href="#installation">Installation</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#adaptive-behavior">Adaptive Behavior</a> •
  <a href="#architecture">Architecture</a>
</p>

---

## Vision

Ahead UI is a next-generation design system that adapts to user behavior in real-time. Unlike traditional component libraries, Ahead UI uses invisible AI to create interfaces that feel intuitive and responsive—without the user ever noticing.

**Key differentiators:**

- 🧠 **Adaptive Behavior** — Components that respond to user pace, time of day, and interaction patterns
- ♿ **Accessibility-First** — Built on React Aria for bulletproof keyboard navigation and screen reader support
- ⚡ **Zero Runtime CSS** — OKLCH colors with CSS custom properties for instant theming
- 📦 **Optimal Bundle Size** — No barrel files, proper tree-shaking, ESM-only
- 🎨 **Deeply Customizable** — CVA variants + Tailwind CSS integration
- 🔄 **asChild Pattern** — Render components as any element with `asChild`
- 🎬 **Motion Design** — Framer Motion animations with reduced-motion support

## Components

### Foundation
- **Slot** — asChild pattern implementation for component composition

### Inputs
- **Button** — Versatile button with variants, loading states, and icons
- **Input** — Text input with labels, validation, and addons
- **Switch** — Toggle switch with labels and descriptions
- **Checkbox** — Checkbox with indeterminate state support

### Display
- **Card** — Container with header, body, and footer (compound component)
- **Badge** — Labels and status indicators with color schemes
- **Avatar** — User images with fallbacks and status indicators
- **AvatarGroup** — Multiple avatars with overlap and "+N" indicator
- **Spinner** — Loading spinners (circle and dots variants)

### Overlay
- **Tooltip** — Hover/focus tooltips with placements
- **Dialog** — Modal dialogs with focus trap and animations

## Installation

```bash
# With pnpm (recommended)
pnpm add @ahead-ui/core @ahead-ui/components

# With npm
npm install @ahead-ui/core @ahead-ui/components

# With yarn
yarn add @ahead-ui/core @ahead-ui/components
```

## Quick Start

1. **Import the CSS tokens:**

```tsx
// In your app entry point (e.g., _app.tsx, layout.tsx)
import '@ahead-ui/core/tokens/css';
```

2. **Use components:**

```tsx
import { Button, Input, Card, Badge } from '@ahead-ui/components';
import { cn } from '@ahead-ui/core';

function App() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Welcome</Card.Title>
        <Badge colorScheme="success">New</Badge>
      </Card.Header>
      <Card.Body>
        <Input label="Email" type="email" placeholder="you@example.com" />
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" size="lg">
          Get Started
        </Button>
      </Card.Footer>
    </Card>
  );
}
```

3. **Enable dark mode:**

```tsx
// Add 'dark' class or data-theme="dark" to html/body
<html className="dark">
  {/* or */}
<html data-theme="dark">
```

## Adaptive Behavior

The killer feature of Ahead UI is its adaptive behavior system. Use hooks to detect user patterns and adjust your UI accordingly:

```tsx
import { useUserBehavior, useAdaptiveConfig } from '@ahead-ui/core';

function MyApp({ children }) {
  const behavior = useUserBehavior();
  const config = useAdaptiveConfig(behavior);
  
  // config.density → 'compact' | 'normal' | 'comfortable'
  // config.animationMultiplier → Adjust animation speed
  // config.showHints → Whether to show optional hints
  // config.debounceMs → Recommended debounce time
  
  return (
    <div 
      data-density={config.density}
      style={{ '--animation-speed': config.animationMultiplier }}
    >
      {children}
    </div>
  );
}
```

### What gets detected?

- **Click patterns** — Average time between clicks
- **Scroll behavior** — How fast users scroll
- **Mouse movement** — Cursor speed and precision
- **Typing speed** — Characters per second
- **Time of day** — Adjustments for evening/night usage
- **Session duration** — Learning over time

### How it adapts

| User Pace | Animations | Density | Hints | Debounce |
|-----------|------------|---------|-------|----------|
| Fast | 0.6x speed | Compact | Hidden | 150ms |
| Normal | 1x speed | Normal | Shown | 300ms |
| Slow | 1.2x speed | Comfortable | Shown | 500ms |

## Component Examples

### Button

```tsx
// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With icons
<Button leftIcon={<PlusIcon />}>Add Item</Button>

// Loading
<Button isLoading loadingText="Saving...">Save</Button>

// As a link (asChild pattern)
<Button asChild>
  <a href="/home">Go Home</a>
</Button>
```

### Input

```tsx
// With validation
<Input
  label="Email"
  type="email"
  isInvalid
  errorMessage="Please enter a valid email"
/>

// With addons
<Input leftAddon="https://" placeholder="example.com" />

// Variants
<Input variant="filled" placeholder="Filled style" />
<Input variant="flushed" placeholder="Flushed style" />
```

### Dialog

```tsx
const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open</Button>

<Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <Dialog.Header>
    <Dialog.Title>Confirm</Dialog.Title>
    <Dialog.Description>Are you sure?</Dialog.Description>
  </Dialog.Header>
  <Dialog.Body>
    Content here
  </Dialog.Body>
  <Dialog.Footer>
    <Button variant="ghost" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button>Confirm</Button>
  </Dialog.Footer>
</Dialog>
```

## Tailwind CSS Integration

Use the Ahead UI preset to integrate design tokens with Tailwind:

```js
// tailwind.config.js
import aheadPreset from '@ahead-ui/core/tailwind-preset';

export default {
  presets: [aheadPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@ahead-ui/components/**/*.js',
  ],
};
```

Now you can use semantic colors:

```tsx
<div className="bg-bg text-fg border-border">
  <span className="text-primary">Primary color</span>
  <span className="text-danger">Danger color</span>
</div>
```

## Architecture

```
┌─────────────────────────────────────┐
│        Your Application             │
├─────────────────────────────────────┤
│  @ahead-ui/components               │
│  (Button, Input, Card, etc.)        │
├─────────────────────────────────────┤
│  @ahead-ui/core                     │
│  (tokens, hooks, utilities)         │
├─────────────────────────────────────┤
│  React Aria (accessibility)         │
├─────────────────────────────────────┤
│  Tailwind CSS + CVA (styling)       │
└─────────────────────────────────────┘
```

### Why This Architecture?

| Problem with Others | Ahead UI Solution |
|---------------------|-------------------|
| MUI's runtime CSS causes performance issues | Zero-runtime CSS custom properties |
| shadcn's copy-paste loses updates | Package-based with semantic versioning |
| Ant Design's strict theming | Three-layer token system |
| Chakra's bundle bloat | No barrel files, ESM-only |
| Radix's version conflicts | Unified React Aria foundation |

## Packages

| Package | Description |
|---------|-------------|
| `@ahead-ui/core` | Design tokens, utilities, and adaptive hooks |
| `@ahead-ui/components` | React components (Button, Input, etc.) |
| `@ahead-ui/cli` | CLI for adding components to your project |

## Browser Support

Ahead UI supports all modern browsers:

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+

OKLCH colors require modern browser support. For older browsers, a fallback is automatically provided.

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [Francesco Pesoli](https://github.com/francescopesoli)

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/francescopesoli">Francesco Pesoli</a>
</p>
