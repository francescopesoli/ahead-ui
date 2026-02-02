import type { Preview, Decorator } from '@storybook/react';
import React from 'react';
import '@ahead-ui/core/tokens/css';
import './styles.css';

/**
 * Theme decorator that wraps stories with theme context
 */
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme || 'light';

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return React.createElement(
    'div',
    {
      className: 'p-4',
      'data-theme': theme,
    },
    React.createElement(Story)
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
    layout: 'centered',
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1280px', height: '800px' },
        },
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
