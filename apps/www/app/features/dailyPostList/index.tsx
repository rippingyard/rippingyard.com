import { Dayjs } from 'dayjs';
import { FC, memo, useMemo } from 'react';

import { DateLabel } from '~/components/DateLabel';
import { type ItemMode, PostItem } from '~/components/PostItem';
import { TimestampType } from '~/hooks/normalize/useDate';
import { Post } from '@rippingyard/schemas';
import { toDate } from '~/utils/date';

import {
  groupContainerStyle,
  labelContainerStyle,
  labelStyle,
  listItemStyle,
  listStyle,
} from './style.css';

type Props = {
  posts: Post[];
  mode?: ItemMode;
};

type DailyPosts = Record<
  string,
  {
    date: Dayjs;
    posts: Post[];
  }
>;

export const DailyPostList: FC<Props> = memo(
  ({ posts = [], mode = 'list' }) => {
    const dailyPosts = useMemo<DailyPosts | undefined>(() => {
      if (!posts) return undefined;

      const dailyPostObject: DailyPosts = {};

      for (const post of posts) {
        const date = toDate(
          post.publishedAt as unknown as TimestampType
        ).subtract(5, 'hours');
        const dateKey = date.format('YYYY-MM-DD');

        if (!dailyPostObject[dateKey])
          dailyPostObject[dateKey] = {
            date,
            posts: [],
          };

        // 登録済みの場合は排除
        if (dailyPostObject[dateKey].posts.some((p) => p.id === post.id))
          continue;

        dailyPostObject[dateKey].posts.push(post);
      }

      return dailyPostObject;
    }, [posts]);

    if (!dailyPosts) return;

    return (
      <>
        {Object.keys(dailyPosts).map((date) => (
          <div className={groupContainerStyle} key={`date_${date}`}>
            <div className={labelContainerStyle}>
              <div className={labelStyle}>
                <DateLabel date={dailyPosts[date].date} />
              </div>
            </div>
            <ul className={listStyle}>
              {dailyPosts[date].posts.map((post) => (
                <li key={post.id} className={listItemStyle}>
                  <PostItem post={post} mode={mode} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </>
    );
  }
);
