import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from '@ahead-ui/components';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/Layout/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-48 w-64 border rounded-lg">
      <div className="p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="text-sm py-2">
            Item {i + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea orientation="horizontal" className="w-96 border rounded-lg">
      <div className="flex gap-4 p-4">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-32 h-24 bg-bg-subtle rounded-lg flex items-center justify-center"
          >
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Both: Story = {
  render: () => (
    <ScrollArea orientation="both" className="h-48 w-64 border rounded-lg">
      <div className="p-4" style={{ width: '500px' }}>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="text-sm py-2 whitespace-nowrap">
            This is a very long text for item {i + 1} that extends beyond the container width
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const TagsList: Story = {
  render: () => (
    <ScrollArea orientation="horizontal" className="w-72 border rounded-lg">
      <div className="flex gap-2 p-2">
        {['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'Python', 'Go', 'Rust'].map(
          (tag) => (
            <span
              key={tag}
              className="flex-shrink-0 px-3 py-1 bg-primary-subtle text-sm rounded-full"
            >
              {tag}
            </span>
          )
        )}
      </div>
    </ScrollArea>
  ),
};

export const ChatHistory: Story = {
  render: () => (
    <ScrollArea className="h-80 w-80 border rounded-lg">
      <div className="p-4 space-y-4">
        {[
          { sender: 'user', message: 'Hello! How are you?' },
          { sender: 'bot', message: 'Hi! I am doing great, thank you for asking.' },
          { sender: 'user', message: 'Can you help me with something?' },
          { sender: 'bot', message: 'Of course! I would be happy to help. What do you need?' },
          { sender: 'user', message: 'I need help understanding how to use ScrollArea.' },
          { sender: 'bot', message: 'ScrollArea is a component that provides a scrollable container with customizable scrollbars. You can set the orientation to vertical, horizontal, or both.' },
          { sender: 'user', message: 'That sounds useful!' },
          { sender: 'bot', message: 'It is! It helps maintain consistent styling across different browsers and provides a better user experience.' },
          { sender: 'user', message: 'Thanks for the explanation!' },
          { sender: 'bot', message: 'You are welcome! Let me know if you have any other questions.' },
        ].map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                msg.sender === 'user'
                  ? 'bg-primary text-primary-fg'
                  : 'bg-bg-muted'
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const FileList: Story = {
  render: () => (
    <ScrollArea className="h-64 w-72 border rounded-lg">
      <div className="p-2">
        {[
          { name: 'document.pdf', size: '2.4 MB', type: 'pdf' },
          { name: 'image.png', size: '1.2 MB', type: 'image' },
          { name: 'video.mp4', size: '45.6 MB', type: 'video' },
          { name: 'archive.zip', size: '12.3 MB', type: 'archive' },
          { name: 'spreadsheet.xlsx', size: '500 KB', type: 'excel' },
          { name: 'presentation.pptx', size: '8.7 MB', type: 'ppt' },
          { name: 'code.js', size: '15 KB', type: 'code' },
          { name: 'notes.txt', size: '2 KB', type: 'text' },
          { name: 'data.json', size: '128 KB', type: 'code' },
          { name: 'styles.css', size: '24 KB', type: 'code' },
        ].map((file) => (
          <div
            key={file.name}
            className="flex items-center gap-3 p-2 rounded hover:bg-bg-subtle cursor-pointer"
          >
            <div className="w-8 h-8 bg-bg-muted rounded flex items-center justify-center text-xs">
              {file.type.slice(0, 3).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">{file.name}</p>
              <p className="text-xs text-fg-muted">{file.size}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const ImageGallery: Story = {
  render: () => (
    <ScrollArea orientation="horizontal" className="w-[32rem] border rounded-lg">
      <div className="flex gap-3 p-3">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-48 h-32 bg-bg-subtle rounded-lg overflow-hidden"
          >
            <img
              src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000}?w=200&h=150&fit=crop`}
              alt={`Image ${i + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://via.placeholder.com/200x150?text=${i + 1}`;
              }}
            />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const CodeBlock: Story = {
  render: () => (
    <ScrollArea orientation="both" className="h-48 w-96 border rounded-lg bg-bg-inverse">
      <pre className="p-4 text-sm text-fg-inverse font-mono">
{`function fibonacci(n) {
  if (n <= 1) return n;

  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

// Calculate first 20 Fibonacci numbers
const results = Array.from(
  { length: 20 },
  (_, i) => fibonacci(i)
);

console.log(results);`}
      </pre>
    </ScrollArea>
  ),
};
