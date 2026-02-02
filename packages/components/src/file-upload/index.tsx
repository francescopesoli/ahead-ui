'use client';

import {
  forwardRef,
  useState,
  useRef,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ahead-ui/core';

/* -------------------------------------------------------------------------------------------------
 * FileUpload Styles (CVA)
 * ------------------------------------------------------------------------------------------------*/

const fileUploadVariants = cva(
  [
    'relative flex flex-col items-center justify-center',
    'border-2 border-dashed border-[var(--border)]',
    'rounded-[var(--radius-lg)]',
    'transition-colors duration-fast',
    'cursor-pointer',
    'focus-within:ring-2 focus-within:ring-[var(--ring)] focus-within:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        dropzone: 'p-8 min-h-[200px]',
        button: 'p-4 flex-row gap-4',
      },
      isDragging: {
        true: 'border-[var(--primary)] bg-[var(--primary)]/5',
      },
      isDisabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
      isInvalid: {
        true: 'border-[var(--danger)]',
      },
    },
    defaultVariants: {
      variant: 'dropzone',
    },
  }
);

/* -------------------------------------------------------------------------------------------------
 * FileUpload Types
 * ------------------------------------------------------------------------------------------------*/

export interface FileUploadProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'onError'>,
    VariantProps<typeof fileUploadVariants> {
  /**
   * Callback when files are selected
   */
  onChange?: (files: File[]) => void;
  /**
   * Callback when file validation fails
   */
  onError?: (error: string) => void;
  /**
   * Accepted file types (e.g., 'image/*', '.pdf')
   */
  accept?: string;
  /**
   * Allow multiple file selection
   */
  multiple?: boolean;
  /**
   * Maximum file size in bytes
   */
  maxSize?: number;
  /**
   * Maximum number of files
   */
  maxFiles?: number;
  /**
   * Whether the upload is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether the upload has an error
   */
  isInvalid?: boolean;
  /**
   * Custom dropzone content
   */
  children?: ReactNode;
  /**
   * Helper text to display
   */
  helperText?: ReactNode;
  /**
   * Error message
   */
  errorMessage?: ReactNode;
}

export interface FileItemProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The file to display
   */
  file: File;
  /**
   * Callback to remove the file
   */
  onRemove?: () => void;
  /**
   * Upload progress (0-100)
   */
  progress?: number;
  /**
   * Whether the file is uploading
   */
  isUploading?: boolean;
  /**
   * Whether the upload failed
   */
  isError?: boolean;
}

/* -------------------------------------------------------------------------------------------------
 * FileUpload Component
 * ------------------------------------------------------------------------------------------------*/

/**
 * A file upload component with drag & drop support.
 *
 * Features:
 * - Drag & drop file selection
 * - Click to browse
 * - File type validation
 * - Size validation
 * - Multiple file support
 * - Progress tracking
 *
 * @example
 * ```tsx
 * // Basic dropzone
 * <FileUpload onChange={(files) => handleUpload(files)} />
 *
 * // With constraints
 * <FileUpload
 *   accept="image/*"
 *   maxSize={5 * 1024 * 1024} // 5MB
 *   maxFiles={5}
 *   multiple
 *   onChange={handleUpload}
 * />
 *
 * // Button variant
 * <FileUpload variant="button" accept=".pdf">
 *   <span>Choose PDF file</span>
 * </FileUpload>
 *
 * // With file list
 * <FileUpload onChange={handleUpload}>
 *   {files.map((file) => (
 *     <FileItem key={file.name} file={file} onRemove={() => removeFile(file)} />
 *   ))}
 * </FileUpload>
 * ```
 */
