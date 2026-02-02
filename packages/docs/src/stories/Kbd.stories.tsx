import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from '@ahead-ui/components';

const meta: Meta<typeof Kbd> = {
  title: 'Components/Display/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
  args: {
    children: 'Ctrl',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Kbd size="sm">Ctrl</Kbd>
      <Kbd size="md">Ctrl</Kbd>
      <Kbd size="lg">Ctrl</Kbd>
    </div>
  ),
};

export const SingleKeys: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Kbd>A</Kbd>
      <Kbd>B</Kbd>
      <Kbd>C</Kbd>
      <Kbd>1</Kbd>
      <Kbd>2</Kbd>
      <Kbd>3</Kbd>
      <Kbd>Tab</Kbd>
      <Kbd>Enter</Kbd>
      <Kbd>Esc</Kbd>
    </div>
  ),
};

export const ModifierKeys: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Kbd>Ctrl</Kbd>
      <Kbd>Alt</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>Cmd</Kbd>
      <Kbd>⌘</Kbd>
      <Kbd>⌥</Kbd>
      <Kbd>⇧</Kbd>
      <Kbd>⌃</Kbd>
    </div>
  ),
};

export const KeyboardShortcuts: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm w-32">Copy:</span>
        <Kbd>Ctrl</Kbd>
        <span className="text-fg-muted">+</span>
        <Kbd>C</Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-32">Paste:</span>
        <Kbd>Ctrl</Kbd>
        <span className="text-fg-muted">+</span>
        <Kbd>V</Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-32">Undo:</span>
        <Kbd>Ctrl</Kbd>
        <span className="text-fg-muted">+</span>
        <Kbd>Z</Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-32">Save:</span>
        <Kbd>Ctrl</Kbd>
        <span className="text-fg-muted">+</span>
        <Kbd>S</Kbd>
      </div>
    </div>
  ),
};

export const MacShortcuts: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm w-32">Copy:</span>
        <Kbd>⌘</Kbd>
        <Kbd>C</Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-32">Paste:</span>
        <Kbd>⌘</Kbd>
        <Kbd>V</Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-32">Spotlight:</span>
        <Kbd>⌘</Kbd>
        <Kbd>Space</Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-32">Screenshot:</span>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>4</Kbd>
      </div>
    </div>
  ),
};

export const ArrowKeys: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-1">
      <Kbd>↑</Kbd>
      <div className="flex gap-1">
        <Kbd>←</Kbd>
        <Kbd>↓</Kbd>
        <Kbd>→</Kbd>
      </div>
    </div>
  ),
};

export const InText: Story = {
  render: () => (
    <p className="text-sm max-w-md">
      Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to open the command palette, or use{' '}
      <Kbd>Esc</Kbd> to close it. You can also press <Kbd>?</Kbd> to view all
      available keyboard shortcuts.
    </p>
  ),
};

export const ShortcutList: Story = {
  render: () => (
    <div className="w-80 border rounded-lg overflow-hidden">
      <div className="px-4 py-2 bg-bg-subtle border-b">
        <h3 className="font-medium text-sm">Keyboard Shortcuts</h3>
      </div>
      <div className="divide-y">
        {[
          { label: 'Open command palette', keys: ['Ctrl', 'K'] },
          { label: 'Search', keys: ['Ctrl', 'F'] },
          { label: 'Go to file', keys: ['Ctrl', 'P'] },
          { label: 'Toggle sidebar', keys: ['Ctrl', 'B'] },
          { label: 'New file', keys: ['Ctrl', 'N'] },
        ].map(({ label, keys }) => (
          <div key={label} className="flex items-center justify-between px-4 py-2">
            <span className="text-sm">{label}</span>
            <div className="flex items-center gap-1">
              {keys.map((key, i) => (
                <Kbd key={i} size="sm">{key}</Kbd>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const FunctionKeys: Story = {
  render: () => (
    <div className="flex gap-1 flex-wrap">
      {Array.from({ length: 12 }, (_, i) => (
        <Kbd key={i} size="sm">F{i + 1}</Kbd>
      ))}
    </div>
  ),
};
