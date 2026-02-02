import type { Meta, StoryObj } from '@storybook/react';
import { useState, useRef } from 'react';
import { Portal, Button } from '@ahead-ui/components';

const meta: Meta<typeof Portal> = {
  title: 'Components/Utility/Portal',
  component: Portal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Portal>;

export const Default: Story = {
  render: function PortalDemo() {
    const [show, setShow] = useState(false);
    return (
      <div>
        <Button onClick={() => setShow(!show)}>
          {show ? 'Hide' : 'Show'} Portal Content
        </Button>
        {show && (
          <Portal>
            <div className="fixed top-4 right-4 p-4 bg-bg border rounded-lg shadow-lg">
              <p className="text-sm">This content is rendered via Portal!</p>
              <p className="text-xs text-fg-muted mt-1">
                It&apos;s at the end of document.body
              </p>
            </div>
          </Portal>
        )}
      </div>
    );
  },
};

export const ToCustomContainer: Story = {
  render: function CustomContainerPortal() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);

    return (
      <div className="space-y-4">
        <Button onClick={() => setShow(!show)}>Toggle Portal Content</Button>

        <div
          ref={containerRef}
          className="relative h-48 border-2 border-dashed rounded-lg overflow-hidden"
        >
          <p className="absolute top-2 left-2 text-xs text-fg-muted">
            Custom container (position: relative)
          </p>
          {show && containerRef.current && (
            <Portal container={containerRef.current}>
              <div className="absolute bottom-4 right-4 p-3 bg-primary text-primary-fg rounded-lg">
                <p className="text-sm">Portaled to custom container</p>
              </div>
            </Portal>
          )}
        </div>
      </div>
    );
  },
};

export const OverlayExample: Story = {
  render: function OverlayExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Overlay</Button>

        {isOpen && (
          <Portal>
            <div
              className="fixed inset-0 bg-bg-inverse/50 flex items-center justify-center z-50"
              onClick={() => setIsOpen(false)}
            >
              <div
                className="bg-bg p-6 rounded-lg shadow-xl max-w-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-semibold mb-2">Overlay Content</h3>
                <p className="text-sm text-fg-muted mb-4">
                  This overlay is rendered using Portal to escape any parent
                  overflow or z-index constraints.
                </p>
                <Button onClick={() => setIsOpen(false)}>Close</Button>
              </div>
            </div>
          </Portal>
        )}
      </div>
    );
  },
};

export const NotificationToast: Story = {
  render: function ToastExample() {
    const [toasts, setToasts] = useState<string[]>([]);

    const addToast = () => {
      const id = `toast-${Date.now()}`;
      setToasts((prev) => [...prev, id]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t !== id));
      }, 3000);
    };

    return (
      <div>
        <Button onClick={addToast}>Show Toast</Button>

        <Portal>
          <div className="fixed bottom-4 right-4 space-y-2 z-50">
            {toasts.map((id) => (
              <div
                key={id}
                className="p-4 bg-bg border rounded-lg shadow-lg animate-fade-in"
              >
                <p className="text-sm font-medium">Notification</p>
                <p className="text-xs text-fg-muted">
                  This toast is rendered via Portal
                </p>
              </div>
            ))}
          </div>
        </Portal>
      </div>
    );
  },
};

export const NestedPortals: Story = {
  render: function NestedPortals() {
    const [showFirst, setShowFirst] = useState(false);
    const [showSecond, setShowSecond] = useState(false);

    return (
      <div>
        <Button onClick={() => setShowFirst(true)}>Open First Portal</Button>

        {showFirst && (
          <Portal>
            <div className="fixed inset-0 bg-bg-inverse/30 flex items-center justify-center z-40">
              <div className="bg-bg p-6 rounded-lg shadow-xl">
                <h3 className="font-semibold mb-2">First Portal</h3>
                <p className="text-sm text-fg-muted mb-4">
                  This is the first level portal.
                </p>
                <div className="flex gap-2">
                  <Button onClick={() => setShowSecond(true)}>
                    Open Nested Portal
                  </Button>
                  <Button variant="outline" onClick={() => setShowFirst(false)}>
                    Close
                  </Button>
                </div>

                {showSecond && (
                  <Portal>
                    <div className="fixed inset-0 bg-bg-inverse/30 flex items-center justify-center z-50">
                      <div className="bg-bg p-6 rounded-lg shadow-xl border-2 border-primary">
                        <h3 className="font-semibold mb-2">Nested Portal</h3>
                        <p className="text-sm text-fg-muted mb-4">
                          This portal is nested inside the first one.
                        </p>
                        <Button onClick={() => setShowSecond(false)}>
                          Close Nested
                        </Button>
                      </div>
                    </div>
                  </Portal>
                )}
              </div>
            </div>
          </Portal>
        )}
      </div>
    );
  },
};

export const Tooltip: Story = {
  render: function TooltipExample() {
    const [tooltip, setTooltip] = useState<{
      show: boolean;
      x: number;
      y: number;
    }>({ show: false, x: 0, y: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    const showTooltip = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setTooltip({
          show: true,
          x: rect.left + rect.width / 2,
          y: rect.top,
        });
      }
    };

    return (
      <div className="p-8">
        <button
          ref={buttonRef}
          className="px-4 py-2 border rounded"
          onMouseEnter={showTooltip}
          onMouseLeave={() => setTooltip((t) => ({ ...t, show: false }))}
        >
          Hover me
        </button>

        {tooltip.show && (
          <Portal>
            <div
              className="fixed px-2 py-1 bg-bg-inverse text-fg-inverse text-xs rounded -translate-x-1/2 -translate-y-full -mt-2"
              style={{ left: tooltip.x, top: tooltip.y }}
            >
              Tooltip via Portal!
              <div className="absolute left-1/2 -translate-x-1/2 top-full border-4 border-transparent border-t-bg-inverse" />
            </div>
          </Portal>
        )}
      </div>
    );
  },
};

export const Description: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div className="p-4 bg-bg-subtle rounded-lg">
        <h4 className="font-medium mb-2">What is Portal?</h4>
        <p className="text-sm text-fg-muted">
          Portal renders children into a different part of the DOM tree. This
          is useful for:
        </p>
        <ul className="list-disc list-inside text-sm text-fg-muted mt-2 space-y-1">
          <li>Modals that need to escape parent overflow</li>
          <li>Tooltips that need to avoid z-index issues</li>
          <li>Toasts that render at the page root</li>
          <li>Dropdown menus that need to escape containers</li>
        </ul>
      </div>
      <p className="text-xs text-fg-muted">
        By default, Portal renders to document.body, but you can specify a
        custom container element.
      </p>
    </div>
  ),
};
