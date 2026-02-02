import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from '@ahead-ui/components';

const meta: Meta<typeof Switch> = {
  title: 'Components/Form/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isDisabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    children: 'Enable notifications',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch size="sm">Small switch</Switch>
      <Switch size="md">Medium switch</Switch>
      <Switch size="lg">Large switch</Switch>
    </div>
  ),
};

export const Selected: Story = {
  args: {
    defaultSelected: true,
    children: 'Selected by default',
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch isDisabled>Disabled off</Switch>
      <Switch isDisabled defaultSelected>Disabled on</Switch>
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledSwitch() {
    const [isSelected, setIsSelected] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <Switch isSelected={isSelected} onChange={setIsSelected}>
          Dark mode: {isSelected ? 'On' : 'Off'}
        </Switch>
        <p className="text-sm text-fg-muted">
          Status: {isSelected ? 'Enabled' : 'Disabled'}
        </p>
      </div>
    );
  },
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      <Switch>Enable two-factor authentication</Switch>
      <p className="text-sm text-fg-muted ml-10">
        Add an extra layer of security to your account
      </p>
    </div>
  ),
};

export const SettingsList: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <div className="flex items-center justify-between">
        <span className="text-sm">Email notifications</span>
        <Switch defaultSelected />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Push notifications</span>
        <Switch defaultSelected />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">SMS notifications</span>
        <Switch />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Marketing emails</span>
        <Switch />
      </div>
    </div>
  ),
};