const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  (props, ref) => {
    const {
      className,
      variant = 'dropzone',
      onChange,
      onError,
      accept,
      multiple = false,
      maxSize,
      maxFiles = 10,
      isDisabled = false,
      isInvalid,
      children,
      helperText,
      errorMessage,
      ...restProps
    } = props;

    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const validateFiles = useCallback((files: File[]): File[] => {
      let validFiles = [...files];

      // Check max files
      if (validFiles.length > maxFiles) {
        onError?.(`Maximum ${maxFiles} files allowed`);
        validFiles = validFiles.slice(0, maxFiles);
      }

      // Check file size
      if (maxSize) {
        const oversized = validFiles.filter(f => f.size > maxSize);
        if (oversized.length > 0) {
          onError?.(`File size must be less than ${formatFileSize(maxSize)}`);
          validFiles = validFiles.filter(f => f.size <= maxSize);
        }
      }

      return validFiles;
    }, [maxFiles, maxSize, onError]);

    const handleFiles = useCallback((fileList: FileList | null) => {
      if (!fileList || isDisabled) return;

      const files = Array.from(fileList);
      const validFiles = validateFiles(files);

      if (validFiles.length > 0) {
        onChange?.(validFiles);
      }
    }, [isDisabled, validateFiles, onChange]);

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDisabled) setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (!isDisabled) {
        handleFiles(e.dataTransfer.files);
      }
    };

    const handleClick = () => {
      if (!isDisabled) {
        inputRef.current?.click();
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
      // Reset input value to allow selecting the same file again
      e.target.value = '';
    };

    return (
      <div className="flex flex-col gap-2">
        <div
          ref={ref}
          onClick={handleClick}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={cn(
            fileUploadVariants({ variant, isDragging, isDisabled, isInvalid }),
            className
          )}
          {...restProps}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleInputChange}
            disabled={isDisabled}
            className="sr-only"
            aria-label="File upload"
          />

          {children || (
            <DefaultDropzoneContent
              variant={variant}
              isDragging={isDragging}
              accept={accept}
              multiple={multiple}
            />
          )}
        </div>

        {errorMessage && (
          <p className="text-sm text-[var(--danger)]">{errorMessage}</p>
        )}

        {helperText && !errorMessage && (
          <p className="text-sm text-[var(--fg-muted)]">{helperText}</p>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

/* -------------------------------------------------------------------------------------------------
 * DefaultDropzoneContent Component
 * ------------------------------------------------------------------------------------------------*/

interface DefaultDropzoneContentProps {
  variant: 'dropzone' | 'button' | null | undefined;
  isDragging: boolean;
  accept?: string;
  multiple?: boolean;
}

function DefaultDropzoneContent({ variant, isDragging, accept, multiple }: DefaultDropzoneContentProps) {
  if (variant === 'button') {
    return (
      <>
        <UploadIcon className="h-5 w-5 text-[var(--fg-muted)]" />
        <span className="text-sm text-[var(--fg)]">Choose file{multiple ? 's' : ''}</span>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className={cn(
        'flex h-12 w-12 items-center justify-center rounded-full',
        'bg-[var(--bg-muted)]',
        isDragging && 'bg-[var(--primary)]/10'
      )}>
        <UploadIcon className={cn(
          'h-6 w-6',
          isDragging ? 'text-[var(--primary)]' : 'text-[var(--fg-muted)]'
        )} />
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--fg)]">
          {isDragging ? 'Drop files here' : 'Drag & drop files here'}
        </p>
        <p className="text-xs text-[var(--fg-muted)]">
          or click to browse
        </p>
      </div>
      {accept && (
        <p className="text-xs text-[var(--fg-muted)]">
          Accepted: {accept}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * FileItem Component
 * ------------------------------------------------------------------------------------------------*/

const FileItem = forwardRef<HTMLDivElement, FileItemProps>(
  (props, ref) => {
    const {
      className,
      file,
      onRemove,
      progress,
      isUploading,
      isError,
      ...restProps
    } = props;

    const isImage = file.type.startsWith('image/');

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3 p-3',
          'rounded-[var(--radius-md)]',
          'border border-[var(--border)]',
          'bg-[var(--bg)]',
          isError && 'border-[var(--danger)]',
          className
        )}
        {...restProps}
      >
        {/* Icon or Preview */}
        <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--bg-muted)]">
          {isImage ? (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="h-full w-full object-cover rounded-[var(--radius-sm)]"
            />
          ) : (
            <FileIcon className="h-5 w-5 text-[var(--fg-muted)]" />
          )}
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[var(--fg)] truncate">
            {file.name}
          </p>
          <p className="text-xs text-[var(--fg-muted)]">
            {formatFileSize(file.size)}
          </p>
          {isUploading && progress !== undefined && (
            <div className="mt-1 h-1 w-full rounded-full bg-[var(--bg-muted)] overflow-hidden">
              <div
                className="h-full bg-[var(--primary)] transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Remove Button */}
        {onRemove && !isUploading && (
          <button
            type="button"
            onClick={onRemove}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full',
              'text-[var(--fg-muted)] hover:text-[var(--fg)]',
              'hover:bg-[var(--bg-muted)]',
              'transition-colors duration-fast'
            )}
            aria-label="Remove file"
          >
            <XIcon className="h-4 w-4" />
          </button>
        )}

        {/* Status Icon */}
        {isError && (
          <div className="text-[var(--danger)]">
            <AlertIcon className="h-5 w-5" />
          </div>
        )}
      </div>
    );
  }
);

FileItem.displayName = 'FileItem';

/* -------------------------------------------------------------------------------------------------
 * Utility Functions
 * ------------------------------------------------------------------------------------------------*/

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/* -------------------------------------------------------------------------------------------------
 * Icons
 * ------------------------------------------------------------------------------------------------*/

function UploadIcon({ className }: { className?: string }) {
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
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function FileIcon({ className }: { className?: string }) {
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
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------------------------------*/

export { FileUpload, FileItem, fileUploadVariants };
