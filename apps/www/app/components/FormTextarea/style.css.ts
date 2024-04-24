import { style } from '@vanilla-extract/css';

import { vars } from '~/styles/theme.css';
import { rootVars } from '~/styles/vars.css';

export const textareaStyle = style({
  width: '100%',
  borderBottom: `1px solid ${vars.color.neutral}`,
  fontSize: rootVars.font.size.small,
  padding: '5px 0',
  outline: 'none',
  resize: 'none',
  overflow: 'hidden',
  selectors: {
    '&:focus': {
      borderBottom: `1px solid ${vars.color.primary}`,
    },
  },
});

export const headingStyle = style({
  fontSize: rootVars.font.size['xxx-large'],
  lineHeight: 1.4,
  padding: '16px 0',
});

export const boldStyle = style({
  fontWeight: rootVars.font.weight.bold,
});
