import { Role } from '@rippingyard/schemas';

export const isSuperUser = (role: Role) => ['lord', 'mayer'].includes(role);

export const isAnonymous = (role: Role) => role === 'anonymous';
