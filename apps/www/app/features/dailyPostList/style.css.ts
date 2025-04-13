import { style } from '@vanilla-extract/css';

import { HEADER_HEIGHT, mediaQuery } from '~/utils/style';

export const containerStyle = style({});

export const groupContainerStyle = style({
  display: 'flex',
  position: 'relative',
  marginBottom: 32,
  gap: 32,
  '@media': {
    [mediaQuery('TB')]: {
      gap: 16,
    },
  },
});

export const labelContainerStyle = style({
  width: 80,
  flexShrink: 0,
  position: 'relative',
  '@media': {
    [mediaQuery('TB')]: {
      width: 60,
    },
  },
});

export const labelStyle = style({
  position: 'sticky',
  top: HEADER_HEIGHT - 3,
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
