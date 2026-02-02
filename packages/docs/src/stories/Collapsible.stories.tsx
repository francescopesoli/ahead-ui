import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent, Button } from '@ahead-ui/components';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Layout/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-80">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          Click to expand
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-fg-muted">
            This content is hidden by default and appears when you click the
            trigger button above.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen className="w-80">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          This is open by default
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-fg-muted">
            This content is visible by default because we set defaultOpen.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const Controlled: Story = {
  render: function ControlledCollapsible() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="w-80 space-y-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {isOpen ? 'Click to collapse' : 'Click to expand'}
              <svg
                className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-fg-muted">
                This collapsible is controlled externally.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
        <p className="text-sm text-fg-muted">
          State: {isOpen ? 'Open' : 'Closed'}
        </p>
        <Button size="sm" onClick={() => setIsOpen(!isOpen)}>
          Toggle externally
        </Button>
      </div>
    );
  },
};

export const RepositoryFiles: Story = {
  render: () => (
    <div className="w-80 border rounded-lg">
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="w-full flex items-center gap-2 p-2 hover:bg-bg-subtle">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <span className="font-medium text-sm">src</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="ml-6 border-l pl-2">
            <Collapsible>
              <CollapsibleTrigger className="w-full flex items-center gap-2 p-2 hover:bg-bg-subtle">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-sm">components</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="ml-6 border-l pl-2">
                  <div className="p-2 text-sm hover:bg-bg-subtle cursor-pointer">
                    Button.tsx
                  </div>
                  <div className="p-2 text-sm hover:bg-bg-subtle cursor-pointer">
                    Input.tsx
                  </div>
                  <div className="p-2 text-sm hover:bg-bg-subtle cursor-pointer">
                    Card.tsx
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
            <div className="p-2 text-sm hover:bg-bg-subtle cursor-pointer">
              App.tsx
            </div>
            <div className="p-2 text-sm hover:bg-bg-subtle cursor-pointer">
              index.tsx
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger className="w-full flex items-center gap-2 p-2 hover:bg-bg-subtle">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-medium text-sm">public</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="ml-6 border-l pl-2">
            <div className="p-2 text-sm hover:bg-bg-subtle cursor-pointer">
              index.html
            </div>
            <div className="p-2 text-sm hover:bg-bg-subtle cursor-pointer">
              favicon.ico
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

export const NotificationSettings: Story = {
  render: () => (
    <div className="w-96 space-y-2">
      {[
        { title: 'Email Notifications', desc: 'Get notified via email' },
        { title: 'Push Notifications', desc: 'Receive push notifications' },
        { title: 'SMS Notifications', desc: 'Get text message alerts' },
      ].map((section) => (
        <Collapsible key={section.title} className="border rounded-lg">
          <CollapsibleTrigger className="w-full flex items-center justify-between p-4 hover:bg-bg-subtle">
            <div>
              <p className="font-medium text-sm">{section.title}</p>
              <p className="text-xs text-fg-muted">{section.desc}</p>
            </div>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 pt-0 space-y-3">
              {['Activity updates', 'New messages', 'Mentions', 'Reminders'].map(
                (opt) => (
                  <label
                    key={opt}
                    className="flex items-center justify-between text-sm"
                  >
                    <span>{opt}</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </label>
                )
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  ),
};

export const ReadMore: Story = {
  render: function ReadMore() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-96">
        <p className="text-sm text-fg-muted">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <CollapsibleContent>
          <p className="text-sm text-fg-muted mt-2">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum.
          </p>
        </CollapsibleContent>
        <CollapsibleTrigger asChild>
          <button className="text-sm text-primary mt-2">
            {isOpen ? 'Show less' : 'Read more'}
          </button>
        </CollapsibleTrigger>
      </Collapsible>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Collapsible disabled className="w-80">
      <CollapsibleTrigger asChild>
        <Button variant="outline" disabled className="w-full justify-between">
          Disabled collapsible
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-fg-muted">
            This content cannot be revealed because the collapsible is disabled.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};
