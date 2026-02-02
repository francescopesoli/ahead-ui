import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Combobox } from '@ahead-ui/components';
import type { ComboboxOption } from '@ahead-ui/components';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Form/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isDisabled: {
      control: 'boolean',
    },
    isInvalid: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const fruits: ComboboxOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' },
  { value: 'kiwi', label: 'Kiwi' },
  { value: 'lemon', label: 'Lemon' },
  { value: 'mango', label: 'Mango' },
  { value: 'orange', label: 'Orange' },
  { value: 'peach', label: 'Peach' },
  { value: 'pear', label: 'Pear' },
];

export const Default: Story = {
  args: {
    label: 'Select a fruit',
    placeholder: 'Search fruits...',
    options: fruits,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Combobox
        label="Small"
        size="sm"
        placeholder="Search..."
        options={fruits.slice(0, 5)}
      />
      <Combobox
        label="Medium"
        size="md"
        placeholder="Search..."
        options={fruits.slice(0, 5)}
      />
      <Combobox
        label="Large"
        size="lg"
        placeholder="Search..."
        options={fruits.slice(0, 5)}
      />
    </div>
  ),
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Favorite fruit',
    options: fruits,
    defaultValue: 'mango',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled combobox',
    isDisabled: true,
    options: fruits,
    placeholder: 'Cannot select',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Required field',
    isInvalid: true,
    errorMessage: 'Please select a fruit',
    options: fruits,
    placeholder: 'Select a fruit',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Programming language',
    description: 'Select your primary language',
    placeholder: 'Search languages...',
    options: [
      { value: 'js', label: 'JavaScript' },
      { value: 'ts', label: 'TypeScript' },
      { value: 'py', label: 'Python' },
      { value: 'go', label: 'Go' },
      { value: 'rust', label: 'Rust' },
      { value: 'java', label: 'Java' },
    ],
  },
};

export const Controlled: Story = {
  render: function ControlledCombobox() {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div className="flex flex-col gap-4 w-64">
        <Combobox
          label="Select a fruit"
          placeholder="Search..."
          options={fruits}
          value={value}
          onChange={setValue}
        />
        <p className="text-sm text-fg-muted">
          Selected: {value || '(none)'}
        </p>
        <button
          className="px-3 py-1 text-sm border rounded w-fit"
          onClick={() => setValue(null)}
        >
          Clear selection
        </button>
      </div>
    );
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Choose a plan',
    placeholder: 'Search plans...',
    options: [
      { value: 'free', label: 'Free' },
      { value: 'starter', label: 'Starter' },
      { value: 'pro', label: 'Pro' },
      { value: 'enterprise', label: 'Enterprise (Contact sales)', disabled: true },
    ],
  },
};

export const AllowCustomValue: Story = {
  args: {
    label: 'Tags',
    placeholder: 'Type to add...',
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
    ],
    allowCustomValue: true,
  },
};

export const AsyncFiltering: Story = {
  render: function AsyncCombobox() {
    const [options, setOptions] = useState<ComboboxOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = async (query: string) => {
      if (!query) {
        setOptions([]);
        return;
      }

      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const filtered = fruits.filter((f) =>
        f.label.toLowerCase().includes(query.toLowerCase())
      );
      setOptions(filtered);
      setIsLoading(false);
    };

    return (
      <Combobox
        label="Search fruits (async)"
        placeholder="Type to search..."
        options={options}
        onInputChange={handleInputChange}
        isLoading={isLoading}
      />
    );
  },
};
