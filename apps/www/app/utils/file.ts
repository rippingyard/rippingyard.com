export const getExt = (image: File) => {
  const mime: string = image.type;
  if (/webp/.test(mime)) return 'webp';
  if (/png/.test(mime)) return 'png';
  if (/jpe?g/.test(mime)) return 'jpg';
  if (/gif/.test(mime)) return 'gif';
};
