import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioGroup, Radio } from '@ahead-ui/components';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Form/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
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
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    label: 'Select your plan',
    children: [
      <Radio key="free" value="free">Free</Radio>,
      <Radio key="pro" value="pro">Pro</Radio>,
      <Radio key="enterprise" value="enterprise">Enterprise</Radio>,
    ],
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <RadioGroup label="Small" size="sm" defaultValue="a">
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
      </RadioGroup>
      <RadioGroup label="Medium" size="md" defaultValue="a">
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
      </RadioGroup>
      <RadioGroup label="Large" size="lg" defaultValue="a">
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
      </RadioGroup>
    </div>
  ),
};

export const Horizontal: Story = {
  args: {
    label: 'Preferred contact method',
    orientation: 'horizontal',
    children: [
      <Radio key="email" value="email">Email</Radio>,
      <Radio key="phone" value="phone">Phone</Radio>,
      <Radio key="sms" value="sms">SMS</Radio>,
    ],
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Payment method',
    defaultValue: 'card',
    children: [
      <Radio key="card" value="card">Credit Card</Radio>,
      <Radio key="paypal" value="paypal">PayPal</Radio>,
      <Radio key="bank" value="bank">Bank Transfer</Radio>,
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled options',
    isDisabled: true,
    defaultValue: 'a',
    children: [
      <Radio key="a" value="a">Option A</Radio>,
      <Radio key="b" value="b">Option B</Radio>,
      <Radio key="c" value="c">Option C</Radio>,
    ],
  },
};

export const Invalid: Story = {
  args: {
    label: 'Required selection',
    isInvalid: true,
    errorMessage: 'Please select an option',
    children: [
      <Radio key="yes" value="yes">Yes</Radio>,
      <Radio key="no" value="no">No</Radio>,
    ],
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Notification frequency',
    description: 'How often would you like to receive updates?',
    defaultValue: 'weekly',
    children: [
      <Radio key="daily" value="daily">Daily</Radio>,
      <Radio key="weekly" value="weekly">Weekly</Radio>,
      <Radio key="monthly" value="monthly">Monthly</Radio>,
      <Radio key="never" value="never">Never</Radio>,
    ],
  },
};

export const Controlled: Story = {
  render: function ControlledRadioGroup() {
    const [value, setValue] = useState('medium');
    return (
      <div className="flex flex-col gap-4">
        <RadioGroup
          label="T-Shirt Size"
          value={value}
          onChange={setValue}
        >
          <Radio value="small">Small</Radio>
          <Radio value="medium">Medium</Radio>
          <Radio value="large">Large</Radio>
          <Radio value="xl">XL</Radio>
        </RadioGroup>
        <p className="text-sm text-fg-muted">Selected: {value}</p>
      </div>
    );
  },
};

export const DisabledOption: Story = {
  args: {
    label: 'Shipping method',
    children: [
      <Radio key="standard" value="standard">Standard (5-7 days)</Radio>,
      <Radio key="express" value="express">Express (2-3 days)</Radio>,
      <Radio key="overnight" value="overnight" isDisabled>Overnight (Not available)</Radio>,
    ],
  },
};
