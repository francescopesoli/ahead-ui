import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Alert, Button } from '@ahead-ui/components';

const meta: Meta<typeof Alert> = {
  title: 'Components/Display/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    variant: {
      control: 'select',
      options: ['subtle', 'solid', 'outline', 'left-accent'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    title: 'Alert Title',
    children: 'This is an informational alert message.',
  },
};

export const Statuses: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Alert status="info" title="Info">
        This is an informational message.
      </Alert>
      <Alert status="success" title="Success">
        Your changes have been saved successfully.
      </Alert>
      <Alert status="warning" title="Warning">
        Please review your input before proceeding.
      </Alert>
      <Alert status="error" title="Error">
        There was an error processing your request.
      </Alert>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Alert variant="subtle" status="info" title="Subtle">
        Subtle variant with soft background.
      </Alert>
      <Alert variant="solid" status="info" title="Solid">
        Solid variant with filled background.
      </Alert>
      <Alert variant="outline" status="info" title="Outline">
        Outline variant with border.
      </Alert>
      <Alert variant="left-accent" status="info" title="Left Accent">
        Left accent variant with side border.
      </Alert>
    </div>
  ),
};

export const WithoutTitle: Story = {
  args: {
    status: 'success',
    children: 'Operation completed successfully!',
  },
};

export const Closable: Story = {
  render: function ClosableAlert() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
      return (
        <button
          className="text-sm text-primary"
          onClick={() => setIsVisible(true)}
        >
          Show alert again
        </button>
      );
    }

    return (
      <Alert
        status="warning"
        title="Warning"
        closable
        onClose={() => setIsVisible(false)}
        className="w-96"
      >
        This alert can be dismissed by clicking the close button.
      </Alert>
    );
  },
};

export const WithActions: Story = {
  render: () => (
    <Alert
      status="error"
      title="Connection Failed"
      className="w-96"
    >
      <p className="mb-3">
        Unable to connect to the server. Please check your internet connection.
      </p>
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          Retry
        </Button>
        <Button size="sm" variant="ghost">
          Dismiss
        </Button>
      </div>
    </Alert>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Alert status="info" showIcon title="Information">
        Click here to learn more about this feature.
      </Alert>
      <Alert status="success" showIcon title="Payment Successful">
        Your payment has been processed.
      </Alert>
      <Alert status="warning" showIcon title="Storage Almost Full">
        You have used 90% of your storage quota.
      </Alert>
      <Alert status="error" showIcon title="Upload Failed">
        The file could not be uploaded. Please try again.
      </Alert>
    </div>
  ),
};

export const InlineAlert: Story = {
  render: () => (
    <div className="w-80 p-4 border rounded-lg">
      <h3 className="font-medium mb-3">Form Settings</h3>
      <Alert status="info" variant="subtle" className="mb-3 text-sm">
        Changes will take effect after saving.
      </Alert>
      <div className="space-y-3">
        <div>
          <label className="text-sm">Setting 1</label>
          <input className="w-full mt-1 px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="text-sm">Setting 2</label>
          <input className="w-full mt-1 px-3 py-2 border rounded" />
        </div>
      </div>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Alert status="info" title="Terms and Conditions Updated" className="w-96">
      <p className="mb-2">
        We have updated our terms of service and privacy policy. The key changes
        include:
      </p>
      <ul className="list-disc list-inside mb-2 space-y-1">
        <li>Updated data retention policies</li>
        <li>New cookie consent requirements</li>
        <li>Clarified user rights and responsibilities</li>
      </ul>
      <p className="text-sm">
        Please review the full{' '}
        <a href="#" className="underline">
          terms of service
        </a>{' '}
        for details.
      </p>
    </Alert>
  ),
};

export const AllCombinations: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {(['info', 'success', 'warning', 'error'] as const).map((status) => (
        <Alert key={status} status={status} showIcon className="text-sm">
          {status.charAt(0).toUpperCase() + status.slice(1)} alert message
        </Alert>
      ))}
    </div>
  ),
};
