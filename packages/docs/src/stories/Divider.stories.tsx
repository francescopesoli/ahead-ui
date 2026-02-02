import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '@ahead-ui/components';

const meta: Meta<typeof Divider> = {
  title: 'Components/Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: () => (
    <div className="w-64">
      <Divider />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      <div>
        <p className="text-sm text-fg-muted mb-2">Solid</p>
        <Divider variant="solid" />
      </div>
      <div>
        <p className="text-sm text-fg-muted mb-2">Dashed</p>
        <Divider variant="dashed" />
      </div>
      <div>
        <p className="text-sm text-fg-muted mb-2">Dotted</p>
        <Divider variant="dotted" />
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-16 items-center">
      <span className="px-4">Item 1</span>
      <Divider orientation="vertical" />
      <span className="px-4">Item 2</span>
      <Divider orientation="vertical" />
      <span className="px-4">Item 3</span>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-72 space-y-4">
      <Divider>
        <span className="text-sm text-fg-muted">OR</span>
      </Divider>
      <Divider>
        <span className="text-sm text-fg-muted">Continue with</span>
      </Divider>
      <Divider>
        <span className="text-xs text-fg-muted px-2 bg-bg">Section</span>
      </Divider>
    </div>
  ),
};

export const InContent: Story = {
  render: () => (
    <div className="w-80">
      <p className="text-sm text-fg-muted">
        First paragraph of content that explains something important.
      </p>
      <Divider className="my-4" />
      <p className="text-sm text-fg-muted">
        Second paragraph of content that continues the explanation.
      </p>
    </div>
  ),
};

export const InList: Story = {
  render: () => (
    <div className="w-64 border rounded-lg">
      <div className="p-3">Item 1</div>
      <Divider />
      <div className="p-3">Item 2</div>
      <Divider />
      <div className="p-3">Item 3</div>
      <Divider />
      <div className="p-3">Item 4</div>
    </div>
  ),
};

export const InLoginForm: Story = {
  render: () => (
    <div className="w-72 p-4 border rounded-lg">
      <h3 className="text-lg font-medium text-center mb-4">Sign In</h3>
      <button className="w-full py-2 px-4 border rounded-lg flex items-center justify-center gap-2 hover:bg-bg-subtle mb-3">
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Continue with Google
      </button>
      <Divider>
        <span className="text-xs text-fg-muted">OR</span>
      </Divider>
      <div className="mt-3 space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded-lg text-sm"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded-lg text-sm"
        />
        <button className="w-full py-2 bg-primary text-primary-fg rounded-lg text-sm font-medium">
          Sign In
        </button>
      </div>
    </div>
  ),
};

export const InToolbar: Story = {
  render: () => (
    <div className="flex items-center gap-1 p-2 border rounded-lg">
      <button className="p-2 hover:bg-bg-subtle rounded">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>
      <button className="p-2 hover:bg-bg-subtle rounded">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <button className="p-2 hover:bg-bg-subtle rounded">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </button>
      <Divider orientation="vertical" className="h-6 mx-1" />
      <button className="p-2 hover:bg-bg-subtle rounded font-bold">B</button>
      <button className="p-2 hover:bg-bg-subtle rounded italic">I</button>
      <button className="p-2 hover:bg-bg-subtle rounded underline">U</button>
      <Divider orientation="vertical" className="h-6 mx-1" />
      <button className="p-2 hover:bg-bg-subtle rounded">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </button>
    </div>
  ),
};
