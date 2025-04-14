import { createContainer, style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';
import { zIndex } from '~/utils/style';

export const frameContainer = createContainer();

export const frameStyle = style({
  containerName: frameContainer,
  containerType: 'inline-size',
  // width: 'calc(100vw - 48px)',
  width: '100%',
  height: rootVars.size.billboard.height,
  overflow: 'hidden',
  position: 'relative',
  // scrollSnapType: 'x mandatory',
  // scrollBehavior: 'smooth',
  // selectors: {
  //   '&::-webkit-scrollbar': {
  //     display: 'none',
  //   },
  // },
});

export const headerStyle = style({
  width: '100%',
  position: 'absolute',
  top: 0,
  zIndex: zIndex('COVER'),
});

export const containerStyle = style({
  listStyle: 'none',
  padding: 0,
  display: 'flex',
  position: 'absolute',
  transition: 'left 0.3s ease-in-out',
  height: '100%',
  width: '100%',
});

export const invisibleStyle = style({
  display: 'none',
  transition: '0.3s ease-in-out',
});

export const itemStyle = style({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  // height: 'calc(100vh - 180px)',
  scrollSnapAlign: 'start',
  // background: vars.color.primary,
  flexShrink: 0,
  // borderRadius: `0 0 ${rootVars.border.radius.normal} ${rootVars.border.radius.normal}`,
});

export const pagerContainerStyle = style({
  // display: 'none',
  // position: 'absolute',
  textAlign: 'right',
  bottom: 0,
  width: '100%',
});

export const pagerItemStyle = style({
  display: 'inline-block',
  cursor: 'pointer',
});

export const labelStyle = style({
  position: 'absolute',
  left: 0,
  top: 0,
  fontSize: rootVars.font.size['x-small'],
  // fontWeight: rootVars.font.weight.bold,
  padding: '6px 18px 18px 6px',
  lineHeight: 1,
  color: vars.color.background,
  backgroundColor: vars.color.neutral,
});
