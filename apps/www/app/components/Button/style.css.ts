import { ComplexStyleRule, globalStyle, style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';

const baseButtonStyle: ComplexStyleRule = {
  // border: `1px solid ${vars.color.neutral}`,
  borderRadius: 999,
  width: '100%',
  textAlign: 'center',
  padding: '12px 16px',
  boxShadow: `0 0 2px 0 ${vars.color.neutral}`,
  transition: '0.04s',
  lineHeight: 1,
  color: vars.color.neutral,
};

export const buttonStyle = style(baseButtonStyle);

globalStyle(`${buttonStyle}:hover`, {
  color: vars.color.primaryDark,
  boxShadow: `0 0 8px 0 ${vars.color.primaryDark}`,
});
