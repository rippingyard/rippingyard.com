import { globalStyle, style } from '@vanilla-extract/css';

import { rootVars } from '~/styles/vars.css';
import { mediaQuery } from '~/utils/style';

export const image = style({
  flexShrink: 0,
  width: 210,
  height: 140,
  borderRadius: rootVars.border.radius.large,
  overflow: 'hidden',
  marginBottom: 8,
  '@media': {
    [mediaQuery('TB')]: {
      width: 100,
      height: 100,
    },
  },
});

globalStyle(`${image} > img`, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});
