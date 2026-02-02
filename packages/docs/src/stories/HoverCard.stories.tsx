import type { Meta, StoryObj } from '@storybook/react';
import { HoverCard, HoverCardTrigger, HoverCardContent, Avatar, Button } from '@ahead-ui/components';

const meta: Meta<typeof HoverCard> = {
  title: 'Components/Overlay/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="text-primary underline cursor-pointer">@johndoe</span>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex gap-4">
          <Avatar name="John Doe" size="lg" />
          <div>
            <h4 className="font-medium">John Doe</h4>
            <p className="text-sm text-fg-muted">@johndoe</p>
            <p className="text-sm mt-2">
              Software developer passionate about building great user experiences.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="flex items-center gap-2 p-2 rounded hover:bg-bg-subtle">
          <Avatar
            size="sm"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces"
            name="John Doe"
          />
          <span className="text-sm">John Doe</span>
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex gap-4">
          <Avatar
            size="lg"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces"
            name="John Doe"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">John Doe</h4>
                <p className="text-sm text-fg-muted">@johndoe</p>
              </div>
              <Button size="sm" variant="outline">Follow</Button>
            </div>
            <p className="text-sm mt-2">
              Software developer. Building amazing things with React & TypeScript.
            </p>
            <div className="flex gap-4 mt-3 text-sm">
              <span><strong>1.2K</strong> followers</span>
              <span><strong>500</strong> following</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const LinkPreview: Story = {
  render: () => (
    <p className="text-sm max-w-md">
      Check out the latest updates on{' '}
      <HoverCard>
        <HoverCardTrigger asChild>
          <a href="#" className="text-primary underline">
            this article
          </a>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <img
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=320&h=160&fit=crop"
            alt="Article preview"
            className="w-full h-32 object-cover rounded-md mb-3"
          />
          <h4 className="font-medium">Getting Started with React</h4>
          <p className="text-sm text-fg-muted mt-1">
            Learn the fundamentals of React and how to build modern web applications.
          </p>
          <p className="text-xs text-fg-subtle mt-2">example.com</p>
        </HoverCardContent>
      </HoverCard>{' '}
      for more information.
    </p>
  ),
};

export const ProductPreview: Story = {
  render: () => (
    <div className="flex gap-2">
      {['Product A', 'Product B', 'Product C'].map((product, i) => (
        <HoverCard key={product}>
          <HoverCardTrigger asChild>
            <button className="px-3 py-1 text-sm border rounded hover:bg-bg-subtle">
              {product}
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-72">
            <div className="flex gap-3">
              <div className="w-20 h-20 bg-bg-subtle rounded flex items-center justify-center text-fg-muted">
                IMG
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{product}</h4>
                <p className="text-sm text-fg-muted">
                  A great product with amazing features.
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-medium">${(i + 1) * 29}.99</span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  ),
};

export const ColorPreview: Story = {
  render: () => (
    <div className="flex gap-2">
      {[
        { name: 'Primary', color: 'var(--primary)', code: '#3b82f6' },
        { name: 'Success', color: 'var(--success)', code: '#22c55e' },
        { name: 'Warning', color: 'var(--warning)', code: '#eab308' },
        { name: 'Danger', color: 'var(--danger)', code: '#ef4444' },
      ].map((item) => (
        <HoverCard key={item.name}>
          <HoverCardTrigger asChild>
            <button
              className="w-10 h-10 rounded-lg border-2 border-bg"
              style={{ backgroundColor: item.color }}
            />
          </HoverCardTrigger>
          <HoverCardContent className="w-48">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-lg"
                style={{ backgroundColor: item.color }}
              />
              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-fg-muted font-mono">{item.code}</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  ),
};

export const FilePreview: Story = {
  render: () => (
    <div className="flex gap-2">
      {[
        { name: 'report.pdf', size: '2.4 MB', type: 'PDF' },
        { name: 'image.png', size: '1.2 MB', type: 'Image' },
        { name: 'data.xlsx', size: '500 KB', type: 'Spreadsheet' },
      ].map((file) => (
        <HoverCard key={file.name}>
          <HoverCardTrigger asChild>
            <button className="flex items-center gap-2 p-2 border rounded hover:bg-bg-subtle">
              <svg className="w-4 h-4 text-fg-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm">{file.name}</span>
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-64">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-bg-subtle rounded-lg">
                <svg className="w-8 h-8 text-fg-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{file.name}</h4>
                <p className="text-xs text-fg-muted mt-1">{file.type}</p>
                <p className="text-xs text-fg-muted">{file.size}</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    Download
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs">
                    Preview
                  </Button>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  ),
};

export const Delayed: Story = {
  render: () => (
    <HoverCard openDelay={500} closeDelay={200}>
      <HoverCardTrigger asChild>
        <span className="text-primary underline cursor-pointer">
          Hover (500ms delay)
        </span>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-sm">This card has a 500ms open delay.</p>
      </HoverCardContent>
    </HoverCard>
  ),
};
