import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const checkboxStyle = style({
  width: '1em',
  height: '1em',
  position: 'relative',
  borderRadius: rootVars.border.radius.sharp,
  border: `0.24em solid ${vars.color.shadow}`,
  transition: '0.1s ease-out',
  cursor: 'pointer',
  color: vars.color.shadow,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

globalStyle(`${checkboxStyle} svg`, {
  display: 'none',
});

export const checkedStyle = style({
  border: `0.5em solid ${vars.color.primary}`,
});

globalStyle(`${checkedStyle} svg`, {
  display: 'block',
  position: 'absolute',
  color: vars.color.background,
  lineHeight: 1,
  fontSize: '0.6em',
});

export const iconStyle = style({
  color: vars.color.shadow,
});
