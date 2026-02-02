'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

/* -------------------------------------------------------------------------------------------------
 * Portal Types
 * ------------------------------------------------------------------------------------------------*/

export interface PortalProps {
  /**
   * The content to render in the portal
   */
  children: ReactNode;
  /**
   * Custom container element to render the portal into
   * Defaults to document.body
   */
  container?: Element | null;
  /**
   * Key for the portal (useful when rendering multiple portals)
   */
  key?: string | null;
}

/* -------------------------------------------------------------------------------------------------
 * Portal Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A component that renders its children into a different part of the DOM tree.
 *
 * Features:
 * - Renders to document.body by default
 * - Custom container support
 * - SSR safe (renders nothing on server)
 *
 * @example
 * ```tsx
 * // Basic usage - render to body
 * <Portal>
 *   <div className="fixed inset-0 bg-black/50">Modal content</div>
 * </Portal>
 *
 * // Custom container
 * <Portal container={document.getElementById('modals')}>
 *   <div>Rendered in #modals</div>
 * </Portal>
 * ```
 */
function Portal(props: PortalProps) {
  const { children, container, key } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  const portalContainer = container ?? document.body;

  return createPortal(children, portalContainer, key);
}

Portal.displayName = 'Portal';

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Portal };
