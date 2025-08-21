import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';
import { zIndex } from '~/utils/style';

export const wrapperStyle = style({
  height: '100%',
  position: 'relative',
});

globalStyle('.tiptap.ProseMirror', {
  minHeight: '60dvh',
});

globalStyle(
  '.tiptap:not(.ProseMirror-focused) p.is-editor-empty:first-child::before',
  {
    color: vars.color['neutral-40'],
    content: 'attr(data-placeholder)',
    float: 'left',
    height: 0,
    // 'pointer-events': 'none',
  }
);

// .tiptap p.is-editor-empty:first-child::before {
//   color: #adb5bd;
//   content: attr(data-placeholder);
//   float: left;
//   height: 0;
//   pointer-events: none;
// }

export const containerStyle = style({
  outline: 'none',
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

export const errorStyle = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  fontSize: rootVars.font.size['x-small'],
  color: vars.color.warning,
  ':hover': {
    cursor: 'pointer',
  },
});

export const loadingStyle = style({
  position: 'absolute',
  bottom: 5,
  left: 0,
  fontSize: rootVars.font.size['small'],
});
