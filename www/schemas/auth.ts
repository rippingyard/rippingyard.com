import { JTDSchemaType } from 'ajv/dist/jtd';
import { useValidator } from '~/composables/validation/useValidator';

const ajv = useValidator(['email', 'password']);

export type Auth = {
  email: string;
  password: string;
}

const schema: JTDSchemaType<Auth> = {
  properties: {
    email: {
      type: 'string',
      metadata: {
        format: 'email',
        isNotEmpty: true,
        // errorMessage: {
        //   isNotEmpty: 'おかしな値だ',
        // }
      },
    },
    password: {
      type: 'string',
      metadata: {
        format: 'password',
        minLength: 6,
      },
    },
  },
  // optionalProperties: {
  //   bar: {type: "string"}
  // }
}

export const authValidator = ajv.compile(schema);
