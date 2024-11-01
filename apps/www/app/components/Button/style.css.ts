﻿import {
  ComplexStyleRule,
  globalStyle,
  keyframes,
  style,
} from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

const baseButtonStyle: ComplexStyleRule = {
  borderRadius: 999,
  textAlign: 'center',
  padding: 16,
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

const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const rollingButtonStyle = style({
  animation: `${rotate} 1s ease-in-out infinite`,
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
});

globalStyle(`${loadingStyle}:hover`, {
  backgroundColor: 'inherit',
});

export const disabledStyle = style({});

globalStyle(`button:disabled.${disabledStyle}`, {
  cursor: 'not-allowed',
});

export const squareButtonStyle = style({
  borderRadius: 0,
});
