import type { Meta, StoryObj } from '@storybook/react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@ahead-ui/components';

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Components/Layout/Resizable',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ResizablePanelGroup>;

export const Default: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="h-48 w-full border rounded-lg">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Panel 1</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Panel 2</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup direction="vertical" className="h-80 w-64 border rounded-lg">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Top Panel</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Bottom Panel</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const ThreePanels: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="h-48 w-full border rounded-lg">
      <ResizablePanel defaultSize={25} minSize={15}>
        <div className="flex h-full items-center justify-center p-4 bg-bg-subtle">
          <span className="text-sm font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="font-semibold">Main Content</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25} minSize={15}>
        <div className="flex h-full items-center justify-center p-4 bg-bg-subtle">
          <span className="text-sm font-semibold">Details</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Nested: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="h-80 w-full border rounded-lg">
      <ResizablePanel defaultSize={30} minSize={20}>
        <div className="flex h-full items-center justify-center p-4 bg-bg-subtle">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={60}>
            <div className="flex h-full items-center justify-center p-4">
              <span className="font-semibold">Main Content</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={40}>
            <div className="flex h-full items-center justify-center p-4 bg-bg-muted">
              <span className="font-semibold">Panel</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const IDELayout: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="h-96 w-full border rounded-lg overflow-hidden">
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <div className="h-full bg-bg-subtle p-2">
          <div className="text-xs font-semibold text-fg-muted mb-2">EXPLORER</div>
          <div className="space-y-1">
            {['src', 'public', 'node_modules', 'package.json'].map((item) => (
              <div key={item} className="text-sm py-1 px-2 hover:bg-bg rounded cursor-pointer">
                {item}
              </div>
            ))}
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={55}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={70}>
            <div className="h-full p-4 font-mono text-sm">
              <div className="text-xs text-fg-muted mb-2">App.tsx</div>
              <pre className="text-fg-muted">{`function App() {
  return (
    <div>
      Hello World
    </div>
  );
}`}</pre>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={30} minSize={20}>
            <div className="h-full bg-bg-inverse text-fg-inverse p-2 font-mono text-xs">
              <div className="text-fg-muted mb-1">TERMINAL</div>
              <div>$ npm run dev</div>
              <div className="text-success">Ready on http://localhost:3000</div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25} minSize={15}>
        <div className="h-full bg-bg-subtle p-2">
          <div className="text-xs font-semibold text-fg-muted mb-2">OUTLINE</div>
          <div className="space-y-1">
            {['function App', 'return', 'div'].map((item, i) => (
              <div
                key={item}
                className="text-sm py-1 px-2 hover:bg-bg rounded cursor-pointer"
                style={{ paddingLeft: `${(i + 1) * 8}px` }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const WithMinMax: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="h-48 w-full border rounded-lg">
      <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
        <div className="flex h-full items-center justify-center p-4 bg-primary-subtle">
          <div className="text-center">
            <span className="font-semibold block">Panel 1</span>
            <span className="text-xs text-fg-muted">min: 20%, max: 50%</span>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="font-semibold">Panel 2</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const Collapsible: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="h-48 w-full border rounded-lg">
      <ResizablePanel defaultSize={30} minSize={0} collapsible collapsedSize={5}>
        <div className="flex h-full items-center justify-center p-4 bg-bg-subtle">
          <span className="font-semibold">Collapsible</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <div className="flex h-full items-center justify-center p-4">
          <span className="font-semibold">Main Panel</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

export const EmailLayout: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="h-80 w-full border rounded-lg">
      <ResizablePanel defaultSize={25} minSize={15}>
        <div className="h-full p-2">
          <div className="text-sm font-semibold mb-2">Inbox</div>
          <div className="space-y-1">
            {['All Mail', 'Sent', 'Drafts', 'Spam', 'Trash'].map((item) => (
              <div
                key={item}
                className="text-sm py-1.5 px-2 hover:bg-bg-subtle rounded cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={35} minSize={25}>
        <div className="h-full border-x">
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Search emails..."
              className="w-full px-2 py-1 text-sm border rounded"
            />
          </div>
          <div className="divide-y">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-2 hover:bg-bg-subtle cursor-pointer">
                <div className="text-sm font-medium">Sender {i}</div>
                <div className="text-xs text-fg-muted truncate">
                  Subject line for email {i}...
                </div>
              </div>
            ))}
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={40}>
        <div className="h-full p-4">
          <div className="text-lg font-semibold mb-2">Email Subject</div>
          <div className="text-sm text-fg-muted mb-4">From: sender@example.com</div>
          <div className="text-sm">
            Email content goes here. This is the reading pane where you can see
            the full email content.
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
