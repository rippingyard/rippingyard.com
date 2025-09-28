import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const container = style({
  paddingBottom: 24,
  marginBottom: 24,
  borderBottom: `1px solid ${vars.color['neutral-20']}`,
});

export const descriptionContainer = style({
  padding: 24,
  marginBottom: 24,
  border: `1px solid ${vars.color.success}`,
  fontSize: rootVars.font.size.small,
  // fontWeight: rootVars.font.weight.bold,
  color: vars.color.success,
});

export const descriptionFooter = style({
  fontSize: rootVars.font.size['xx-small'],
});

export const list = style({
  paddingTop: 24,
});

export const item = style({
  display: 'inline-block',
  marginRight: 24,
});
