import type { Meta, StoryObj } from '@storybook/react';
import { Label, Input, Checkbox, Switch } from '@ahead-ui/components';

const meta: Meta<typeof Label> = {
  title: 'Components/Utility/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <div className="space-y-1">
        <Label size="sm">Small Label</Label>
        <Input size="sm" placeholder="Small input" />
      </div>
      <div className="space-y-1">
        <Label size="md">Medium Label</Label>
        <Input size="md" placeholder="Medium input" />
      </div>
      <div className="space-y-1">
        <Label size="lg">Large Label</Label>
        <Input size="lg" placeholder="Large input" />
      </div>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <Label htmlFor="name" required>
        Full Name
      </Label>
      <Input id="name" placeholder="Enter your full name" />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="space-y-1 w-64">
      <Label htmlFor="username">Username</Label>
      <p className="text-sm text-fg-muted">Choose a unique username for your account.</p>
      <Input id="username" placeholder="e.g., johndoe" className="mt-1" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms" className="cursor-pointer">
        I agree to the terms and conditions
      </Label>
    </div>
  ),
};

export const WithSwitch: Story = {
  render: () => (
    <div className="flex items-center justify-between w-64">
      <Label htmlFor="notifications">Enable notifications</Label>
      <Switch id="notifications" />
    </div>
  ),
};

export const InlineLabels: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="flex items-center gap-4">
        <Label htmlFor="first" className="w-24 text-right">
          First Name
        </Label>
        <Input id="first" className="flex-1" />
      </div>
      <div className="flex items-center gap-4">
        <Label htmlFor="last" className="w-24 text-right">
          Last Name
        </Label>
        <Input id="last" className="flex-1" />
      </div>
      <div className="flex items-center gap-4">
        <Label htmlFor="company" className="w-24 text-right">
          Company
        </Label>
        <Input id="company" className="flex-1" />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <Label htmlFor="disabled-input" disabled>
        Disabled Field
      </Label>
      <Input id="disabled-input" disabled defaultValue="Cannot edit" />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form className="w-80 space-y-4">
      <div className="space-y-1">
        <Label htmlFor="form-email" required>
          Email Address
        </Label>
        <Input id="form-email" type="email" placeholder="you@example.com" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="form-password" required>
          Password
        </Label>
        <Input id="form-password" type="password" />
        <p className="text-xs text-fg-muted">Must be at least 8 characters.</p>
      </div>

      <div className="space-y-1">
        <Label htmlFor="form-bio">Bio</Label>
        <textarea
          id="form-bio"
          className="w-full p-2 border rounded-md text-sm"
          rows={3}
          placeholder="Tell us about yourself"
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="form-remember" />
        <Label htmlFor="form-remember" className="text-sm cursor-pointer">
          Remember me for 30 days
        </Label>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-primary text-primary-fg rounded-md font-medium"
      >
        Sign Up
      </button>
    </form>
  ),
};

export const WithOptional: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <Label htmlFor="phone">
        Phone Number <span className="text-fg-muted font-normal">(optional)</span>
      </Label>
      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
    </div>
  ),
};

export const WithTooltip: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <div className="flex items-center gap-1">
        <Label htmlFor="api-key">API Key</Label>
        <button
          type="button"
          className="text-fg-muted hover:text-fg"
          title="Your unique API key for authentication"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
      <Input id="api-key" type="password" placeholder="sk-xxxxxxxxxxxxxxxx" />
    </div>
  ),
};
