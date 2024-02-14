import { style } from '@vanilla-extract/css';

import { rootVars } from '../../styles/vars.css';

export const containerStyle = style({
  fontWeight: rootVars.font.weight.bold,
});
