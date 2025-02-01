import { FC } from 'react';
import { Link } from 'react-router';

import { IconTag } from '~/assets/icons/Tag';

type Props = {
  tag: string;
  isLink?: boolean;
};

export const Tag: FC<Props> = ({ tag, isLink = false }) => {
  if (!tag) return;
  if (isLink) {
    const to = `/tag/${tag}`;
    return (
      <Link to={to}>
        <IconTag /> {tag}
      </Link>
    );
  }
  return (
    <>
      <IconTag /> {tag}
    </>
  );
};
