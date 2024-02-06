export enum LAYER {
  FIXED_HEADER = 100,
}

export const zIndex = (layer: keyof typeof LAYER) => LAYER[layer];

// $orange: hsl(14, 100%, 53%);
// $green: #D9DB7B;
// $cyan: #2BCEFE;
// $red: #F00;
