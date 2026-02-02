import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  Badge,
  Button,
} from '@ahead-ui/components';

const meta: Meta<typeof Table> = {
  title: 'Components/Layout/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

const invoices = [
  { id: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
  { id: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
  { id: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
  { id: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
  { id: 'INV005', status: 'Paid', method: 'PayPal', amount: '$550.00' },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$1,750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>
              <Badge
                colorScheme={
                  invoice.status === 'Paid'
                    ? 'success'
                    : invoice.status === 'Pending'
                    ? 'warning'
                    : 'danger'
                }
                variant="subtle"
              >
                {invoice.status}
              </Badge>
            </TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
          { name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
          { name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer' },
        ].map((user) => (
          <TableRow key={user.email}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">
                Edit
              </Button>
              <Button variant="ghost" size="sm" className="text-danger">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Striped: Story = {
  render: () => (
    <Table variant="striped">
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          { product: 'Widget A', category: 'Electronics', price: '$99.99', stock: 50 },
          { product: 'Widget B', category: 'Electronics', price: '$149.99', stock: 30 },
          { product: 'Gadget X', category: 'Accessories', price: '$29.99', stock: 100 },
          { product: 'Gadget Y', category: 'Accessories', price: '$49.99', stock: 75 },
          { product: 'Device Z', category: 'Electronics', price: '$199.99', stock: 25 },
        ].map((item) => (
          <TableRow key={item.product}>
            <TableCell className="font-medium">{item.product}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{item.stock}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Compact: Story = {
  render: () => (
    <Table size="sm">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <TableRow key={i}>
            <TableCell className="font-mono text-xs">{`#${i.toString().padStart(4, '0')}`}</TableCell>
            <TableCell>Item {i}</TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-success' : 'bg-warning'}`} />
                {i % 2 === 0 ? 'Active' : 'Pending'}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithSelection: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <input type="checkbox" className="rounded" />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          { name: 'John Doe', email: 'john@example.com', status: 'Active' },
          { name: 'Jane Smith', email: 'jane@example.com', status: 'Active' },
          { name: 'Bob Wilson', email: 'bob@example.com', status: 'Inactive' },
        ].map((user) => (
          <TableRow key={user.email}>
            <TableCell>
              <input type="checkbox" className="rounded" />
            </TableCell>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge
                colorScheme={user.status === 'Active' ? 'success' : 'neutral'}
                variant="subtle"
              >
                {user.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Empty: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className="h-24 text-center">
            <div className="flex flex-col items-center gap-2">
              <svg className="w-8 h-8 text-fg-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-sm text-fg-muted">No data found</p>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Table variant="bordered">
      <TableHeader>
        <TableRow>
          <TableHead>Column 1</TableHead>
          <TableHead>Column 2</TableHead>
          <TableHead>Column 3</TableHead>
          <TableHead>Column 4</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3].map((row) => (
          <TableRow key={row}>
            <TableCell>Cell {row}-1</TableCell>
            <TableCell>Cell {row}-2</TableCell>
            <TableCell>Cell {row}-3</TableCell>
            <TableCell>Cell {row}-4</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
