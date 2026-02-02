import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@ahead-ui/components';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Form/Textarea',
  component: Textarea,
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
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Textarea variant="outline" placeholder="Outline variant" />
      <Textarea variant="filled" placeholder="Filled variant" />
      <Textarea variant="flushed" placeholder="Flushed variant" />
      <Textarea variant="unstyled" placeholder="Unstyled variant" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Textarea size="sm" placeholder="Small" />
      <Textarea size="md" placeholder="Medium" />
      <Textarea size="lg" placeholder="Large" />
    </div>
  ),
};

export const WithValue: Story = {
  args: {
    defaultValue: 'This is a longer text that spans multiple lines.\n\nIt demonstrates how the textarea handles multiline content.',
  },
};

export const Invalid: Story = {
  args: {
    isInvalid: true,
    defaultValue: 'Invalid content',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'Disabled textarea',
  },
};

export const NoResize: Story = {
  args: {
    resize: 'none',
    placeholder: 'Cannot resize this textarea',
  },
};

export const WithRows: Story = {
  args: {
    rows: 6,
    placeholder: 'This textarea has 6 rows',
  },
};
