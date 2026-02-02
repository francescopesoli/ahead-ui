'use client';

import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  type HTMLAttributes,
} from 'react';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Resizable Context
 * ------------------------------------------------------------------------------------------------*/

interface PanelData {
  id: string;
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
  collapsible?: boolean;
  collapsedSize?: number;
}

interface ResizableContextValue {
  direction: 'horizontal' | 'vertical';
  panels: Map<string, PanelData>;
  sizes: Map<string, number>;
  registerPanel: (id: string, data: PanelData) => void;
  unregisterPanel: (id: string) => void;
  resize: (handleId: string, delta: number) => void;
  getPanelSize: (id: string) => number;
}

const ResizableContext = createContext<ResizableContextValue | null>(null);

const useResizableContext = () => {
  const context = useContext(ResizableContext);
  if (!context) {
    throw new Error('ResizablePanel/ResizableHandle must be used within a ResizablePanelGroup');
  }
  return context;
};

/* -------------------------------------------------------------------------------------------------
 * Resizable Types
 * ------------------------------------------------------------------------------------------------*/

export interface ResizablePanelGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The direction of the panel group
   */
  direction: 'horizontal' | 'vertical';
  /**
   * Callback when panel sizes change
   */
  onLayout?: (sizes: number[]) => void;
  /**
   * Storage key for persisting layout
   */
  autoSaveId?: string;
}

export interface ResizablePanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Unique identifier for the panel
   */
  id?: string;
  /**
   * Default size as a percentage (0-100)
   */
  defaultSize?: number;
  /**
   * Minimum size as a percentage (0-100)
   */
  minSize?: number;
  /**
   * Maximum size as a percentage (0-100)
   */
  maxSize?: number;
  /**
   * Whether the panel can be collapsed
   */
  collapsible?: boolean;
  /**
   * Size when collapsed as a percentage
   */
  collapsedSize?: number;
  /**
   * Order index for the panel
   */
  order?: number;
}

export interface ResizableHandleProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to show a visible handle grip
   */
  withHandle?: boolean;
  /**
   * Whether the handle is disabled
   */
  disabled?: boolean;
}

/* -------------------------------------------------------------------------------------------------
 * ResizablePanelGroup Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A container for resizable panels.
 *
 * Features:
 * - Horizontal and vertical layouts
 * - Min/max size constraints
 * - Collapsible panels
 * - Keyboard accessible
 *
 * @example
 * ```tsx
 * <ResizablePanelGroup direction="horizontal">
 *   <ResizablePanel defaultSize={25}>
 *     <Sidebar />
 *   </ResizablePanel>
 *   <ResizableHandle withHandle />
 *   <ResizablePanel defaultSize={75}>
 *     <MainContent />
 *   </ResizablePanel>
 * </ResizablePanelGroup>
 * ```
 */
