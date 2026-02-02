import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  Button,
} from '@ahead-ui/components';

const meta: Meta<typeof AlertDialog> = {
  title: 'Components/Overlay/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  render: function DefaultAlertDialog() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Alert Dialog</Button>
        <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  },
};

export const DestructiveAction: Story = {
  render: function DestructiveAlertDialog() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="danger" onClick={() => setIsOpen(true)}>
          Delete Item
        </Button>
        <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Item</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this item? This action is
                permanent and cannot be reversed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="danger">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  },
};

export const WithAsyncAction: Story = {
  render: function AsyncAlertDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      setIsOpen(false);
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Save Changes</Button>
        <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Save Changes</AlertDialogTitle>
              <AlertDialogDescription>
                Do you want to save the changes you made to this document?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isLoading}>
                Don&apos;t Save
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirm} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  },
};

export const LogoutConfirmation: Story = {
  render: function LogoutAlertDialog() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Logout
        </Button>
        <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Log out of your account?</AlertDialogTitle>
              <AlertDialogDescription>
                You will need to enter your credentials again to access your
                account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Stay logged in</AlertDialogCancel>
              <AlertDialogAction>Log out</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  },
};

export const DiscardChanges: Story = {
  render: function DiscardAlertDialog() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="ghost" onClick={() => setIsOpen(true)}>
          Discard Draft
        </Button>
        <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
              <AlertDialogDescription>
                You have unsaved changes in your draft. If you leave now, your
                changes will be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Editing</AlertDialogCancel>
              <AlertDialogAction variant="danger">
                Discard Changes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  },
};

export const UnsavedWork: Story = {
  render: function UnsavedAlertDialog() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Close Editor</Button>
        <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>You have unsaved changes</AlertDialogTitle>
              <AlertDialogDescription>
                Would you like to save your changes before closing?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
              <AlertDialogCancel className="sm:mr-auto">Cancel</AlertDialogCancel>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Don&apos;t Save
              </Button>
              <AlertDialogAction>Save Changes</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  },
};

export const WithWarningIcon: Story = {
  render: function WarningAlertDialog() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Reset Settings</Button>
        <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-warning-subtle rounded-full">
                  <svg
                    className="w-5 h-5 text-warning"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <AlertDialogTitle>Reset to Default Settings</AlertDialogTitle>
              </div>
              <AlertDialogDescription>
                This will reset all your preferences to their default values.
                Your saved configurations will be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Reset Settings</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  },
};
