'use client';

import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Slot
 * ------------------------------------------------------------------------------------------------*/

interface SlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

/**
 * Merges its props onto its immediate child.
 * Used to implement the `asChild` pattern.
 *
 * @example
 * ```tsx
 * // Renders as a button with Slot's className
 * <Slot className="my-class">
 *   <button>Click me</button>
 * </Slot>
 *
 * // Used in components
 * function Button({ asChild, ...props }) {
 *   const Comp = asChild ? Slot : 'button';
 *   return <Comp {...props} />;
 * }
 *
 * // Usage
 * <Button asChild>
 *   <a href="/home">Home</a>
 * </Button>
 * ```
 */
const Slot = forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);

  if (slottable) {
    // The new element to render is the one passed as a child of `Slottable`
    const newElement = slottable.props.children as ReactNode;

    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        // Because the new element will be the one rendered, we are only interested
        // in grabbing its children (`newElement.props.children`)
        if (Children.count(newElement) > 1) return Children.only(null);
        return isValidElement(newElement)
          ? (newElement.props as { children?: ReactNode }).children
          : null;
      } else {
        return child;
      }
    });

    return (
      <SlotClone {...slotProps} ref={forwardedRef}>
        {isValidElement(newElement)
          ? cloneElement(newElement, undefined, newChildren)
          : null}
      </SlotClone>
    );
  }

  return (
    <SlotClone {...slotProps} ref={forwardedRef}>
      {children}
    </SlotClone>
  );
});

Slot.displayName = 'Slot';

/* -------------------------------------------------------------------------------------------------
 * SlotClone
 * ------------------------------------------------------------------------------------------------*/

interface SlotCloneProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

const SlotClone = forwardRef<HTMLElement, SlotCloneProps>(
  (props, forwardedRef) => {
    const { children, ...slotProps } = props;

    if (isValidElement(children)) {
      const childRef = getElementRef(children);
      return cloneElement(children, {
        ...mergeProps(slotProps, children.props as Record<string, unknown>),
        ref: forwardedRef
          ? composeRefs(forwardedRef, childRef)
          : childRef,
      } as Record<string, unknown>);
    }

    return Children.count(children) > 1 ? Children.only(null) : null;
  }
);

SlotClone.displayName = 'SlotClone';

/* -------------------------------------------------------------------------------------------------
 * Slottable
 * ------------------------------------------------------------------------------------------------*/

interface SlottableProps {
  children: ReactNode;
}

const Slottable = ({ children }: SlottableProps) => {
  return <>{children}</>;
};

/* -------------------------------------------------------------------------------------------------
 * Utilities
 * ------------------------------------------------------------------------------------------------*/

type AnyProps = Record<string, unknown>;

function isSlottable(child: ReactNode): child is React.ReactElement<SlottableProps> {
  return isValidElement(child) && child.type === Slottable;
}

function mergeProps(slotProps: AnyProps, childProps: AnyProps): AnyProps {
  // All child props should override
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // If both handlers exist, merge them
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          (childPropValue as (...args: unknown[]) => void)(...args);
          (slotPropValue as (...args: unknown[]) => void)(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === 'style') {
      overrideProps[propName] = { ...(slotPropValue as object), ...(childPropValue as object) };
    } else if (propName === 'className') {
      overrideProps[propName] = cn(slotPropValue as string, childPropValue as string);
    }
  }

  return { ...slotProps, ...overrideProps };
}

function composeRefs<T>(...refs: (Ref<T> | undefined)[]): Ref<T> {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref !== null && ref !== undefined) {
        (ref as React.MutableRefObject<T>).current = node;
      }
    });
  };
}

function getElementRef(element: React.ReactElement): Ref<unknown> | undefined {
  // React 19 uses `ref` as a prop
  // React 18 uses `ref` as a special attribute
  type ElementWithRef = React.ReactElement & {
    ref?: Ref<unknown>;
    props: { ref?: Ref<unknown> };
  };
  
  const elementWithRef = element as ElementWithRef;
  
  // Try React 19 style first, then fall back to React 18
  return elementWithRef.props.ref ?? elementWithRef.ref;
}

export { Slot, Slottable };
export type { SlotProps, SlottableProps };
