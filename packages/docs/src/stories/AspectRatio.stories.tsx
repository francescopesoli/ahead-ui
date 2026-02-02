import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from '@ahead-ui/components';

const meta: Meta<typeof AspectRatio> = {
  title: 'Components/Layout/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  render: () => (
    <div className="w-64">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&h=360&fit=crop"
          alt="Mountains"
          className="w-full h-full object-cover rounded-lg"
        />
      </AspectRatio>
    </div>
  ),
};

export const Ratios: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <p className="text-sm text-fg-muted mb-2">1:1 (Square)</p>
        <AspectRatio ratio={1}>
          <div className="w-full h-full bg-primary-subtle rounded-lg flex items-center justify-center">
            1:1
          </div>
        </AspectRatio>
      </div>
      <div>
        <p className="text-sm text-fg-muted mb-2">4:3</p>
        <AspectRatio ratio={4 / 3}>
          <div className="w-full h-full bg-success-subtle rounded-lg flex items-center justify-center">
            4:3
          </div>
        </AspectRatio>
      </div>
      <div>
        <p className="text-sm text-fg-muted mb-2">16:9</p>
        <AspectRatio ratio={16 / 9}>
          <div className="w-full h-full bg-warning-subtle rounded-lg flex items-center justify-center">
            16:9
          </div>
        </AspectRatio>
      </div>
      <div>
        <p className="text-sm text-fg-muted mb-2">21:9 (Ultrawide)</p>
        <AspectRatio ratio={21 / 9}>
          <div className="w-full h-full bg-danger-subtle rounded-lg flex items-center justify-center">
            21:9
          </div>
        </AspectRatio>
      </div>
      <div>
        <p className="text-sm text-fg-muted mb-2">2:3 (Portrait)</p>
        <AspectRatio ratio={2 / 3}>
          <div className="w-full h-full bg-accent-subtle rounded-lg flex items-center justify-center">
            2:3
          </div>
        </AspectRatio>
      </div>
      <div>
        <p className="text-sm text-fg-muted mb-2">9:16 (Mobile)</p>
        <AspectRatio ratio={9 / 16}>
          <div className="w-full h-full bg-bg-muted rounded-lg flex items-center justify-center">
            9:16
          </div>
        </AspectRatio>
      </div>
    </div>
  ),
};

export const VideoEmbed: Story = {
  render: () => (
    <div className="w-96">
      <AspectRatio ratio={16 / 9}>
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        />
      </AspectRatio>
    </div>
  ),
};

export const MapEmbed: Story = {
  render: () => (
    <div className="w-96">
      <AspectRatio ratio={4 / 3}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.991625811tried!2d2.2922926!3d48.8583701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sus!4v1234567890"
          title="Map"
          className="w-full h-full rounded-lg border-0"
          loading="lazy"
        />
      </AspectRatio>
    </div>
  ),
};

export const ImageGallery: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-2">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <AspectRatio key={i} ratio={1}>
          <img
            src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000}?w=200&h=200&fit=crop`}
            alt={`Gallery item ${i}`}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://via.placeholder.com/200?text=${i}`;
            }}
          />
        </AspectRatio>
      ))}
    </div>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <div className="w-64 border rounded-lg overflow-hidden">
      <AspectRatio ratio={1}>
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop"
          alt="Product"
          className="w-full h-full object-cover"
        />
      </AspectRatio>
      <div className="p-4">
        <h3 className="font-medium">Product Name</h3>
        <p className="text-sm text-fg-muted">Category</p>
        <p className="font-bold mt-2">$99.99</p>
      </div>
    </div>
  ),
};

export const ProfileAvatar: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="w-16">
        <AspectRatio ratio={1}>
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces"
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </AspectRatio>
      </div>
      <div className="w-24">
        <AspectRatio ratio={1}>
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces"
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </AspectRatio>
      </div>
      <div className="w-32">
        <AspectRatio ratio={1}>
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces"
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </AspectRatio>
      </div>
    </div>
  ),
};

export const WithPlaceholder: Story = {
  render: () => (
    <div className="w-64">
      <AspectRatio ratio={16 / 9}>
        <div className="w-full h-full bg-bg-subtle rounded-lg flex items-center justify-center">
          <svg className="w-12 h-12 text-fg-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </AspectRatio>
    </div>
  ),
};
