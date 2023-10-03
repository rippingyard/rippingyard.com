import { QueryParams, useCachedDocs, useCachedInfiniteDocs } from '../firestore/useCachedDocs';
import { OriginalEntity } from '~/schemas/entity';

const buildConditions = (args: Omit<QueryParams, 'collection'> = {}) => {
  const { where = [] } = args;

  const whereKeys = Object.keys(where);

  // if (!whereKeys.includes('isDeleted')) where.push({ key: 'isDeleted', val: false });
  // if (!whereKeys.includes('isPublic')) where.push({ key: 'isPublic', val: true });
  // if (!whereKeys.includes('status')) where.push({ key: 'status', val: 'published' });

  if (!args.orderBy) {
    args.orderBy = {
      key: 'createdAt',
      order: 'desc',
    }
  }

  return { args, where };
}

export const useEntities = (payload: Omit<QueryParams, 'collection'> = {}) => {

  const { args, where } = buildConditions(payload);

  return useCachedDocs<OriginalEntity>({
    ...args,
    collection: 'entities',
    where,
  });

};

export const useInfiniteEntities = (payload: Omit<QueryParams, 'collection'> = {}) => {

  const { args, where } = buildConditions(payload);

  return useCachedInfiniteDocs<OriginalEntity>({
    ...args,
    collection: 'entities',
    where,
  });

};