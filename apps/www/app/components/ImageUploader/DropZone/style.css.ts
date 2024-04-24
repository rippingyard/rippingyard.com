import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { mediaQuery } from '~/utils/style';

export const dropContainerStyle = style({
  height: 'inherit',
  width: '100%',
  color: vars.color.shadow,
  position: 'relative',
});

export const dropInnerStyle = style({
  width: '100%',
  height: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  // minHeight: '70vw',
  '@media': {
    [mediaQuery('TB')]: {
      flexDirection: 'column',
    },
  },
});

export const uploadIconStyle = style({
  width: 80,
  margin: 'auto',
  marginBottom: 8,
  cursor: 'pointer',
});

globalStyle(`${uploadIconStyle} svg`, {
  width: 80,
  height: 80,
  display: 'block',
});

export const uploadCaptionStyle = style({
  minWidth: 240,
  fontSize: '0.9rem',
  textAlign: 'center',
});

export const closeIconStyle = style({
  position: 'absolute',
  top: 8,
  left: 8,
  cursor: 'pointer',
  ':hover': {
    color: vars.color.secondry,
  },
});

// .uploader {
//   .drop {
//     &.is-over {
//       background: $yellow;
//       color: $black;
//     }
//     .zone {
//       >.inner {
//         position: relative;
//         >.uploadicon {
//           >.icon {

//           }
//         }
//       }
//     }
//   }
