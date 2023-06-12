import { ErrorObject, JSONSchemaType } from "ajv";
import { Timestamp } from "firebase/firestore";
import { useValidationError } from "~/composables/validation/useValidationError";
import { useValidator } from "~/composables/validation/useValidator";

const ajv = useValidator([]);

export type User = {
  uid: string
  displayName: string
  userName: string
  code?: string
  profile?: string
  avatar?: string
  role: 'load' | 'mayor' | 'resident' | 'stranger'
  isBanned: boolean;
  isDeleted: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type UserState = {
  me: User | null
}

const schema: JSONSchemaType<Pick<User, 'displayName' | 'userName'>> = {
  type: 'object',
  properties: {
    displayName: {
      type: 'string',
      isNotEmpty: true,
    },
    userName: {
      type: 'string',
      isNotEmpty: true,
    },
  },
  required: ['displayName', 'userName'],
  // additionalProperties: false,
  errorMessage: {
    properties: {
      displayName: '表示名が入力されていません',
      userName: 'ユーザー名が入力されていません',
    },
  },
}

export const userValidator = ajv.compile<User>(schema);

export const userValidationErrors = (errors: ErrorObject[] = []) => {
  return useValidationError(errors, []);
}