const ResizablePanelGroup = forwardRef<HTMLDivElement, ResizablePanelGroupProps>(
  (props, ref) => {
    const {
      className,
      children,
      direction,
      onLayout,
      autoSaveId,
      ...restProps
    } = props;

    const [panels] = useState<Map<string, PanelData>>(() => new Map());
    const [sizes, setSizes] = useState<Map<string, number>>(() => new Map());
    const panelOrder = useRef<string[]>([]);

    // Load saved layout
    useEffect(() => {
      if (autoSaveId) {
        try {
          const saved = localStorage.getItem(`resizable-${autoSaveId}`);
          if (saved) {
            const savedSizes = JSON.parse(saved);
            setSizes(new Map(Object.entries(savedSizes)));
          }
        } catch {
          // Ignore errors
        }
      }
    }, [autoSaveId]);

    // Save layout
    useEffect(() => {
      if (autoSaveId && sizes.size > 0) {
        try {
          const toSave = Object.fromEntries(sizes);
          localStorage.setItem(`resizable-${autoSaveId}`, JSON.stringify(toSave));
        } catch {
          // Ignore errors
        }
      }
    }, [autoSaveId, sizes]);

    const registerPanel = useCallback((id: string, data: PanelData) => {
      panels.set(id, data);
      if (!panelOrder.current.includes(id)) {
        panelOrder.current.push(id);
      }
      if (data.defaultSize !== undefined && !sizes.has(id)) {
        setSizes(prev => new Map(prev).set(id, data.defaultSize!));
      }
    }, [panels, sizes]);

    const unregisterPanel = useCallback((id: string) => {
      panels.delete(id);
      panelOrder.current = panelOrder.current.filter(p => p !== id);
    }, [panels]);

    const getPanelSize = useCallback((id: string): number => {
      return sizes.get(id) ?? panels.get(id)?.defaultSize ?? 50;
    }, [sizes, panels]);

    const resize = useCallback((handleId: string, delta: number) => {
      const order = panelOrder.current;
      const handleIndex = parseInt(handleId.replace('handle-', ''));

      if (handleIndex < 0 || handleIndex >= order.length - 1) return;

      const beforeId = order[handleIndex];
      const afterId = order[handleIndex + 1];

      if (!beforeId || !afterId) return;

      const beforePanel = panels.get(beforeId);
      const afterPanel = panels.get(afterId);

      if (!beforePanel || !afterPanel) return;

      const beforeSize = getPanelSize(beforeId);
      const afterSize = getPanelSize(afterId);

      let newBeforeSize = beforeSize + delta;
      let newAfterSize = afterSize - delta;

      // Apply constraints
      const beforeMin = beforePanel.minSize ?? 0;
      const beforeMax = beforePanel.maxSize ?? 100;
      const afterMin = afterPanel.minSize ?? 0;
      const afterMax = afterPanel.maxSize ?? 100;

      newBeforeSize = Math.max(beforeMin, Math.min(beforeMax, newBeforeSize));
      newAfterSize = Math.max(afterMin, Math.min(afterMax, newAfterSize));

      // Adjust if constraints were hit
      const totalSize = beforeSize + afterSize;
      if (newBeforeSize + newAfterSize !== totalSize) {
        if (newBeforeSize === beforeMin || newBeforeSize === beforeMax) {
          newAfterSize = totalSize - newBeforeSize;
        } else {
          newBeforeSize = totalSize - newAfterSize;
        }
      }

      setSizes(prev => {
        const next = new Map(prev);
        next.set(beforeId, newBeforeSize);
        next.set(afterId, newAfterSize);
        return next;
      });

      if (onLayout) {
        const allSizes = order.map(id => sizes.get(id) ?? panels.get(id)?.defaultSize ?? 50);
        onLayout(allSizes);
      }
    }, [panels, getPanelSize, onLayout, sizes]);

    return (
      <ResizableContext.Provider
        value={{ direction, panels, sizes, registerPanel, unregisterPanel, resize, getPanelSize }}
      >
        <div
          ref={ref}
          className={cn(
            'flex h-full w-full',
            direction === 'horizontal' ? 'flex-row' : 'flex-col',
            className
          )}
          data-panel-group=""
          data-direction={direction}
          {...restProps}
        >
          {children}
        </div>
      </ResizableContext.Provider>
    );
  }
);

ResizablePanelGroup.displayName = 'ResizablePanelGroup';

/* -------------------------------------------------------------------------------------------------
 * ResizablePanel Component
 * ------------------------------------------------------------------------------------------------*/

let panelIdCounter = 0;

