'use client';

import {
  forwardRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Avatar Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const avatarVariants = cva(
  // Base styles
  [
    'relative inline-flex items-center justify-center shrink-0 overflow-hidden',
    'bg-[var(--bg-muted)]',
  ],
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-xl',
        '2xl': 'h-20 w-20 text-2xl',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-[var(--radius-md)]',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'circle',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Avatar Types
 * ------------------------------------------------------------------------------------------------*/

export interface AvatarProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  /**
   * Image source
   */
  src?: string;
  /**
   * Alt text for the image
   */
  alt?: string;
  /**
   * Fallback text (initials) when no image
   */
  fallback?: string;
  /**
   * Custom fallback element
   */
  fallbackElement?: ReactNode;
  /**
   * Whether to show a border
   */
  bordered?: boolean;
  /**
   * Border color
   */
  borderColor?: string;
  /**
   * Status indicator
   */
  status?: 'online' | 'offline' | 'away' | 'busy';
}

/* -------------------------------------------------------------------------------------------------
 * Avatar Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * An avatar component for displaying user images with fallback support.
 *
 * Features:
 * - Image loading with fallback
 * - Initials fallback generation
 * - Status indicator
 * - Multiple sizes and shapes
 *
 * @example
 * ```tsx
 * // With image
 * <Avatar src="/user.jpg" alt="John Doe" />
 *
 * // With fallback initials
 * <Avatar fallback="JD" />
 *
 * // With status
 * <Avatar src="/user.jpg" status="online" />
 *
 * // Square shape
 * <Avatar src="/user.jpg" shape="square" />
 * ```
 */
const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (props, ref) => {
    const {
      className,
      size,
      shape,
      src,
      alt,
      fallback,
      fallbackElement,
      bordered,
      borderColor,
      status,
      ...restProps
    } = props;

    const [imageError, setImageError] = useState(false);
    const showImage = src && !imageError;

    // Generate initials from fallback text
    const initials = fallback
      ?.split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    // Status indicator colors
    const statusColors = {
      online: 'bg-[var(--success)]',
      offline: 'bg-[var(--fg-subtle)]',
      away: 'bg-[var(--warning)]',
      busy: 'bg-[var(--danger)]',
    };

    // Status indicator sizes
    const statusSizes = {
      xs: 'h-1.5 w-1.5 border',
      sm: 'h-2 w-2 border',
      md: 'h-2.5 w-2.5 border-2',
      lg: 'h-3 w-3 border-2',
      xl: 'h-4 w-4 border-2',
      '2xl': 'h-5 w-5 border-2',
    };

    return (
      <span
        ref={ref}
        className={cn(
          avatarVariants({ size, shape }),
          bordered && 'ring-2 ring-[var(--bg)] ring-offset-2 ring-offset-[var(--bg)]',
          className
        )}
        style={{
          borderColor: borderColor,
        }}
        {...restProps}
      >
        {/* Image */}
        {showImage && (
          <img
            src={src}
            alt={alt ?? ''}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        )}

        {/* Fallback */}
        {!showImage && (
          <>
            {fallbackElement ?? (
              <span className="font-medium text-[var(--fg-muted)]">
                {initials ?? (
                  <DefaultAvatarIcon className={cn(
                    size === 'xs' && 'h-4 w-4',
                    size === 'sm' && 'h-5 w-5',
                    size === 'md' && 'h-6 w-6',
                    size === 'lg' && 'h-7 w-7',
                    size === 'xl' && 'h-10 w-10',
                    size === '2xl' && 'h-12 w-12'
                  )} />
                )}
              </span>
            )}
          </>
        )}

        {/* Status indicator */}
        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 rounded-full border-[var(--bg)]',
              statusColors[status],
              statusSizes[size ?? 'md']
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';

/* -------------------------------------------------------------------------------------------------
 * AvatarGroup Component
 * ------------------------------------------------------------------------------------------------*/

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Avatar children
   */
  children: ReactNode;
  /**
   * Maximum number of avatars to show
   */
  max?: number;
  /**
   * Size of all avatars in the group
   */
  size?: AvatarProps['size'];
  /**
   * Spacing between avatars (negative value for overlap)
   */
  spacing?: string;
}

/**
 * A group of avatars with overlap and "+N" indicator.
 *
 * @example
 * ```tsx
 * <AvatarGroup max={3}>
 *   <Avatar src="/user1.jpg" />
 *   <Avatar src="/user2.jpg" />
 *   <Avatar src="/user3.jpg" />
 *   <Avatar src="/user4.jpg" />
 *   <Avatar src="/user5.jpg" />
 * </AvatarGroup>
 * ```
 */
const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (props, ref) => {
    const {
      className,
      children,
      max,
      size = 'md',
      spacing = '-0.75rem',
      ...restProps
    } = props;

    // Convert children to array
    const childArray = Array.isArray(children) ? children : [children];
    const totalCount = childArray.length;
    const visibleCount = max ? Math.min(max, totalCount) : totalCount;
    const remainingCount = totalCount - visibleCount;

    return (
      <div
        ref={ref}
        className={cn('flex items-center', className)}
        role="group"
        aria-label={`Group of ${totalCount} avatars`}
        {...restProps}
      >
        {childArray.slice(0, visibleCount).map((child, index) => (
          <div
            key={index}
            className="relative ring-2 ring-[var(--bg)] rounded-full"
            style={{
              marginLeft: index === 0 ? 0 : spacing,
              zIndex: visibleCount - index,
            }}
          >
            {child}
          </div>
        ))}

        {/* Remaining count indicator */}
        {remainingCount > 0 && (
          <span
            className={cn(
              avatarVariants({ size, shape: 'circle' }),
              'ring-2 ring-[var(--bg)]',
              'bg-[var(--bg-emphasized)] text-[var(--fg-muted)] font-medium'
            )}
            style={{
              marginLeft: spacing,
              zIndex: 0,
            }}
          >
            +{remainingCount}
          </span>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

/* -------------------------------------------------------------------------------------------------
 * Default Avatar Icon
 * ------------------------------------------------------------------------------------------------*/

function DefaultAvatarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn('text-[var(--fg-muted)]', className)}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Avatar, AvatarGroup, avatarVariants };
