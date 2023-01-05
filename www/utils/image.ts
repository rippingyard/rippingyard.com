import Compressor from 'compressorjs';

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
): Promise<string> => {
  if (!image) return Promise.resolve('');

  return new Promise((resolve, reject) => {
    const { width = 2000, height = 2000, quality = 1.0 } = params;

    new Compressor(image, {
      quality,
      width,
      height,
      success: (blob) => {

        const reader = new FileReader();
        reader.readAsDataURL(blob);

        reader.onload = () => {
          resolve(reader.result as string);
        }

        // console.log('blob', blob, blob.type);
        // resolve(new File([blob], blob.name, {
        //   type: blob.type,
        // }));
      },
      error: e => {
        console.error(e);
        reject(e);
      }
    });

    // console.log('compressedImage', compressedImage);

    // return (compressedImage as any).file;
    // } catch (e) {
    //   console.error('fail to resize image', e);
    // }

    // const compress = new Compressor({
    //   targetSize: params.targetSize,
    //   quality: params.quality,
    //   minQuality: params.minQuality,
    //   maxWidth: params.width,
    //   maxHeight: params.height,
    // })



    // reader.onload = async () => {
    //   const compressedImages = await compress.compress([image])
    //   resolve(compressedImages[0].photo.data)
    // }

    // reader.onerror = error => reject(error)
  });
}
