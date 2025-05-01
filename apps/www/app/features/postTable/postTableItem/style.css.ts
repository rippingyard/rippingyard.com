import { style } from '@vanilla-extract/css';

import { rootVars } from '~/styles/vars.css';

export const containerStyle = style({
  // padding: 8,
});

export const headingStyle = style({
  fontSize: rootVars.font.size['x-large'],
  fontWeight: rootVars.font.weight.bold,
  marginBottom: 8,
  lineHeight: 1.6,
});

export const footerStyle = style({
  display: 'flex',
  gap: 4,
  paddingTop: 8,
});

export const summaryStyle = style({
  fontSize: rootVars.font.size.small,
  marginBottom: 8,
});

export const tagContainerStyle = style({
  fontSize: rootVars.font.size['x-small'],
});
