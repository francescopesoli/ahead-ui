import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectItem } from '@ahead-ui/components';

const meta: Meta<typeof Select> = {
  title: 'Components/Form/Select',
  component: Select,
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
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    label: 'Select a fruit',
    placeholder: 'Choose an option',
    children: [
      <SelectItem key="apple">Apple</SelectItem>,
      <SelectItem key="banana">Banana</SelectItem>,
      <SelectItem key="orange">Orange</SelectItem>,
      <SelectItem key="grape">Grape</SelectItem>,
      <SelectItem key="mango">Mango</SelectItem>,
    ],
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Select label="Small" size="sm" placeholder="Choose...">
        <SelectItem key="1">Option 1</SelectItem>
        <SelectItem key="2">Option 2</SelectItem>
        <SelectItem key="3">Option 3</SelectItem>
      </Select>
      <Select label="Medium" size="md" placeholder="Choose...">
        <SelectItem key="1">Option 1</SelectItem>
        <SelectItem key="2">Option 2</SelectItem>
        <SelectItem key="3">Option 3</SelectItem>
      </Select>
      <Select label="Large" size="lg" placeholder="Choose...">
        <SelectItem key="1">Option 1</SelectItem>
        <SelectItem key="2">Option 2</SelectItem>
        <SelectItem key="3">Option 3</SelectItem>
      </Select>
    </div>
  ),
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Country',
    defaultSelectedKey: 'us',
    children: [
      <SelectItem key="us">United States</SelectItem>,
      <SelectItem key="uk">United Kingdom</SelectItem>,
      <SelectItem key="ca">Canada</SelectItem>,
      <SelectItem key="au">Australia</SelectItem>,
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled select',
    isDisabled: true,
    placeholder: 'Cannot select',
    children: [
      <SelectItem key="1">Option 1</SelectItem>,
      <SelectItem key="2">Option 2</SelectItem>,
    ],
  },
};

export const Invalid: Story = {
  args: {
    label: 'Required field',
    isInvalid: true,
    placeholder: 'Please select an option',
    children: [
      <SelectItem key="1">Option 1</SelectItem>,
      <SelectItem key="2">Option 2</SelectItem>,
    ],
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Timezone',
    description: 'Select your preferred timezone',
    placeholder: 'Choose timezone',
    children: [
      <SelectItem key="utc">UTC (GMT+0)</SelectItem>,
      <SelectItem key="est">Eastern (GMT-5)</SelectItem>,
      <SelectItem key="pst">Pacific (GMT-8)</SelectItem>,
      <SelectItem key="cet">Central European (GMT+1)</SelectItem>,
    ],
  },
};

export const WithError: Story = {
  args: {
    label: 'Role',
    isInvalid: true,
    errorMessage: 'Please select a role to continue',
    placeholder: 'Select a role',
    children: [
      <SelectItem key="admin">Administrator</SelectItem>,
      <SelectItem key="editor">Editor</SelectItem>,
      <SelectItem key="viewer">Viewer</SelectItem>,
    ],
  },
};

export const DisabledOptions: Story = {
  args: {
    label: 'Subscription Plan',
    placeholder: 'Choose a plan',
    children: [
      <SelectItem key="free">Free</SelectItem>,
      <SelectItem key="pro">Pro</SelectItem>,
      <SelectItem key="enterprise" isDisabled>Enterprise (Contact Sales)</SelectItem>,
    ],
  },
};
