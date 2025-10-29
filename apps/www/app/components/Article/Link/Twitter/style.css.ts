import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({
  marginBottom: 30,
});

globalStyle(`${container} > blockquote`, {
  border: 'none',
  padding: 0,
});

globalStyle(`${container} > .twitter-tweet`, {
  margin: '0 !important',
});
