// import { ErrorObject, JSONSchemaType } from "ajv";
// import { Timestamp } from "firebase/firestore";
// import { useValidationError } from "~/composables/validation/useValidationError";
// import { useValidator } from "~/composables/validation/useValidator";

import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

// const ajv = useValidator([]);

const UserSchema = z.object({
  uid: z.string(),
  displayName: z.string(),
  userName: z.string(),
  code: z.string().optional(),
  profile: z.string().optional(),
  avatar: z.string().optional(),
  role: z.enum(['load', 'mayor', 'resident', 'stranger']),
  isBanned: z.boolean(),
  isDeleted: z.boolean(),
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
});

export type User = z.infer<typeof UserSchema>;

// export type UserState = {
//   me: User | null
// }

// const schema: JSONSchemaType<Pick<User, 'displayName' | 'userName'>> = {
//   type: 'object',
//   properties: {
//     displayName: {
//       type: 'string',
//       isNotEmpty: true,
//     },
//     userName: {
//       type: 'string',
//       isNotEmpty: true,
//     },
//   },
//   required: ['displayName', 'userName'],
//   // additionalProperties: false,
//   errorMessage: {
//     properties: {
//       displayName: '表示名が入力されていません',
//       userName: 'ユーザー名が入力されていません',
//     },
//   },
// }

// export const userValidator = ajv.compile<User>(schema);

// export const userValidationErrors = (errors: ErrorObject[] = []) => {
//   return useValidationError(errors, []);
// }
