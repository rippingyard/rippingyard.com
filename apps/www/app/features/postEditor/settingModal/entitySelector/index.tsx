import clsx from 'clsx';
import { FC } from 'react';

import { checkedEntityStyle, entityItemStyle } from './style.css';
import { SuggestedEntity } from '..';

type Props = {
  entities: SuggestedEntity[];
};

export const EntitySelector: FC<Props> = ({ entities = [] }) => {
  if (entities.length === 0) return;

  return (
    <ul>
      {entities
        .sort((a, b) => (a.relevance > b.relevance ? -1 : 1))
        .map(
          (entity) =>
            entity.relevance > 0.5 && (
              <li
                className={clsx(
                  entityItemStyle,
                  entity.isChecked && checkedEntityStyle
                )}
              >
                <h3>{entity?.value}</h3>
                {/* <p>
                    {entity?.relevance} / {entity?.categories.join(', ')}
                  </p> */}
              </li>
            )
        )}
    </ul>
  );
};
