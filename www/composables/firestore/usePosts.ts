import { QueryParams, useCachedQuery } from './useCachedQuery';
import { OriginalPost } from '~/schemas/post';

export const usePosts = (args: Omit<QueryParams, 'collection'>) => {

  const result = ref<any>({
    isLoading: true,
    isError: false,
    error: undefined,
    data: undefined,
  });

  const { where = [] } = args;

  // Query
  onMounted(() => {
    result.value = useCachedQuery<OriginalPost>({
      ...args,
      collection: 'posts',
      where: [
        { key: 'isDeleted', val: false },
        { key: 'isPublic', val: true },
        { key: 'status', val: 'published' },
        ...where,
      ],
    });
  });

  return result;

};