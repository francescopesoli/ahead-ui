import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Rating } from '@ahead-ui/components';

const meta: Meta<typeof Rating> = {
  title: 'Components/Display/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    max: {
      control: { type: 'number', min: 1, max: 10 },
    },
    isDisabled: {
      control: 'boolean',
    },
    isReadOnly: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  args: {
    defaultValue: 3,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Rating size="sm" defaultValue={3} />
      <Rating size="md" defaultValue={3} />
      <Rating size="lg" defaultValue={3} />
    </div>
  ),
};

export const DifferentMax: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Rating max={5} defaultValue={3} />
        <span className="text-sm text-fg-muted">5 stars</span>
      </div>
      <div className="flex items-center gap-2">
        <Rating max={10} defaultValue={7} />
        <span className="text-sm text-fg-muted">10 stars</span>
      </div>
    </div>
  ),
};

export const ReadOnly: Story = {
  args: {
    isReadOnly: true,
    defaultValue: 4,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    defaultValue: 2,
  },
};

export const HalfStars: Story = {
  args: {
    allowHalf: true,
    defaultValue: 3.5,
  },
};

export const Controlled: Story = {
  render: function ControlledRating() {
    const [value, setValue] = useState(0);
    return (
      <div className="flex flex-col gap-4">
        <Rating value={value} onChange={setValue} />
        <p className="text-sm text-fg-muted">
          Rating: {value} star{value !== 1 ? 's' : ''}
        </p>
        <button
          className="px-3 py-1 text-sm border rounded w-fit"
          onClick={() => setValue(0)}
        >
          Clear rating
        </button>
      </div>
    );
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">Rate your experience</label>
      <Rating defaultValue={0} />
    </div>
  ),
};

export const ProductRating: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4 border rounded-lg w-80">
      <div className="w-16 h-16 bg-bg-subtle rounded-lg" />
      <div className="flex-1">
        <h3 className="font-medium text-sm">Product Name</h3>
        <div className="flex items-center gap-2 mt-1">
          <Rating size="sm" defaultValue={4} isReadOnly />
          <span className="text-xs text-fg-muted">(128 reviews)</span>
        </div>
        <p className="text-sm font-medium mt-1">$99.99</p>
      </div>
    </div>
  ),
};

export const ReviewForm: Story = {
  render: function ReviewForm() {
    const [rating, setRating] = useState(0);
    return (
      <div className="w-80 p-4 border rounded-lg">
        <h3 className="font-medium mb-4">Write a Review</h3>
        <div className="mb-4">
          <label className="text-sm text-fg-muted block mb-2">
            Your rating
          </label>
          <Rating value={rating} onChange={setRating} size="lg" />
        </div>
        <div className="mb-4">
          <label className="text-sm text-fg-muted block mb-2">
            Your review
          </label>
          <textarea
            className="w-full p-2 border rounded-md text-sm"
            rows={3}
            placeholder="Share your experience..."
          />
        </div>
        <button
          className="w-full py-2 bg-primary text-primary-fg rounded-md text-sm font-medium"
          disabled={rating === 0}
        >
          Submit Review
        </button>
      </div>
    );
  },
};

export const RatingBreakdown: Story = {
  render: () => (
    <div className="w-72">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-4xl font-bold">4.5</span>
        <div>
          <Rating defaultValue={4.5} allowHalf isReadOnly size="sm" />
          <p className="text-xs text-fg-muted">Based on 1,234 reviews</p>
        </div>
      </div>
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((stars) => (
          <div key={stars} className="flex items-center gap-2">
            <span className="text-sm w-8">{stars}</span>
            <div className="flex-1 h-2 bg-bg-subtle rounded-full overflow-hidden">
              <div
                className="h-full bg-warning"
                style={{
                  width: `${stars === 5 ? 60 : stars === 4 ? 25 : stars === 3 ? 10 : 3}%`,
                }}
              />
            </div>
            <span className="text-xs text-fg-muted w-8">
              {stars === 5 ? '60%' : stars === 4 ? '25%' : stars === 3 ? '10%' : '3%'}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const CustomIcon: Story = {
  args: {
    defaultValue: 3,
    icon: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
};
