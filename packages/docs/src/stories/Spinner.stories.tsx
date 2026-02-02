import type { Meta, StoryObj } from '@storybook/react';
import { Spinner, DotsSpinner, Button } from '@ahead-ui/components';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Display/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    colorScheme: {
      control: 'select',
      options: ['neutral', 'primary', 'success', 'warning', 'danger'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner colorScheme="neutral" />
      <Spinner colorScheme="primary" />
      <Spinner colorScheme="success" />
      <Spinner colorScheme="warning" />
      <Spinner colorScheme="danger" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Spinner size="sm" />
      <span className="text-sm text-fg-muted">Loading...</span>
    </div>
  ),
};

export const DotsSpinnerStory: Story = {
  name: 'Dots Spinner',
  render: () => (
    <div className="flex items-center gap-6">
      <DotsSpinner size="sm" />
      <DotsSpinner size="md" />
      <DotsSpinner size="lg" />
    </div>
  ),
};

export const DotsSpinnerColors: Story = {
  name: 'Dots Spinner Colors',
  render: () => (
    <div className="flex items-center gap-6">
      <DotsSpinner colorScheme="neutral" />
      <DotsSpinner colorScheme="primary" />
      <DotsSpinner colorScheme="success" />
      <DotsSpinner colorScheme="warning" />
      <DotsSpinner colorScheme="danger" />
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button disabled>
        <Spinner size="xs" className="mr-2" />
        Loading...
      </Button>
      <Button variant="outline" disabled>
        <DotsSpinner size="sm" className="mr-2" />
        Processing
      </Button>
    </div>
  ),
};

export const CenteredFullscreen: Story = {
  render: () => (
    <div className="flex items-center justify-center h-48 bg-bg-subtle rounded-lg">
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" colorScheme="primary" />
        <span className="text-sm text-fg-muted">Loading content...</span>
      </div>
    </div>
  ),
};

export const InlineLoading: Story = {
  render: () => (
    <p className="text-sm">
      Fetching data <Spinner size="xs" className="inline mx-1" /> please wait...
    </p>
  ),
};

export const LoadingOverlay: Story = {
  render: () => (
    <div className="relative w-64 h-32 bg-bg-subtle rounded-lg">
      <p className="p-4 text-sm">Content underneath the overlay</p>
      <div className="absolute inset-0 flex items-center justify-center bg-bg/80 rounded-lg">
        <Spinner size="lg" colorScheme="primary" />
      </div>
    </div>
  ),
};
