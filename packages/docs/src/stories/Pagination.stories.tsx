import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from '@ahead-ui/components';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showEdges: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    totalPages: 10,
    currentPage: 1,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-fg-muted mb-2">Small</p>
        <Pagination totalPages={10} currentPage={5} size="sm" />
      </div>
      <div>
        <p className="text-sm text-fg-muted mb-2">Medium</p>
        <Pagination totalPages={10} currentPage={5} size="md" />
      </div>
      <div>
        <p className="text-sm text-fg-muted mb-2">Large</p>
        <Pagination totalPages={10} currentPage={5} size="lg" />
      </div>
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledPagination() {
    const [page, setPage] = useState(1);
    return (
      <div className="flex flex-col items-center gap-4">
        <Pagination
          totalPages={10}
          currentPage={page}
          onPageChange={setPage}
        />
        <p className="text-sm text-fg-muted">Current page: {page}</p>
      </div>
    );
  },
};

export const WithEdges: Story = {
  args: {
    totalPages: 20,
    currentPage: 10,
    showEdges: true,
  },
};

export const FewPages: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Pagination totalPages={3} currentPage={1} />
      <Pagination totalPages={5} currentPage={3} />
    </div>
  ),
};

export const ManyPages: Story = {
  render: function ManyPages() {
    const [page, setPage] = useState(25);
    return (
      <Pagination
        totalPages={100}
        currentPage={page}
        onPageChange={setPage}
        siblingCount={1}
      />
    );
  },
};

export const WithSiblings: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm text-fg-muted mb-2">1 sibling</p>
        <Pagination totalPages={20} currentPage={10} siblingCount={1} />
      </div>
      <div>
        <p className="text-sm text-fg-muted mb-2">2 siblings</p>
        <Pagination totalPages={20} currentPage={10} siblingCount={2} />
      </div>
    </div>
  ),
};

export const Simple: Story = {
  render: function SimplePagination() {
    const [page, setPage] = useState(1);
    const totalPages = 10;
    return (
      <div className="flex items-center gap-4">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    );
  },
};

export const InTableContext: Story = {
  render: function TablePagination() {
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = 95;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, totalItems);

    return (
      <div className="w-full max-w-xl">
        <div className="border rounded-lg mb-4">
          <div className="p-4 border-b bg-bg-subtle">
            <div className="flex justify-between text-sm font-medium">
              <span>Name</span>
              <span>Status</span>
            </div>
          </div>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="p-4 border-b last:border-b-0">
              <div className="flex justify-between text-sm">
                <span>Item {startItem + i}</span>
                <span className="text-success">Active</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-fg-muted">
            Showing {startItem} to {endItem} of {totalItems} items
          </span>
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
            size="sm"
          />
        </div>
      </div>
    );
  },
};

export const WithItemsPerPage: Story = {
  render: function ItemsPerPage() {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const totalItems = 100;
    const totalPages = Math.ceil(totalItems / perPage);

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <label className="text-sm">Items per page:</label>
          <select
            className="px-2 py-1 border rounded text-sm"
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
        <p className="text-sm text-fg-muted">
          Showing page {page} of {totalPages} ({totalItems} total items)
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    totalPages: 10,
    currentPage: 5,
    isDisabled: true,
  },
};
