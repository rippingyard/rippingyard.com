import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

const RoleSchema = z.enum([
  'lord',
  'mayor',
  'resident',
  'stranger',
  'anonymous',
]);

const UserSchema = z.object({
  uid: z.string(),
  displayName: z.string(),
  userName: z.string(),
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
