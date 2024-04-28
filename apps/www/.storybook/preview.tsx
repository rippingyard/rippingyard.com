import type { Preview } from '@storybook/react';
import React from 'react';
import { FC } from 'react';
import { bodyStyle } from '../app/styles/root.css';
import { themeClass } from '../app/styles/theme.css';
import '../app/styles/vars.css';
import clsx from 'clsx';

const Styled = (Story: FC) => {
  return (
    <div className={clsx(bodyStyle, themeClass)}>
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
