import type { Meta, StoryObj } from '@storybook/react';
import { Stat, StatLabel, StatValue, StatHelpText, StatArrow } from '@ahead-ui/components';

const meta: Meta<typeof Stat> = {
  title: 'Components/Display/Stat',
  component: Stat,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Stat>;

export const Default: Story = {
  render: () => (
    <Stat>
      <StatLabel>Total Revenue</StatLabel>
      <StatValue>$45,231.89</StatValue>
      <StatHelpText>
        <StatArrow type="increase" />
        12% from last month
      </StatHelpText>
    </Stat>
  ),
};

export const WithIncrease: Story = {
  render: () => (
    <Stat>
      <StatLabel>Active Users</StatLabel>
      <StatValue>2,345</StatValue>
      <StatHelpText>
        <StatArrow type="increase" />
        23.5% increase
      </StatHelpText>
    </Stat>
  ),
};

export const WithDecrease: Story = {
  render: () => (
    <Stat>
      <StatLabel>Bounce Rate</StatLabel>
      <StatValue>32.4%</StatValue>
      <StatHelpText>
        <StatArrow type="decrease" />
        5.2% decrease
      </StatHelpText>
    </Stat>
  ),
};

export const WithoutArrow: Story = {
  render: () => (
    <Stat>
      <StatLabel>Total Orders</StatLabel>
      <StatValue>1,234</StatValue>
      <StatHelpText>Jan 1 - Dec 31, 2024</StatHelpText>
    </Stat>
  ),
};

export const StatGroup: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      <Stat>
        <StatLabel>Total Sales</StatLabel>
        <StatValue>$89,342</StatValue>
        <StatHelpText>
          <StatArrow type="increase" />
          18.2%
        </StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>Orders</StatLabel>
        <StatValue>1,523</StatValue>
        <StatHelpText>
          <StatArrow type="increase" />
          8.4%
        </StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>Returns</StatLabel>
        <StatValue>23</StatValue>
        <StatHelpText>
          <StatArrow type="decrease" />
          12%
        </StatHelpText>
      </Stat>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-6 border rounded-lg">
        <Stat>
          <StatLabel>Revenue</StatLabel>
          <StatValue>$45,231</StatValue>
          <StatHelpText>
            <StatArrow type="increase" />
            20.1% from last month
          </StatHelpText>
        </Stat>
      </div>
      <div className="p-6 border rounded-lg">
        <Stat>
          <StatLabel>Subscriptions</StatLabel>
          <StatValue>+2,350</StatValue>
          <StatHelpText>
            <StatArrow type="increase" />
            180.1% from last month
          </StatHelpText>
        </Stat>
      </div>
      <div className="p-6 border rounded-lg">
        <Stat>
          <StatLabel>Expenses</StatLabel>
          <StatValue>$12,234</StatValue>
          <StatHelpText>
            <StatArrow type="decrease" />
            -8% from last month
          </StatHelpText>
        </Stat>
      </div>
      <div className="p-6 border rounded-lg">
        <Stat>
          <StatLabel>Active Now</StatLabel>
          <StatValue>+573</StatValue>
          <StatHelpText>+201 since last hour</StatHelpText>
        </Stat>
      </div>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-6">
      <div className="p-6 border rounded-lg flex items-start gap-4">
        <div className="p-3 bg-primary-subtle rounded-lg">
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <Stat>
          <StatLabel>Revenue</StatLabel>
          <StatValue>$45,231</StatValue>
          <StatHelpText>
            <StatArrow type="increase" />
            12%
          </StatHelpText>
        </Stat>
      </div>
      <div className="p-6 border rounded-lg flex items-start gap-4">
        <div className="p-3 bg-success-subtle rounded-lg">
          <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <Stat>
          <StatLabel>Users</StatLabel>
          <StatValue>2,350</StatValue>
          <StatHelpText>
            <StatArrow type="increase" />
            18%
          </StatHelpText>
        </Stat>
      </div>
    </div>
  ),
};

export const LargeNumbers: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Stat>
        <StatLabel>Total Views</StatLabel>
        <StatValue>1.2M</StatValue>
        <StatHelpText>All time</StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>Downloads</StatLabel>
        <StatValue>432K</StatValue>
        <StatHelpText>This year</StatHelpText>
      </Stat>
    </div>
  ),
};

export const Compact: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="text-center">
        <div className="text-2xl font-bold">1,234</div>
        <div className="text-sm text-fg-muted">Views</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">567</div>
        <div className="text-sm text-fg-muted">Likes</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">89</div>
        <div className="text-sm text-fg-muted">Comments</div>
      </div>
    </div>
  ),
};
