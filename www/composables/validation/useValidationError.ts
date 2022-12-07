import { ErrorObject } from "ajv/dist/jtd";

type ErrorsMap = Map<string, string[]>;
type ErrorsType = ErrorObject[] | null | undefined;

export const useValidationError = (errors: ErrorsType, defaultKeys: string[]) => {

  const newErrors: ErrorsMap = new Map<string, string[]>();
  const keys = [...defaultKeys, '_total'];

  if (keys.length === 0) throw new Error('No Keys');

  for (const key of keys) {
    newErrors.set(key, []);
  }

  if (!errors) return returnErrorObject(newErrors, keys);

  console.log('validationErrors', errors);

  for (const error of errors) {
    const key = keys.find(k => `/${k}` === error.instancePath)
    if (key) {
      const messages = newErrors.get(key) || [];
      newErrors.set(key, [...messages, error.message as string]);

      const totalMessages = newErrors.get('_total') || [];
      newErrors.set('_total', [...totalMessages, error.message as string]);
    }
  }

  return returnErrorObject(newErrors, keys);
}

const returnErrorObject = (errors: ErrorsMap, keys: string[] = []) => {

  const validationErrors: Record<string, string[]> = {};

  for (const key of keys) {
    validationErrors[key] = errors.get(key) || [];
  }

  return {
    validationErrors,
    getValidationErrors: (key: string) => errors.get(key) || [],
    setValidationErrors: (key: string, value: string[]) => errors.set(key, value),
    useValidationError: (errors: ErrorsType) => useValidationError(errors, keys),
  }
}
