import type { Meta, StoryObj } from '@storybook/react';
import { Tree, TreeItem } from '@ahead-ui/components';

const meta: Meta<typeof Tree> = {
  title: 'Components/Display/Tree',
  component: Tree,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tree>;

export const Default: Story = {
  render: () => (
    <Tree>
      <TreeItem label="Documents">
        <TreeItem label="Work">
          <TreeItem label="Reports" />
          <TreeItem label="Presentations" />
        </TreeItem>
        <TreeItem label="Personal">
          <TreeItem label="Photos" />
          <TreeItem label="Videos" />
        </TreeItem>
      </TreeItem>
      <TreeItem label="Downloads" />
      <TreeItem label="Desktop" />
    </Tree>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tree>
      <TreeItem
        label="src"
        icon={
          <svg className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z" />
          </svg>
        }
      >
        <TreeItem
          label="components"
          icon={
            <svg className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z" />
            </svg>
          }
        >
          <TreeItem
            label="Button.tsx"
            icon={
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
              </svg>
            }
          />
          <TreeItem
            label="Input.tsx"
            icon={
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
              </svg>
            }
          />
        </TreeItem>
        <TreeItem
          label="index.ts"
          icon={
            <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
            </svg>
          }
        />
      </TreeItem>
      <TreeItem
        label="package.json"
        icon={
          <svg className="w-4 h-4 text-danger" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
          </svg>
        }
      />
      <TreeItem
        label="tsconfig.json"
        icon={
          <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
          </svg>
        }
      />
    </Tree>
  ),
};

export const Selectable: Story = {
  render: () => (
    <Tree selectionMode="single">
      <TreeItem label="Option 1" value="1">
        <TreeItem label="Sub-option 1.1" value="1.1" />
        <TreeItem label="Sub-option 1.2" value="1.2" />
      </TreeItem>
      <TreeItem label="Option 2" value="2">
        <TreeItem label="Sub-option 2.1" value="2.1" />
        <TreeItem label="Sub-option 2.2" value="2.2" />
      </TreeItem>
      <TreeItem label="Option 3" value="3" />
    </Tree>
  ),
};

export const MultipleSelection: Story = {
  render: () => (
    <Tree selectionMode="multiple">
      <TreeItem label="Frontend">
        <TreeItem label="React" value="react" />
        <TreeItem label="Vue" value="vue" />
        <TreeItem label="Angular" value="angular" />
      </TreeItem>
      <TreeItem label="Backend">
        <TreeItem label="Node.js" value="node" />
        <TreeItem label="Python" value="python" />
        <TreeItem label="Go" value="go" />
      </TreeItem>
    </Tree>
  ),
};

export const DefaultExpanded: Story = {
  render: () => (
    <Tree defaultExpandedKeys={['root', 'child1']}>
      <TreeItem label="Root" key="root">
        <TreeItem label="Child 1" key="child1">
          <TreeItem label="Grandchild 1" />
          <TreeItem label="Grandchild 2" />
        </TreeItem>
        <TreeItem label="Child 2">
          <TreeItem label="Grandchild 3" />
        </TreeItem>
      </TreeItem>
    </Tree>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <Tree>
      <TreeItem label="Available">
        <TreeItem label="Item A" />
        <TreeItem label="Item B" />
      </TreeItem>
      <TreeItem label="Unavailable" isDisabled>
        <TreeItem label="Item C" />
        <TreeItem label="Item D" />
      </TreeItem>
      <TreeItem label="Mixed">
        <TreeItem label="Available Item" />
        <TreeItem label="Disabled Item" isDisabled />
      </TreeItem>
    </Tree>
  ),
};

export const FileExplorer: Story = {
  render: () => (
    <div className="w-64 border rounded-lg p-2">
      <Tree>
        <TreeItem
          label="my-project"
          icon={<FolderIcon />}
        >
          <TreeItem label="node_modules" icon={<FolderIcon />} />
          <TreeItem label="public" icon={<FolderIcon />}>
            <TreeItem label="favicon.ico" icon={<FileIcon />} />
            <TreeItem label="index.html" icon={<FileIcon />} />
          </TreeItem>
          <TreeItem label="src" icon={<FolderIcon />}>
            <TreeItem label="App.tsx" icon={<FileIcon />} />
            <TreeItem label="index.tsx" icon={<FileIcon />} />
            <TreeItem label="styles.css" icon={<FileIcon />} />
          </TreeItem>
          <TreeItem label=".gitignore" icon={<FileIcon />} />
          <TreeItem label="package.json" icon={<FileIcon />} />
          <TreeItem label="README.md" icon={<FileIcon />} />
        </TreeItem>
      </Tree>
    </div>
  ),
};

function FolderIcon() {
  return (
    <svg className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 24 24">
      <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg className="w-4 h-4 text-fg-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}
