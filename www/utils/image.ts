﻿import Compressor from 'compressorjs';

export type ResizedImage = {
  file: File,
  url: string,
  blob: Blob,
};

export const resizeImage = (
  image: any,
  params: {
    width?: number
    height?: number
    quality?: number
    minQuality?: number
    targetSize?: number
  } = {
      minQuality: 0.8,
      targetSize: 2,
    }
): Promise<ResizedImage> => {
  if (!image) return Promise.reject();

  return new Promise((resolve, reject) => {
    const { width = 2000, height = 2000, quality = 1.0 } = params;

    new Compressor(image, {
      quality,
      width,
      height,
      success: (blob) => {

        const reader = new FileReader();
        reader.readAsDataURL(blob);

        reader.onload = async () => {
          console.log('blob', blob, blob.type);
          console.log('reader.result', reader.result);
          resolve({
            blob,
            file: new File([blob], blob.name, {
              type: blob.type,
            }),
            url: reader.result as string,
          });
        }
      },
      error: e => {
        console.error(e);
        reject(e);
      }
    });
  });
}
