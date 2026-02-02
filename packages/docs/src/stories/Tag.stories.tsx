import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tag, TagGroup } from '@ahead-ui/components';

const meta: Meta<typeof Tag> = {
  title: 'Components/Display/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'subtle', 'outline'],
    },
    colorScheme: {
      control: 'select',
      options: ['neutral', 'primary', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: 'Tag',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tag variant="solid">Solid</Tag>
      <Tag variant="subtle">Subtle</Tag>
      <Tag variant="outline">Outline</Tag>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Tag colorScheme="neutral">Neutral</Tag>
      <Tag colorScheme="primary">Primary</Tag>
      <Tag colorScheme="success">Success</Tag>
      <Tag colorScheme="warning">Warning</Tag>
      <Tag colorScheme="danger">Danger</Tag>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="lg">Large</Tag>
    </div>
  ),
};

export const Closable: Story = {
  render: function ClosableTags() {
    const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind', 'Vite']);

    const handleRemove = (tag: string) => {
      setTags(tags.filter((t) => t !== tag));
    };

    return (
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <Tag key={tag} closable onClose={() => handleRemove(tag)}>
            {tag}
          </Tag>
        ))}
        {tags.length === 0 && (
          <button
            className="text-sm text-primary"
            onClick={() => setTags(['React', 'TypeScript', 'Tailwind', 'Vite'])}
          >
            Reset tags
          </button>
        )}
      </div>
    );
  },
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Tag>
        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        Label
      </Tag>
      <Tag colorScheme="primary">
        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Location
      </Tag>
      <Tag colorScheme="success">
        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Verified
      </Tag>
    </div>
  ),
};

export const TagGroupStory: Story = {
  name: 'Tag Group',
  render: () => (
    <TagGroup>
      <Tag>JavaScript</Tag>
      <Tag>TypeScript</Tag>
      <Tag>Python</Tag>
      <Tag>Go</Tag>
      <Tag>Rust</Tag>
    </TagGroup>
  ),
};

export const Categories: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-fg-muted w-20">Frontend:</span>
        <div className="flex gap-1.5 flex-wrap">
          <Tag size="sm" colorScheme="primary">React</Tag>
          <Tag size="sm" colorScheme="primary">Vue</Tag>
          <Tag size="sm" colorScheme="primary">Angular</Tag>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-fg-muted w-20">Backend:</span>
        <div className="flex gap-1.5 flex-wrap">
          <Tag size="sm" colorScheme="success">Node.js</Tag>
          <Tag size="sm" colorScheme="success">Python</Tag>
          <Tag size="sm" colorScheme="success">Go</Tag>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-fg-muted w-20">Database:</span>
        <div className="flex gap-1.5 flex-wrap">
          <Tag size="sm" colorScheme="warning">PostgreSQL</Tag>
          <Tag size="sm" colorScheme="warning">MongoDB</Tag>
          <Tag size="sm" colorScheme="warning">Redis</Tag>
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: function InteractiveTags() {
    const [selected, setSelected] = useState<string[]>([]);
    const options = ['Small', 'Medium', 'Large', 'XL'];

    const toggleTag = (tag: string) => {
      setSelected((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      );
    };

    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          {options.map((option) => (
            <Tag
              key={option}
              variant={selected.includes(option) ? 'solid' : 'outline'}
              colorScheme={selected.includes(option) ? 'primary' : 'neutral'}
              className="cursor-pointer"
              onClick={() => toggleTag(option)}
            >
              {option}
            </Tag>
          ))}
        </div>
        <p className="text-sm text-fg-muted">
          Selected: {selected.join(', ') || 'None'}
        </p>
      </div>
    );
  },
};
