import {
  DocumentData,
  DocumentReference,
  OrderByDirection,
  Timestamp,
} from 'firebase-admin/firestore';

import { Post } from '~/schemas/post';

type WhereOp = '==' | 'in' | 'array-contains-any';
type WhereValue =
  | string
  | number
  | boolean
  | string[]
  | DocumentReference<DocumentData>;

type WhereParam = {
  key: string;
  op?: WhereOp;
  val: WhereValue;
};

export type WhereParams = WhereParam[];

type OrderBy = {
  key: string;
  order?: OrderByDirection;
};

export type QueryParams<T> = {
  collection: string;
  myId?: string;
  where?: WhereParams;
  limit?: number;
  startAfter?: string | number | Timestamp;
  orderBy?: OrderBy;
  lastVisible?: DocumentData;
  removeWhereKeys?: string[];
  initialData?: T[];
};

export const defaultOp = (val: WhereValue): WhereOp =>
  Array.isArray(val) ? 'in' : '==';

export const usePostCondition = (
  args: Omit<QueryParams<Post>, 'collection'> = {}
) => {
  const { where = [] } = args;

  const whereKeys = Object.keys(where);

  if (!whereKeys.includes('isDeleted'))
    where.push({ key: 'isDeleted', val: false });
  if (!whereKeys.includes('isPublic'))
    where.push({ key: 'isPublic', val: true });
  if (!whereKeys.includes('status'))
    where.push({ key: 'status', val: 'published' });

  if (!args.orderBy) {
    args.orderBy = {
      key: 'publishedAt',
      order: 'desc',
    };
  }

  return { args, where };
};
