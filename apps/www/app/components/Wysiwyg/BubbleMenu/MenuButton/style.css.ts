import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';

export const buttonStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  border: 0,
  color: vars.color.neutral,
  padding: '12px 8px',
  minWidth: 40,
  cursor: 'pointer',
  //   &:last-child {
  //     margin-right: 0;
  //   }
  //   &:hover {
  //     background-color: $gray;
  //   }
});

export const activeButtonStyle = style({
  backgroundColor: vars.color.primary,
});
