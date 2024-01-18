import { globalStyle, style } from '@vanilla-extract/css';

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
  fontSize: '0.8em',
});
