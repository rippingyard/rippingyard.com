export function getDomain() {
  return process.env.VERCEL_ENV !== 'production'
    ? 'http://localhost:3333'
    : 'https://www.rippingyard.com'
}

export function createToken(length: number = 8) {
  const letters = 'abcdefghjkmnpqrstuvwxyz'
  const numbers = '23456789'
  const string = letters + letters.toUpperCase() + numbers

  let token = ''
  for (let i = 0; i < length; i++) {
    token += string.charAt(Math.floor(Math.random() * string.length))
  }

  return token
}

export const numberByString = (str: string): number => {
  if (!str) return 0;
  let number = 0;
  for (let i = 0; i < str.length; i++) {
    number += str.charCodeAt(i);
  }
  return number;
}

export const isUrl = (string: string): boolean => {
  return /^http(s)?:\/\//.test(string)
}
