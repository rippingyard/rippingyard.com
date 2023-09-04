export const useDomain = () => {
  return process.env.VERCEL_ENV === 'development' ? 'https://rippingyard-qhlsnr9ds-rippingyard.vercel.app' : 'https://www.rippingyard.com';
}