import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';
import { mediaQuery } from '~/utils/style';

export const containerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  // margin: 'auto',
  borderTop: `3px solid ${vars.color.neutral}`,
  borderBottom: `8px solid ${vars.color.neutral}`,
  backgroundColor: vars.color.background,
});

export const dayStyle = style({
  fontSize: rootVars.font.size['xxx-large'],
  fontWeight: rootVars.font.weight.bold,
  lineHeight: 1.6,
});
export const monthStyle = style({
  position: 'relative',
  textTransform: 'uppercase',
  fontFamily: rootVars.font.family.serif,
  fontSize: rootVars.font.size['x-small'],
  color: vars.color.background,
  backgroundColor: vars.color.success,
  fontWeight: rootVars.font.weight.bold,
  // border: `3px solid ${vars.color.neutral}`,
  paddingTop: 5,
  paddingBottom: 5,
  lineHeight: 1.6,
  selectors: {
    // '&::before': {
    //   content: '',
    //   position: 'absolute',
    //   background: `linear-gradient(45deg, ${vars.color.background} 50%, transparent 52%), linear-gradient(315deg, ${vars.color.background} 50%, transparent 52%)`,
    //   backgroundSize: '10px 10px',
    //   height: 5,
    //   width: '100%',
    //   left: 0,
    //   top: 0,
    // },
    '&::after': {
      content: '',
      position: 'absolute',
      background: `linear-gradient(45deg, ${vars.color.background} 50%, transparent 52%), linear-gradient(315deg, ${vars.color.background} 50%, transparent 52%)`,
      backgroundSize: '10px 10px',
      height: 5,
      width: '100%',
      left: 0,
      bottom: 0,
    },
  },
});
export const yearStyle = style({
  fontSize: rootVars.font.size['xx-small'],
  fontWeight: rootVars.font.weight.bold,
  lineHeight: 1.8,
  paddingBottom: 2,
});

export const hourStyle = style({
  fontSize: rootVars.font.size['x-small'],
  borderTop: `1px dotted ${vars.color.neutral}`,
  '@media': {
    [mediaQuery('TB')]: {
      display: 'none',
    },
  },
});
