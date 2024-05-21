import { ComplexStyleRule, globalStyle, style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

const baseButtonStyle: ComplexStyleRule = {
  borderRadius: 999,
  width: '100%',
  textAlign: 'center',
  padding: '16px 24px',
  // boxShadow: `0 0 2px 0 ${vars.color.neutral}`,
  transition: '0.04s',
  lineHeight: 1,
  color: vars.color.neutral,
  fontWeight: rootVars.font.weight.bold,
  fontSize: rootVars.font.size.small,
};

export const buttonStyle = style(baseButtonStyle);

export const successButtonStyle = style({
  backgroundColor: vars.color.primary,
  // boxShadow: `0 0 2px 0 ${vars.color.primary}`,
});

globalStyle(`${buttonStyle}:hover`, {
  color: vars.color.primaryDark,
  // boxShadow: `0 0 8px 0 ${vars.color.primaryDark}`,
});

export const ghostButtonStyle = style({
  boxShadow: 'none',
  backgroundColor: 'transparent',
  ':hover': {
    boxShadow: 'none',
  },
});

export const squareButtonStyle = style({
  borderRadius: 0,
});

export const disabledStyle = style({});

globalStyle(`button:disabled.${disabledStyle}`, {
  cursor: 'not-allowed',
});
