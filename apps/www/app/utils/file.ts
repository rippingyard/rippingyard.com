export const getExt = (image: File) => {
  console.log('image', image.type);
  const mime: string = image.type;
  if (/png/.test(mime)) return 'png';
  if (/jpe?g/.test(mime)) return 'jpg';
  if (/gif/.test(mime)) return 'gif';
};
