import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const buttonStyle = style({
  padding: 8,
  border: `1px solid ${vars.color.neutral}`,
  lineHeight: 1.2,
  borderRadius: rootVars.border.radius.normal,
});

/**
 * Color
 */

export const colorNormalStyle = style({
  color: 'inherit',
});

export const colorWeakStyle = style({
  color: vars.color.shadow,
  borderColor: vars.color.shadow,
});

export const colorSuccessStyle = style({
  color: vars.color.primary,
  borderColor: vars.color.primary,
});

export const colorWarningStyle = style({
  color: vars.color.warning,
  borderColor: vars.color.warning,
});

/**
 * Font Size
 */

export const normalStyle = style({
  fontSize: rootVars.font.size.base,
});

export const largeStyle = style({
  fontSize: rootVars.font.size.large,
});

export const smallStyle = style({
  fontSize: rootVars.font.size.small,
});

export const xSmallStyle = style({
  fontSize: rootVars.font.size['x-small'],
});

/**
 * Bold
 */

export const boldStyle = style({
  fontWeight: rootVars.font.weight.bold,
});

globalStyle(`${buttonStyle}${boldStyle}`, {
  borderWidth: 2,
});

/**
 * Underline
 */

export const underlineStyle = style({
  textDecoration: 'underline',
});
