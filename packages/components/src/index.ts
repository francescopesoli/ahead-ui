/**
 * @ahead-ui/components
 * 
 * Adaptive, accessible React components for Ahead UI.
 * Built on React Aria for bulletproof accessibility.
 * 
 * @packageDocumentation
 */

// Slot (for asChild pattern)
export { Slot, Slottable } from './slot';
export type { SlotProps, SlottableProps } from './slot';

// Button
export { Button, buttonVariants } from './button';
export type { ButtonProps } from './button';

// Input
export { Input, inputVariants, inputWrapperVariants } from './input';
export type { InputProps } from './input';

// Card
export { Card, cardVariants } from './card';
export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardBodyProps,
  CardFooterProps,
} from './card';

// Badge
export { Badge, badgeVariants } from './badge';
export type { BadgeProps } from './badge';

// Spinner
export { Spinner, DotsSpinner, spinnerVariants } from './spinner';
export type { SpinnerProps, DotsSpinnerProps } from './spinner';

// Switch
export { Switch, switchTrackVariants, switchThumbVariants } from './switch';
export type { SwitchProps } from './switch';

// Checkbox
export { Checkbox, checkboxVariants } from './checkbox';
export type { CheckboxProps } from './checkbox';

// Avatar
export { Avatar, AvatarGroup, avatarVariants } from './avatar';
export type { AvatarProps, AvatarGroupProps } from './avatar';

// Tooltip
export { Tooltip, tooltipVariants } from './tooltip';
export type { TooltipProps } from './tooltip';

// Dialog
export { Dialog, dialogOverlayVariants, dialogContentVariants } from './dialog';
export type {
  DialogProps,
  DialogHeaderProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogBodyProps,
  DialogFooterProps,
} from './dialog';
