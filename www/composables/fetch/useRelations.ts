import { OriginalRelation } from '~~/schemas/relation';
import { QueryParams, useCachedDocs, useCachedInfiniteDocs } from '../firestore/useCachedDocs';

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

export const useRelations = (payload: Omit<QueryParams, 'collection'> = {}) => {

  const { args, where } = buildConditions(payload);

  return useCachedDocs<OriginalRelation>({
    ...args,
    collection: 'relations',
    where,
  });

};

export const useInfiniteRelations = (payload: Omit<QueryParams, 'collection'> = {}) => {

  const { args, where } = buildConditions(payload);

  return useCachedInfiniteDocs<OriginalRelation>({
    ...args,
    collection: 'relations',
    where,
  });

};