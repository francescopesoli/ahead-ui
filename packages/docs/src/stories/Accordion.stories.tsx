import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@ahead-ui/components';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Navigation/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
    },
    collapsible: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match your design system.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It uses CSS transitions for smooth animations.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>First Section</AccordionTrigger>
        <AccordionContent>
          Content for the first section. Multiple items can be open at once.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Section</AccordionTrigger>
        <AccordionContent>
          Content for the second section.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third Section</AccordionTrigger>
        <AccordionContent>
          Content for the third section.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Accordion type="single" defaultValue="item-2" collapsible className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>Closed by default</AccordionTrigger>
        <AccordionContent>
          This section is closed by default.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Open by default</AccordionTrigger>
        <AccordionContent>
          This section is open by default because we set defaultValue.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Also closed</AccordionTrigger>
        <AccordionContent>
          This section is also closed by default.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const FAQ: Story = {
  render: () => (
    <div className="w-[32rem]">
      <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="q1">
          <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
          <AccordionContent>
            <p className="text-fg-muted">
              We accept all major credit cards (Visa, MasterCard, American Express),
              PayPal, and bank transfers for annual subscriptions.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionTrigger>Can I cancel my subscription?</AccordionTrigger>
          <AccordionContent>
            <p className="text-fg-muted">
              Yes, you can cancel your subscription at any time. Your access will
              continue until the end of your current billing period.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q3">
          <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
          <AccordionContent>
            <p className="text-fg-muted">
              We offer a 30-day money-back guarantee for all new subscriptions.
              If you&apos;re not satisfied, contact our support team.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q4">
          <AccordionTrigger>How do I contact support?</AccordionTrigger>
          <AccordionContent>
            <p className="text-fg-muted">
              You can reach our support team via email at support@example.com
              or through the live chat on our website. We typically respond
              within 24 hours.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96" variant="bordered">
      <AccordionItem value="item-1">
        <AccordionTrigger>Section One</AccordionTrigger>
        <AccordionContent>
          Content for section one with a bordered variant style.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section Two</AccordionTrigger>
        <AccordionContent>
          Content for section two.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section Three</AccordionTrigger>
        <AccordionContent>
          Content for section three.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Personal Information
          </span>
        </AccordionTrigger>
        <AccordionContent>
          Manage your personal details and preferences.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Security Settings
          </span>
        </AccordionTrigger>
        <AccordionContent>
          Configure your security preferences and two-factor authentication.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Notifications
          </span>
        </AccordionTrigger>
        <AccordionContent>
          Choose how and when you want to receive notifications.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const NestedContent: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[28rem]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Product Details</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-fg-muted">Material:</span>
              <span>100% Cotton</span>
            </div>
            <div className="flex justify-between">
              <span className="text-fg-muted">Color:</span>
              <span>Navy Blue</span>
            </div>
            <div className="flex justify-between">
              <span className="text-fg-muted">Size:</span>
              <span>M, L, XL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-fg-muted">Care:</span>
              <span>Machine washable</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Shipping Information</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside space-y-1 text-fg-muted">
            <li>Free shipping on orders over $50</li>
            <li>Standard shipping: 5-7 business days</li>
            <li>Express shipping: 2-3 business days</li>
            <li>International shipping available</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Returns & Exchanges</AccordionTrigger>
        <AccordionContent>
          <p className="text-fg-muted">
            We offer free returns within 30 days of purchase. Items must be
            unworn with original tags attached. Exchanges are subject to
            availability.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>Available Section</AccordionTrigger>
        <AccordionContent>
          This section is available to expand.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled Section</AccordionTrigger>
        <AccordionContent>
          This content is not accessible because the item is disabled.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Another Available Section</AccordionTrigger>
        <AccordionContent>
          This section is also available.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
