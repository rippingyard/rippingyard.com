import { FC } from 'react';

import { Description } from '~/hooks/llm/useTagDescription.server';

import * as styles from './style.css';
import { Article } from '../Article';
import { Heading } from '../Heading';
import { Tag } from '../Tag';

type Props = {
  description: Description;
};

export const TagDescription: FC<Props> = ({ description }) => {
  if (!description) return null;

  const { summary, relatedTags } = description;

  const showRelatedTags = false; // 一旦、関連タグの表示は停止

  return (
    <>
      <div className={styles.container}>
        {summary && (
          <section className={styles.descriptionContainer}>
            <Article text={summary} />
            <p className={styles.descriptionFooter}>
              ※
              AIによる解説文（β）です。当サイトの内容を参照して、独自の解説文を構築していますが、内容に誤りのある場合があります。ご留意ください
            </p>
          </section>
        )}
        {showRelatedTags && relatedTags && (
          <>
            <Heading level="partial">関連タグ</Heading>
            <ul className={styles.list}>
              {relatedTags.map((tag) => (
                <li key={`related-tag-${tag}`} className={styles.item}>
                  <Tag tag={tag} isLink />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};
