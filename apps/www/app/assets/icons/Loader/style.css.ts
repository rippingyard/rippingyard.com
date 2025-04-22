import {
  ComplexStyleRule,
  globalStyle,
  keyframes,
  style,
} from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';

const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const baseLoaderStyle: ComplexStyleRule = {
  animation: `${rotate} 1s ease-in-out infinite`,
  lineHeight: 1,
  width: 18,
};

export const loaderStyle = style(baseLoaderStyle);

globalStyle(`${loaderStyle} .loading__front`, {
  fill: 'none',
  strokeWidth: 8,
  strokeDasharray: '65% 295%',
  stroke: vars.color.neutral,
});

globalStyle(`${loaderStyle} .loading__back`, {
  fill: 'none',
  strokeWidth: 10,
  strokeMiterlimit: 12,
  stroke: vars.color.neutral,
  strokeOpacity: 0.2,
});
