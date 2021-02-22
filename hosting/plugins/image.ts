import { isNil } from 'lodash'

const Compress = process.client ? require('client-compress') : undefined

export function resizeImage(
  image: any,
  params: {
    width?: number
    height?: number
    quality?: number
    minQuality?: number
    targetSize?: number
  } = {
    width: 2000,
    height: 2000,
    quality: 1.0,
    minQuality: 0.8,
    targetSize: 2,
  }
): Promise<any> {
  if (!Compress || isNil(image)) return Promise.resolve('')
  return new Promise((resolve, reject) => {
    const compress = new Compress({
      targetSize: params.targetSize,
      quality: params.quality,
      minQuality: params.minQuality,
      maxWidth: params.width,
      maxHeight: params.height,
    })

    const reader = new FileReader()
    reader.readAsDataURL(image)

    reader.onload = async () => {
      const compressedImages = await compress.compress([image])
      resolve(compressedImages[0].photo.data)
    }

    reader.onerror = error => reject(error)
  })
}
