import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from '@ahead-ui/components';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: 'John Doe',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
    name: 'John Doe',
    alt: 'Profile photo',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="xs" name="XS" />
      <Avatar size="sm" name="SM" />
      <Avatar size="md" name="MD" />
      <Avatar size="lg" name="LG" />
      <Avatar size="xl" name="XL" />
      <Avatar size="2xl" name="2XL" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar shape="circle" name="Circle" />
      <Avatar shape="square" name="Square" />
    </div>
  ),
};

export const Fallback: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="John Doe" />
      <Avatar name="Jane Smith" />
      <Avatar name="Bob" />
      <Avatar /> {/* No name - shows default icon */}
    </div>
  ),
};

export const WithBrokenImage: Story = {
  args: {
    src: 'https://broken-image-url.com/image.jpg',
    name: 'John Doe',
  },
};

export const AvatarGroupStory: Story = {
  name: 'Avatar Group',
  render: () => (
    <AvatarGroup max={4}>
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces"
        name="John Doe"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
        name="Jane Smith"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces"
        name="Bob Johnson"
      />
      <Avatar name="Alice Brown" />
      <Avatar name="Charlie Wilson" />
      <Avatar name="Diana Lee" />
    </AvatarGroup>
  ),
};

export const AvatarGroupSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <AvatarGroup size="sm" max={3}>
        <Avatar name="John" />
        <Avatar name="Jane" />
        <Avatar name="Bob" />
        <Avatar name="Alice" />
      </AvatarGroup>
      <AvatarGroup size="md" max={3}>
        <Avatar name="John" />
        <Avatar name="Jane" />
        <Avatar name="Bob" />
        <Avatar name="Alice" />
      </AvatarGroup>
      <AvatarGroup size="lg" max={3}>
        <Avatar name="John" />
        <Avatar name="Jane" />
        <Avatar name="Bob" />
        <Avatar name="Alice" />
      </AvatarGroup>
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Avatar name="Online User" />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-bg" />
      </div>
      <div className="relative">
        <Avatar name="Busy User" />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-danger rounded-full border-2 border-bg" />
      </div>
      <div className="relative">
        <Avatar name="Away User" />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-warning rounded-full border-2 border-bg" />
      </div>
      <div className="relative">
        <Avatar name="Offline User" />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-fg-muted rounded-full border-2 border-bg" />
      </div>
    </div>
  ),
};

export const UserCard: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4 rounded-lg border">
      <Avatar
        size="lg"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces"
        name="John Doe"
      />
      <div>
        <p className="font-medium">John Doe</p>
        <p className="text-sm text-fg-muted">Software Engineer</p>
      </div>
    </div>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Avatar size="lg" name="John Doe" />
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-primary-fg bg-primary rounded-full border-2 border-bg">
          3
        </span>
      </div>
      <div className="relative">
        <Avatar size="lg" name="Jane Smith" />
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-success-fg bg-success rounded-full border-2 border-bg">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </span>
      </div>
    </div>
  ),
};
