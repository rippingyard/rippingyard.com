import Ajv from 'ajv';
import addFormats, { FormatName } from 'ajv-formats';
import ajvErrors from 'ajv-errors';

export const useValidator = (formats: FormatName[] = []) => {

  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv, formats);
  ajvErrors(ajv);

  ajv.addKeyword({
    keyword: 'isNotEmpty',
    type: 'string',
    validate: (_scheme: boolean, data: string) => typeof data === 'string' && data.trim() !== '',
  });

  return ajv;

}