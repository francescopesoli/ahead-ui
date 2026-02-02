import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Stepper, Step, Button } from '@ahead-ui/components';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Navigation/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  render: () => (
    <Stepper currentStep={1}>
      <Step title="Account" />
      <Step title="Profile" />
      <Step title="Review" />
    </Stepper>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Stepper currentStep={1}>
      <Step title="Account" description="Create your account" />
      <Step title="Profile" description="Set up your profile" />
      <Step title="Review" description="Review and submit" />
    </Stepper>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-fg-muted mb-2">Step 1 (current)</p>
        <Stepper currentStep={0}>
          <Step title="Step 1" />
          <Step title="Step 2" />
          <Step title="Step 3" />
        </Stepper>
      </div>
      <div>
        <p className="text-sm text-fg-muted mb-2">Step 2 (current)</p>
        <Stepper currentStep={1}>
          <Step title="Step 1" />
          <Step title="Step 2" />
          <Step title="Step 3" />
        </Stepper>
      </div>
      <div>
        <p className="text-sm text-fg-muted mb-2">Step 3 (current)</p>
        <Stepper currentStep={2}>
          <Step title="Step 1" />
          <Step title="Step 2" />
          <Step title="Step 3" />
        </Stepper>
      </div>
      <div>
        <p className="text-sm text-fg-muted mb-2">All complete</p>
        <Stepper currentStep={3}>
          <Step title="Step 1" />
          <Step title="Step 2" />
          <Step title="Step 3" />
        </Stepper>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-fg-muted mb-2">Small</p>
        <Stepper currentStep={1} size="sm">
          <Step title="Step 1" />
          <Step title="Step 2" />
          <Step title="Step 3" />
        </Stepper>
      </div>
      <div>
        <p className="text-sm text-fg-muted mb-2">Medium</p>
        <Stepper currentStep={1} size="md">
          <Step title="Step 1" />
          <Step title="Step 2" />
          <Step title="Step 3" />
        </Stepper>
      </div>
      <div>
        <p className="text-sm text-fg-muted mb-2">Large</p>
        <Stepper currentStep={1} size="lg">
          <Step title="Step 1" />
          <Step title="Step 2" />
          <Step title="Step 3" />
        </Stepper>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Stepper currentStep={1} orientation="vertical">
      <Step title="Account" description="Create your account" />
      <Step title="Profile" description="Set up your profile" />
      <Step title="Settings" description="Configure preferences" />
      <Step title="Review" description="Review and submit" />
    </Stepper>
  ),
};

export const Interactive: Story = {
  render: function InteractiveStepper() {
    const [step, setStep] = useState(0);
    const steps = ['Account', 'Profile', 'Settings', 'Review'];

    return (
      <div className="w-full max-w-2xl">
        <Stepper currentStep={step}>
          {steps.map((title) => (
            <Step key={title} title={title} />
          ))}
        </Stepper>
        <div className="mt-8 p-4 border rounded-lg">
          <h3 className="font-medium mb-2">{steps[step]}</h3>
          <p className="text-sm text-fg-muted mb-4">
            Content for {steps[step]?.toLowerCase()} step goes here.
          </p>
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() => setStep(Math.min(steps.length, step + 1))}
              disabled={step >= steps.length}
            >
              {step === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => (
    <Stepper currentStep={1}>
      <Step title="Account" status="complete" />
      <Step title="Payment" status="error" description="Payment failed" />
      <Step title="Confirmation" />
    </Stepper>
  ),
};

export const Clickable: Story = {
  render: function ClickableStepper() {
    const [step, setStep] = useState(1);
    return (
      <div className="w-full max-w-2xl">
        <Stepper currentStep={step} onStepClick={setStep}>
          <Step title="Account" />
          <Step title="Profile" />
          <Step title="Settings" />
          <Step title="Review" />
        </Stepper>
        <p className="mt-4 text-sm text-fg-muted text-center">
          Click on completed steps to navigate back
        </p>
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => (
    <Stepper currentStep={1}>
      <Step
        title="Cart"
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        }
      />
      <Step
        title="Shipping"
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>
        }
      />
      <Step
        title="Payment"
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        }
      />
      <Step
        title="Done"
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        }
      />
    </Stepper>
  ),
};

export const CheckoutFlow: Story = {
  render: function CheckoutFlow() {
    const [step, setStep] = useState(0);
    const steps = [
      { title: 'Cart', description: 'Review items' },
      { title: 'Shipping', description: 'Delivery address' },
      { title: 'Payment', description: 'Payment method' },
      { title: 'Confirmation', description: 'Order summary' },
    ];

    return (
      <div className="w-full max-w-3xl">
        <Stepper currentStep={step}>
          {steps.map((s) => (
            <Step key={s.title} title={s.title} description={s.description} />
          ))}
        </Stepper>
        <div className="mt-8 p-6 border rounded-lg">
          <h3 className="text-lg font-medium mb-4">{steps[step]?.title}</h3>
          <div className="h-32 bg-bg-subtle rounded-lg flex items-center justify-center text-fg-muted mb-6">
            {steps[step]?.description} content
          </div>
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
            >
              Back
            </Button>
            <Button onClick={() => setStep(Math.min(steps.length - 1, step + 1))}>
              {step === steps.length - 1 ? 'Place Order' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>
    );
  },
};
