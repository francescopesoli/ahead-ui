import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { NumberInput } from '@ahead-ui/components';

const meta: Meta<typeof NumberInput> = {
  title: 'Components/Form/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isDisabled: {
      control: 'boolean',
    },
    isInvalid: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  args: {
    label: 'Quantity',
    defaultValue: 1,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-40">
      <NumberInput label="Small" size="sm" defaultValue={5} />
      <NumberInput label="Medium" size="md" defaultValue={10} />
      <NumberInput label="Large" size="lg" defaultValue={15} />
    </div>
  ),
};

export const WithMinMax: Story = {
  args: {
    label: 'Age',
    minValue: 0,
    maxValue: 120,
    defaultValue: 25,
  },
};

export const WithStep: Story = {
  args: {
    label: 'Price',
    step: 0.01,
    minValue: 0,
    defaultValue: 9.99,
    formatOptions: { style: 'currency', currency: 'USD' },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    isDisabled: true,
    defaultValue: 42,
  },
};

export const Invalid: Story = {
  args: {
    label: 'Invalid input',
    isInvalid: true,
    defaultValue: -5,
    errorMessage: 'Value must be positive',
  },
};

export const Controlled: Story = {
  render: function ControlledNumberInput() {
    const [value, setValue] = useState(10);
    return (
      <div className="flex flex-col gap-4 w-40">
        <NumberInput
          label="Items"
          value={value}
          onChange={setValue}
          minValue={0}
          maxValue={100}
        />
        <p className="text-sm text-fg-muted">Value: {value}</p>
        <button
          className="px-3 py-1 text-sm border rounded"
          onClick={() => setValue(50)}
        >
          Reset to 50
        </button>
      </div>
    );
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Team size',
    description: 'Number of team members',
    defaultValue: 5,
    minValue: 1,
    maxValue: 50,
  },
};

export const PercentageFormat: Story = {
  args: {
    label: 'Discount',
    defaultValue: 15,
    minValue: 0,
    maxValue: 100,
    formatOptions: { style: 'percent', minimumFractionDigits: 0 },
  },
};

export const WithoutSpinButtons: Story = {
  args: {
    label: 'Phone extension',
    defaultValue: 100,
    hideButtons: true,
  },
};
