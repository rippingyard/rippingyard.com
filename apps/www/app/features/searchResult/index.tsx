import { FC, useMemo } from 'react';

import { PostItem } from '~/components/PostItem';
import { PostAsSearchResult } from '~/schemas/post';
import { hitToPost } from '~/utils/search';

import { noResultStyle } from './style.css';

type Props = {
  posts: PostAsSearchResult[];
};

export const SearchResult: FC<Props> = ({ posts = [] }) => {
  const items = useMemo(
    () =>
      posts.filter((item) => {
        return !item.isDeleted && item.isPublic && item.status === 'published';
      }),
    [posts]
  );

  return (
    <>
      {(items.length === 0 && <p className={noResultStyle}>結果なし</p>) || (
        <ul>
          {items.map((item, i) => (
            <li key={item.objectID}>
              <PostItem
                post={hitToPost(item)}
                mode={i === 0 ? 'detail' : 'list'}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
