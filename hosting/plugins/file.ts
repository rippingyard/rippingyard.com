export function getExt(image: any) {
  const mime: string = image.type
  if (/png/.test(mime)) return 'png'
  if (/jpe?g/.test(mime)) return 'jpg'
  if (/gif/.test(mime)) return 'gif'
}
