import { globalStyle, style } from '@vanilla-extract/css';

import { rootVars } from '~/styles/vars.css';

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
