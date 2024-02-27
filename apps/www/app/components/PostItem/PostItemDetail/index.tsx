﻿import { SerializeFrom } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { FC } from 'react';

import { Article } from '~/components/Article';
import { usePostLink } from '~/hooks/link/usePostLink';
import { useDate } from '~/hooks/normalize/useDate';
import { usePostTitle } from '~/hooks/normalize/usePostTitle';
import { Post } from '~/schemas/post';
import { articleStyle } from '~/styles/article.css';

import {
  containerStyle,
  contentWithNoTitleStyle,
  footerStyle,
  headingStyle,
} from './style.css';

type Props = {
  post: SerializeFrom<Post>;
  permalink?: string;
};

export const PostListItemDetail: FC<Props> = ({
  post,
  permalink: overwriteLink,
}) => {
  const { title, content, hasHeadingTag } = usePostTitle(post.content);
  const permalink = overwriteLink || usePostLink(post.id);
  const createdate = useDate(post.createdAt);

  return (
    <div className={containerStyle}>
      {(hasHeadingTag && (
        <>
          <div className={`${articleStyle} ${headingStyle}`}>
            <h1>
              <Link to={permalink}>{title}</Link>
            </h1>
          </div>
          <Article text={content} />
        </>
      )) || (
        <div className={contentWithNoTitleStyle}>
          <Article text={content} />
        </div>
      )}
      <div className={footerStyle}>
        <Link to={permalink}>{createdate}</Link>
      </div>
    </div>
  );
};