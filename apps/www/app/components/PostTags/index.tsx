import { FC } from 'react';

import { itemStyle, listStyle } from './style.css';
import { Tag } from '../Tag';

export const PostTags: FC<{ tags: string[] }> = ({ tags = [] }) => {
  return (
    <ul className={listStyle}>
      {tags.map((tag) => (
        <li className={itemStyle} key={`posttag-${tag}`}>
          <Tag tag={tag} isLink />
        </li>
      ))}
    </ul>
  );
};
