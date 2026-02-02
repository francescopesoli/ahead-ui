import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@ahead-ui/components';

const meta: Meta<typeof Input> = {
  title: 'Components/Form/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'flushed', 'unstyled'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isInvalid: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Input variant="outline" placeholder="Outline" />
      <Input variant="filled" placeholder="Filled" />
      <Input variant="flushed" placeholder="Flushed" />
      <Input variant="unstyled" placeholder="Unstyled" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Hello World',
  },
};

export const Invalid: Story = {
  args: {
    isInvalid: true,
    defaultValue: 'Invalid input',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'Disabled input',
  },
};

export const WithType: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Input type="text" placeholder="Text" />
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input type="number" placeholder="Number" />
      <Input type="search" placeholder="Search" />
    </div>
  ),
};
