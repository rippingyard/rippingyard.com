import { z } from 'zod';

import { TimestampSchema } from './timestamp';

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
  createdAt: TimestampSchema,
  updatedAt: TimestampSchema,
});

export type User = z.infer<typeof UserSchema>;
export type Role = z.infer<typeof RoleSchema>;

// Functions用の簡易型（後方互換性のため）
export type SimpleUser = {
  id: string;
  uid?: string;
  displayName: string;
  userName: string;
  code?: string;
  profile?: string;
  avatar?: string;
  follows?: any[];
  followers?: any[];
  createdAt: string | Date | any; // Timestamp
  updatedAt: string | Date | any; // Timestamp
};

export type UserState = {
  me: User | null;
};

export type LoginParams = {
  email: string;
  password: string;
};
