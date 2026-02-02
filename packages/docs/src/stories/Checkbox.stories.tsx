import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from '@ahead-ui/components';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Form/Checkbox',
  component: Checkbox,
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
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    children: 'Accept terms and conditions',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox size="sm">Small checkbox</Checkbox>
      <Checkbox size="md">Medium checkbox</Checkbox>
      <Checkbox size="lg">Large checkbox</Checkbox>
    </div>
  ),
};

export const Checked: Story = {
  args: {
    defaultSelected: true,
    children: 'Checked by default',
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox isDisabled>Disabled unchecked</Checkbox>
      <Checkbox isDisabled defaultSelected>Disabled checked</Checkbox>
    </div>
  ),
};

export const Invalid: Story = {
  args: {
    isInvalid: true,
    children: 'This field is required',
  },
};

export const Indeterminate: Story = {
  args: {
    isIndeterminate: true,
    children: 'Indeterminate state',
  },
};

export const Controlled: Story = {
  render: function ControlledCheckbox() {
    const [isSelected, setIsSelected] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <Checkbox isSelected={isSelected} onChange={setIsSelected}>
          Controlled checkbox: {isSelected ? 'Checked' : 'Unchecked'}
        </Checkbox>
        <button
          className="text-sm text-primary underline"
          onClick={() => setIsSelected(!isSelected)}
        >
          Toggle programmatically
        </button>
      </div>
    );
  },
};

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-fg">Select your interests:</span>
      <div className="flex flex-col gap-2 ml-1">
        <Checkbox>Technology</Checkbox>
        <Checkbox>Design</Checkbox>
        <Checkbox>Business</Checkbox>
        <Checkbox>Marketing</Checkbox>
      </div>
    </div>
  ),
};
