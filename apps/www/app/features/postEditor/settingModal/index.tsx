import axios from 'axios';
import { FC, useState } from 'react';

import { Button } from '~/components/Button';
import { Modal } from '~/components/Modal';

import { containerStyle } from './style.css';

type Props = {
  content: string;
  isOpened: boolean;
  onClose: () => void;
};

type SuggestedCategory =
  | 'film'
  | 'music'
  | 'book'
  | 'art'
  | 'game'
  | 'politic'
  | 'food';

type SuggestedEntity = {
  value: string;
  relevance: number;
  categories: SuggestedCategory[];
};

export const SettingModal: FC<Props> = ({
  content,
  isOpened = false,
  onClose = () => undefined,
}) => {
  const [suggestedCategories, setSuggestedCategories] = useState<
    SuggestedCategory[]
  >([]);
  const [suggestedEntities, setSuggestedEntities] = useState<SuggestedEntity[]>(
    []
  );

  const getEntities = async () => {
    try {
      const body = new FormData();
      body.append('content', content);

      const { data } = await axios<
        { content: string },
        {
          data: {
            result: {
              categories: SuggestedCategory[];
              entities: SuggestedEntity[];
            };
          };
        }
      >({
        url: '/tool/entitiesFromText',
        data: body,
        method: 'POST',
      });

      if (data?.result) {
        setSuggestedCategories(data?.result?.categories ?? []);
        setSuggestedEntities(data?.result?.entities ?? []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <div className={containerStyle}>
        {suggestedCategories.length > 0 && (
          <div>
            <h2>Categories</h2>
            <ul>
              {suggestedCategories.map((category: string) => (
                <li>{category}</li>
              ))}
            </ul>
          </div>
        )}

        {suggestedEntities.length > 0 && (
          <div>
            <h2>Entities</h2>
            <ul>
              {suggestedEntities
                .sort((a, b) => (a.relevance > b.relevance ? -1 : 1))
                .map(
                  (entity: {
                    value: string;
                    relevance: number;
                    categories: string[];
                  }) =>
                    entity.relevance > 0.5 && (
                      <li>
                        <h3>{entity?.value}</h3>
                        <p>
                          {entity?.relevance} / {entity?.categories.join(', ')}
                        </p>
                      </li>
                    )
                )}
            </ul>
          </div>
        )}
        <hr />
        <Button onClick={getEntities}>エンティティを取得</Button>
      </div>
    </Modal>
  );
};
