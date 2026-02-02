import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker, DateRangePicker } from '@ahead-ui/components';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/Date-Time/DatePicker',
  component: DatePicker,
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
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    label: 'Select date',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <DatePicker label="Small" size="sm" />
      <DatePicker label="Medium" size="md" />
      <DatePicker label="Large" size="lg" />
    </div>
  ),
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Event date',
    defaultValue: new Date(),
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Birth date',
    placeholder: 'MM/DD/YYYY',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    isDisabled: true,
    defaultValue: new Date(),
  },
};

export const Invalid: Story = {
  args: {
    label: 'Required date',
    isInvalid: true,
    errorMessage: 'Please select a date',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Appointment',
    description: 'Choose your preferred date',
  },
};

export const Controlled: Story = {
  render: function ControlledDatePicker() {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div className="flex flex-col gap-4 w-64">
        <DatePicker
          label="Select date"
          value={date}
          onChange={setDate}
        />
        <p className="text-sm text-fg-muted">
          Selected: {date?.toLocaleDateString() || 'None'}
        </p>
        <div className="flex gap-2">
          <button
            className="px-2 py-1 text-sm border rounded"
            onClick={() => setDate(new Date())}
          >
            Today
          </button>
          <button
            className="px-2 py-1 text-sm border rounded"
            onClick={() => setDate(null)}
          >
            Clear
          </button>
        </div>
      </div>
    );
  },
};

export const WithMinMax: Story = {
  args: {
    label: 'Select date',
    minValue: new Date(),
    maxValue: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    description: 'Only dates within the next 3 months',
  },
};

export const DateRangePickerStory: Story = {
  name: 'Date Range Picker',
  render: function DateRangeDemo() {
    const [range, setRange] = useState<{ start: Date; end: Date } | null>(null);
    return (
      <div className="flex flex-col gap-4">
        <DateRangePicker
          label="Select date range"
          value={range}
          onChange={setRange}
        />
        {range && (
          <p className="text-sm text-fg-muted">
            {range.start.toLocaleDateString()} -{' '}
            {range.end.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};

export const WithFormat: Story = {
  args: {
    label: 'Date',
    dateFormat: 'dd/MM/yyyy',
    placeholder: 'DD/MM/YYYY',
  },
};
