import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';
import { mediaQuery, zIndex } from '~/utils/style';

export const containerStyle = style({
  position: 'relative',
  display: 'block',
  width: '100%',
  paddingTop: '56.25%',
  marginBottom: 25,
  overflow: 'hidden',
  borderRadius: rootVars.border.radius.normal,
});

export const widgetStyle = style({
  position: 'absolute',
  top: 0,
  right: 0,
  width: '100% !important',
  height: '100% !important',
});

export const previewContainerStyle = style({
  outline: 'none',
  lineHeight: 1.8,
  overflow: 'hidden',
  position: 'relative',
  marginBottom: 25,
  ':hover': {
    cursor: 'pointer',
  },
});

export const previewImageStyle = style({
  position: 'relative',
  display: 'block',
  padding: 0,
  marginBottom: '0 !important',
  '@container': {
    [mediaQuery('SP')]: {
      minWidth: '100%',
    },
  },
});

export const playIconStyle = style({
  color: vars.color.warning,
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: zIndex('COVER'),
  backgroundColor: vars.color['shadow-40'],
  borderRadius: rootVars.border.radius.normal,
});
