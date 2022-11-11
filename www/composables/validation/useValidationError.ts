import { ErrorObject } from "ajv";

export const useValidationError = (errors: ErrorObject[] | null | undefined, keys: string[]) => {

  const newErrors = new Map();

  if (!errors || keys.length === 0) return newErrors;

  for (const key of keys) {
    newErrors.set(key, []);
  }

  for (const error of errors) {
    const key = keys.find(k => `/${k}` === error.instancePath)
    const messages = newErrors.get(key);
    newErrors.set(key, [...messages, error.message]);
  }

  return newErrors;
}