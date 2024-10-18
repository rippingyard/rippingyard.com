import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { zIndex } from '~/utils/style';

export const containerStyle = style({
  position: 'relative',
  zIndex: zIndex('WYSIWYG_MODAL'),
});

export const entitiesContainerStyle = style({
  position: 'absolute',
  top: 40,
  backgroundColor: vars.color.background,
  width: '100%',
});

export const entityStyle = style({
  padding: 8,
  border: `1px solid ${vars.color.shadow}`,
  borderTop: 0,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: vars.color.highlight,
  },
});

export const focusedEntityStyle = style({
  backgroundColor: vars.color.primary,
});
