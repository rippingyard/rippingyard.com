import { FC, useMemo } from 'react';

import { PostItem } from '~/components/PostItem';
import { PostAsSearchResult } from '~/schemas/post';
import { hitToPost } from '~/utils/search';

import { noResultStyle } from './style.css';

type Props = {
  posts: PostAsSearchResult[];
  query: string;
};

export const SearchResult: FC<Props> = ({ posts = [], query = '' }) => {
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
      {(isEmpty && <p className={noResultStyle}>結果なし</p>) || (
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
