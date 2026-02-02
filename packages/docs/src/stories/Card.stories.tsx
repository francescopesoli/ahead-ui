import type { Meta, StoryObj } from '@storybook/react';
import { Card, Button } from '@ahead-ui/components';

const meta: Meta<typeof Card> = {
  title: 'Components/Display/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outline', 'filled', 'ghost'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>Card description goes here</Card.Description>
      </Card.Header>
      <Card.Body>
        <p className="text-sm text-fg-muted">
          This is the card body content. It can contain any content you want.
        </p>
      </Card.Body>
      <Card.Footer>
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm">Save</Button>
      </Card.Footer>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Card variant="elevated" className="w-64">
        <Card.Header>
          <Card.Title>Elevated</Card.Title>
        </Card.Header>
        <Card.Body>
          <p className="text-sm text-fg-muted">Card with shadow elevation</p>
        </Card.Body>
      </Card>
      <Card variant="outline" className="w-64">
        <Card.Header>
          <Card.Title>Outline</Card.Title>
        </Card.Header>
        <Card.Body>
          <p className="text-sm text-fg-muted">Card with border outline</p>
        </Card.Body>
      </Card>
      <Card variant="filled" className="w-64">
        <Card.Header>
          <Card.Title>Filled</Card.Title>
        </Card.Header>
        <Card.Body>
          <p className="text-sm text-fg-muted">Card with filled background</p>
        </Card.Body>
      </Card>
      <Card variant="ghost" className="w-64">
        <Card.Header>
          <Card.Title>Ghost</Card.Title>
        </Card.Header>
        <Card.Body>
          <p className="text-sm text-fg-muted">Card with minimal styling</p>
        </Card.Body>
      </Card>
    </div>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="w-80 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=320&h=180&fit=crop"
        alt="Laptop on desk"
        className="w-full h-40 object-cover"
      />
      <Card.Header>
        <Card.Title>Featured Article</Card.Title>
        <Card.Description>Published on Jan 15, 2024</Card.Description>
      </Card.Header>
      <Card.Body>
        <p className="text-sm text-fg-muted">
          Learn how to build modern web applications with React and TypeScript.
        </p>
      </Card.Body>
      <Card.Footer>
        <Button variant="link" size="sm">Read more</Button>
      </Card.Footer>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card
      className="w-80 cursor-pointer transition-shadow hover:shadow-lg"
      role="button"
      tabIndex={0}
    >
      <Card.Header>
        <Card.Title>Clickable Card</Card.Title>
        <Card.Description>This card is interactive</Card.Description>
      </Card.Header>
      <Card.Body>
        <p className="text-sm text-fg-muted">
          Hover or click to see the interaction effects.
        </p>
      </Card.Body>
    </Card>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <Card className="w-72">
      <Card.Body className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-fg font-semibold">
          JD
        </div>
        <div>
          <h3 className="font-medium">John Doe</h3>
          <p className="text-sm text-fg-muted">Software Engineer</p>
        </div>
      </Card.Body>
      <Card.Footer className="justify-between">
        <span className="text-sm text-fg-muted">12 projects</span>
        <Button variant="outline" size="sm">View Profile</Button>
      </Card.Footer>
    </Card>
  ),
};

export const PricingCard: Story = {
  render: () => (
    <Card className="w-72">
      <Card.Header className="text-center">
        <Card.Title className="text-xl">Pro Plan</Card.Title>
        <div className="mt-2">
          <span className="text-3xl font-bold">$29</span>
          <span className="text-fg-muted">/month</span>
        </div>
      </Card.Header>
      <Card.Body>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Unlimited projects
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Priority support
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Advanced analytics
          </li>
        </ul>
      </Card.Body>
      <Card.Footer>
        <Button fullWidth>Get Started</Button>
      </Card.Footer>
    </Card>
  ),
};
