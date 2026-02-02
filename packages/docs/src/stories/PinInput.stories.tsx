import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PinInput, PinInputField } from '@ahead-ui/components';

const meta: Meta<typeof PinInput> = {
  title: 'Components/Form/PinInput',
  component: PinInput,
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
    mask: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PinInput>;

export const Default: Story = {
  args: {
    children: [
      <PinInputField key={0} />,
      <PinInputField key={1} />,
      <PinInputField key={2} />,
      <PinInputField key={3} />,
    ],
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm mb-2">Small</p>
        <PinInput size="sm">
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </div>
      <div>
        <p className="text-sm mb-2">Medium</p>
        <PinInput size="md">
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </div>
      <div>
        <p className="text-sm mb-2">Large</p>
        <PinInput size="lg">
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </div>
    </div>
  ),
};

export const SixDigits: Story = {
  args: {
    children: [
      <PinInputField key={0} />,
      <PinInputField key={1} />,
      <PinInputField key={2} />,
      <PinInputField key={3} />,
      <PinInputField key={4} />,
      <PinInputField key={5} />,
    ],
  },
};

export const Masked: Story = {
  args: {
    mask: true,
    children: [
      <PinInputField key={0} />,
      <PinInputField key={1} />,
      <PinInputField key={2} />,
      <PinInputField key={3} />,
    ],
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    defaultValue: '1234',
    children: [
      <PinInputField key={0} />,
      <PinInputField key={1} />,
      <PinInputField key={2} />,
      <PinInputField key={3} />,
    ],
  },
};

export const Invalid: Story = {
  args: {
    isInvalid: true,
    children: [
      <PinInputField key={0} />,
      <PinInputField key={1} />,
      <PinInputField key={2} />,
      <PinInputField key={3} />,
    ],
  },
};

export const AlphanumericType: Story = {
  args: {
    type: 'alphanumeric',
    placeholder: 'X',
    children: [
      <PinInputField key={0} />,
      <PinInputField key={1} />,
      <PinInputField key={2} />,
      <PinInputField key={3} />,
    ],
  },
};

export const Controlled: Story = {
  render: function ControlledPinInput() {
    const [value, setValue] = useState('');
    return (
      <div className="flex flex-col gap-4">
        <PinInput value={value} onChange={setValue}>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
        <p className="text-sm text-fg-muted">Value: {value || '(empty)'}</p>
        <button
          className="px-3 py-1 text-sm border rounded w-fit"
          onClick={() => setValue('')}
        >
          Clear
        </button>
      </div>
    );
  },
};

export const WithOnComplete: Story = {
  render: function OnCompletePinInput() {
    const [completed, setCompleted] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <PinInput onComplete={() => setCompleted(true)}>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
        {completed && (
          <p className="text-sm text-success">PIN entered successfully!</p>
        )}
      </div>
    );
  },
};
