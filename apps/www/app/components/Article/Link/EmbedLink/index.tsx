import { FC } from 'react';
import { Link } from 'react-router';

import { useUrlContent } from '~/hooks/fetch/useUrlContent';
import { getSummary } from '~/utils/typography';

import * as styles from './styles.css';
import { NormalLink } from '../NormalLink';

export const EmbedLink: FC<{ url: string; isTest?: boolean }> = ({
  url,
  isTest = false,
}) => {
  const { isLoading, ogp } = useUrlContent(url);

  if (!url) return;

  if (isLoading || !ogp || isTest) return <NormalLink url={url} />;

  const { title, description, sitename, image } = ogp;

  return (
    <Link to={url} className={styles.container} target="_blank">
      {title && <h4 className={styles.heading}>{title}</h4>}
      <div className={styles.columns}>
        <div className={styles.content}>
          <p className={styles.summary}>{getSummary(description, 120)}</p>
          <div className={styles.footer}>{sitename}</div>
        </div>
        {image && (
          <div
            className={styles.image}
            style={{ backgroundImage: `url(${image.url})` }}
          />
        )}
      </div>
    </Link>
  );
};
