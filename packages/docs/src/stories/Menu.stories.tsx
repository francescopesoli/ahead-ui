import type { Meta, StoryObj } from '@storybook/react';
import { Menu, MenuTrigger, MenuContent, MenuItem, MenuGroup, MenuSeparator, Button } from '@ahead-ui/components';

const meta: Meta<typeof Menu> = {
  title: 'Components/Navigation/Menu',
  component: Menu,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Preferences</MenuItem>
        <MenuSeparator />
        <MenuItem>Logout</MenuItem>
      </MenuContent>
    </Menu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="outline">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Menu
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem>
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Profile
        </MenuItem>
        <MenuItem>
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </MenuItem>
        <MenuSeparator />
        <MenuItem>
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </MenuItem>
      </MenuContent>
    </Menu>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="outline">Actions</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuGroup>
          <MenuItem>New File</MenuItem>
          <MenuItem>New Folder</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuItem>Cut</MenuItem>
          <MenuItem>Copy</MenuItem>
          <MenuItem>Paste</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuItem className="text-danger">Delete</MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  ),
};

export const WithShortcuts: Story = {
  render: () => (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="outline">Edit</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem>
          Undo
          <span className="ml-auto text-xs text-fg-muted">⌘Z</span>
        </MenuItem>
        <MenuItem>
          Redo
          <span className="ml-auto text-xs text-fg-muted">⌘⇧Z</span>
        </MenuItem>
        <MenuSeparator />
        <MenuItem>
          Cut
          <span className="ml-auto text-xs text-fg-muted">⌘X</span>
        </MenuItem>
        <MenuItem>
          Copy
          <span className="ml-auto text-xs text-fg-muted">⌘C</span>
        </MenuItem>
        <MenuItem>
          Paste
          <span className="ml-auto text-xs text-fg-muted">⌘V</span>
        </MenuItem>
        <MenuSeparator />
        <MenuItem>
          Select All
          <span className="ml-auto text-xs text-fg-muted">⌘A</span>
        </MenuItem>
      </MenuContent>
    </Menu>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="outline">Options</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem>Available</MenuItem>
        <MenuItem disabled>Disabled</MenuItem>
        <MenuItem>Also Available</MenuItem>
        <MenuSeparator />
        <MenuItem disabled>Can&apos;t Click</MenuItem>
      </MenuContent>
    </Menu>
  ),
};

export const UserMenu: Story = {
  render: () => (
    <Menu>
      <MenuTrigger asChild>
        <button className="flex items-center gap-2 p-2 rounded-full hover:bg-bg-subtle">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-fg text-sm font-medium">
            JD
          </div>
          <svg className="w-4 h-4 text-fg-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </MenuTrigger>
      <MenuContent align="end">
        <div className="px-2 py-1.5 border-b mb-1">
          <p className="font-medium text-sm">John Doe</p>
          <p className="text-xs text-fg-muted">john@example.com</p>
        </div>
        <MenuItem>
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Profile
        </MenuItem>
        <MenuItem>
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </MenuItem>
        <MenuItem>
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Help
        </MenuItem>
        <MenuSeparator />
        <MenuItem className="text-danger">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </MenuItem>
      </MenuContent>
    </Menu>
  ),
};

export const IconButton: Story = {
  render: () => (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </Button>
      </MenuTrigger>
      <MenuContent align="end">
        <MenuItem>Edit</MenuItem>
        <MenuItem>Duplicate</MenuItem>
        <MenuItem>Archive</MenuItem>
        <MenuSeparator />
        <MenuItem className="text-danger">Delete</MenuItem>
      </MenuContent>
    </Menu>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="flex gap-4">
      <Menu>
        <MenuTrigger asChild>
          <Button variant="outline">Align Start</Button>
        </MenuTrigger>
        <MenuContent align="start">
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
        </MenuContent>
      </Menu>
      <Menu>
        <MenuTrigger asChild>
          <Button variant="outline">Align Center</Button>
        </MenuTrigger>
        <MenuContent align="center">
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
        </MenuContent>
      </Menu>
      <Menu>
        <MenuTrigger asChild>
          <Button variant="outline">Align End</Button>
        </MenuTrigger>
        <MenuContent align="end">
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
        </MenuContent>
      </Menu>
    </div>
  ),
};
