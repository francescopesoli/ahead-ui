import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Slider, RangeSlider } from '@ahead-ui/components';

const meta: Meta<typeof Slider> = {
  title: 'Components/Form/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    isDisabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    label: 'Volume',
    defaultValue: 50,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-64">
      <Slider label="Small" size="sm" defaultValue={30} />
      <Slider label="Medium" size="md" defaultValue={50} />
      <Slider label="Large" size="lg" defaultValue={70} />
    </div>
  ),
};

export const WithMinMax: Story = {
  args: {
    label: 'Temperature',
    minValue: 0,
    maxValue: 100,
    defaultValue: 72,
    formatOptions: { style: 'unit', unit: 'fahrenheit' },
  },
};

export const WithStep: Story = {
  args: {
    label: 'Quantity',
    minValue: 0,
    maxValue: 100,
    step: 10,
    defaultValue: 50,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled slider',
    isDisabled: true,
    defaultValue: 40,
  },
};

export const Controlled: Story = {
  render: function ControlledSlider() {
    const [value, setValue] = useState(50);
    return (
      <div className="flex flex-col gap-4 w-64">
        <Slider
          label="Brightness"
          value={value}
          onChange={setValue}
        />
        <p className="text-sm text-fg-muted">Value: {value}%</p>
        <div className="flex gap-2">
          <button
            className="px-2 py-1 text-sm border rounded"
            onClick={() => setValue(0)}
          >
            Min
          </button>
          <button
            className="px-2 py-1 text-sm border rounded"
            onClick={() => setValue(100)}
          >
            Max
          </button>
        </div>
      </div>
    );
  },
};

export const WithMarks: Story = {
  args: {
    label: 'Priority',
    minValue: 1,
    maxValue: 5,
    step: 1,
    defaultValue: 3,
    showSteps: true,
  },
};

export const RangeSliderStory: Story = {
  name: 'Range Slider',
  render: () => (
    <div className="w-64">
      <RangeSlider
        label="Price Range"
        minValue={0}
        maxValue={1000}
        defaultValue={[200, 800]}
        formatOptions={{ style: 'currency', currency: 'USD' }}
      />
    </div>
  ),
};

export const VerticalOrientation: Story = {
  render: () => (
    <div className="h-48">
      <Slider
        label="Volume"
        orientation="vertical"
        defaultValue={60}
      />
    </div>
  ),
};
