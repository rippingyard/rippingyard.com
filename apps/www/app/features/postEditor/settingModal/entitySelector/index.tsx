import clsx from 'clsx';
import { Dispatch, FC, SetStateAction, useCallback } from 'react';

import { IconTag } from '~/assets/icons/Tag';
import { ComboBox } from '~/components/ComboBox';

import { checkedEntityStyle, entityItemStyle, tagListStyle } from './style.css';
import { SuggestedEntity } from '..';

type Props = {
  entities: string[];
  selectedEntities: string[];
  suggestedEntities: SuggestedEntity[];
  setSelectedEntities: Dispatch<SetStateAction<string[]>>;
};

export const EntitySelector: FC<Props> = ({
  entities = [],
  selectedEntities = [],
  suggestedEntities = [],
  setSelectedEntities,
}) => {
  const onSelectEntity = useCallback(
    (entity: string) => {
      const index = selectedEntities.findIndex((e) => e === entity);
      if (index < 0) {
        setSelectedEntities([...selectedEntities, entity]);
      } else {
        setSelectedEntities(selectedEntities.filter((e) => e !== entity));
      }
    },
    [selectedEntities, setSelectedEntities]
  );

  console.log('selectedEntities', selectedEntities);

  return (
    <>
      <ComboBox entities={entities} onSelectItem={onSelectEntity} />
      {selectedEntities.length > 0 && (
        <ul className={tagListStyle}>
          {selectedEntities.map((entity, i) => (
            <li
              key={`selected-entity-${i}-${entity}`}
              className={clsx(entityItemStyle, checkedEntityStyle)}
              onClick={() => onSelectEntity(entity)}
            >
              <IconTag /> {entity}
              <input type="hidden" name="entity" value={entity} />
            </li>
          ))}
        </ul>
      )}
      {suggestedEntities.length > 0 && (
        <ul>
          {suggestedEntities
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
      )}
    </>
  );
};
