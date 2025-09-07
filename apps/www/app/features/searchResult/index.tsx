import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { PostItem } from '~/components/PostItem';
import { hitToPost } from '~/utils/search';

import type { PostAsSearchResult } from '@rippingyard/schemas';

import { noResultStyle } from './style.css';

type Props = {
  posts: PostAsSearchResult[];
  query: string;
};

export const SearchResult: FC<Props> = ({ posts = [], query = '' }) => {
  const { t } = useTranslation();
  const items = useMemo(
    () =>
      posts.filter((item) => {
        return !item.isDeleted && item.isPublic && item.status === 'published';
      }),
    [posts]
  );

  const isEmpty = useMemo(
    () => query && items.length === 0,
    [items.length, query]
  );

  return (
    <>
      {(isEmpty && <p className={noResultStyle}>{t('noResult')}</p>) || (
        <ul>
          {items.map((item) => (
            <li key={item.objectID}>
              <PostItem
                post={hitToPost(item)}
                mode="detail"
                // mode={i === 0 ? 'detail' : 'list'}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
