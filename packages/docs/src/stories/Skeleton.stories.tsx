import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonText, SkeletonCircle } from '@ahead-ui/components';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Display/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    className: 'w-48 h-4',
  },
};

export const BasicShapes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-48 h-4 rounded" />
      <Skeleton className="w-32 h-4 rounded" />
      <Skeleton className="w-64 h-8 rounded" />
      <Skeleton className="w-24 h-24 rounded-lg" />
    </div>
  ),
};

export const SkeletonTextStory: Story = {
  name: 'Skeleton Text',
  render: () => (
    <div className="w-64 space-y-4">
      <SkeletonText lines={1} />
      <SkeletonText lines={3} />
      <SkeletonText lines={5} />
    </div>
  ),
};

export const SkeletonCircleStory: Story = {
  name: 'Skeleton Circle',
  render: () => (
    <div className="flex items-center gap-4">
      <SkeletonCircle size="sm" />
      <SkeletonCircle size="md" />
      <SkeletonCircle size="lg" />
      <SkeletonCircle size="xl" />
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-72 p-4 border rounded-lg">
      <Skeleton className="w-full h-32 rounded-md mb-4" />
      <Skeleton className="w-3/4 h-5 rounded mb-2" />
      <Skeleton className="w-1/2 h-4 rounded mb-4" />
      <SkeletonText lines={2} />
    </div>
  ),
};

export const ListItemSkeleton: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
          <SkeletonCircle size="md" />
          <div className="flex-1">
            <Skeleton className="w-24 h-4 rounded mb-2" />
            <Skeleton className="w-32 h-3 rounded" />
          </div>
          <Skeleton className="w-16 h-8 rounded" />
        </div>
      ))}
    </div>
  ),
};

export const TableSkeleton: Story = {
  render: () => (
    <div className="w-full overflow-hidden border rounded-lg">
      <div className="bg-bg-subtle p-3 border-b">
        <div className="flex gap-4">
          <Skeleton className="w-8 h-4 rounded" />
          <Skeleton className="flex-1 h-4 rounded" />
          <Skeleton className="w-24 h-4 rounded" />
          <Skeleton className="w-20 h-4 rounded" />
        </div>
      </div>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-3 border-b last:border-b-0">
          <div className="flex gap-4">
            <Skeleton className="w-8 h-4 rounded" />
            <Skeleton className="flex-1 h-4 rounded" />
            <Skeleton className="w-24 h-4 rounded" />
            <Skeleton className="w-20 h-4 rounded" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const ProfileSkeleton: Story = {
  render: () => (
    <div className="w-80 p-6 border rounded-lg">
      <div className="flex items-center gap-4 mb-6">
        <SkeletonCircle size="xl" />
        <div className="flex-1">
          <Skeleton className="w-32 h-5 rounded mb-2" />
          <Skeleton className="w-24 h-4 rounded" />
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <Skeleton className="w-16 h-3 rounded mb-2" />
          <Skeleton className="w-full h-4 rounded" />
        </div>
        <div>
          <Skeleton className="w-12 h-3 rounded mb-2" />
          <Skeleton className="w-40 h-4 rounded" />
        </div>
        <div>
          <Skeleton className="w-20 h-3 rounded mb-2" />
          <SkeletonText lines={2} />
        </div>
      </div>
    </div>
  ),
};

export const ArticleSkeleton: Story = {
  render: () => (
    <div className="w-96">
      <Skeleton className="w-full h-48 rounded-lg mb-4" />
      <Skeleton className="w-24 h-4 rounded mb-3" />
      <Skeleton className="w-full h-6 rounded mb-2" />
      <Skeleton className="w-3/4 h-6 rounded mb-4" />
      <SkeletonText lines={4} />
      <div className="flex items-center gap-3 mt-6">
        <SkeletonCircle size="sm" />
        <Skeleton className="w-24 h-4 rounded" />
        <Skeleton className="w-20 h-4 rounded ml-auto" />
      </div>
    </div>
  ),
};

export const DashboardSkeleton: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[32rem]">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-4 border rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <Skeleton className="w-20 h-4 rounded" />
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
          <Skeleton className="w-24 h-8 rounded mb-1" />
          <Skeleton className="w-16 h-3 rounded" />
        </div>
      ))}
    </div>
  ),
};
