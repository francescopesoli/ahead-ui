import type { Meta, StoryObj } from '@storybook/react';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from '@ahead-ui/components';

const meta: Meta<typeof ContextMenu> = {
  title: 'Components/Overlay/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex items-center justify-center w-64 h-32 border-2 border-dashed rounded-lg text-fg-muted">
          Right-click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Cut</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex items-center justify-center w-64 h-32 border-2 border-dashed rounded-lg text-fg-muted">
          Right-click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Copy
        </ContextMenuItem>
        <ContextMenuItem>
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
          </svg>
          Cut
        </ContextMenuItem>
        <ContextMenuItem>
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Paste
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-danger">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithShortcuts: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex items-center justify-center w-64 h-32 border-2 border-dashed rounded-lg text-fg-muted">
          Right-click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          Copy
          <span className="ml-auto text-xs text-fg-muted">⌘C</span>
        </ContextMenuItem>
        <ContextMenuItem>
          Cut
          <span className="ml-auto text-xs text-fg-muted">⌘X</span>
        </ContextMenuItem>
        <ContextMenuItem>
          Paste
          <span className="ml-auto text-xs text-fg-muted">⌘V</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          Select All
          <span className="ml-auto text-xs text-fg-muted">⌘A</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithSubmenus: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex items-center justify-center w-64 h-32 border-2 border-dashed rounded-lg text-fg-muted">
          Right-click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>New File</ContextMenuItem>
        <ContextMenuItem>New Folder</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            Open With
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>VS Code</ContextMenuItem>
            <ContextMenuItem>Sublime Text</ContextMenuItem>
            <ContextMenuItem>TextEdit</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Other...</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            Share
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Email</ContextMenuItem>
            <ContextMenuItem>Messages</ContextMenuItem>
            <ContextMenuItem>AirDrop</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>Properties</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex items-center justify-center w-64 h-32 border-2 border-dashed rounded-lg text-fg-muted">
          Right-click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>Undo</ContextMenuItem>
          <ContextMenuItem>Redo</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>Cut</ContextMenuItem>
          <ContextMenuItem>Copy</ContextMenuItem>
          <ContextMenuItem>Paste</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>Find</ContextMenuItem>
          <ContextMenuItem>Replace</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex items-center justify-center w-64 h-32 border-2 border-dashed rounded-lg text-fg-muted">
          Right-click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Cut</ContextMenuItem>
        <ContextMenuItem disabled>Paste (clipboard empty)</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem disabled>Undo (nothing to undo)</ContextMenuItem>
        <ContextMenuItem>Redo</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const FileExplorerContext: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      {['Document.pdf', 'Image.png', 'Video.mp4'].map((file) => (
        <ContextMenu key={file}>
          <ContextMenuTrigger>
            <div className="flex items-center gap-2 p-2 border rounded hover:bg-bg-subtle cursor-default">
              <svg className="w-4 h-4 text-fg-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm">{file}</span>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Open</ContextMenuItem>
            <ContextMenuItem>Open With...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Rename</ContextMenuItem>
            <ContextMenuItem>Duplicate</ContextMenuItem>
            <ContextMenuItem>Move to...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Share</ContextMenuItem>
            <ContextMenuItem>Get Info</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem className="text-danger">
              Move to Trash
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  ),
};

export const EditorContext: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="w-96 p-4 border rounded-lg font-mono text-sm">
          <p className="text-fg-muted">// Right-click to see editor options</p>
          <p>function hello() {'{'}</p>
          <p className="pl-4">console.log(&quot;Hello, World!&quot;);</p>
          <p>{'}'}</p>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          Go to Definition
          <span className="ml-auto text-xs text-fg-muted">F12</span>
        </ContextMenuItem>
        <ContextMenuItem>
          Peek Definition
          <span className="ml-auto text-xs text-fg-muted">⌥F12</span>
        </ContextMenuItem>
        <ContextMenuItem>Find All References</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Rename Symbol</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Refactor</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Extract Function</ContextMenuItem>
            <ContextMenuItem>Extract Variable</ContextMenuItem>
            <ContextMenuItem>Inline Variable</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>Format Document</ContextMenuItem>
        <ContextMenuItem>Format Selection</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
