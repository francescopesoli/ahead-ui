import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, Button } from '@ahead-ui/components';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Overlay/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    delay: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip content="This is a tooltip">
      <Button variant="outline">Hover me</Button>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4 p-12">
      <Tooltip content="Tooltip on top" placement="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <div className="flex gap-4">
        <Tooltip content="Tooltip on left" placement="left">
          <Button variant="outline">Left</Button>
        </Tooltip>
        <Tooltip content="Tooltip on right" placement="right">
          <Button variant="outline">Right</Button>
        </Tooltip>
      </div>
      <Tooltip content="Tooltip on bottom" placement="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
    </div>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="No delay" delay={0}>
        <Button variant="outline">Instant</Button>
      </Tooltip>
      <Tooltip content="500ms delay" delay={500}>
        <Button variant="outline">500ms</Button>
      </Tooltip>
      <Tooltip content="1000ms delay" delay={1000}>
        <Button variant="outline">1000ms</Button>
      </Tooltip>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tooltip content="This is a longer tooltip with more detailed information that explains the feature in detail.">
      <Button variant="outline">Hover for details</Button>
    </Tooltip>
  ),
};

export const OnIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="Edit">
        <button className="p-2 rounded-full hover:bg-bg-subtle">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Delete">
        <button className="p-2 rounded-full hover:bg-bg-subtle">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Share">
        <button className="p-2 rounded-full hover:bg-bg-subtle">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Settings">
        <button className="p-2 rounded-full hover:bg-bg-subtle">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </Tooltip>
    </div>
  ),
};

export const WithKeyboardShortcut: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip
        content={
          <span className="flex items-center gap-2">
            Copy <kbd className="px-1 py-0.5 bg-bg-inverse/20 rounded text-xs">⌘C</kbd>
          </span>
        }
      >
        <Button variant="outline" size="icon">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
        </Button>
      </Tooltip>
      <Tooltip
        content={
          <span className="flex items-center gap-2">
            Paste <kbd className="px-1 py-0.5 bg-bg-inverse/20 rounded text-xs">⌘V</kbd>
          </span>
        }
      >
        <Button variant="outline" size="icon">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </Button>
      </Tooltip>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tooltip content="This button is disabled" placement="bottom">
      <span className="inline-block">
        <Button disabled>Disabled Button</Button>
      </span>
    </Tooltip>
  ),
};

export const OnText: Story = {
  render: () => (
    <p className="text-sm">
      Click on the{' '}
      <Tooltip content="The settings icon looks like a gear">
        <span className="underline cursor-help">settings icon</span>
      </Tooltip>{' '}
      to configure your preferences.
    </p>
  ),
};

export const MultipleTooltips: Story = {
  render: () => (
    <div className="flex gap-2">
      {['Red', 'Green', 'Blue', 'Yellow', 'Purple'].map((color) => (
        <Tooltip key={color} content={`Select ${color}`}>
          <button
            className="w-8 h-8 rounded-full"
            style={{
              backgroundColor: color.toLowerCase(),
              border: color === 'Yellow' ? '1px solid #ccc' : undefined,
            }}
          />
        </Tooltip>
      ))}
    </div>
  ),
};
