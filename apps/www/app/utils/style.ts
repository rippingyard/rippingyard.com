enum LAYER {
  WYSIWYG_MODAL = 99999,
  FIXED_HEADER = 200,
  MODAL = 60,
  COVER = 20,
}

enum MEDIA_QUERY {
  SP = 'screen and (max-width: 401px)',
  TB = 'screen and (max-width: 721px)',
}

export const zIndex = (layer: keyof typeof LAYER) => LAYER[layer];
export const mediaQuery = (type: keyof typeof MEDIA_QUERY) => MEDIA_QUERY[type];
