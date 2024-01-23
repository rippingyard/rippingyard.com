export enum FONT {
  // eslint-disable-next-line quotes
  NORMAL = "'Source Sans Pro', -apple-system, blinkmacsystemfont, 'Segoe UI', roboto, 'Helvetica Neue', arial, sans-serif",
}

export enum LAYER {
  FIXED_HEADER = 100,
}

export const zIndex = (layer: keyof typeof LAYER) => LAYER[layer];

// $orange: hsl(14, 100%, 53%);
// $green: #D9DB7B;
// $cyan: #2BCEFE;
// $red: #F00;
