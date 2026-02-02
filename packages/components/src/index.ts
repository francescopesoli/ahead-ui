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

// VisuallyHidden
export { VisuallyHidden } from './visually-hidden';
export type { VisuallyHiddenProps } from './visually-hidden';

// Portal
export { Portal } from './portal';
export type { PortalProps } from './portal';

// Label
export { Label, labelVariants } from './label';
export type { LabelProps } from './label';

// AspectRatio
export { AspectRatio } from './aspect-ratio';
export type { AspectRatioProps } from './aspect-ratio';

// Kbd
export { Kbd, kbdVariants } from './kbd';
export type { KbdProps } from './kbd';

// Code
export { Code, CodeBlock, codeVariants } from './code';
export type { CodeProps, CodeBlockProps } from './code';

// Collapsible
export { Collapsible, CollapsibleTrigger, CollapsibleContent } from './collapsible';
export type { CollapsibleProps, CollapsibleTriggerProps, CollapsibleContentProps } from './collapsible';

// ScrollArea
export { ScrollArea, scrollAreaVariants } from './scroll-area';
export type { ScrollAreaProps } from './scroll-area';

// FormField
export { FormField, FormLabel, FormHelperText, FormErrorMessage, useFormField, formFieldVariants } from './form-field';
export type { FormFieldProps, FormLabelProps, FormHelperTextProps, FormErrorMessageProps } from './form-field';

// Resizable
export { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './resizable';
export type { ResizablePanelGroupProps, ResizablePanelProps, ResizableHandleProps } from './resizable';

// Stat
export { Stat, StatLabel, StatValue, StatHelpText, StatArrow, statVariants } from './stat';
export type { StatProps, StatLabelProps, StatValueProps, StatHelpTextProps, StatArrowProps } from './stat';

// Rating
export { Rating, ratingVariants } from './rating';
export type { RatingProps } from './rating';

// Timeline
export { Timeline, TimelineItem, TimelineConnector, TimelineDot, TimelineContent, timelineVariants } from './timeline';
export type { TimelineProps, TimelineItemProps, TimelineConnectorProps, TimelineDotProps, TimelineContentProps } from './timeline';

// Tree
export { Tree, TreeItem, treeVariants } from './tree';
export type { TreeProps, TreeItemProps } from './tree';

// Carousel
export { Carousel, CarouselSlides, CarouselSlide, CarouselPrevious, CarouselNext, CarouselDots, carouselVariants } from './carousel';
export type { CarouselProps, CarouselSlidesProps, CarouselSlideProps, CarouselPreviousProps, CarouselNextProps, CarouselDotsProps } from './carousel';

// Popover
export { Popover, PopoverTrigger, PopoverContent, PopoverClose, popoverContentVariants } from './popover';
export type { PopoverProps, PopoverTriggerProps, PopoverContentProps, PopoverCloseProps } from './popover';

// HoverCard
export { HoverCard, HoverCardTrigger, HoverCardContent, hoverCardContentVariants } from './hover-card';
export type { HoverCardProps, HoverCardTriggerProps, HoverCardContentProps } from './hover-card';

// AlertDialog
export { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel, alertDialogOverlayVariants, alertDialogContentVariants } from './alert-dialog';
export type { AlertDialogProps, AlertDialogContentProps, AlertDialogHeaderProps, AlertDialogTitleProps, AlertDialogDescriptionProps, AlertDialogFooterProps, AlertDialogActionProps, AlertDialogCancelProps } from './alert-dialog';

// ContextMenu
export { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuGroup, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent, contextMenuContentVariants, contextMenuItemVariants } from './context-menu';
export type { ContextMenuProps, ContextMenuTriggerProps, ContextMenuContentProps, ContextMenuItemProps, ContextMenuSeparatorProps, ContextMenuSubProps, ContextMenuSubTriggerProps, ContextMenuSubContentProps, ContextMenuGroupProps } from './context-menu';

// Command
export { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut, CommandDialog, commandVariants, commandItemVariants } from './command';
export type { CommandProps, CommandInputProps, CommandListProps, CommandEmptyProps, CommandGroupProps, CommandItemProps, CommandSeparatorProps, CommandShortcutProps, CommandDialogProps } from './command';

// Stepper
export { Stepper, Step, stepperVariants, stepIndicatorVariants } from './stepper';
export type { StepperProps, StepProps } from './stepper';

// NavigationMenu
export { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuIndicator, navigationMenuVariants, navigationMenuTriggerVariants, navigationMenuLinkVariants } from './navigation-menu';
export type { NavigationMenuProps, NavigationMenuListProps, NavigationMenuItemProps, NavigationMenuTriggerProps, NavigationMenuContentProps, NavigationMenuLinkProps, NavigationMenuIndicatorProps } from './navigation-menu';

// NumberInput
export { NumberInput, numberInputWrapperVariants, numberInputVariants } from './number-input';
export type { NumberInputProps } from './number-input';

// PinInput
export { PinInput, PinInputField, pinInputVariants, pinInputFieldVariants } from './pin-input';
export type { PinInputProps, PinInputFieldProps } from './pin-input';

// FileUpload
export { FileUpload, FileItem, fileUploadVariants } from './file-upload';
export type { FileUploadProps, FileItemProps } from './file-upload';

// Combobox
export { Combobox, comboboxTriggerVariants, comboboxContentVariants, comboboxItemVariants } from './combobox';
export type { ComboboxProps, ComboboxOption } from './combobox';

// Calendar
export { Calendar, CalendarRange, calendarVariants, calendarDayVariants } from './calendar';
export type { CalendarProps, CalendarRangeProps } from './calendar';

// DatePicker
export { DatePicker, DateRangePicker, datePickerTriggerVariants } from './date-picker';
export type { DatePickerProps, DateRangePickerProps } from './date-picker';

// ColorPicker
export { ColorPicker, colorPickerTriggerVariants, colorPickerSwatchVariants } from './color-picker';
export type { ColorPickerProps } from './color-picker';
