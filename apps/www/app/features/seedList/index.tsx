import { FC, memo } from 'react';

import { PostListItemDetail } from '~/components/post/postItemDetail';
import { Seed } from '~/schemas/seed';
import { seedToPost } from '~/utils/seed';

import { containerStyle, itemStyle } from './style.css';

type Props = {
  seeds: Seed[];
};

const SeedListComponent: FC<Props> = ({ seeds = [] }) => {
  return (
    <ul className={containerStyle}>
      {seeds.map((seed) => (
        <li key={seed.id} className={itemStyle}>
          <PostListItemDetail
            post={seedToPost(seed)}
            permalink={`/seeds/${seed.slug}`}
          />
        </li>
      ))}
    </ul>
  );
};

export const SeedList = memo(SeedListComponent);
