import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';
import { mediaQuery, zIndex } from '~/utils/style';

export const containerStyle = style({});

globalStyle('.tippy-box', {
  maxWidth: '100% !important',
  zIndex: `${zIndex('COVER')} !important`,
});

globalStyle(`${containerStyle} button`, {
  padding: 5,
  borderRadius: 3,
  lineHeight: 1,
  fontSize: rootVars.font.size['xx-small'],
});

globalStyle(`${containerStyle} button:hover`, {
  cursor: 'pointer',
  backgroundColor: vars.color.secondry,
});

export const labelStyle = style({
  '@media': {
    [mediaQuery('TB')]: {
      display: 'none',
    },
  },
});
