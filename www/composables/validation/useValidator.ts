import Ajv from 'ajv/dist/jtd';
import addFormats, { FormatName } from 'ajv-formats';
// import ajvErrors from 'ajv-errors';
import format from 'ajv/dist/vocabularies/format/format';

export const useValidator = (formats: FormatName[] = []) => {

  const ajv = new Ajv({ allErrors: true });
  ajv.addKeyword(format)
  addFormats(ajv, formats);
  // ajvErrors(ajv);

  ajv.addKeyword({
    keyword: 'isNotEmpty',
    type: 'string',
    validate: (_scheme: boolean, data: string) => typeof data === 'string' && data.trim() !== '',
  });

  ajv.addKeyword({
    keyword: 'minLength',
    type: 'string',
    validate: (length: number, data: string) => data.trim().length > length,
  });

  return ajv;

}