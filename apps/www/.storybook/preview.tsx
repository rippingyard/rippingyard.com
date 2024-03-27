import type { Preview } from '@storybook/react';
import React from 'react';
import { FC } from 'react';
import { bodyStyle } from '../app/styles/root.css';
import { themeClass } from '../app/styles/theme.css';
import '../app/styles/vars.css';

const Styled = (Story: FC) => {
  const className = [bodyStyle, themeClass].join(' ');

  return (
    <div className={className}>
      <Story />
    </div>
  );
};

export const decorators = [Styled];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
};

export default preview;
