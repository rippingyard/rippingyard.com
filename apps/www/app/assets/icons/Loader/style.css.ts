import {
  ComplexStyleRule,
  globalStyle,
  keyframes,
  style,
} from '@vanilla-extract/css';

// import { vars } from '~/styles/theme.css';

const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const baseLoaderStyle: ComplexStyleRule = {
  animation: `${rotate} 1s ease-in-out infinite`,
  lineHeight: 1,

  width: 24,
};

export const loaderStyle = style(baseLoaderStyle);

globalStyle(`${loaderStyle} .loading__front`, {
  fill: 'none',
  // stroke: $white,
  // stroke: '#FFF',
  strokeWidth: 1,
  // stroke-miterlimit: 10,
  strokeDasharray: '65% 295%',

  stroke: '#111',
});

globalStyle(`${loaderStyle} .loading__back`, {
  fill: 'none',
  // stroke: '#FFF',
  strokeWidth: 2,
  strokeMiterlimit: 10,
  // strokeOpacity: 0.5,

  stroke: '#111',
  strokeOpacity: 0.2,
});

// .loadingIcon {

//   .loading__front {

//   }

//   .loading__back {

//   }

//   &.black {

//     .loading__front,
//     .loading__back {
//       stroke: #111;
//     }

//     .loading__back {
//       stroke-opacity: 0.2;
//     }
//   }

//   &.yellow {

//     .loading__front,
//     .loading__back {
//       stroke: #FF2;
//     }
//   }

//   &.small {
//     width: 24px;
//   }

//   &.medium {
//     width: 56px;
//   }

//   &.large {
//     width: 80px;
//   }
// }

// @keyframes rotate-transition {
//   0% {
//     transform: rotate(0);
//   }

//   100% {
//     transform: rotate(360deg);
//   }
// }
