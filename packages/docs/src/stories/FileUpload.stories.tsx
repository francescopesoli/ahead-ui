import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FileUpload, FileItem } from '@ahead-ui/components';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/Form/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['dropzone', 'button'],
    },
    isDisabled: {
      control: 'boolean',
    },
    multiple: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    label: 'Upload files',
  },
};

export const DropzoneVariant: Story = {
  args: {
    variant: 'dropzone',
    label: 'Drag and drop files here',
    description: 'or click to browse',
  },
};

export const ButtonVariant: Story = {
  args: {
    variant: 'button',
    label: 'Choose file',
  },
};

export const MultipleFiles: Story = {
  args: {
    multiple: true,
    label: 'Upload multiple files',
    description: 'You can select multiple files at once',
  },
};

export const AcceptSpecificTypes: Story = {
  args: {
    accept: 'image/*',
    label: 'Upload images',
    description: 'Only image files are accepted',
  },
};

export const WithMaxSize: Story = {
  args: {
    maxSize: 5 * 1024 * 1024, // 5MB
    label: 'Upload file',
    description: 'Maximum file size: 5MB',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    label: 'Upload disabled',
  },
};

export const WithFileList: Story = {
  render: function FileListDemo() {
    const [files, setFiles] = useState<File[]>([]);

    const handleChange = (newFiles: File[]) => {
      setFiles((prev) => [...prev, ...newFiles]);
    };

    const handleRemove = (index: number) => {
      setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
      <div className="flex flex-col gap-4 w-80">
        <FileUpload
          multiple
          label="Upload files"
          description="Drag and drop or click to browse"
          onChange={handleChange}
        />
        {files.length > 0 && (
          <div className="flex flex-col gap-2">
            {files.map((file, index) => (
              <FileItem
                key={`${file.name}-${index}`}
                file={file}
                onRemove={() => handleRemove(index)}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
};

export const CustomDropzoneContent: Story = {
  render: () => (
    <FileUpload variant="dropzone" label="Custom content">
      <div className="flex flex-col items-center gap-2 py-8">
        <svg
          className="w-12 h-12 text-fg-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="text-sm text-fg-muted">
          Drop your files here, or{' '}
          <span className="text-primary">browse</span>
        </p>
        <p className="text-xs text-fg-subtle">
          Supports: JPG, PNG, PDF up to 10MB
        </p>
      </div>
    </FileUpload>
  ),
};

export const ImagePreview: Story = {
  render: function ImagePreviewDemo() {
    const [preview, setPreview] = useState<string | null>(null);

    const handleChange = (files: File[]) => {
      const file = files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div className="flex flex-col gap-4 w-80">
        <FileUpload
          accept="image/*"
          label="Upload image"
          description="Select an image to preview"
          onChange={handleChange}
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-md"
          />
        )}
      </div>
    );
  },
};
