import { Timestamp } from 'firebase-admin/firestore';
import { z } from 'zod';

import { SerializedTimestamp } from '~/utils/date';

const RoleSchema = z.enum([
  'lord',
  'mayor',
  'resident',
  'stranger',
  'anonymous',
]);

export const UserSchema = z.object({
  uid: z.string().min(1),
  displayName: z.string().min(1),
  userName: z.string().min(3),
  code: z.string().optional(),
  profile: z.string().optional(),
  avatar: z.string().optional(),
  role: RoleSchema,
  isBanned: z.boolean(),
  isDeleted: z.boolean(),
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
});

export type User = z.infer<typeof UserSchema>;
export type Role = z.infer<typeof RoleSchema>;

export type SerializedUser = Omit<User, 'createdAt' | 'updatedAt'> & {
  createdAt: SerializedTimestamp;
  updatedAt: SerializedTimestamp;
};
