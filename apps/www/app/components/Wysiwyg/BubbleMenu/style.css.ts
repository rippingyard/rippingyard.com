import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';

export const containerStyle = style({
  backgroundColor: vars.color.background,
  boxShadow: `0px 3px 8px ${vars.color['shadow-40']}`,
  // border: 1px solid $gray-black;
  borderRadius: 2,
  // padding: '.3rem .6rem',
  display: 'flex',
});
