import { style } from '@vanilla-extract/css';

import { mediaQuery } from '~/utils/style';

export const containerStyle = style({});

export const groupContainerStyle = style({
  display: 'flex',
  gap: 32,
  '@media': {
    [mediaQuery('TB')]: {
      gap: 16,
    },
  },
});

export const labelStyle = style({
  // width: 100,
  flexShrink: 0,
});

export const listStyle = style({
  flexGrow: 1,
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

export const listItemStyle = style({
  overflow: 'hidden',
});
