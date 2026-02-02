'use client';

import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Pagination Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const paginationVariants = cva(
  ['flex items-center'],
  {
    variants: {
      size: {
        sm: 'gap-1',
        md: 'gap-1.5',
        lg: 'gap-2',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const paginationButtonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-medium',
    'rounded-[var(--radius-md)]',
    'transition-colors duration-fast',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 min-w-8 px-2 text-xs',
        md: 'h-9 min-w-9 px-3 text-sm',
        lg: 'h-10 min-w-10 px-3 text-base',
      },
      variant: {
        default: [
          'bg-transparent text-[var(--fg-muted)]',
          'hover:bg-[var(--bg-muted)] hover:text-[var(--fg)]',
        ],
        outline: [
          'border border-[var(--border)] bg-transparent text-[var(--fg-muted)]',
          'hover:bg-[var(--bg-muted)] hover:text-[var(--fg)]',
        ],
      },
      isActive: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        isActive: true,
        className: 'bg-[var(--primary)] text-white hover:bg-[var(--primary)] hover:text-white',
      },
      {
        variant: 'outline',
        isActive: true,
        className: 'border-[var(--primary)] bg-[var(--primary)] text-white hover:bg-[var(--primary)] hover:text-white',
      },
    ],
    defaultVariants: {
      size: 'md',
      variant: 'default',
      isActive: false,
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Pagination Types
 * ------------------------------------------------------------------------------------------------*/

export interface PaginationProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof paginationVariants> {
  /**
   * Total number of pages
   */
  totalPages: number;
  /**
   * Current page (1-indexed)
   */
  currentPage: number;
  /**
   * Callback when page changes
   */
  onPageChange?: (page: number) => void;
  /**
   * Number of pages to show on each side of current page
   */
  siblingCount?: number;
  /**
   * Whether to show first/last page buttons
   */
  showFirstLast?: boolean;
  /**
   * Whether to show previous/next buttons
   */
  showPrevNext?: boolean;
  /**
   * Custom previous button content
   */
  previousLabel?: ReactNode;
  /**
   * Custom next button content
   */
  nextLabel?: ReactNode;
  /**
   * Visual variant
   */
  variant?: 'default' | 'outline';
}

/* -------------------------------------------------------------------------------------------------
 * Pagination Helpers
 * ------------------------------------------------------------------------------------------------*/

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const DOTS = '...';

const usePaginationRange = (
  totalPages: number,
  currentPage: number,
  siblingCount: number
) => {
  const totalPageNumbers = siblingCount * 2 + 5; // siblings + first + last + current + 2 dots

  // Case 1: Total pages less than page numbers we want to show
  if (totalPageNumbers >= totalPages) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  // Case 2: No left dots, but right dots
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);
    return [...leftRange, DOTS, totalPages];
  }

  // Case 3: No right dots, but left dots
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);
    return [1, DOTS, ...rightRange];
  }

  // Case 4: Both left and right dots
  const middleRange = range(leftSiblingIndex, rightSiblingIndex);
  return [1, DOTS, ...middleRange, DOTS, totalPages];
};

/* -------------------------------------------------------------------------------------------------
 * Pagination Icons
 * ------------------------------------------------------------------------------------------------*/

const ChevronLeft = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ChevronsLeft = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="11 17 6 12 11 7" />
    <polyline points="18 17 13 12 18 7" />
  </svg>
);

const ChevronsRight = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <polyline points="13 17 18 12 13 7" />
    <polyline points="6 17 11 12 6 7" />
  </svg>
);

/* -------------------------------------------------------------------------------------------------
 * Pagination Component
 * ------------------------------------------------------------------------------------------------*/

const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (props, ref) => {
    const {
      className,
      size,
      variant = 'default',
      totalPages,
      currentPage,
      onPageChange,
      siblingCount = 1,
      showFirstLast = true,
      showPrevNext = true,
      previousLabel = <ChevronLeft />,
      nextLabel = <ChevronRight />,
      ...restProps
    } = props;

    const paginationRange = usePaginationRange(totalPages, currentPage, siblingCount);

    if (totalPages <= 1) return null;

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        onPageChange?.(page);
      }
    };

    return (
      <nav ref={ref} aria-label="Pagination" {...restProps}>
        <ul className={cn(paginationVariants({ size }), className)}>
          {/* First page button */}
          {showFirstLast && (
            <li>
              <button
                type="button"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className={cn(paginationButtonVariants({ size, variant }))}
                aria-label="Go to first page"
              >
                <ChevronsLeft />
              </button>
            </li>
          )}

          {/* Previous button */}
          {showPrevNext && (
            <li>
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={cn(paginationButtonVariants({ size, variant }))}
                aria-label="Go to previous page"
              >
                {previousLabel}
              </button>
            </li>
          )}

          {/* Page numbers */}
          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
              return (
                <li key={`dots-${index}`}>
                  <span className={cn(paginationButtonVariants({ size, variant }), 'pointer-events-none')}>
                    {DOTS}
                  </span>
                </li>
              );
            }

            return (
              <li key={pageNumber}>
                <button
                  type="button"
                  onClick={() => handlePageChange(pageNumber as number)}
                  className={cn(paginationButtonVariants({ size, variant, isActive: pageNumber === currentPage }))}
                  aria-label={`Go to page ${pageNumber}`}
                  aria-current={pageNumber === currentPage ? 'page' : undefined}
                >
                  {pageNumber}
                </button>
              </li>
            );
          })}

          {/* Next button */}
          {showPrevNext && (
            <li>
              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={cn(paginationButtonVariants({ size, variant }))}
                aria-label="Go to next page"
              >
                {nextLabel}
              </button>
            </li>
          )}

          {/* Last page button */}
          {showFirstLast && (
            <li>
              <button
                type="button"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={cn(paginationButtonVariants({ size, variant }))}
                aria-label="Go to last page"
              >
                <ChevronsRight />
              </button>
            </li>
          )}
        </ul>
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Pagination, paginationVariants, paginationButtonVariants };
