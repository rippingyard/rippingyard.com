import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';
import { mediaQuery, zIndex } from '~/utils/style';

export const previewContainerStyle = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  gap: 10,
  flexDirection: 'row',
  '@media': {
    [mediaQuery('TB')]: {
      flexDirection: 'column',
    },
  },
});

export const previewImageStyle = style({
  width: '60%',
  height: '100%',
  position: 'relative',
  backgroundColor: vars.color.highlight,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: rootVars.border.radius.normal,
  overflow: 'hidden',
  '@media': {
    [mediaQuery('TB')]: {
      width: '100%',
    },
  },
});

globalStyle(`${previewImageStyle} img`, {
  maxWidth: '100%',
  maxHeight: '100%',
});

export const previewCloseStyle = style({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  alignItems: 'center',
  justifyContent: 'center',
  // backgroundColor: $white-transparent-60,
  display: 'flex',
  opacity: 0,
  zIndex: zIndex('COVER'),
  cursor: 'pointer',
  ':hover': {
    opacity: 1,
    width: '100%',
    height: '100%',
    backgroundColor: vars.color['background-20'],
  },
});

export const previewDataStyle = style({
  width: '40%',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: rootVars.border.radius.normal,
  border: `1px solid ${vars.color.shadow}`,
  '@media': {
    [mediaQuery('TB')]: {
      width: '100%',
      border: 0,
    },
  },
});

export const previewDataListStyle = style({
  padding: 16,
  '@media': {
    [mediaQuery('TB')]: {
      display: 'none',
    },
  },
});

export const consoleStyle = style({
  position: 'absolute',
  bottom: 0,
  // width: 'calc(100% - 10px)',
  width: '100%',
  paddingTop: 10,
  // borderRadius: rootVars.border.radius.normal,
  overflow: 'hidden',
  '@media': {
    [mediaQuery('TB')]: {
      position: 'relative',
      padding: 0,
    },
  },
});

//     >.data {

//       >.filedata {
//         >dt {
//           font-size: 0.7rem;
//         }

//         >dd {
//           margin-bottom: 5px;
//           overflow: hidden;
//         }
//       }
//     }
//   }
// }
