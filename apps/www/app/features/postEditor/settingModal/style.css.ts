import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';
import { size } from '~/utils/style';

export const containerStyle = style({
  // minWidth: '90vw',
  maxWidth: size('MAIN'),
  padding: 32,
  paddingTop: 8,
});

export const headerStyle = style({
  marginBottom: 16,
});

export const containerBodyStyle = style({});

export const statusSelectorStyle = style({
  display: 'flex',
  gap: 16,
  marginBottom: 16,
});

export const statusItemStyle = style({
  padding: 12,
  position: 'relative',
  border: `3px solid ${vars.color.shadow}`,
  borderRadius: rootVars.border.radius.large,
  flexGrow: 1,
  maxWidth: '50%',
  cursor: 'pointer',
  color: vars.color.shadow,
  transition: '0.2s ease-in-out',
  ':hover': {
    backgroundColor: vars.color['shadow-20'],
  },
});

export const statusItemSelectedStyle = style({
  border: `3px solid ${vars.color.primary}`,
  color: vars.color.primary,
});

export const statusRadioButtonStyle = style({
  position: 'absolute',
  right: 12,
  top: 8,
});

export const statusItemLabelStyle = style({
  fontWeight: rootVars.font.weight.bold,
  fontSize: rootVars.font.size.large,
  marginBottom: 4,
});

export const statusItemDescriptionStyle = style({
  fontSize: rootVars.font.size['x-small'],
  lineHeight: 1.6,
});
