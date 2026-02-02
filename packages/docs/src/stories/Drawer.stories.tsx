import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter, Button, Input } from '@ahead-ui/components';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Layout/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: function DefaultDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <DrawerHeader>
            <h2 className="text-lg font-semibold">Drawer Title</h2>
          </DrawerHeader>
          <DrawerBody>
            <p className="text-fg-muted">
              This is the drawer content. You can put any content here.
            </p>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Save</Button>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
};

export const Placements: Story = {
  render: function PlacementsDrawer() {
    const [placement, setPlacement] = useState<'left' | 'right' | 'top' | 'bottom'>('right');
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <div className="flex gap-2">
          {(['left', 'right', 'top', 'bottom'] as const).map((p) => (
            <Button
              key={p}
              variant="outline"
              onClick={() => {
                setPlacement(p);
                setIsOpen(true);
              }}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Button>
          ))}
        </div>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} placement={placement}>
          <DrawerHeader>
            <h2 className="text-lg font-semibold">Drawer from {placement}</h2>
          </DrawerHeader>
          <DrawerBody>
            <p className="text-fg-muted">
              This drawer slides in from the {placement}.
            </p>
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
};

export const Sizes: Story = {
  render: function SizesDrawer() {
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
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} size={size}>
          <DrawerHeader>
            <h2 className="text-lg font-semibold">Size: {size}</h2>
          </DrawerHeader>
          <DrawerBody>
            <p className="text-fg-muted">
              This drawer is using the {size} size variant.
            </p>
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
};

export const WithForm: Story = {
  render: function FormDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Edit Profile</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <DrawerHeader>
            <h2 className="text-lg font-semibold">Edit Profile</h2>
            <p className="text-sm text-fg-muted">
              Make changes to your profile here.
            </p>
          </DrawerHeader>
          <DrawerBody>
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
                <label className="text-sm font-medium">Bio</label>
                <textarea
                  className="mt-1 w-full p-2 border rounded-md resize-none"
                  rows={4}
                  placeholder="Tell us about yourself"
                />
              </div>
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Save Changes</Button>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
};

export const Navigation: Story = {
  render: function NavigationDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    const menuItems = [
      { icon: '🏠', label: 'Home' },
      { icon: '📊', label: 'Dashboard' },
      { icon: '📁', label: 'Projects' },
      { icon: '👥', label: 'Team' },
      { icon: '📅', label: 'Calendar' },
      { icon: '⚙️', label: 'Settings' },
    ];
    return (
      <>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} placement="left">
          <DrawerHeader>
            <h2 className="text-lg font-semibold">Navigation</h2>
          </DrawerHeader>
          <DrawerBody>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-bg-subtle text-left"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </DrawerBody>
        </Drawer>
      </>
    );
  },
};

export const ShoppingCart: Story = {
  render: function CartDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    const cartItems = [
      { name: 'Product A', price: 29.99, quantity: 1 },
      { name: 'Product B', price: 49.99, quantity: 2 },
      { name: 'Product C', price: 19.99, quantity: 1 },
    ];
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
      <>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Cart ({cartItems.length})
        </Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <DrawerHeader>
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <p className="text-sm text-fg-muted">{cartItems.length} items</p>
          </DrawerHeader>
          <DrawerBody>
            <div className="space-y-4">
              {cartItems.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-16 h-16 bg-bg-subtle rounded-lg" />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-fg-muted">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </DrawerBody>
          <DrawerFooter className="flex-col">
            <div className="flex justify-between w-full mb-4">
              <span className="font-medium">Total</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <Button fullWidth>Checkout</Button>
            <Button variant="outline" fullWidth onClick={() => setIsOpen(false)}>
              Continue Shopping
            </Button>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
};

export const NoCloseOnOverlay: Story = {
  render: function NoCloseDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          closeOnOverlayClick={false}
        >
          <DrawerHeader>
            <h2 className="text-lg font-semibold">Important Form</h2>
          </DrawerHeader>
          <DrawerBody>
            <p className="text-fg-muted">
              This drawer cannot be closed by clicking the overlay. You must use
              the close button.
            </p>
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
};
