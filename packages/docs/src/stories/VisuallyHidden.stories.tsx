import type { Meta, StoryObj } from '@storybook/react';
import { VisuallyHidden, Button } from '@ahead-ui/components';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Components/Utility/VisuallyHidden',
  component: VisuallyHidden,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VisuallyHidden>;

export const Default: Story = {
  render: () => (
    <div>
      <p className="text-sm mb-2">
        The text below is visually hidden but accessible to screen readers:
      </p>
      <VisuallyHidden>
        This text is hidden visually but will be read by screen readers.
      </VisuallyHidden>
      <p className="text-sm text-fg-muted mt-2">
        (Use a screen reader or inspect the DOM to see the hidden content)
      </p>
    </div>
  ),
};

export const IconButton: Story = {
  render: () => (
    <div className="flex gap-4">
      <button className="p-2 border rounded hover:bg-bg-subtle">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <VisuallyHidden>Search</VisuallyHidden>
      </button>

      <button className="p-2 border rounded hover:bg-bg-subtle">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        <VisuallyHidden>Edit</VisuallyHidden>
      </button>

      <button className="p-2 border rounded hover:bg-bg-subtle">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        <VisuallyHidden>Delete</VisuallyHidden>
      </button>

      <button className="p-2 border rounded hover:bg-bg-subtle">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <VisuallyHidden>Settings</VisuallyHidden>
      </button>
    </div>
  ),
};

export const SocialLinks: Story = {
  render: () => (
    <div className="flex gap-3">
      <a href="#" className="p-2 border rounded hover:bg-bg-subtle">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
        </svg>
        <VisuallyHidden>Twitter</VisuallyHidden>
      </a>
      <a href="#" className="p-2 border rounded hover:bg-bg-subtle">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <VisuallyHidden>GitHub</VisuallyHidden>
      </a>
      <a href="#" className="p-2 border rounded hover:bg-bg-subtle">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        <VisuallyHidden>LinkedIn</VisuallyHidden>
      </a>
    </div>
  ),
};

export const FormLabels: Story = {
  render: () => (
    <form className="w-64 space-y-4">
      <div className="relative">
        <VisuallyHidden as="label" htmlFor="search-input">
          Search
        </VisuallyHidden>
        <input
          id="search-input"
          type="search"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
        />
        <svg
          className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="w-full mt-1 px-3 py-2 border rounded-lg"
        />
        <VisuallyHidden id="email-hint">
          Enter your email address for account recovery
        </VisuallyHidden>
      </div>
    </form>
  ),
};

export const SkipLink: Story = {
  render: () => (
    <div>
      <VisuallyHidden as="a" href="#main-content" focusable>
        Skip to main content
      </VisuallyHidden>

      <header className="p-4 border-b mb-4">
        <nav className="flex gap-4">
          <a href="#" className="text-sm">Home</a>
          <a href="#" className="text-sm">About</a>
          <a href="#" className="text-sm">Contact</a>
        </nav>
      </header>

      <main id="main-content" className="p-4">
        <p className="text-sm text-fg-muted">
          Tab into this area and press Tab. The skip link will become visible
          when focused (useful for keyboard navigation).
        </p>
      </main>
    </div>
  ),
};

export const LoadingState: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <VisuallyHidden>Loading, please wait...</VisuallyHidden>
      <span className="text-sm" aria-hidden="true">
        Loading...
      </span>
    </div>
  ),
};

export const StatusIndicator: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 bg-success rounded-full" />
        <VisuallyHidden>Status: Online</VisuallyHidden>
        <span aria-hidden="true" className="text-sm">
          Online
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-3 h-3 bg-warning rounded-full" />
        <VisuallyHidden>Status: Away</VisuallyHidden>
        <span aria-hidden="true" className="text-sm">
          Away
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-3 h-3 bg-danger rounded-full" />
        <VisuallyHidden>Status: Offline</VisuallyHidden>
        <span aria-hidden="true" className="text-sm">
          Offline
        </span>
      </div>
    </div>
  ),
};

export const Description: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div className="p-4 bg-bg-subtle rounded-lg">
        <h4 className="font-medium mb-2">What is VisuallyHidden?</h4>
        <p className="text-sm text-fg-muted">
          VisuallyHidden hides content visually while keeping it accessible to
          screen readers. This is essential for:
        </p>
        <ul className="list-disc list-inside text-sm text-fg-muted mt-2 space-y-1">
          <li>Icon-only buttons that need accessible labels</li>
          <li>Skip links for keyboard navigation</li>
          <li>Form labels for inputs with visual placeholders</li>
          <li>Status messages announced to screen readers</li>
          <li>Additional context for complex UI elements</li>
        </ul>
      </div>
      <p className="text-xs text-fg-muted">
        Unlike `display: none` or `visibility: hidden`, VisuallyHidden keeps
        content in the accessibility tree.
      </p>
    </div>
  ),
};
