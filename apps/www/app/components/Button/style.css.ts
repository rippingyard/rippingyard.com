import { ComplexStyleRule, globalStyle, style } from '@vanilla-extract/css';

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

export const buttonStyle = style(baseButtonStyle);

globalStyle(`${buttonStyle}:hover`, {
  backgroundColor: vars.color.primaryDark,
  // boxShadow: `0 0 8px 0 ${vars.color.primaryDark}`,
});

export const wideButtonStyle = style({
  width: '100%',
});

export const blurButtonStyle = style({
  backgroundColor: vars.color['shadow-60'],
  WebkitBackdropFilter: 'blur(12px)',
  backdropFilter: 'blur(12px)',
});

export const successButtonStyle = style({
  backgroundColor: vars.color.primary,
  // boxShadow: `0 0 2px 0 ${vars.color.primary}`,
});

globalStyle(`${successButtonStyle}:hover`, {
  color: vars.color.background,
  // boxShadow: `0 0 8px 0 ${vars.color.primaryDark}`,
});

export const ghostButtonStyle = style({
  boxShadow: 'none',
  backgroundColor: 'transparent',
});

globalStyle(`${ghostButtonStyle}:hover`, {
  boxShadow: 'none',
  backgroundColor: 'transparent',
  color: vars.color.primary,
});

export const loadingStyle = style({
  cursor: 'not-allowed',
  opacity: 0.6,
  padding: '16px 48px 16px 25px',
});

globalStyle(`${loadingStyle}:hover`, {
  backgroundColor: vars.color.shadow,
});

export const disabledStyle = style({});

globalStyle(`button:disabled.${disabledStyle}`, {
  cursor: 'not-allowed',
});

export const squareButtonStyle = style({
  borderRadius: 0,
});

export const loadingIconStyle = style({
  display: 'block',
});
