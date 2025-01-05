import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';
import { zIndex } from '~/utils/style';

export const containerStyle = style({
  position: 'relative',
  zIndex: zIndex('WYSIWYG_MODAL'),
});

export const entitiesContainerStyle = style({
  position: 'absolute',
  top: 45,
  backgroundColor: vars.color.shadow,
  // border: `2px solid ${vars.color['neutral-40']}`,
  borderRadius: rootVars.border.radius.normal,
  width: 'fit-content',
  minWidth: '100%',
  maxWidth: 300,
  overflow: 'hidden',
});

export const entityStyle = style({
  padding: '8px 12px',
  fontSize: rootVars.font.size['x-small'],
  fontWeight: rootVars.font.weight.bold,
  // border: `1px solid ${vars.color.shadow}`,
  borderTop: 0,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  ':hover': {
    backgroundColor: vars.color.highlight,
  },
});

export const focusedEntityStyle = style({
  backgroundColor: vars.color.highlight,
});
