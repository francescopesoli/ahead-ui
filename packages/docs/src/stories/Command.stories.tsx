import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  CommandDialog,
  Button,
} from '@ahead-ui/components';

const meta: Meta<typeof Command> = {
  title: 'Components/Overlay/Command',
  component: Command,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Command>;

export const Default: Story = {
  render: () => (
    <Command className="w-96 border rounded-lg">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Command className="w-96 border rounded-lg">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Applications">
          <CommandItem>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Calendar
          </CommandItem>
          <CommandItem>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </CommandItem>
          <CommandItem>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Calculator
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </CommandItem>
          <CommandItem>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const WithShortcuts: Story = {
  render: () => (
    <Command className="w-96 border rounded-lg">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>
            New File
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            New Window
            <CommandShortcut>⌘⇧N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Open File
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Save
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Save As...
            <CommandShortcut>⌘⇧S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const CommandDialogStory: Story = {
  name: 'Command Dialog',
  render: function CommandDialogDemo() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <p className="text-sm text-fg-muted mb-2">
          Press <kbd className="px-1 py-0.5 bg-bg-muted rounded text-xs">⌘K</kbd> or click the button
        </p>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open Command Palette
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={() => setOpen(false)}>
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Calendar
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Search Emoji
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Calculator
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem onSelect={() => setOpen(false)}>
                Profile
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                Billing
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                Settings
                <CommandShortcut>⌘,</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    );
  },
};

export const FileSearch: Story = {
  render: () => (
    <Command className="w-[28rem] border rounded-lg">
      <CommandInput placeholder="Search files..." />
      <CommandList>
        <CommandEmpty>No files found.</CommandEmpty>
        <CommandGroup heading="Recent Files">
          <CommandItem>
            <svg className="w-4 h-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="flex-1">src/components/Button.tsx</span>
            <span className="text-xs text-fg-muted">2 min ago</span>
          </CommandItem>
          <CommandItem>
            <svg className="w-4 h-4 mr-2 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="flex-1">src/styles/globals.css</span>
            <span className="text-xs text-fg-muted">1 hour ago</span>
          </CommandItem>
          <CommandItem>
            <svg className="w-4 h-4 mr-2 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="flex-1">package.json</span>
            <span className="text-xs text-fg-muted">3 hours ago</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New File
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
            </svg>
            New Folder
            <CommandShortcut>⌘⇧N</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const UserSearch: Story = {
  render: () => (
    <Command className="w-96 border rounded-lg">
      <CommandInput placeholder="Search users..." />
      <CommandList>
        <CommandEmpty>No users found.</CommandEmpty>
        <CommandGroup heading="Team Members">
          {[
            { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
            { name: 'Jane Smith', email: 'jane@example.com', role: 'Developer' },
            { name: 'Bob Wilson', email: 'bob@example.com', role: 'Designer' },
          ].map((user) => (
            <CommandItem key={user.email}>
              <div className="w-8 h-8 rounded-full bg-primary-subtle flex items-center justify-center text-sm font-medium mr-2">
                {user.name[0]}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-fg-muted">{user.email}</p>
              </div>
              <span className="text-xs text-fg-muted">{user.role}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};
