enum LAYER {
  WYSIWYG_MODAL = 99999,
  FIXED_HEADER = 200,
  MODAL = 60,
  COVER = 20,
}

enum WIDTH {
  MAIN = 780,
}

enum MEDIA_QUERY {
  SP = 'screen and (max-width: 401px)',
  TB = 'screen and (max-width: 721px)',
}

export const size = (width: keyof typeof WIDTH) => WIDTH[width];
export const zIndex = (layer: keyof typeof LAYER) => LAYER[layer];
export const mediaQuery = (type: keyof typeof MEDIA_QUERY) => MEDIA_QUERY[type];
