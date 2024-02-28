import { globalStyle, style } from '@vanilla-extract/css';

import { mediaQuery } from '~/utils/style';

import { vars } from './theme.css';

const blockStyle = {
  paddingBottom: 25,
  fontSize: '1rem',
  // textAlign: 'justify',
};

export const articleStyle = style({
  outline: 'none',
  lineHeight: 1.8,
  overflow: 'hidden',
});

globalStyle(`${articleStyle} a`, {
  textDecoration: 'underline',
  color: vars.color.primaryDark,
});

globalStyle(`${articleStyle} p`, {
  ...blockStyle,
});

globalStyle(`${articleStyle} h1`, {
  ...blockStyle,
  fontSize: '2.2em',
  lineHeight: 1.4,
  fontWeight: 800,
  paddingTop: '2.2em',
  // @include until($desktop) {
  //   font-size: 1.8rem;
});

globalStyle(`${articleStyle} h2`, {
  ...blockStyle,
  fontSize: '1.6em',
  lineHeight: 1.4,
  fontWeight: 800,
  paddingTop: '1.6em',
  // @include until($desktop) {
  //   font-size: 1.4rem;
  // }
});

globalStyle(`${articleStyle} h3`, {
  ...blockStyle,
  fontSize: '1.4em',
  lineHeight: 1.4,
  fontWeight: 800,
  paddingTop: '1.4em',
  // @include until($desktop) {
  //   font-size: 1.3rem;
  // }
});

globalStyle(`${articleStyle} h4`, {
  ...blockStyle,
  fontSize: '1.1em',
  lineHeight: 1.4,
  fontWeight: 800,
  paddingTop: '1.4em',
  // @include until($desktop) {
  //   font-size: 1.2rem;
  // }
});

globalStyle(`${articleStyle} h5`, {
  ...blockStyle,
  fontSize: '1.15em',
  lineHeight: 1.4,
  paddingTop: '1em',
  // @include until($desktop) {
  //   font-size: 1.1rem;
  // }
});

globalStyle(`${articleStyle} h6`, {
  ...blockStyle,
  fontSize: '1.1em',
  lineHeight: 1.4,
  paddingTop: '0.8em',
  // @include until($desktop) {
  //   font-size: 1.05rem;
  // }
});

globalStyle(`${articleStyle} ul`, {
  ...blockStyle,
  listStyleType: 'disc',
  paddingLeft: 18,
  listStylePosition: 'inside',
});

globalStyle(`${articleStyle} ul li`, {
  listStyle: 'disc',
});

globalStyle(`${articleStyle} ol`, {
  ...blockStyle,
  listStyleType: 'decimal',
  paddingLeft: 22,
  listStylePosition: 'inside',
});

globalStyle(`${articleStyle} ol li`, {
  listStyle: 'decimal',
});

globalStyle(`${articleStyle} mark`, {
  backgroundColor: vars.color.secondry,
});

globalStyle(`${articleStyle} blockquote`, {
  ...blockStyle,
  border: `4px solid ${vars.color.neutral}`,
  marginBottom: 25,
  padding: 25,
  fontFamily: 'serif',
  '@media': {
    [mediaQuery('SP')]: {
      padding: 12,
    },
  },
});

globalStyle(`${articleStyle} blockquote > p`, {
  paddingBottom: 20,
});

globalStyle(`${articleStyle} blockquote > p:last-of-type`, {
  paddingBottom: 0,
});

globalStyle(`${articleStyle} pre`, {
  ...blockStyle,
  border: `3px solid ${vars.color.secondry}`,
  padding: 25,
  marginBottom: 25,
  fontSize: '0.9em',
  backgroundColor: vars.color.neutral,
  color: vars.color.secondry,
});

globalStyle(`${articleStyle} li p`, {
  paddingBottom: 0,
});

globalStyle(`${articleStyle} .caption`, {
  ...blockStyle,
  display: 'block',
  fontSize: '0.8em',
});

globalStyle(`${articleStyle} img`, {
  display: 'block',
  margin: '0 auto 25px',
  maxWidth: '100%',
  height: 'auto',
});

globalStyle(`${articleStyle} img + .caption`, {
  marginTop: -15,
});

globalStyle(`${articleStyle} strong`, {
  fontWeight: 800,
});

globalStyle(`${articleStyle} hr`, {
  display: 'block',
  border: 'none',
  height: 1,
  backgroundColor: vars.color.shadow,
  marginBottom: 25,
});

globalStyle(`${articleStyle} .widget-youtube`, {
  position: 'relative',
  display: 'block',
  width: '100%',
  paddingTop: '56.25%',
});

globalStyle(`${articleStyle} .widget-youtube > iframe`, {
  position: 'absolute',
  top: 0,
  right: 0,
  width: '100% !important',
  height: '100% !important',
});

// [contenteditable]:focus {
//   outline: none;
// }
