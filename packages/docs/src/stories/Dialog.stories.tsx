import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dialog, Button, Input } from '@ahead-ui/components';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Overlay/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: function DefaultDialog() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Dialog.Header>
            <Dialog.Title>Dialog Title</Dialog.Title>
            <Dialog.Description>
              This is a description of the dialog content.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <p className="text-sm text-fg-muted">
              This is the main content of the dialog. You can put any content here.
            </p>
          </Dialog.Body>
          <Dialog.Footer>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </Dialog.Footer>
        </Dialog>
      </>
    );
  },
};

export const Sizes: Story = {
  render: function SizesDialog() {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <div className="flex gap-2 flex-wrap">
          {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((s) => (
            <Button
              key={s}
              variant="outline"
              onClick={() => {
                setSize(s);
                setIsOpen(true);
              }}
            >
              {s.toUpperCase()}
            </Button>
          ))}
        </div>
        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} size={size}>
          <Dialog.Header>
            <Dialog.Title>Dialog Size: {size}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <p className="text-sm text-fg-muted">
              This dialog is using the {size} size variant.
            </p>
          </Dialog.Body>
          <Dialog.Footer>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </Dialog.Footer>
        </Dialog>
      </>
    );
  },
};

export const WithForm: Story = {
  render: function FormDialog() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Create Account</Button>
        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Dialog.Header>
            <Dialog.Title>Create Account</Dialog.Title>
            <Dialog.Description>
              Fill in the details below to create a new account.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input placeholder="Enter your name" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="Enter your email" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Password</label>
                <Input type="password" placeholder="Enter a password" className="mt-1" />
              </div>
            </div>
          </Dialog.Body>
          <Dialog.Footer>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Create</Button>
          </Dialog.Footer>
        </Dialog>
      </>
    );
  },
};

export const ScrollableContent: Story = {
  render: function ScrollableDialog() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Long Dialog</Button>
        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Dialog.Header>
            <Dialog.Title>Terms of Service</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body className="max-h-[50vh] overflow-y-auto">
            <div className="space-y-4 text-sm text-fg-muted">
              {Array.from({ length: 10 }, (_, i) => (
                <p key={i}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                </p>
              ))}
            </div>
          </Dialog.Body>
          <Dialog.Footer>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Decline
            </Button>
            <Button onClick={() => setIsOpen(false)}>Accept</Button>
          </Dialog.Footer>
        </Dialog>
      </>
    );
  },
};

export const NestedDialogs: Story = {
  render: function NestedDialogs() {
    const [isFirstOpen, setIsFirstOpen] = useState(false);
    const [isSecondOpen, setIsSecondOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsFirstOpen(true)}>Open First Dialog</Button>
        <Dialog isOpen={isFirstOpen} onClose={() => setIsFirstOpen(false)}>
          <Dialog.Header>
            <Dialog.Title>First Dialog</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <p className="text-sm text-fg-muted mb-4">
              This is the first dialog. You can open another dialog from here.
            </p>
            <Button onClick={() => setIsSecondOpen(true)}>
              Open Second Dialog
            </Button>
          </Dialog.Body>
          <Dialog.Footer>
            <Button variant="outline" onClick={() => setIsFirstOpen(false)}>
              Close
            </Button>
          </Dialog.Footer>
        </Dialog>
        <Dialog isOpen={isSecondOpen} onClose={() => setIsSecondOpen(false)} size="sm">
          <Dialog.Header>
            <Dialog.Title>Second Dialog</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <p className="text-sm text-fg-muted">
              This is a nested dialog. It appears on top of the first one.
            </p>
          </Dialog.Body>
          <Dialog.Footer>
            <Button onClick={() => setIsSecondOpen(false)}>Close</Button>
          </Dialog.Footer>
        </Dialog>
      </>
    );
  },
};

export const CustomClose: Story = {
  render: function CustomCloseDialog() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          closeOnOverlayClick={false}
        >
          <Dialog.Header>
            <Dialog.Title>Custom Close Behavior</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <p className="text-sm text-fg-muted">
              This dialog cannot be closed by clicking the overlay. You must use
              the close button.
            </p>
          </Dialog.Body>
          <Dialog.Footer>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </Dialog.Footer>
        </Dialog>
      </>
    );
  },
};

export const DangerAction: Story = {
  render: function DangerDialog() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="danger" onClick={() => setIsOpen(true)}>
          Delete Account
        </Button>
        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Dialog.Header>
            <Dialog.Title>Delete Account</Dialog.Title>
            <Dialog.Description>
              Are you sure you want to delete your account? This action cannot be
              undone.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <p className="text-sm text-fg-muted">
              All your data will be permanently removed. This includes your
              profile, settings, and all associated content.
            </p>
          </Dialog.Body>
          <Dialog.Footer>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setIsOpen(false)}>
              Delete Account
            </Button>
          </Dialog.Footer>
        </Dialog>
      </>
    );
  },
};
