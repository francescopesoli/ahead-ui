/**
 * Ahead UI - Component Examples
 * 
 * This file demonstrates usage of all Ahead UI components.
 * Copy and adapt these examples for your own projects.
 */

import React, { useState } from 'react';

// Import all components
import {
  Button,
  Input,
  Card,
  Badge,
  Spinner,
  DotsSpinner,
  Switch,
  Checkbox,
  Avatar,
  AvatarGroup,
  Tooltip,
  Dialog,
} from '@ahead-ui/components';

// Import core utilities and hooks
import {
  cn,
  useUserBehavior,
  useAdaptiveConfig,
  useColorScheme,
  useReducedMotion,
} from '@ahead-ui/core';

// Don't forget to import the CSS tokens!
// import '@ahead-ui/core/tokens/css';

/* =============================================================================
   BUTTON EXAMPLES
   ============================================================================= */

export function ButtonExamples() {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Variants */}
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>

      {/* Sizes */}
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>

      {/* Icon buttons */}
      <Button size="icon">
        <PlusIcon className="h-4 w-4" />
      </Button>

      {/* Loading state */}
      <Button isLoading>Loading</Button>
      <Button isLoading loadingText="Saving...">
        Save
      </Button>

      {/* With icons */}
      <Button leftIcon={<PlusIcon className="h-4 w-4" />}>
        Add Item
      </Button>

      {/* As a link (using asChild) */}
      <Button asChild>
        <a href="/home">Go Home</a>
      </Button>

      {/* Full width */}
      <Button fullWidth>Full Width Button</Button>
    </div>
  );
}

/* =============================================================================
   INPUT EXAMPLES
   ============================================================================= */

export function InputExamples() {
  return (
    <div className="flex flex-col gap-6 max-w-md">
      {/* Basic input */}
      <Input placeholder="Enter your name" />

      {/* With label */}
      <Input label="Email" type="email" placeholder="you@example.com" />

      {/* With helper text */}
      <Input
        label="Password"
        type="password"
        helperText="Must be at least 8 characters"
      />

      {/* With error */}
      <Input
        label="Username"
        isInvalid
        errorMessage="Username is already taken"
        defaultValue="john"
      />

      {/* Variants */}
      <Input variant="filled" label="Filled" placeholder="Filled variant" />
      <Input variant="flushed" label="Flushed" placeholder="Flushed variant" />

      {/* Sizes */}
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />

      {/* With addons */}
      <Input leftAddon="https://" placeholder="example.com" />
      <Input rightAddon=".com" placeholder="example" />

      {/* With icons */}
      <Input
        leftElement={<SearchIcon className="h-4 w-4" />}
        placeholder="Search..."
      />
    </div>
  );
}

/* =============================================================================
   CARD EXAMPLES
   ============================================================================= */

export function CardExamples() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Basic card */}
      <Card>
        <Card.Header>
          <Card.Title>Card Title</Card.Title>
          <Card.Description>Card description goes here.</Card.Description>
        </Card.Header>
        <Card.Body>
          <p>This is the card body content.</p>
        </Card.Body>
        <Card.Footer>
          <Button variant="ghost">Cancel</Button>
          <Button>Save</Button>
        </Card.Footer>
      </Card>

      {/* Outlined card */}
      <Card variant="outlined">
        <Card.Header>
          <Card.Title>Outlined Card</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>A card with an outline style.</p>
        </Card.Body>
      </Card>

      {/* Filled card */}
      <Card variant="filled">
        <Card.Header>
          <Card.Title>Filled Card</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>A card with a filled background.</p>
        </Card.Body>
      </Card>

      {/* Hoverable card */}
      <Card isHoverable isPressable>
        <Card.Header>
          <Card.Title>Interactive Card</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>This card responds to hover and click.</p>
        </Card.Body>
      </Card>
    </div>
  );
}

/* =============================================================================
   BADGE EXAMPLES
   ============================================================================= */

