import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';
import { mediaQuery, zIndex } from '~/utils/style';

export const containerStyle = style({});

globalStyle('.tippy-box', {
  maxWidth: '100% !important',
  zIndex: `${zIndex('COVER')} !important`,
});

export const buttonStyle = style({
  padding: 5,
  lineHeight: 1,
  fontSize: rootVars.font.size['xx-small'],
});

globalStyle(`${buttonStyle} &:hover`, {
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

export const hiddenLabelStyle = style({
  display: 'none',
});

/** For Simple */

export const simpleButtonStyle = style({
  border: `3px solid ${vars.color['neutral']}`,
  padding: '3px 15px',
  marginRight: 5,
  borderRadius: rootVars.border.radius.large,
  lineHeight: 1,
  fontSize: rootVars.font.size['x-small'],
  '@media': {
    [mediaQuery('TB')]: {
      padding: '3px 10px',
      borderWidth: 2,
    },
  },
});
