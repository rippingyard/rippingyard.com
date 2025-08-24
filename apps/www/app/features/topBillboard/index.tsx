import { FC } from 'react';

import { Columns } from '~/components/Columns';
import { Post } from '@rippingyard/schemas';

import { containerStyle } from './style.css';
// import { SubscribeBanner } from './subscribeBanner';
import { HeroArticles } from '../heroArticles';

type Props = {
  posts: Post[];
};

export const TopBillboard: FC<Props> = ({ posts = [] }) => {
  return (
    <div className={containerStyle}>
      <Columns
        columns={[
          {
            component: <HeroArticles posts={posts} label="Latest Articles" />,
            width: '100%',
            name: 'last-article',
          },
          // { component: <SubscribeBanner />, width: '40%', name: 'subscribe' },
        ]}
      />
    </div>
  );
};
