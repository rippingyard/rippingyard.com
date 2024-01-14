import { css } from '@emotion/react';

export enum FONT {
  // eslint-disable-next-line quotes
  NORMAL = "'Source Sans Pro', -apple-system, blinkmacsystemfont, 'Segoe UI', roboto, 'Helvetica Neue', arial, sans-serif",
}

export enum LAYER {
  FIXED_HEADER = 100,
}

export const black = (opacity: number = 1) => `hsla(0, 0%, 7%, ${opacity})`;
export const white = (opacity: number = 1) => `hsla(0, 0%, 96%, ${opacity})`;
export const gray = (opacity: number = 1) => `hsla(0, 0%, 93%, ${opacity})`;
export const grayDark = (opacity: number = 1) => `hsla(0, 0%, 67%, ${opacity})`;
export const blue = (opacity: number = 1) => `rgba(41, 85, 113, ${opacity})`;
export const cyan = (opacity: number = 1) => `hsla(194, 99%, 58%, ${opacity})`;
export const yellow = (opacity: number = 1) =>
  `hsla(47, 100%, 58%, ${opacity})`;

export const zIndex = (layer: keyof typeof LAYER) => LAYER[layer];

// $orange: hsl(14, 100%, 53%);
// $green: #D9DB7B;
// $cyan: #2BCEFE;
// $red: #F00;

const blockStyle = css({
  paddingBottom: 25,
  fontSize: '1em',
  textAlign: 'justify',
});

export const articleStyle = css({
  outline: 'none',
  lineHeight: 1.8,
  a: {
    textDecoration: 'underline',
    color: blue(),
  },
  mark: {
    backgroundColor: yellow(),
  },
  p: [
    blockStyle,
    {
      ...blockStyle,
    },
  ],
  h1: [
    blockStyle,
    {
      fontSize: '2.2em',
      lineHeight: 1.4,
      fontWeight: 800,
      paddingTop: '3em',
      //     @include until($desktop) {
      //       font-size: 1.8rem;
      //     }
    },
  ],
  h2: [
    blockStyle,
    {
      fontSize: '1.6em',
      lineHeight: 1.4,
      fontWeight: 800,
      paddingTop: '2.2em',
      //     @include until($desktop) {
      //       font-size: 1.4rem;
      //     }
    },
  ],
  h3: [
    blockStyle,
    {
      fontSize: '1.4em',
      lineHeight: 1.4,
      fontWeight: 800,
      paddingTop: '1.8em',
      //     @include until($desktop) {
      //       font-size: 1.3rem;
      //     }
    },
  ],
  h4: [
    blockStyle,
    {
      fontSize: '1.2em',
      lineHeight: 1.4,
      fontWeight: 800,
      paddingTop: '1.4em',
      //     @include until($desktop) {
      //       font-size: 1.2rem;
      //     }
    },
  ],
  h5: [
    blockStyle,
    {
      fontSize: '1.15em',
      lineHeight: 1.4,
      paddingTop: '1em',
      //     @include until($desktop) {
      //       font-size: 1.1rem;
      //     }
    },
  ],
  h6: [
    blockStyle,
    {
      fontSize: '1.1em',
      lineHeight: 1.4,
      paddingTop: '0.8em',
      //     @include until($desktop) {
      //       font-size: 1.05rem;
      //     }
    },
  ],
  ul: [
    blockStyle,
    {
      listStyleType: 'disc',
      paddingLeft: 18,
      listStylePosition: 'inside',
      li: {
        listStyle: 'disc',
      },
    },
  ],
  ol: [
    blockStyle,
    {
      listStyleType: 'decimal',
      paddingLeft: 22,
      listStylePosition: 'inside',
      li: {
        listStyle: 'decimal',
      },
    },
  ],
  blockquote: [
    blockStyle,
    {
      border: `4px solid ${black()}`,
      marginBottom: 25,
      padding: 25,
      fontFamily: 'serif',
      '> p': {
        paddingBottom: 20,
        '&:last-of-type': {
          paddingBottom: 0,
        },
      },
    },
  ],
  pre: [
    blockStyle,
    {
      border: `3px solid ${yellow()}`,
      padding: 25,
      marginBottom: 25,
      fontSize: '0.9em',
      backgroundColor: black(),
      color: yellow(),
    },
  ],
  li: {
    p: {
      paddingBottom: 0,
    },
  },
  '.caption': [
    blockStyle,
    {
      display: 'block',
      fontSize: '0.8em',
    },
  ],
  img: {
    display: 'block',
    margin: '0 auto 25px',
    maxWidth: '100%',
    height: 'auto',
    '&+.caption': {
      marginTop: -15,
    },
  },
  strong: {
    fontWeight: 800,
  },
  hr: {
    display: 'block',
    border: 'none',
    height: 1,
    backgroundColor: grayDark(),
    marginBottom: 25,
  },
  '.widget-youtube': {
    position: 'relative',
    display: 'block',
    width: '100%',
    paddingTop: '56.25%',

    '>iframe': {
      position: 'absolute',
      top: 0,
      right: 0,
      width: '100% !important',
      height: '100% !important',
    },
  },
});

// [contenteditable]:focus {
//   outline: none;
// }
