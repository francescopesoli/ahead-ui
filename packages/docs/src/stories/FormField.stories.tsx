import type { Meta, StoryObj } from '@storybook/react';
import { FormField, FormLabel, FormHelperText, FormErrorMessage, Input, Textarea, Select, SelectItem, Checkbox } from '@ahead-ui/components';

const meta: Meta<typeof FormField> = {
  title: 'Components/Utility/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    isRequired: {
      control: 'boolean',
    },
    isInvalid: {
      control: 'boolean',
    },
    isDisabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: () => (
    <FormField className="w-64">
      <FormLabel>Email</FormLabel>
      <Input type="email" placeholder="Enter your email" />
      <FormHelperText>We&apos;ll never share your email.</FormHelperText>
    </FormField>
  ),
};

export const Required: Story = {
  render: () => (
    <FormField isRequired className="w-64">
      <FormLabel>Username</FormLabel>
      <Input placeholder="Enter username" />
      <FormHelperText>Choose a unique username.</FormHelperText>
    </FormField>
  ),
};

export const WithError: Story = {
  render: () => (
    <FormField isInvalid className="w-64">
      <FormLabel>Password</FormLabel>
      <Input type="password" placeholder="Enter password" />
      <FormErrorMessage>Password must be at least 8 characters.</FormErrorMessage>
    </FormField>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FormField isDisabled className="w-64">
      <FormLabel>Read Only</FormLabel>
      <Input defaultValue="This field is disabled" />
      <FormHelperText>This field cannot be edited.</FormHelperText>
    </FormField>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <FormField className="w-80">
      <FormLabel>Description</FormLabel>
      <Textarea placeholder="Enter a description..." rows={4} />
      <FormHelperText>Max 500 characters.</FormHelperText>
    </FormField>
  ),
};

export const WithSelect: Story = {
  render: () => (
    <FormField className="w-64">
      <FormLabel>Country</FormLabel>
      <Select placeholder="Select a country">
        <SelectItem key="us">United States</SelectItem>
        <SelectItem key="uk">United Kingdom</SelectItem>
        <SelectItem key="ca">Canada</SelectItem>
        <SelectItem key="au">Australia</SelectItem>
      </Select>
      <FormHelperText>Select your country of residence.</FormHelperText>
    </FormField>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <FormField>
      <Checkbox>I agree to the terms and conditions</Checkbox>
      <FormHelperText>You must agree before continuing.</FormHelperText>
    </FormField>
  ),
};

export const CompleteForm: Story = {
  render: () => (
    <form className="w-96 space-y-4">
      <FormField isRequired>
        <FormLabel>Full Name</FormLabel>
        <Input placeholder="John Doe" />
      </FormField>

      <FormField isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input type="email" placeholder="john@example.com" />
        <FormHelperText>We&apos;ll use this to contact you.</FormHelperText>
      </FormField>

      <FormField isRequired isInvalid>
        <FormLabel>Password</FormLabel>
        <Input type="password" />
        <FormErrorMessage>Password is too weak.</FormErrorMessage>
      </FormField>

      <FormField>
        <FormLabel>Bio</FormLabel>
        <Textarea placeholder="Tell us about yourself..." />
        <FormHelperText>Optional, max 200 characters.</FormHelperText>
      </FormField>

      <FormField isRequired>
        <FormLabel>Country</FormLabel>
        <Select placeholder="Select country">
          <SelectItem key="us">United States</SelectItem>
          <SelectItem key="uk">United Kingdom</SelectItem>
          <SelectItem key="ca">Canada</SelectItem>
        </Select>
      </FormField>

      <FormField isRequired>
        <Checkbox>I accept the Terms of Service</Checkbox>
      </FormField>

      <button
        type="submit"
        className="w-full py-2 bg-primary text-primary-fg rounded-lg font-medium"
      >
        Submit
      </button>
    </form>
  ),
};

export const HorizontalLayout: Story = {
  render: () => (
    <div className="w-[32rem] space-y-4">
      <FormField orientation="horizontal">
        <FormLabel className="w-32">Name</FormLabel>
        <div className="flex-1">
          <Input placeholder="Enter your name" />
        </div>
      </FormField>

      <FormField orientation="horizontal">
        <FormLabel className="w-32">Email</FormLabel>
        <div className="flex-1">
          <Input type="email" placeholder="Enter your email" />
          <FormHelperText>Used for notifications.</FormHelperText>
        </div>
      </FormField>

      <FormField orientation="horizontal" isInvalid>
        <FormLabel className="w-32">Phone</FormLabel>
        <div className="flex-1">
          <Input type="tel" placeholder="Enter phone" />
          <FormErrorMessage>Invalid phone number.</FormErrorMessage>
        </div>
      </FormField>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-64 space-y-6">
      <FormField size="sm">
        <FormLabel>Small</FormLabel>
        <Input size="sm" placeholder="Small input" />
        <FormHelperText>Small form field</FormHelperText>
      </FormField>

      <FormField size="md">
        <FormLabel>Medium</FormLabel>
        <Input size="md" placeholder="Medium input" />
        <FormHelperText>Medium form field</FormHelperText>
      </FormField>

      <FormField size="lg">
        <FormLabel>Large</FormLabel>
        <Input size="lg" placeholder="Large input" />
        <FormHelperText>Large form field</FormHelperText>
      </FormField>
    </div>
  ),
};
