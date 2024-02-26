import { globalStyle } from '@vanilla-extract/css';

import { vars } from './theme.css';
import { rootVars } from './vars.css';

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  fontFamily: rootVars.font.family.normal,
  fontSize: rootVars.font.size.base,
  lineHeight: 1.8,
  backgroundColor: vars.color.background,
  color: vars.color.neutral,
});
