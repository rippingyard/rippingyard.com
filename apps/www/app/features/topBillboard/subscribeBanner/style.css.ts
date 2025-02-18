import { style } from '@vanilla-extract/css';

import { rootVars } from '~/styles/vars.css';

export const containerStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  textTransform: 'uppercase',
  fontWeight: rootVars.font.weight.bold,
  fontSize: rootVars.font.size['xx-large'],
});
