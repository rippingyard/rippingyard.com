import { style } from '@vanilla-extract/css';

import { FONT, black, white } from '~/utils/style';

export const bodyStyle = style({
  margin: 0,
  padding: 0,
  fontFamily: FONT.NORMAL,
  fontSize: 18,
  lineHeight: 1.8,
  backgroundColor: white(),
  color: black(),
});
