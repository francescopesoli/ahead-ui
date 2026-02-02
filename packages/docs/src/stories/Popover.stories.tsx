import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent, PopoverClose, Button, Input } from '@ahead-ui/components';

const meta: Meta<typeof Popover> = {
  title: 'Components/Overlay/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <h3 className="font-medium mb-2">Popover Title</h3>
        <p className="text-sm text-fg-muted">
          This is the popover content. It can contain any elements.
        </p>
      </PopoverContent>
    </Popover>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4 p-16">
      <Popover placement="top">
        <PopoverTrigger asChild>
          <Button variant="outline">Top</Button>
        </PopoverTrigger>
        <PopoverContent>Popover on top</PopoverContent>
      </Popover>
      <div className="flex gap-4">
        <Popover placement="left">
          <PopoverTrigger asChild>
            <Button variant="outline">Left</Button>
          </PopoverTrigger>
          <PopoverContent>Popover on left</PopoverContent>
        </Popover>
        <Popover placement="right">
          <PopoverTrigger asChild>
            <Button variant="outline">Right</Button>
          </PopoverTrigger>
          <PopoverContent>Popover on right</PopoverContent>
        </Popover>
      </div>
      <Popover placement="bottom">
        <PopoverTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </PopoverTrigger>
        <PopoverContent>Popover on bottom</PopoverContent>
      </Popover>
    </div>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Edit Profile</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <h3 className="font-medium mb-4">Edit Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input placeholder="Enter your name" className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input type="email" placeholder="Enter your email" className="mt-1" />
          </div>
          <div className="flex justify-end gap-2">
            <PopoverClose asChild>
              <Button variant="outline" size="sm">Cancel</Button>
            </PopoverClose>
            <Button size="sm">Save</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const SharePopover: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <h3 className="font-medium mb-3">Share this page</h3>
        <div className="flex gap-2 mb-4">
          {['Twitter', 'Facebook', 'LinkedIn', 'Email'].map((platform) => (
            <button
              key={platform}
              className="flex-1 p-2 text-xs border rounded hover:bg-bg-subtle"
            >
              {platform}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            defaultValue="https://example.com/page"
            readOnly
            className="text-xs"
          />
          <Button size="sm" variant="outline">Copy</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const NotificationPopover: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-bg-subtle">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-0 right-0 w-2 h-2 bg-danger rounded-full" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Notifications</h3>
          <button className="text-xs text-primary">Mark all read</button>
        </div>
        <div className="space-y-3">
          {[
            { title: 'New comment', desc: 'John commented on your post', time: '2m ago' },
            { title: 'New follower', desc: 'Jane started following you', time: '1h ago' },
            { title: 'Update complete', desc: 'Your profile has been updated', time: '3h ago' },
          ].map((n, i) => (
            <div key={i} className="flex gap-3 p-2 rounded hover:bg-bg-subtle cursor-pointer">
              <div className="w-8 h-8 bg-primary-subtle rounded-full flex items-center justify-center text-xs font-medium">
                {n.title[0]}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-fg-muted">{n.desc}</p>
              </div>
              <span className="text-xs text-fg-muted">{n.time}</span>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 text-center text-sm text-primary">
          View all notifications
        </button>
      </PopoverContent>
    </Popover>
  ),
};

export const FilterPopover: Story = {
  render: function FilterPopover() {
    const [filters, setFilters] = useState({
      status: 'all',
      date: 'any',
    });
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <h3 className="font-medium mb-4">Filters</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Status</label>
              <select
                className="w-full mt-1 p-2 border rounded"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Date range</label>
              <select
                className="w-full mt-1 p-2 border rounded"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              >
                <option value="any">Any time</option>
                <option value="today">Today</option>
                <option value="week">This week</option>
                <option value="month">This month</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilters({ status: 'all', date: 'any' })}
              >
                Reset
              </Button>
              <PopoverClose asChild>
                <Button size="sm">Apply</Button>
              </PopoverClose>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

export const Controlled: Story = {
  render: function ControlledPopover() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="flex items-center gap-4">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline">Controlled</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-sm">This popover is controlled externally.</p>
            <Button size="sm" className="mt-2" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </PopoverContent>
        </Popover>
        <span className="text-sm text-fg-muted">
          Status: {isOpen ? 'Open' : 'Closed'}
        </span>
      </div>
    );
  },
};
