import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent, Button, Input } from '@ahead-ui/components';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-96">
      <TabsList>
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
        <TabsTrigger value="tab3">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4">
        <p className="text-sm text-fg-muted">
          Make changes to your account here. Click save when you&apos;re done.
        </p>
      </TabsContent>
      <TabsContent value="tab2" className="p-4">
        <p className="text-sm text-fg-muted">
          Change your password here. After saving, you&apos;ll be logged out.
        </p>
      </TabsContent>
      <TabsContent value="tab3" className="p-4">
        <p className="text-sm text-fg-muted">
          Manage your settings and preferences.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-96">
      <TabsList>
        <TabsTrigger value="tab1">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Profile
        </TabsTrigger>
        <TabsTrigger value="tab2">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          Notifications
        </TabsTrigger>
        <TabsTrigger value="tab3">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4">Profile content</TabsContent>
      <TabsContent value="tab2" className="p-4">Notifications content</TabsContent>
      <TabsContent value="tab3" className="p-4">Settings content</TabsContent>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="general" orientation="vertical" className="flex gap-4">
      <TabsList className="flex-col w-48">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>
      <div className="flex-1">
        <TabsContent value="general" className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">General Settings</h3>
          <p className="text-sm text-fg-muted">Manage your general account settings.</p>
        </TabsContent>
        <TabsContent value="security" className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Security Settings</h3>
          <p className="text-sm text-fg-muted">Configure your security preferences.</p>
        </TabsContent>
        <TabsContent value="billing" className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Billing Settings</h3>
          <p className="text-sm text-fg-muted">Manage your billing information.</p>
        </TabsContent>
        <TabsContent value="team" className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Team Settings</h3>
          <p className="text-sm text-fg-muted">Manage your team members.</p>
        </TabsContent>
      </div>
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: function ControlledTabs() {
    const [value, setValue] = useState('tab1');
    return (
      <div className="w-96">
        <Tabs value={value} onValueChange={setValue}>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="p-4">Content 1</TabsContent>
          <TabsContent value="tab2" className="p-4">Content 2</TabsContent>
          <TabsContent value="tab3" className="p-4">Content 3</TabsContent>
        </Tabs>
        <div className="flex gap-2 mt-4">
          <Button size="sm" variant="outline" onClick={() => setValue('tab1')}>
            Go to Tab 1
          </Button>
          <Button size="sm" variant="outline" onClick={() => setValue('tab2')}>
            Go to Tab 2
          </Button>
          <Button size="sm" variant="outline" onClick={() => setValue('tab3')}>
            Go to Tab 3
          </Button>
        </div>
      </div>
    );
  },
};

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-96">
      <TabsList>
        <TabsTrigger value="tab1">Active</TabsTrigger>
        <TabsTrigger value="tab2" disabled>Disabled</TabsTrigger>
        <TabsTrigger value="tab3">Also Active</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4">
        This tab is active.
      </TabsContent>
      <TabsContent value="tab2" className="p-4">
        You can&apos;t see this because the tab is disabled.
      </TabsContent>
      <TabsContent value="tab3" className="p-4">
        This tab is also active.
      </TabsContent>
    </Tabs>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[28rem]">
      <TabsList className="w-full">
        <TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
        <TabsTrigger value="password" className="flex-1">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 border border-t-0 rounded-b-lg">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input placeholder="Enter your name" className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input type="email" placeholder="Enter your email" className="mt-1" />
          </div>
          <Button>Save Changes</Button>
        </div>
      </TabsContent>
      <TabsContent value="password" className="p-4 border border-t-0 rounded-b-lg">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Current Password</label>
            <Input type="password" className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">New Password</label>
            <Input type="password" className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <Input type="password" className="mt-1" />
          </div>
          <Button>Update Password</Button>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const CardStyle: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[32rem]">
      <TabsList variant="pills">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="export">Export</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="text-sm text-fg-muted">Total Users</h4>
            <p className="text-2xl font-bold">12,345</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="text-sm text-fg-muted">Revenue</h4>
            <p className="text-2xl font-bold">$45,231</p>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="mt-4">Analytics content</TabsContent>
      <TabsContent value="reports" className="mt-4">Reports content</TabsContent>
      <TabsContent value="export" className="mt-4">Export content</TabsContent>
    </Tabs>
  ),
};