export function BadgeExamples() {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Variants */}
      <Badge>Default</Badge>
      <Badge variant="subtle">Subtle</Badge>
      <Badge variant="outline">Outline</Badge>

      {/* Color schemes */}
      <Badge colorScheme="primary">Primary</Badge>
      <Badge colorScheme="success">Success</Badge>
      <Badge colorScheme="warning">Warning</Badge>
      <Badge colorScheme="danger">Danger</Badge>
      <Badge colorScheme="accent">Accent</Badge>

      {/* Sizes */}
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>

      {/* With icons */}
      <Badge leftIcon={<CheckIcon className="h-3 w-3" />}>Complete</Badge>
    </div>
  );
}

/* =============================================================================
   SPINNER EXAMPLES
   ============================================================================= */

export function SpinnerExamples() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {/* Sizes */}
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />

      {/* Colors */}
      <Spinner colorScheme="primary" />
      <Spinner colorScheme="secondary" />

      {/* Dots spinner */}
      <DotsSpinner size="md" />
      <DotsSpinner size="lg" colorScheme="primary" />
    </div>
  );
}

/* =============================================================================
   SWITCH EXAMPLES
   ============================================================================= */

export function SwitchExamples() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {/* Basic */}
      <Switch label="Enable notifications" />

      {/* Controlled */}
      <Switch
        isSelected={enabled}
        onChange={setEnabled}
        label="Dark mode"
      />

      {/* With description */}
      <Switch
        label="Email notifications"
        description="Receive emails about your account activity"
      />

      {/* Sizes */}
      <Switch size="sm" label="Small switch" />
      <Switch size="md" label="Medium switch" />
      <Switch size="lg" label="Large switch" />

      {/* Color schemes */}
      <Switch colorScheme="success" label="Success color" defaultSelected />
      <Switch colorScheme="danger" label="Danger color" defaultSelected />
    </div>
  );
}

/* =============================================================================
   CHECKBOX EXAMPLES
   ============================================================================= */

export function CheckboxExamples() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {/* Basic */}
      <Checkbox label="Accept terms and conditions" />

      {/* Controlled */}
      <Checkbox
        isSelected={checked}
        onChange={setChecked}
        label="Remember me"
      />

      {/* With description */}
      <Checkbox
        label="Marketing emails"
        description="Receive updates about new features and promotions"
      />

      {/* Indeterminate */}
      <Checkbox isIndeterminate label="Select all (some selected)" />

      {/* Invalid */}
      <Checkbox isInvalid label="Must accept terms" />

      {/* Sizes */}
      <Checkbox size="sm" label="Small" />
      <Checkbox size="md" label="Medium" />
      <Checkbox size="lg" label="Large" />
    </div>
  );
}

/* =============================================================================
   AVATAR EXAMPLES
   ============================================================================= */

export function AvatarExamples() {
  return (
    <div className="flex flex-col gap-6">
      {/* Sizes */}
      <div className="flex items-center gap-4">
        <Avatar size="xs" fallback="JD" />
        <Avatar size="sm" fallback="JD" />
        <Avatar size="md" fallback="JD" />
        <Avatar size="lg" fallback="JD" />
        <Avatar size="xl" fallback="JD" />
        <Avatar size="2xl" fallback="JD" />
      </div>

      {/* With image */}
      <div className="flex items-center gap-4">
        <Avatar src="/path/to/image.jpg" alt="John Doe" />
        <Avatar src="/invalid.jpg" fallback="JD" /> {/* Shows fallback */}
      </div>

      {/* Shapes */}
      <div className="flex items-center gap-4">
        <Avatar fallback="AB" shape="circle" />
        <Avatar fallback="AB" shape="square" />
      </div>

      {/* With status */}
      <div className="flex items-center gap-4">
        <Avatar fallback="JD" status="online" />
        <Avatar fallback="JD" status="offline" />
        <Avatar fallback="JD" status="away" />
        <Avatar fallback="JD" status="busy" />
      </div>

      {/* Avatar group */}
      <AvatarGroup max={3}>
        <Avatar fallback="A" />
        <Avatar fallback="B" />
        <Avatar fallback="C" />
        <Avatar fallback="D" />
        <Avatar fallback="E" />
      </AvatarGroup>
    </div>
  );
}

