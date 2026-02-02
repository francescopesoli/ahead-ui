import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { Progress, CircularProgress } from '@ahead-ui/components';

const meta: Meta<typeof Progress> = {
  title: 'Components/Display/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    colorScheme: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 60,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Progress value={60} size="xs" />
      <Progress value={60} size="sm" />
      <Progress value={60} size="md" />
      <Progress value={60} size="lg" />
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Progress value={60} colorScheme="primary" />
      <Progress value={60} colorScheme="success" />
      <Progress value={60} colorScheme="warning" />
      <Progress value={60} colorScheme="danger" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-64">
      <div className="flex justify-between text-sm mb-1">
        <span>Progress</span>
        <span>75%</span>
      </div>
      <Progress value={75} />
    </div>
  ),
};

export const Indeterminate: Story = {
  args: {
    isIndeterminate: true,
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};

export const Animated: Story = {
  render: function AnimatedProgress() {
    const [value, setValue] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setValue((prev) => (prev >= 100 ? 0 : prev + 10));
      }, 500);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="w-64">
        <Progress value={value} />
        <p className="text-sm text-fg-muted mt-2">Value: {value}%</p>
      </div>
    );
  },
};

export const CircularProgressStory: Story = {
  name: 'Circular Progress',
  render: () => (
    <div className="flex items-center gap-6">
      <CircularProgress value={25} />
      <CircularProgress value={50} />
      <CircularProgress value={75} />
      <CircularProgress value={100} />
    </div>
  ),
};

export const CircularSizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <CircularProgress value={60} size="sm" />
      <CircularProgress value={60} size="md" />
      <CircularProgress value={60} size="lg" />
      <CircularProgress value={60} size="xl" />
    </div>
  ),
};

export const CircularWithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <CircularProgress value={75} showValue />
      <CircularProgress value={42} showValue colorScheme="success" />
      <CircularProgress value={88} showValue colorScheme="warning" />
    </div>
  ),
};

export const CircularIndeterminate: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <CircularProgress isIndeterminate size="sm" />
      <CircularProgress isIndeterminate size="md" />
      <CircularProgress isIndeterminate size="lg" />
    </div>
  ),
};

export const FileUploadProgress: Story = {
  render: function FileUploadProgress() {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<'idle' | 'uploading' | 'complete'>('idle');

    const simulateUpload = () => {
      setProgress(0);
      setStatus('uploading');
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus('complete');
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);
    };

    return (
      <div className="w-72 p-4 border rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <svg className="w-8 h-8 text-fg-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-medium">document.pdf</p>
            <p className="text-xs text-fg-muted">2.4 MB</p>
          </div>
        </div>
        <Progress
          value={Math.min(progress, 100)}
          colorScheme={status === 'complete' ? 'success' : 'primary'}
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-fg-muted">
            {status === 'idle' && 'Ready to upload'}
            {status === 'uploading' && `Uploading... ${Math.round(progress)}%`}
            {status === 'complete' && 'Upload complete!'}
          </span>
          {status === 'idle' && (
            <button className="text-xs text-primary" onClick={simulateUpload}>
              Upload
            </button>
          )}
        </div>
      </div>
    );
  },
};

export const StepsProgress: Story = {
  render: () => (
    <div className="w-80">
      <div className="flex justify-between text-sm mb-2">
        <span>Step 2 of 4</span>
        <span>50%</span>
      </div>
      <Progress value={50} />
      <div className="flex justify-between text-xs text-fg-muted mt-2">
        <span>Cart</span>
        <span>Shipping</span>
        <span>Payment</span>
        <span>Confirm</span>
      </div>
    </div>
  ),
};
