import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@ahead-ui/components';

const meta: Meta<typeof Badge> = {
  title: 'Components/Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'subtle', 'outline'],
    },
    colorScheme: {
      control: 'select',
      options: ['neutral', 'primary', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Badge variant="solid">Solid</Badge>
      <Badge variant="subtle">Subtle</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Badge colorScheme="neutral" variant="solid">Neutral</Badge>
        <Badge colorScheme="primary" variant="solid">Primary</Badge>
        <Badge colorScheme="success" variant="solid">Success</Badge>
        <Badge colorScheme="warning" variant="solid">Warning</Badge>
        <Badge colorScheme="danger" variant="solid">Danger</Badge>
      </div>
      <div className="flex gap-2">
        <Badge colorScheme="neutral" variant="subtle">Neutral</Badge>
        <Badge colorScheme="primary" variant="subtle">Primary</Badge>
        <Badge colorScheme="success" variant="subtle">Success</Badge>
        <Badge colorScheme="warning" variant="subtle">Warning</Badge>
        <Badge colorScheme="danger" variant="subtle">Danger</Badge>
      </div>
      <div className="flex gap-2">
        <Badge colorScheme="neutral" variant="outline">Neutral</Badge>
        <Badge colorScheme="primary" variant="outline">Primary</Badge>
        <Badge colorScheme="success" variant="outline">Success</Badge>
        <Badge colorScheme="warning" variant="outline">Warning</Badge>
        <Badge colorScheme="danger" variant="outline">Danger</Badge>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-4">
      <Badge colorScheme="success">
        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Approved
      </Badge>
      <Badge colorScheme="warning">
        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Pending
      </Badge>
      <Badge colorScheme="danger">
        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        Rejected
      </Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Badge colorScheme="success" variant="subtle">Active</Badge>
        <Badge colorScheme="neutral" variant="subtle">Inactive</Badge>
        <Badge colorScheme="warning" variant="subtle">Pending</Badge>
        <Badge colorScheme="danger" variant="subtle">Expired</Badge>
      </div>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div className="flex items-center justify-between p-3 border rounded-lg">
        <span className="font-medium">Premium Feature</span>
        <Badge colorScheme="primary" variant="solid">PRO</Badge>
      </div>
      <div className="flex items-center justify-between p-3 border rounded-lg">
        <span className="font-medium">Version 2.0</span>
        <Badge colorScheme="success" variant="subtle">NEW</Badge>
      </div>
      <div className="flex items-center justify-between p-3 border rounded-lg">
        <span className="font-medium">Legacy API</span>
        <Badge colorScheme="warning" variant="outline">DEPRECATED</Badge>
      </div>
    </div>
  ),
};

export const NotificationCount: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="relative">
        <button className="p-2 rounded-full border">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <Badge
          size="sm"
          colorScheme="danger"
          variant="solid"
          className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center"
        >
          3
        </Badge>
      </div>
      <div className="relative">
        <button className="p-2 rounded-full border">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
        <Badge
          size="sm"
          colorScheme="primary"
          variant="solid"
          className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center"
        >
          12
        </Badge>
      </div>
    </div>
  ),
};
