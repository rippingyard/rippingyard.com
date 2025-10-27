import { FC } from 'react';

export const NormalLink: FC<{ url: string }> = ({ url }) => {
  if (!url) return;
  return (
    <p>
      <a href={url} target="_blank" rel="noreferrer">
        {url}
      </a>
    </p>
  );
};
