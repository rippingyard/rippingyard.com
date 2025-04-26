import { FC, useCallback, useMemo, useState } from 'react';

import { Table, TableItem } from '~/components/Table';
import { TimestampType } from '~/hooks/normalize/useDate';
import { Post } from '~/schemas/post';
import { getTitle } from '~/utils/typography';

import { PostTableDate } from './postTableDate';
import { PostTableItem } from './postTableItem';
import { PostTableStatus } from './postTableStatus';
import { PostTableType } from './postTableType';

const columns = [
  // {
  //   key: 'id',
  //   label: 'ID',
  // },
  // {
  //   key: 'title',
  //   label: 'タイトル',
  // },
  {
    key: 'publishDate',
    label: '公開日',
    width: 80,
  },
  {
    key: 'content',
    label: 'コンテンツ',
  },
  {
    key: 'type',
    label: '投稿タイプ',
    width: 100,
  },
  {
    key: 'status',
    label: '公開設定',
    width: 100,
  },
];

export const PostTable: FC<{ posts: Post[] }> = ({ posts }) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const isCheckedAll = useMemo(
    () => posts.length === checkedItems.length,
    [checkedItems.length, posts.length]
  );

  const onClickCheckbox = useCallback(
    (item: TableItem) => {
      const id = item.value.id as string;

      const newCheckedItems: string[] = checkedItems.includes(id)
        ? checkedItems.filter((checkedId) => checkedId !== id)
        : [...checkedItems, id];

      setCheckedItems(newCheckedItems);
    },
    [checkedItems]
  );

  const onClickAllCheckbox = useCallback(() => {
    const newCheckedItems = isCheckedAll ? [] : posts.map((post) => post.id);
    setCheckedItems(newCheckedItems);
  }, [isCheckedAll, posts]);

  const meta = useMemo(() => {
    return {
      checkbox: {
        key: 'id',
        isCheckedAll,
        onClick: onClickCheckbox,
        onClickForAll: onClickAllCheckbox,
      },
    };
  }, [isCheckedAll, onClickAllCheckbox, onClickCheckbox]);

  const items: TableItem[] = useMemo(
    () =>
      posts.map((post) => {
        const title = getTitle(post.content, {
          titleLength: 80,
        });

        return {
          value: {
            id: post.id,
            title,
            content: <PostTableItem post={post} />,
            status: <PostTableStatus status={post.status} />,
            type: <PostTableType type={post.type} />,
            publishDate: (
              <PostTableDate
                timestamp={post.publishedAt as unknown as TimestampType}
              />
            ),
          },
          isChecked: checkedItems.includes(post.id),
        };
      }),
    [checkedItems, posts]
  );

  return <Table columns={columns} items={items} meta={meta} />;
};
