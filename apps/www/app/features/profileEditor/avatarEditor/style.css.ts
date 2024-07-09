import { ComplexStyleRule, style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';
import { zIndex } from '~/utils/style';

const baseButtonStyle: ComplexStyleRule = {
  width: rootVars.avatar.size,
  height: rootVars.avatar.size,
  borderRadius: rootVars.border.radius.normal,
  textAlign: 'center',
  placeContent: 'center',
  cursor: 'pointer',
  fontSize: rootVars.font.size['x-large'],
};

export const emptyStyle = style({
  ...baseButtonStyle,
  border: `3px dashed ${vars.color.shadow}`,
  backgroundColor: vars.color.highlight,
  ':hover': {
    backgroundColor: vars.color.secondry,
  },
});

export const removeButtonStyle = style({
  ...baseButtonStyle,
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 0,
  ':hover': {
    backgroundColor: vars.color.neutral,
    color: vars.color.background,
    opacity: 0.8,
  },
});

export const avatarContainerStyle = style({
  position: 'relative',
});

export const modalStyle = style({
  display: 'block',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: zIndex('WYSIWYG_MODAL'),
  width: '100vw',
  height: '100vh',
  backgroundColor: vars.color.background,
});
