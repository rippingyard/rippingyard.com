import { QueryParams, useCachedDoc } from '../firestore/useCachedDoc';
import { OriginalEntity, EntityType } from '~/schemas/entity';

export type EntityQueryParams = Omit<QueryParams, 'collection' | 'id'>;

export const useEntity = (params: string | {
  id: string;
  type: EntityType;
}, args?: EntityQueryParams) => {

  const id = typeof params === 'string' ? params : params.id;

  return useCachedDoc<OriginalEntity>({
    ...args,
    collection: 'entities',
    id,
    // where: [
    //   { key: 'isDeleted', val: false },
    //   { key: 'isPublic', val: true },
    //   { key: 'status', val: 'published' },
    //   ...where,
    // ],
  });

};