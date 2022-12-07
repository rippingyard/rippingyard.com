// import { ErrorObject, JTDSchemaType } from 'ajv/dist/jtd';
import { ErrorObject, JSONSchemaType } from 'ajv';
import { useValidator } from '~/composables/validation/useValidator';
import { useValidationError } from '~/composables/validation/useValidationError';

const ajv = useValidator(['email', 'password']);

export type Auth = {
  email: string;
  password: string;
}

const schema: JSONSchemaType<Auth> = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      isNotEmpty: true,
    },
    password: {
      type: 'string',
      isNotEmpty: true,
      // minLength: 6,
    },
  },
  required: ['email', 'password'],
  // additionalProperties: false,
  errorMessage: {
    properties: {
      email: 'E-Mailが入力されていません',
      password: 'パスワードが入力されていません',
    },
  },
}

export const authValidator = ajv.compile<Auth>(schema);

export const authValidationErrors = (errors: ErrorObject[] = []) => {
  return useValidationError(errors, ['email', 'password']);
}
