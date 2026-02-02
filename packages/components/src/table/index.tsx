'use client';

import {
  forwardRef,
  createContext,
  useContext,
  type HTMLAttributes,
  type ThHTMLAttributes,
  type TdHTMLAttributes,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Table Context
 * ------------------------------------------------------------------------------------------------*/

interface TableContextValue {
  size: 'sm' | 'md' | 'lg';
  variant: 'default' | 'striped';
}

const TableContext = createContext<TableContextValue>({
  size: 'md',
  variant: 'default',
});

const useTableContext = () => useContext(TableContext);

/* -------------------------------------------------------------------------------------------------
 * Table Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const tableVariants = cva(
  ['w-full caption-bottom text-sm'],
  {
    variants: {
      variant: {
        default: '',
        striped: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const tableHeaderVariants = cva(
  ['[&_tr]:border-b']
);

const tableBodyVariants = cva(
  ['[&_tr:last-child]:border-0'],
  {
    variants: {
      variant: {
        default: '',
        striped: '[&_tr:nth-child(even)]:bg-[var(--bg-muted)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const tableFooterVariants = cva(
  ['border-t bg-[var(--bg-muted)]/50 font-medium [&>tr]:last:border-b-0']
);

const tableRowVariants = cva(
  [
    'border-b border-[var(--border)]',
    'transition-colors',
    'hover:bg-[var(--bg-muted)]/50',
    'data-[state=selected]:bg-[var(--bg-muted)]',
  ]
);

const tableHeadVariants = cva(
  [
    'text-left align-middle font-medium text-[var(--fg-muted)]',
    '[&:has([role=checkbox])]:pr-0',
  ],
  {
    variants: {
      size: {
        sm: 'h-10 px-3',
        md: 'h-12 px-4',
        lg: 'h-14 px-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const tableCellVariants = cva(
  ['align-middle [&:has([role=checkbox])]:pr-0'],
  {
    variants: {
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const tableCaptionVariants = cva(
  ['mt-4 text-sm text-[var(--fg-muted)]']
);

/* -------------------------------------------------------------------------------------------------
 * Table Types
 * ------------------------------------------------------------------------------------------------*/

export interface TableProps
  extends HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  /**
   * Size of the table cells
   */
  size?: 'sm' | 'md' | 'lg';
}

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {}
export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}
export interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {}
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /**
   * Whether the row is selected
   */
  isSelected?: boolean;
}
export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {}
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {}
export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {}

/* -------------------------------------------------------------------------------------------------
 * Table Component
 * ------------------------------------------------------------------------------------------------*/

const Table = forwardRef<HTMLTableElement, TableProps>(
  (props, ref) => {
    const { className, variant = 'default', size = 'md', children, ...restProps } = props;

    return (
      <TableContext.Provider value={{ size: size ?? 'md', variant: variant ?? 'default' }}>
        <div className="relative w-full overflow-auto">
          <table
            ref={ref}
            className={cn(tableVariants({ variant }), className)}
            {...restProps}
          >
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  }
);

Table.displayName = 'Table';

/* -------------------------------------------------------------------------------------------------
 * TableHeader Component
 * ------------------------------------------------------------------------------------------------*/

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <thead
        ref={ref}
        className={cn(tableHeaderVariants(), className)}
        {...restProps}
      />
    );
  }
);

TableHeader.displayName = 'TableHeader';

/* -------------------------------------------------------------------------------------------------
 * TableBody Component
 * ------------------------------------------------------------------------------------------------*/

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  (props, ref) => {
    const { className, ...restProps } = props;
    const { variant } = useTableContext();

    return (
      <tbody
        ref={ref}
        className={cn(tableBodyVariants({ variant }), className)}
        {...restProps}
      />
    );
  }
);

TableBody.displayName = 'TableBody';

/* -------------------------------------------------------------------------------------------------
 * TableFooter Component
 * ------------------------------------------------------------------------------------------------*/

const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <tfoot
        ref={ref}
        className={cn(tableFooterVariants(), className)}
        {...restProps}
      />
    );
  }
);

TableFooter.displayName = 'TableFooter';

/* -------------------------------------------------------------------------------------------------
 * TableRow Component
 * ------------------------------------------------------------------------------------------------*/

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  (props, ref) => {
    const { className, isSelected, ...restProps } = props;

    return (
      <tr
        ref={ref}
        data-state={isSelected ? 'selected' : undefined}
        className={cn(tableRowVariants(), className)}
        {...restProps}
      />
    );
  }
);

TableRow.displayName = 'TableRow';

/* -------------------------------------------------------------------------------------------------
 * TableHead Component
 * ------------------------------------------------------------------------------------------------*/

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  (props, ref) => {
    const { className, ...restProps } = props;
    const { size } = useTableContext();

    return (
      <th
        ref={ref}
        className={cn(tableHeadVariants({ size }), className)}
        {...restProps}
      />
    );
  }
);

TableHead.displayName = 'TableHead';

/* -------------------------------------------------------------------------------------------------
 * TableCell Component
 * ------------------------------------------------------------------------------------------------*/

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  (props, ref) => {
    const { className, ...restProps } = props;
    const { size } = useTableContext();

    return (
      <td
        ref={ref}
        className={cn(tableCellVariants({ size }), className)}
        {...restProps}
      />
    );
  }
);

TableCell.displayName = 'TableCell';

/* -------------------------------------------------------------------------------------------------
 * TableCaption Component
 * ------------------------------------------------------------------------------------------------*/

const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    return (
      <caption
        ref={ref}
        className={cn(tableCaptionVariants(), className)}
        {...restProps}
      />
    );
  }
);

TableCaption.displayName = 'TableCaption';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  tableVariants,
  tableHeaderVariants,
  tableBodyVariants,
  tableFooterVariants,
  tableRowVariants,
  tableHeadVariants,
  tableCellVariants,
  tableCaptionVariants,
};