/* =============================================================================
   TOOLTIP EXAMPLES
   ============================================================================= */

export function TooltipExamples() {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Basic */}
      <Tooltip content="This is a tooltip">
        <Button>Hover me</Button>
      </Tooltip>

      {/* Placements */}
      <Tooltip content="Top tooltip" placement="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" placement="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" placement="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" placement="right">
        <Button variant="outline">Right</Button>
      </Tooltip>

      {/* Variants */}
      <Tooltip content="Dark variant" variant="dark">
        <Button>Dark</Button>
      </Tooltip>
      <Tooltip content="Light variant" variant="light">
        <Button>Light</Button>
      </Tooltip>

      {/* Custom delay */}
      <Tooltip content="Appears after 500ms" delay={500}>
        <Button>Slow tooltip</Button>
      </Tooltip>
    </div>
  );
}

/* =============================================================================
   DIALOG EXAMPLES
   ============================================================================= */

export function DialogExamples() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  return (
    <div className="flex gap-4">
      {/* Basic dialog */}
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Header>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>
            This is a dialog description explaining what this dialog is for.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
          <p>Dialog content goes here. You can put any content you want.</p>
          <Input label="Name" placeholder="Enter your name" className="mt-4" />
        </Dialog.Body>
        <Dialog.Footer>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Confirm</Button>
        </Dialog.Footer>
      </Dialog>

      {/* Alert dialog (not dismissable by clicking outside) */}
      <Button variant="danger" onClick={() => setIsAlertOpen(true)}>
        Delete Item
      </Button>
      <Dialog
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        isDismissable={false}
        role="alertdialog"
        size="sm"
      >
        <Dialog.Header>
          <Dialog.Title>Delete Item?</Dialog.Title>
          <Dialog.Description>
            This action cannot be undone. Are you sure you want to delete this item?
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Button variant="ghost" onClick={() => setIsAlertOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => setIsAlertOpen(false)}>
            Delete
          </Button>
        </Dialog.Footer>
      </Dialog>
    </div>
  );
}

/* =============================================================================
   ADAPTIVE BEHAVIOR EXAMPLE
   ============================================================================= */

export function AdaptiveBehaviorExample() {
  const behavior = useUserBehavior();
  const config = useAdaptiveConfig(behavior);
  const colorScheme = useColorScheme();
  const reducedMotion = useReducedMotion();

  return (
    <div 
      className="p-6 rounded-lg border border-[var(--border)]"
      data-density={config.density}
    >
      <h3 className="text-lg font-semibold mb-4">Adaptive UI Demo</h3>
      
      <div className="space-y-2 text-sm">
        <p>Detected pace: <Badge>{behavior.detectedPace}</Badge></p>
        <p>Confidence: {(behavior.confidence * 100).toFixed(0)}%</p>
        <p>Animation multiplier: {config.animationMultiplier}x</p>
        <p>Density: {config.density}</p>
        <p>Show hints: {config.showHints ? 'Yes' : 'No'}</p>
        <p>Debounce: {config.debounceMs}ms</p>
        <p>Color scheme: {colorScheme}</p>
        <p>Reduced motion: {reducedMotion ? 'Yes' : 'No'}</p>
      </div>

      {config.showHints && (
        <p className="mt-4 text-sm text-[var(--fg-muted)]">
          💡 Tip: The UI adapts based on how you interact with it!
        </p>
      )}
    </div>
  );
}

/* =============================================================================
   ICON COMPONENTS (for examples)
   ============================================================================= */

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
