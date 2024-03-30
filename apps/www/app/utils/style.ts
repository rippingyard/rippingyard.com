﻿enum LAYER {
  FIXED_HEADER = 100,
  COVER = 20,
}

enum MEDIA_QUERY {
  SP = 'screen and (max-width: 401px)',
  TB = 'screen and (max-width: 721px)',
}

export const zIndex = (layer: keyof typeof LAYER) => LAYER[layer];
export const mediaQuery = (type: keyof typeof MEDIA_QUERY) => MEDIA_QUERY[type];
