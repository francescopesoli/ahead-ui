'use client';

import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * Code Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const codeVariants = cva(
  ['font-mono'],
  {
    variants: {
      variant: {
        inline: [
          'inline-block px-1.5 py-0.5',
          'text-sm',
          'rounded-[var(--radius-sm)]',
          'bg-[var(--bg-muted)]',
          'text-[var(--fg)]',
          'border border-[var(--border)]',
        ],
        block: [
          'block w-full overflow-x-auto',
          'text-sm',
          'rounded-[var(--radius-md)]',
          'bg-[var(--bg-muted)]',
          'border border-[var(--border)]',
        ],
      },
    },
    defaultVariants: {
      variant: 'inline',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * Code Types
 * ------------------------------------------------------------------------------------------------*/

export interface CodeProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof codeVariants> {
  /**
   * The code content
   */
  children?: ReactNode;
}

export interface CodeBlockProps extends Omit<HTMLAttributes<HTMLPreElement>, 'children'> {
  /**
   * The code content (as string for line numbers)
   */
  children: string;
  /**
   * Show line numbers
   */
  showLineNumbers?: boolean;
  /**
   * Show copy button
   */
  showCopyButton?: boolean;
  /**
   * Starting line number
   */
  startingLineNumber?: number;
  /**
   * Highlight specific lines (1-indexed)
   */
  highlightLines?: number[];
  /**
   * Language label to display
   */
  language?: string;
}

/* -------------------------------------------------------------------------------------------------
 * Code Component (Inline)
 * ------------------------------------------------------------------------------------------------*/

/**
 * An inline code component for displaying code snippets.
 *
 * @example
 * ```tsx
 * <p>Use the <Code>useState</Code> hook for state management.</p>
 * ```
 */
const Code = forwardRef<HTMLElement, CodeProps>(
  (props, ref) => {
    const { className, children, variant = 'inline', ...restProps } = props;

    return (
      <code
        ref={ref}
        className={cn(codeVariants({ variant }), className)}
        {...restProps}
      >
        {children}
      </code>
    );
  }
);

Code.displayName = 'Code';

/* -------------------------------------------------------------------------------------------------
 * CodeBlock Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A code block component for displaying multi-line code with optional features.
 *
 * Features:
 * - Line numbers
 * - Copy to clipboard button
 * - Line highlighting
 * - Language label
 *
 * @example
 * ```tsx
 * // Basic block
 * <CodeBlock>
 * {`function hello() {
 *   console.log('Hello, world!');
 * }`}
 * </CodeBlock>
 *
 * // With line numbers and copy button
 * <CodeBlock showLineNumbers showCopyButton language="javascript">
 * {`const x = 1;
 * const y = 2;
 * console.log(x + y);`}
 * </CodeBlock>
 *
 * // Highlight specific lines
 * <CodeBlock highlightLines={[2, 3]}>
 * {`line 1
 * line 2 (highlighted)
 * line 3 (highlighted)
 * line 4`}
 * </CodeBlock>
 * ```
 */
const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(
  (props, ref) => {
    const {
      className,
      children,
      showLineNumbers = false,
      showCopyButton = false,
      startingLineNumber = 1,
      highlightLines = [],
      language,
      ...restProps
    } = props;

    const [copied, setCopied] = useState(false);

    const lines = children.split('\n');

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

    return (
      <div className="relative group">
        {/* Header with language label and copy button */}
        {(language || showCopyButton) && (
          <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[var(--bg-subtle)] rounded-t-[var(--radius-md)]">
            {language && (
              <span className="text-xs font-medium text-[var(--fg-muted)]">
                {language}
              </span>
            )}
            {showCopyButton && (
              <button
                onClick={handleCopy}
                className={cn(
                  'text-xs px-2 py-1 rounded-[var(--radius-sm)]',
                  'text-[var(--fg-muted)] hover:text-[var(--fg)]',
                  'hover:bg-[var(--bg-muted)]',
                  'transition-colors duration-fast'
                )}
                aria-label={copied ? 'Copied!' : 'Copy code'}
              >
                {copied ? (
                  <span className="flex items-center gap-1">
                    <CheckIcon className="h-3 w-3" />
                    Copied!
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <CopyIcon className="h-3 w-3" />
                    Copy
                  </span>
                )}
              </button>
            )}
          </div>
        )}

        <pre
          ref={ref}
          className={cn(
            codeVariants({ variant: 'block' }),
            (language || showCopyButton) && 'rounded-t-none',
            className
          )}
          {...restProps}
        >
          <code className="block p-4">
            {lines.map((line, index) => {
              const lineNumber = startingLineNumber + index;
              const isHighlighted = highlightLines.includes(lineNumber);

              return (
                <div
                  key={index}
                  className={cn(
                    'flex',
                    isHighlighted && 'bg-[var(--primary)]/10 -mx-4 px-4'
                  )}
                >
                  {showLineNumbers && (
                    <span
                      className="inline-block w-8 pr-4 text-right text-[var(--fg-muted)] select-none"
                      aria-hidden="true"
                    >
                      {lineNumber}
                    </span>
                  )}
                  <span className="flex-1">{line || ' '}</span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    );
  }
);

CodeBlock.displayName = 'CodeBlock';

/* -------------------------------------------------------------------------------------------------
 * Icons
 * ------------------------------------------------------------------------------------------------*/

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { Code, CodeBlock, codeVariants };
