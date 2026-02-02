import type { Meta, StoryObj } from '@storybook/react';
import { Timeline, TimelineItem, TimelineConnector, TimelineDot, TimelineContent } from '@ahead-ui/components';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Display/Timeline',
  component: Timeline,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  render: () => (
    <Timeline>
      <TimelineItem>
        <TimelineConnector />
        <TimelineDot />
        <TimelineContent>
          <h4 className="font-medium">First Event</h4>
          <p className="text-sm text-fg-muted">Description of the first event</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineDot />
        <TimelineContent>
          <h4 className="font-medium">Second Event</h4>
          <p className="text-sm text-fg-muted">Description of the second event</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineContent>
          <h4 className="font-medium">Third Event</h4>
          <p className="text-sm text-fg-muted">Description of the third event</p>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
};

export const WithDates: Story = {
  render: () => (
    <Timeline>
      <TimelineItem>
        <TimelineConnector />
        <TimelineDot colorScheme="primary" />
        <TimelineContent>
          <span className="text-xs text-fg-muted">January 2024</span>
          <h4 className="font-medium">Project Started</h4>
          <p className="text-sm text-fg-muted">
            Initial planning and requirements gathering phase began.
          </p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineDot colorScheme="primary" />
        <TimelineContent>
          <span className="text-xs text-fg-muted">March 2024</span>
          <h4 className="font-medium">Development Phase</h4>
          <p className="text-sm text-fg-muted">
            Core features implementation and testing.
          </p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineDot colorScheme="success" />
        <TimelineContent>
          <span className="text-xs text-fg-muted">June 2024</span>
          <h4 className="font-medium">Beta Release</h4>
          <p className="text-sm text-fg-muted">
            Public beta testing with early adopters.
          </p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineContent>
          <span className="text-xs text-fg-muted">August 2024</span>
          <h4 className="font-medium">Official Launch</h4>
          <p className="text-sm text-fg-muted">
            Product available to all users.
          </p>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Timeline>
      <TimelineItem>
        <TimelineConnector />
        <TimelineDot colorScheme="success">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </TimelineDot>
        <TimelineContent>
          <h4 className="font-medium">Order Confirmed</h4>
          <p className="text-sm text-fg-muted">Your order has been placed</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineDot colorScheme="success">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </TimelineDot>
        <TimelineContent>
          <h4 className="font-medium">Shipped</h4>
          <p className="text-sm text-fg-muted">Package is on its way</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineDot colorScheme="primary">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
          </svg>
        </TimelineDot>
        <TimelineContent>
          <h4 className="font-medium">Out for Delivery</h4>
          <p className="text-sm text-fg-muted">Will arrive today</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </TimelineDot>
        <TimelineContent>
          <h4 className="font-medium text-fg-muted">Delivered</h4>
          <p className="text-sm text-fg-muted">Pending</p>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
};

export const ActivityFeed: Story = {
  render: () => (
    <Timeline>
      <TimelineItem>
        <TimelineConnector />
        <TimelineDot size="sm" />
        <TimelineContent>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">John Doe</span>
            <span className="text-sm text-fg-muted">commented on</span>
            <span className="text-sm text-primary">Task #123</span>
          </div>
          <p className="text-xs text-fg-muted">2 hours ago</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineDot size="sm" colorScheme="success" />
        <TimelineContent>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">Jane Smith</span>
            <span className="text-sm text-fg-muted">completed</span>
            <span className="text-sm text-primary">Task #120</span>
          </div>
          <p className="text-xs text-fg-muted">5 hours ago</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineDot size="sm" colorScheme="primary" />
        <TimelineContent>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">Bob Wilson</span>
            <span className="text-sm text-fg-muted">created</span>
            <span className="text-sm text-primary">Task #124</span>
          </div>
          <p className="text-xs text-fg-muted">Yesterday</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot size="sm" />
        <TimelineContent>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">Alice Brown</span>
            <span className="text-sm text-fg-muted">was assigned to</span>
            <span className="text-sm text-primary">Project X</span>
          </div>
          <p className="text-xs text-fg-muted">2 days ago</p>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <Timeline>
      <TimelineItem>
        <TimelineConnector />
        <TimelineDot colorScheme="primary" />
        <TimelineContent>
          <p className="text-sm">Primary dot</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineDot colorScheme="success" />
        <TimelineContent>
          <p className="text-sm">Success dot</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineConnector />
        <TimelineDot colorScheme="warning" />
        <TimelineContent>
          <p className="text-sm">Warning dot</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot colorScheme="danger" />
        <TimelineContent>
          <p className="text-sm">Danger dot</p>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
};
