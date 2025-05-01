import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { mediaQuery } from '~/utils/style';

const BORDER_SIZE = 12;

export const containerStyle = style({
  boxSizing: 'content-box',
  width: `calc(100vw - 48px - ${BORDER_SIZE * 2}px)`,
  maxWidth: 1280,
  margin: 'auto',
  height: 'fit-content',
  border: `${BORDER_SIZE}px solid ${vars.color.neutral}`,
  '@media': {
    [mediaQuery('SP')]: {
      width: `calc(100vw - 32px - ${BORDER_SIZE * 2}px)`,
      // height: rootVars.size.billboard.minHeight,
    },
  },
});
