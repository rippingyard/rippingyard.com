import axios from 'axios';
import clsx from 'clsx';
import {
  FC,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
  useCallback,
} from 'react';

import { Button } from '~/components/Button';
// import { FormInput } from '~/components/FormInput';
import { FormRadioButton } from '~/components/FormRadioButton';
import { Heading } from '~/components/Heading';
import { Modal } from '~/components/Modal';
import { CategoryId } from '~/schemas/entity';
import { PostStatus } from '~/schemas/post';

import { CategorySelector } from './categorySelector';
import {
  containerBodyStyle,
  containerStyle,
  headerStyle,
  statusItemDescriptionStyle,
  statusItemLabelStyle,
  statusItemSelectedStyle,
  statusItemStyle,
  statusRadioButtonStyle,
  statusSelectorStyle,
} from './style.css';
import { TagSelector } from './tagSelector';

type Props = {
  content: string;
  tags: string[];
  isOpened: boolean;
  isLoading: boolean;
  isPublic: boolean;
  isUpdate: boolean;
  setIsPublic: Dispatch<SetStateAction<boolean>>;
  setStatus: Dispatch<SetStateAction<PostStatus>>;
  showEntityCard?: boolean;
  onClose: () => void;
};

export type SuggestedCategory = CategoryId;

export type SuggestedEntity = {
  value: string;
  relevance: number;
  categories: SuggestedCategory[];
  isChecked: boolean;
};

const mockedEntities = ['Music', 'Film', 'Book', 'Art', 'Game', 'Technology'];

export const SettingModal: FC<Props> = ({
  content,
  tags = [],
  isOpened = false,
  isLoading = false,
  isPublic,
  isUpdate,
  setIsPublic,
  setStatus,
  showEntityCard = false,
  onClose = () => undefined,
}) => {
  const [selectedEntities, setSelectedEntities] = useState<string[]>(tags);
  const [suggestedCategories, setSuggestedCategories] = useState<
    SuggestedCategory[]
  >([]);
  const [suggestedEntities, setSuggestedEntities] = useState<SuggestedEntity[]>(
    []
  );

  const label = useMemo(() => (isUpdate ? '更新する' : '公開する'), [isUpdate]);

  const getTags = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();

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

  const onChangeStatus = useCallback(
    (isPublished: boolean) => {
      setStatus(isPublished ? 'published' : 'drafted');
      setIsPublic(isPublished);
    },
    [setIsPublic, setStatus]
  );

  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <div className={containerStyle}>
        <div className={headerStyle}>
          <Heading level="partial">タグ</Heading>
        </div>
        <div className={containerBodyStyle}>
          <TagSelector
            tags={[...tags, ...mockedEntities]}
            selectedTags={selectedEntities}
            suggestedTags={suggestedEntities}
            setSelectedTags={setSelectedEntities}
          />
        </div>
        <div className={headerStyle}>
          <Heading level="partial">公開設定</Heading>
        </div>
        <div className={containerBodyStyle}>
          <div className={statusSelectorStyle}>
            <div
              className={clsx(
                statusItemStyle,
                isPublic && statusItemSelectedStyle
              )}
              onClick={() => onChangeStatus(true)}
            >
              <div className={statusRadioButtonStyle}>
                <FormRadioButton checked={isPublic} />
              </div>
              <div className={statusItemLabelStyle}>公開</div>
              <div className={statusItemDescriptionStyle}>
                全世界に公開され、一覧や検索結果などにも表示されます
              </div>
            </div>
            <div
              className={clsx(
                statusItemStyle,
                !isPublic && statusItemSelectedStyle
              )}
              onClick={() => onChangeStatus(false)}
            >
              <div className={statusRadioButtonStyle}>
                <FormRadioButton checked={!isPublic} />
              </div>
              <div className={statusItemLabelStyle}>非公開</div>
              <div className={statusItemDescriptionStyle}>
                非公開の記事として保存します
              </div>
            </div>
          </div>
          {showEntityCard && (
            <div>
              <CategorySelector selectedCategories={suggestedCategories} />
              {suggestedEntities.length > 0 && (
                <>
                  <h2>Entities</h2>
                </>
              )}

              <hr />
              <Button onClick={(e) => getTags(e)}>エンティティを取得</Button>
            </div>
          )}
          <Button
            name="status"
            value="published"
            disabled={isLoading}
            isLoading={isLoading}
            color="success"
          >
            {label}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
