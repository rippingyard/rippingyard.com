import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';
import { HEADER_HEIGHT } from '~/utils/style';

export const containerStyle = style({
  width: '100%',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  borderCollapse: 'separate',
  borderSpacing: 0,
});

export const header = style({
  WebkitBackdropFilter: 'blur(12px)',
  backdropFilter: 'blur(12px)',
});

globalStyle(`${header} th`, {
  position: 'sticky',
  top: HEADER_HEIGHT - 3,
  backgroundColor: vars.color.background,
  borderBottom: `2px solid ${vars.color.neutral}`,
  WebkitBackdropFilter: 'blur(12px)',
  backdropFilter: 'blur(12px)',
  padding: 8,
  verticalAlign: 'middle',
  fontSize: rootVars.font.size.small,
});

export const itemStyle = style({
  overflow: 'hidden',
});

export const thStyle = style({
  // padding: 8,
  // verticalAlign: 'middle',
  // fontSize: rootVars.font.size.small,
});

export const checkboxContainerStyle = style({
  paddingTop: 6,
});
