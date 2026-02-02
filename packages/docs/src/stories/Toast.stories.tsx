import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastProvider, useToast, Button } from '@ahead-ui/components';

const meta: Meta<typeof Toast> = {
  title: 'Components/Utility/Toast',
  component: Toast,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

function ToastTrigger({ status, title, description }: { status: 'info' | 'success' | 'warning' | 'error'; title: string; description?: string }) {
  const toast = useToast();
  return (
    <Button
      variant="outline"
      onClick={() => toast({ status, title, description })}
    >
      Show {status} toast
    </Button>
  );
}

export const Default: Story = {
  render: () => (
    <ToastTrigger
      status="info"
      title="New message"
      description="You have received a new message."
    />
  ),
};

export const Statuses: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <ToastTrigger status="info" title="Info" description="This is an informational message." />
      <ToastTrigger status="success" title="Success" description="Your action was successful." />
      <ToastTrigger status="warning" title="Warning" description="Please review your input." />
      <ToastTrigger status="error" title="Error" description="Something went wrong." />
    </div>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <ToastTrigger status="info" title="Information" />
      <ToastTrigger status="success" title="Saved successfully" />
      <ToastTrigger status="warning" title="Low storage" />
      <ToastTrigger status="error" title="Connection failed" />
    </div>
  ),
};

export const WithDuration: Story = {
  render: function DurationToast() {
    const toast = useToast();
    return (
      <div className="flex gap-2 flex-wrap">
        <Button
          variant="outline"
          onClick={() =>
            toast({
              status: 'info',
              title: 'Quick toast',
              description: 'Disappears in 2 seconds',
              duration: 2000,
            })
          }
        >
          2 seconds
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              status: 'info',
              title: 'Default toast',
              description: 'Disappears in 5 seconds',
              duration: 5000,
            })
          }
        >
          5 seconds
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              status: 'info',
              title: 'Long toast',
              description: 'Disappears in 10 seconds',
              duration: 10000,
            })
          }
        >
          10 seconds
        </Button>
      </div>
    );
  },
};

export const Persistent: Story = {
  render: function PersistentToast() {
    const toast = useToast();
    return (
      <Button
        variant="outline"
        onClick={() =>
          toast({
            status: 'warning',
            title: 'Persistent toast',
            description: 'This toast will not auto-dismiss. Click the X to close.',
            duration: Infinity,
          })
        }
      >
        Show persistent toast
      </Button>
    );
  },
};

export const WithAction: Story = {
  render: function ActionToast() {
    const toast = useToast();
    return (
      <Button
        variant="outline"
        onClick={() =>
          toast({
            status: 'info',
            title: 'File deleted',
            description: 'The file has been moved to trash.',
            action: {
              label: 'Undo',
              onClick: () => {
                toast({
                  status: 'success',
                  title: 'File restored',
                });
              },
            },
          })
        }
      >
        Delete file
      </Button>
    );
  },
};

export const Multiple: Story = {
  render: function MultipleToasts() {
    const toast = useToast();
    return (
      <Button
        onClick={() => {
          toast({ status: 'info', title: 'First toast' });
          setTimeout(() => toast({ status: 'success', title: 'Second toast' }), 500);
          setTimeout(() => toast({ status: 'warning', title: 'Third toast' }), 1000);
        }}
      >
        Show multiple toasts
      </Button>
    );
  },
};

export const Positions: Story = {
  render: function PositionedToasts() {
    const toast = useToast();
    return (
      <div className="flex gap-2 flex-wrap">
        <Button
          variant="outline"
          onClick={() =>
            toast({
              status: 'info',
              title: 'Top Right',
              position: 'top-right',
            })
          }
        >
          Top Right
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              status: 'info',
              title: 'Top Left',
              position: 'top-left',
            })
          }
        >
          Top Left
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              status: 'info',
              title: 'Bottom Right',
              position: 'bottom-right',
            })
          }
        >
          Bottom Right
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              status: 'info',
              title: 'Bottom Left',
              position: 'bottom-left',
            })
          }
        >
          Bottom Left
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              status: 'info',
              title: 'Top Center',
              position: 'top-center',
            })
          }
        >
          Top Center
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              status: 'info',
              title: 'Bottom Center',
              position: 'bottom-center',
            })
          }
        >
          Bottom Center
        </Button>
      </div>
    );
  },
};

export const RealWorldExamples: Story = {
  render: function RealWorldToasts() {
    const toast = useToast();
    return (
      <div className="flex gap-2 flex-wrap">
        <Button
          onClick={() =>
            toast({
              status: 'success',
              title: 'Profile updated',
              description: 'Your changes have been saved successfully.',
            })
          }
        >
          Save Profile
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              status: 'info',
              title: 'Email sent',
              description: 'Your email has been sent to 3 recipients.',
            })
          }
        >
          Send Email
        </Button>
        <Button
          variant="danger"
          onClick={() =>
            toast({
              status: 'error',
              title: 'Payment failed',
              description: 'Your card was declined. Please try again.',
              duration: Infinity,
            })
          }
        >
          Process Payment
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              status: 'warning',
              title: 'Session expiring',
              description: 'Your session will expire in 5 minutes.',
              action: {
                label: 'Extend',
                onClick: () => toast({ status: 'success', title: 'Session extended' }),
              },
            })
          }
        >
          Session Warning
        </Button>
      </div>
    );
  },
};

export const Closable: Story = {
  render: function ClosableToast() {
    const toast = useToast();
    return (
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() =>
            toast({
              status: 'info',
              title: 'Closable',
              description: 'Click the X button to close.',
              closable: true,
              duration: Infinity,
            })
          }
        >
          Closable
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              status: 'info',
              title: 'Not closable',
              description: 'This will auto-dismiss.',
              closable: false,
            })
          }
        >
          Not closable
        </Button>
      </div>
    );
  },
};

export const CustomContent: Story = {
  render: function CustomToast() {
    const toast = useToast();
    return (
      <Button
        onClick={() =>
          toast({
            status: 'info',
            title: 'New follower',
            description: (
              <div className="flex items-center gap-2 mt-1">
                <div className="w-8 h-8 rounded-full bg-primary-subtle" />
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-fg-muted">started following you</p>
                </div>
              </div>
            ),
          })
        }
      >
        Show custom toast
      </Button>
    );
  },
};
