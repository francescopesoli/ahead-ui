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

// Textarea
export { Textarea, textareaVariants } from './textarea';
export type { TextareaProps } from './textarea';

// Tag
export { Tag, TagGroup, tagVariants } from './tag';
export type { TagProps, TagGroupProps } from './tag';

// Progress
export { Progress, CircularProgress, progressTrackVariants, progressBarVariants } from './progress';
export type { ProgressProps, CircularProgressProps } from './progress';

// Skeleton
export { Skeleton, SkeletonText, SkeletonCircle, skeletonVariants } from './skeleton';
export type { SkeletonProps, SkeletonTextProps, SkeletonCircleProps } from './skeleton';

// Divider
export { Divider, dividerVariants } from './divider';
export type { DividerProps } from './divider';

// Alert
export { Alert, alertVariants } from './alert';
export type { AlertProps } from './alert';

// Tabs
export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabTriggerVariants } from './tabs';
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps } from './tabs';

// RadioGroup
export { RadioGroup, Radio, radioVariants, radioDotVariants } from './radio-group';
export type { RadioGroupProps, RadioProps } from './radio-group';

// Accordion
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, accordionVariants } from './accordion';
export type { AccordionProps, AccordionItemProps, AccordionTriggerProps, AccordionContentProps } from './accordion';

// Breadcrumb
export { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, breadcrumbVariants, breadcrumbItemVariants, breadcrumbLinkVariants } from './breadcrumb';
export type { BreadcrumbProps, BreadcrumbItemProps, BreadcrumbLinkProps, BreadcrumbSeparatorProps } from './breadcrumb';

// Pagination
export { Pagination, paginationVariants, paginationButtonVariants } from './pagination';
export type { PaginationProps } from './pagination';

// Select
export { Select, SelectItem, selectTriggerVariants, selectContentVariants, selectItemVariants } from './select';
export type { SelectProps } from './select';

// Slider
export { Slider, RangeSlider, sliderTrackVariants, sliderFilledTrackVariants, sliderThumbVariants } from './slider';
export type { SliderProps, RangeSliderProps } from './slider';

// Toast
export { Toast, ToastProvider, toastVariants, useToast } from './toast';
export type { ToastProps, ToastData, ToastProviderProps } from './toast';

// Menu
export { Menu, MenuTrigger, MenuContent, MenuItem, MenuGroup, MenuSeparator, menuContentVariants, menuItemVariants } from './menu';
export type { MenuProps, MenuTriggerProps, MenuContentProps, MenuItemProps, MenuGroupProps, MenuSeparatorProps } from './menu';

// Table
export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption } from './table';
export type { TableProps, TableHeaderProps, TableBodyProps, TableFooterProps, TableRowProps, TableHeadProps, TableCellProps, TableCaptionProps } from './table';

// Drawer
export { Drawer, DrawerHeader, DrawerBody, DrawerFooter, drawerOverlayVariants, drawerContentVariants } from './drawer';
export type { DrawerProps, DrawerHeaderProps, DrawerBodyProps, DrawerFooterProps } from './drawer';
