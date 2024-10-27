import clsx from 'clsx';
import { Dispatch, FC, SetStateAction, useCallback } from 'react';

import { IconTag } from '~/assets/icons/Tag';
import { ComboBox } from '~/components/ComboBox';

import { checkedEntityStyle, entityItemStyle, tagListStyle } from './style.css';
import { SuggestedEntity } from '..';

type Props = {
  tags: string[];
  selectedTags: string[];
  suggestedTags: SuggestedEntity[];
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
};

export const TagSelector: FC<Props> = ({
  tags = [],
  selectedTags = [],
  suggestedTags = [],
  setSelectedTags,
}) => {
  const onSelectEntity = useCallback(
    (tag: string) => {
      const index = selectedTags.findIndex((t) => t === tag);
      if (index < 0) {
        setSelectedTags([...selectedTags, tag]);
      } else {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
      }
    },
    [selectedTags, setSelectedTags]
  );

  console.log('selectedTags', selectedTags);

  return (
    <>
      <ComboBox entities={tags} onSelectItem={onSelectEntity} />
      {selectedTags.length > 0 && (
        <ul className={tagListStyle}>
          {selectedTags.map((tag, i) => (
            <li
              key={`selected-tag-${i}-${tag}`}
              className={clsx(entityItemStyle, checkedEntityStyle)}
              onClick={() => onSelectEntity(tag)}
            >
              <IconTag /> {tag}
              <input type="hidden" name="tag" value={tag} />
            </li>
          ))}
        </ul>
      )}
      {suggestedTags.length > 0 && (
        <ul>
          {suggestedTags
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
