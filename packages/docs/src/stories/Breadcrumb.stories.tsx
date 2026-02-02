import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@ahead-ui/components';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Products</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink isCurrent>Electronics</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const WithSlashSeparator: Story = {
  render: () => (
    <Breadcrumb separator="/">
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>/</BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Library</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>/</BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink isCurrent>Data</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const WithCustomSeparator: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Category</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink isCurrent>Current Page</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#">
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          Projects
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink isCurrent>
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Document
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const LongPath: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Category</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Subcategory</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Section</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink isCurrent>Current Page</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#">...</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Parent</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink isCurrent>Current</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const InPageHeader: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink isCurrent>Project Alpha</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <h1 className="text-2xl font-bold mt-2">Project Alpha</h1>
      <p className="text-fg-muted mt-1">Manage your project settings and team members.</p>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Breadcrumb size="sm">
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink isCurrent>Small</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb size="md">
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink isCurrent>Medium</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb size="lg">
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink isCurrent>Large</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  ),
};
