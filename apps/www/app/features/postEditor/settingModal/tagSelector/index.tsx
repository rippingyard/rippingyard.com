import clsx from 'clsx';
import { Dispatch, FC, SetStateAction, useCallback, useMemo } from 'react';

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
  const uniqueTags = useMemo(() => [...new Set(tags)], [tags]);

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

  return (
    <>
      <ul className={tagListStyle}>
        {selectedTags.length > 0 &&
          selectedTags.map((tag, i) => (
            <li
              key={`selected-tag-${i}-${tag}`}
              className={clsx(entityItemStyle, checkedEntityStyle)}
              onClick={() => onSelectEntity(tag)}
            >
              <IconTag /> {tag}
              <input type="hidden" name="tag" value={tag} />
            </li>
          ))}
        <li key="combobox" className={clsx(entityItemStyle)}>
          <ComboBox tags={uniqueTags} onSelectItem={onSelectEntity} />
        </li>
      </ul>
      {suggestedTags.length > 0 && (
        <>
          <ul>
            {suggestedTags
              .sort((a, b) => (a.relevance > b.relevance ? -1 : 1))
              .map(
                (suggestedTag, i) =>
                  suggestedTag.relevance > 0.3 &&
                  !selectedTags.includes(suggestedTag.value) && (
                    <li
                      className={clsx(
                        entityItemStyle,
                        suggestedTag.isChecked && checkedEntityStyle
                      )}
                      key={`suggested-tag-${i}-${suggestedTag.value}`}
                      onClick={() => onSelectEntity(suggestedTag.value)}
                    >
                      <IconTag /> {suggestedTag?.value}
                    </li>
                  )
              )}
          </ul>
          {suggestedTags.map((suggestedTag, i) => (
            <input
              type="hidden"
              name={'suggestedTag'}
              value={JSON.stringify(suggestedTag)}
              key={`suggested-tag-input-${i}-${suggestedTag.value}`}
            />
          ))}
        </>
      )}
    </>
  );
};
