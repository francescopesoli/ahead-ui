import type { Meta, StoryObj } from '@storybook/react';
import { Code, CodeBlock } from '@ahead-ui/components';

const meta: Meta<typeof Code> = {
  title: 'Components/Display/Code',
  component: Code,
  tags: ['autodocs'],
  argTypes: {
    colorScheme: {
      control: 'select',
      options: ['neutral', 'primary', 'success', 'warning', 'danger'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Code>;

export const Default: Story = {
  args: {
    children: 'npm install @ahead-ui/components',
  },
};

export const InlineCode: Story = {
  render: () => (
    <p className="text-sm">
      Run <Code>npm install</Code> to install dependencies, then{' '}
      <Code>npm run dev</Code> to start the development server.
    </p>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Code colorScheme="neutral">neutral</Code>
      <Code colorScheme="primary">primary</Code>
      <Code colorScheme="success">success</Code>
      <Code colorScheme="warning">warning</Code>
      <Code colorScheme="danger">danger</Code>
    </div>
  ),
};

export const CodeBlockDefault: Story = {
  name: 'Code Block',
  render: () => (
    <CodeBlock language="typescript">
{`import { Button } from '@ahead-ui/components';

function App() {
  return (
    <Button variant="primary">
      Click me
    </Button>
  );
}`}
    </CodeBlock>
  ),
};

export const CodeBlockWithLineNumbers: Story = {
  render: () => (
    <CodeBlock language="javascript" showLineNumbers>
{`const greeting = 'Hello, World!';

function sayHello(name) {
  console.log(\`Hello, \${name}!\`);
}

sayHello('Developer');`}
    </CodeBlock>
  ),
};

export const CodeBlockWithTitle: Story = {
  render: () => (
    <CodeBlock
      language="bash"
      title="Installation"
      showCopyButton
    >
{`# Install with npm
npm install @ahead-ui/components @ahead-ui/core

# Or with pnpm
pnpm add @ahead-ui/components @ahead-ui/core

# Or with yarn
yarn add @ahead-ui/components @ahead-ui/core`}
    </CodeBlock>
  ),
};

export const DifferentLanguages: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <CodeBlock language="python" title="Python">
{`def hello_world():
    print("Hello, World!")

if __name__ == "__main__":
    hello_world()`}
      </CodeBlock>

      <CodeBlock language="go" title="Go">
{`package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`}
      </CodeBlock>

      <CodeBlock language="rust" title="Rust">
{`fn main() {
    println!("Hello, World!");
}`}
      </CodeBlock>
    </div>
  ),
};

export const WithHighlightedLines: Story = {
  render: () => (
    <CodeBlock
      language="typescript"
      showLineNumbers
      highlightLines={[2, 5, 6]}
    >
{`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}`}
    </CodeBlock>
  ),
};

export const JSONExample: Story = {
  render: () => (
    <CodeBlock language="json" title="package.json">
{`{
  "name": "@ahead-ui/docs",
  "version": "0.0.1",
  "private": true,
  "dependencies": {
    "@ahead-ui/components": "workspace:*",
    "@ahead-ui/core": "workspace:*"
  }
}`}
    </CodeBlock>
  ),
};

export const CompactMode: Story = {
  render: () => (
    <div className="space-y-2">
      <p className="text-sm">Import the component:</p>
      <CodeBlock language="typescript" compact>
{`import { Button } from '@ahead-ui/components';`}
      </CodeBlock>
      <p className="text-sm">Use it in your JSX:</p>
      <CodeBlock language="tsx" compact>
{`<Button variant="primary">Click me</Button>`}
      </CodeBlock>
    </div>
  ),
};

export const CommandLine: Story = {
  render: () => (
    <div className="space-y-3">
      <CodeBlock language="bash" showCopyButton>
{`npx create-ahead-app my-project`}
      </CodeBlock>
      <CodeBlock language="bash" showCopyButton>
{`cd my-project && npm run dev`}
      </CodeBlock>
    </div>
  ),
};
