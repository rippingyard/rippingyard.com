import { QueryParams, useCachedDoc } from '../firestore/useCachedDoc';
import { OriginalPost } from '~/schemas/post';

export const usePost = (id: string, args?: Omit<QueryParams, 'collection' | 'id'>) => {

  const result = ref<any>({
    isLoading: true,
    isError: false,
    error: undefined,
    data: undefined,
  });

  // const { where = [] } = args;

  // Doc
  onMounted(() => {
    result.value = useCachedDoc<OriginalPost>({
      ...args,
      collection: 'posts',
      id,
      // where: [
      //   { key: 'isDeleted', val: false },
      //   { key: 'isPublic', val: true },
      //   { key: 'status', val: 'published' },
      //   ...where,
      // ],
    });
  });

  return result;

};