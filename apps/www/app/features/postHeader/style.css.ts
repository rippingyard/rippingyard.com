import { style } from '@vanilla-extract/css';
import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const containerStyle = style({
  display: 'flex',
  gap: 4,
});

export const statusStyle = style({
  fontSize: rootVars.font.size['x-small'],
  padding: 8,
  lineHeight: 1,
  border: `2px solid ${vars.color.neutral}`,
  fontWeight: rootVars.font.weight.bold,
  marginBottom: 32,
});

export const postStatusStyle = style({
  color: vars.color.warning,
  borderColor: vars.color.warning,
});
export const postIsPublicStyle = style({
  color: vars.color.primary,
  borderColor: vars.color.primary,
});
