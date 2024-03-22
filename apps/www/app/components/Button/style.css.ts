import { ComplexStyleRule, globalStyle, style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

const baseButtonStyle: ComplexStyleRule = {
  borderRadius: 999,
  width: '100%',
  textAlign: 'center',
  padding: '16px 24px',
  boxShadow: `0 0 2px 0 ${vars.color.neutral}`,
  transition: '0.04s',
  lineHeight: 1,
  color: vars.color.neutral,
  fontWeight: rootVars.font.weight.bold,
  fontSize: rootVars.font.size.small,
};

export const buttonStyle = style(baseButtonStyle);

globalStyle(`${buttonStyle}:hover`, {
  color: vars.color.primaryDark,
  boxShadow: `0 0 8px 0 ${vars.color.primaryDark}`,
});
