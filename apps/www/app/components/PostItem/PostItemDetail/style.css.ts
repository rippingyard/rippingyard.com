import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const containerStyle = style({
  marginBottom: 32,
});

export const contentWithNoTitleStyle = style({
  padding: 16,
  paddingBottom: 0,
  background: vars.color.highlight,
  borderRadius: 8,
});

export const headingStyle = style({});

globalStyle(`${headingStyle} a`, {
  textDecoration: 'none',
  color: 'inherit',
});

globalStyle(`${headingStyle} a:hover`, {
  textDecoration: 'underline',
  cursor: 'pointer',
});

export const footerStyle = style({
  fontSize: rootVars.font.size.small,
});
