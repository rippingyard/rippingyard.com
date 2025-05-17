import Compressor from 'compressorjs';
import convert from 'heic-convert/browser';

export type ResizedImage = {
  file: File;
  url: string;
  blob: Blob;
};

const convertImage = async (image: File | Blob) => {
  if (image.type !== 'image/heic') return image;

  const arrayBuffer = await image.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const convertedImage = await convert({
    buffer,
    format: 'PNG',
    // quality: 0.4,
  });

  return new File([convertedImage], 'converted.png', {
    type: 'image/png',
  });
};

export const resizeImage = async (
  originalImage: File | Blob,
  params: {
    width?: number;
    height?: number;
    maxWidth?: number;
    quality?: number;
    minQuality?: number;
    targetSize?: number;
  } = {
    minQuality: 0.8,
    targetSize: 2,
  }
): Promise<ResizedImage> => {
  if (!originalImage) return Promise.reject();

  const image = await convertImage(originalImage);

  if (!image) return Promise.reject();

  return new Promise((resolve, reject) => {
    new Compressor(image, {
      quality: 0.9,
      maxWidth: 1700,
      ...params,
      convertSize: 500000,
      success: (blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);

        reader.onload = async () => {
          resolve({
            blob,
            file: new File([blob], '', {
              type: blob.type,
            }),
            url: reader.result as string,
          });
        };
      },
      error: (e) => {
        console.error(e);
        reject(e);
      },
    });
  });
};