const ResizablePanel = forwardRef<HTMLDivElement, ResizablePanelProps>(
  (props, ref) => {
    const {
      className,
      children,
      id: propId,
      defaultSize = 50,
      minSize,
      maxSize,
      collapsible,
      collapsedSize,
      order,
      ...restProps
    } = props;

    const { direction, registerPanel, unregisterPanel, getPanelSize } = useResizableContext();
    const idRef = useRef(propId ?? `panel-${panelIdCounter++}`);
    const id = idRef.current;

    useEffect(() => {
      registerPanel(id, { id, defaultSize, minSize, maxSize, collapsible, collapsedSize });
      return () => unregisterPanel(id);
    }, [id, defaultSize, minSize, maxSize, collapsible, collapsedSize, registerPanel, unregisterPanel]);

    const size = getPanelSize(id);
    const style = direction === 'horizontal'
      ? { width: `${size}%`, minWidth: minSize ? `${minSize}%` : undefined }
      : { height: `${size}%`, minHeight: minSize ? `${minSize}%` : undefined };

    return (
      <div
        ref={ref}
        className={cn('overflow-hidden', className)}
        data-panel=""
        data-panel-id={id}
        style={{ ...style, flexShrink: 0 }}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);

ResizablePanel.displayName = 'ResizablePanel';

/* -------------------------------------------------------------------------------------------------
 * ResizableHandle Component
 * ------------------------------------------------------------------------------------------------*/

let handleIdCounter = 0;

const ResizableHandle = forwardRef<HTMLDivElement, ResizableHandleProps>(
  (props, ref) => {
    const { className, withHandle, disabled, ...restProps } = props;
    const { direction, resize } = useResizableContext();
    const idRef = useRef(`handle-${handleIdCounter++}`);
    const isDragging = useRef(false);
    const startPos = useRef(0);

    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      isDragging.current = true;
      startPos.current = direction === 'horizontal' ? e.clientX : e.clientY;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
      if (!isDragging.current) return;

      const currentPos = direction === 'horizontal' ? e.clientX : e.clientY;
      const delta = ((currentPos - startPos.current) / window.innerWidth) * 100;

      if (Math.abs(delta) > 0.1) {
        resize(idRef.current, delta);
        startPos.current = currentPos;
      }
    }, [direction, resize]);

    const handleMouseUp = useCallback(() => {
      isDragging.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      const step = e.shiftKey ? 5 : 1;

      if (direction === 'horizontal') {
        if (e.key === 'ArrowLeft') {
          resize(idRef.current, -step);
        } else if (e.key === 'ArrowRight') {
          resize(idRef.current, step);
        }
      } else {
        if (e.key === 'ArrowUp') {
          resize(idRef.current, -step);
        } else if (e.key === 'ArrowDown') {
          resize(idRef.current, step);
        }
      }
    };

    return (
      <div
        ref={ref}
        role="separator"
        tabIndex={disabled ? -1 : 0}
        aria-orientation={direction === 'horizontal' ? 'vertical' : 'horizontal'}
        data-panel-resize-handle=""
        data-direction={direction}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative flex items-center justify-center',
          'bg-[var(--border)]',
          'transition-colors duration-fast',
          'hover:bg-[var(--border-emphasized)]',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2',
          direction === 'horizontal' ? 'w-px cursor-col-resize' : 'h-px cursor-row-resize',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        {...restProps}
      >
        {withHandle && (
          <div
            className={cn(
              'flex items-center justify-center',
              'rounded-[var(--radius-sm)]',
              'bg-[var(--border)]',
              'z-10',
              direction === 'horizontal'
                ? 'h-8 w-1 hover:w-1.5'
                : 'h-1 w-8 hover:h-1.5',
              'transition-all duration-fast'
            )}
          >
            <GripIcon direction={direction} />
          </div>
        )}
      </div>
    );
  }
);

ResizableHandle.displayName = 'ResizableHandle';

/* -------------------------------------------------------------------------------------------------
 * Grip Icon
 * ------------------------------------------------------------------------------------------------*/

function GripIcon({ direction }: { direction: 'horizontal' | 'vertical' }) {
  return (
    <svg
      className={cn(
        'text-[var(--fg-muted)]',
        direction === 'horizontal' ? 'h-4 w-2' : 'h-2 w-4'
      )}
      viewBox="0 0 6 16"
      fill="currentColor"
    >
      {direction === 'horizontal' ? (
        <>
          <circle cx="1.5" cy="3" r="1" />
          <circle cx="4.5" cy="3" r="1" />
          <circle cx="1.5" cy="8" r="1" />
          <circle cx="4.5" cy="8" r="1" />
          <circle cx="1.5" cy="13" r="1" />
          <circle cx="4.5" cy="13" r="1" />
        </>
      ) : (
        <>
          <circle cx="3" cy="1.5" r="1" />
          <circle cx="8" cy="1.5" r="1" />
          <circle cx="13" cy="1.5" r="1" />
          <circle cx="3" cy="4.5" r="1" />
          <circle cx="8" cy="4.5" r="1" />
          <circle cx="13" cy="4.5" r="1" />
        </>
      )}
    </svg>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
