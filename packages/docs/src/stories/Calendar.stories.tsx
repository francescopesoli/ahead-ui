import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Calendar, CalendarRange } from '@ahead-ui/components';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Date-Time/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    isDisabled: {
      control: 'boolean',
    },
    isReadOnly: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {},
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: new Date(),
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    defaultValue: new Date(),
  },
};

export const ReadOnly: Story = {
  args: {
    isReadOnly: true,
    defaultValue: new Date(),
  },
};

export const Controlled: Story = {
  render: function ControlledCalendar() {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <div className="flex flex-col gap-4">
        <Calendar value={date} onChange={setDate} />
        <p className="text-sm text-fg-muted">
          Selected: {date?.toLocaleDateString() || 'None'}
        </p>
      </div>
    );
  },
};

export const WithMinMax: Story = {
  args: {
    minValue: new Date(new Date().setDate(new Date().getDate() - 7)),
    maxValue: new Date(new Date().setDate(new Date().getDate() + 30)),
  },
};

export const WithDisabledDates: Story = {
  args: {
    isDateDisabled: (date: Date) => {
      // Disable weekends
      const day = date.getDay();
      return day === 0 || day === 6;
    },
  },
};

export const RangeSelection: Story = {
  name: 'Range Calendar',
  render: function RangeCalendarDemo() {
    const [range, setRange] = useState<{ start: Date; end: Date } | null>(null);
    return (
      <div className="flex flex-col gap-4">
        <CalendarRange value={range} onChange={setRange} />
        {range && (
          <p className="text-sm text-fg-muted">
            Selected: {range.start.toLocaleDateString()} -{' '}
            {range.end.toLocaleDateString()}
          </p>
        )}
      </div>
    );
  },
};

export const MultipleMonths: Story = {
  args: {
    visibleMonths: 2,
  },
};
