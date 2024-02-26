import { style } from '@vanilla-extract/css';

// import { vars } from './theme.css';

export const dottedBackgroundStyle = style({
  // background: `radial-gradient(rgba(${vars.color.neutral}, 0.2) 1px, transparent 1px),
  //   radial-gradient(rgba(${vars.color.neutral}, 0.2) 1px, transparent 1px), transparent`,
  background: `radial-gradient(hsla(0,0%,7%,.2) 1px,transparent 0),
    radial-gradient(hsla(0,0%,7%,.2) 1px,transparent 0), transparent`,
  backgroundSize: '10px 10px, 10px 10px',
  backgroundPosition: '0 0, 5px 5px, 0 0',
});
