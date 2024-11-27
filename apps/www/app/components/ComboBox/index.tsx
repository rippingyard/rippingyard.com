import clsx from 'clsx';
import { ChangeEvent, FC, KeyboardEvent, useCallback, useState } from 'react';

import {
  containerStyle,
  entitiesContainerStyle,
  entityStyle,
  focusedEntityStyle,
} from './style.css';
import { FormInput } from '../FormInput';

type Props = {
  tags: string[];
  onSelectItem: (entity: string) => void;
};

export const ComboBox: FC<Props> = ({ tags = [], onSelectItem }) => {
  const [hits, setHits] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(-1);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = (e.target.value ?? '').trim();

      const hitItems: string[] = !value
        ? []
        : tags.filter((tag) => new RegExp(value, 'i').test(tag));

      if (value && !hitItems.includes(value)) hitItems.push(value);

      setHits(hitItems);
      setIndex(-1);
    },
    [tags]
  );

  const onClick = useCallback(
    (entity: string) => {
      onSelectItem(entity);
      setHits([]);
      setIndex(-1);
    },
    [onSelectItem]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (isTyping) return;

      const key = e.key.toLowerCase();

      if (!['arrowup', 'arrowdown', 'enter'].includes(key)) return;

      if (key === 'arrowdown')
        setIndex(index < hits.length - 1 ? index + 1 : 0);
      if (key === 'arrowup') setIndex(index > 0 ? index - 1 : hits.length - 1);

      if (key === 'enter') {
        if (hits[index]) onSelectItem(hits[index]);
        setIndex(-1);
        setHits([]);
      }

      e.preventDefault();
    },
    [hits, index, isTyping, onSelectItem]
  );

  return (
    <div className={containerStyle}>
      <FormInput
        onFocus={(e) => onChange(e)}
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
        onCompositionStart={() => setIsTyping(true)}
        onCompositionEnd={() => setIsTyping(false)}
      />
      {hits.length > 0 && (
        <ul className={entitiesContainerStyle}>
          {hits.map((hit, i) => (
            <li
              key={`hit-${i}-${hit}`}
              className={clsx(entityStyle, i === index && focusedEntityStyle)}
              onClick={() => onClick(hits[i])}
            >
              {hit}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
