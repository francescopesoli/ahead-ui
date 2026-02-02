import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ColorPicker } from '@ahead-ui/components';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/Form/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isDisabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  args: {
    label: 'Pick a color',
    defaultValue: '#3b82f6',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ColorPicker label="Small" size="sm" defaultValue="#ef4444" />
      <ColorPicker label="Medium" size="md" defaultValue="#22c55e" />
      <ColorPicker label="Large" size="lg" defaultValue="#8b5cf6" />
    </div>
  ),
};

export const WithPresets: Story = {
  args: {
    label: 'Brand color',
    defaultValue: '#3b82f6',
    presets: [
      '#ef4444',
      '#f97316',
      '#eab308',
      '#22c55e',
      '#06b6d4',
      '#3b82f6',
      '#8b5cf6',
      '#ec4899',
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    isDisabled: true,
    defaultValue: '#64748b',
  },
};

export const Controlled: Story = {
  render: function ControlledColorPicker() {
    const [color, setColor] = useState('#3b82f6');
    return (
      <div className="flex flex-col gap-4">
        <ColorPicker
          label="Theme color"
          value={color}
          onChange={setColor}
        />
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded border"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm font-mono">{color}</span>
        </div>
        <button
          className="px-3 py-1 text-sm border rounded w-fit"
          onClick={() => setColor('#3b82f6')}
        >
          Reset to blue
        </button>
      </div>
    );
  },
};

export const WithAlpha: Story = {
  args: {
    label: 'Color with transparency',
    defaultValue: 'rgba(59, 130, 246, 0.5)',
    showAlpha: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Background color',
    description: 'Choose a background color for your widget',
    defaultValue: '#f1f5f9',
  },
};

export const WithFormats: Story = {
  render: function ColorFormats() {
    const [color, setColor] = useState('#3b82f6');
    return (
      <div className="flex flex-col gap-4">
        <ColorPicker
          label="Select color"
          value={color}
          onChange={setColor}
          showInput
        />
        <div className="text-sm space-y-1">
          <p>
            <strong>HEX:</strong> {color}
          </p>
          <p>
            <strong>RGB:</strong> rgb(
            {parseInt(color.slice(1, 3), 16)},{' '}
            {parseInt(color.slice(3, 5), 16)},{' '}
            {parseInt(color.slice(5, 7), 16)})
          </p>
        </div>
      </div>
    );
  },
};

export const SwatchOnly: Story = {
  args: {
    label: 'Quick select',
    defaultValue: '#3b82f6',
    showPicker: false,
    presets: [
      '#000000',
      '#ffffff',
      '#ef4444',
      '#22c55e',
      '#3b82f6',
      '#8b5cf6',
    ],
  },
};
