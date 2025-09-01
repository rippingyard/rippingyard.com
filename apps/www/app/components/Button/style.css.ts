import {
  ComplexStyleRule,
  globalStyle,
  style,
  styleVariants,
} from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

const baseButtonStyle: ComplexStyleRule = {
  borderRadius: rootVars.border.radius.large,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  textAlign: 'center',
  padding: '16px 48px',
  // boxShadow: `0 0 2px 0 ${vars.color.neutral}`,
  transition: '0.04s',
  lineHeight: 1,
  color: vars.color.neutral,
  backgroundColor: vars.color.shadow,
  fontWeight: rootVars.font.weight.bold,
  fontSize: rootVars.font.size.small,
};

export const button = style(baseButtonStyle);

globalStyle(`${button}:hover`, {
  backgroundColor: vars.color.primaryDark,
  // boxShadow: `0 0 8px 0 ${vars.color.primaryDark}`,
});

export const size = styleVariants({
  'xxx-large': { fontSize: rootVars.font.size['xxx-large'] },
  'xx-large': { fontSize: rootVars.font.size['xx-large'] },
  'x-large': { fontSize: rootVars.font.size['x-large'] },
  large: { fontSize: rootVars.font.size.large },
  medium: { fontSize: rootVars.font.size.medium },
  small: { fontSize: rootVars.font.size.small },
  'x-small': { fontSize: rootVars.font.size['x-small'] },
  'xx-small': { fontSize: rootVars.font.size['xx-small'] },
});

export const wide = style({
  width: '100%',
});

export const blurred = style({
  backgroundColor: vars.color['shadow-60'],
  WebkitBackdropFilter: 'blur(12px)',
  backdropFilter: 'blur(12px)',
});

export const success = style({
  backgroundColor: vars.color.primary,
  // boxShadow: `0 0 2px 0 ${vars.color.primary}`,
});

globalStyle(`${success}:hover`, {
  color: vars.color.background,
  // boxShadow: `0 0 8px 0 ${vars.color.primaryDark}`,
});

export const ghost = style({
  boxShadow: 'none',
  backgroundColor: 'transparent',
});

globalStyle(`${ghost}:hover`, {
  boxShadow: 'none',
  backgroundColor: 'transparent',
  color: vars.color.primary,
});

export const loading = style({
  cursor: 'not-allowed',
  opacity: 0.6,
  padding: '16px 48px 16px 25px',
});

globalStyle(`${loading}:hover`, {
  backgroundColor: vars.color.shadow,
});

export const disabled = style({});

globalStyle(`button:disabled.${disabled}`, {
  cursor: 'not-allowed',
});

export const square = style({
  borderRadius: 0,
});

export const loadingIcon = style({
  display: 'block',
});

export const noPadding = style({
  padding: 16,
});
