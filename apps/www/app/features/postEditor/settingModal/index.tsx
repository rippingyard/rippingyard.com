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

import { IconRotate } from '~/assets/icons/Rotate';
import { Button } from '~/components/Button';
// import { FormInput } from '~/components/FormInput';
import { FormRadioButton } from '~/components/FormRadioButton';
import { Heading } from '~/components/Heading';
import { Modal } from '~/components/Modal';
import { CategoryId } from '~/schemas/entity';
import { PostStatus, SuggestedTag } from '~/schemas/post';

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
  suggestedTags: SuggestedTag[];
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

export type SuggestedEntity = SuggestedTag & {
  // categories: SuggestedCategory[];
  isChecked: boolean;
};

const mockedEntities = ['Music', 'Film', 'Book', 'Art', 'Game', 'Technology'];

export const SettingModal: FC<Props> = ({
  content,
  tags = [],
  suggestedTags = [],
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
  const [isGettingTags, setIsGettingTags] = useState(false);

  const label = useMemo(() => (isUpdate ? '更新する' : '公開する'), [isUpdate]);

  const getTags = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      setIsGettingTags(true);

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

      setIsGettingTags(false);
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
            suggestedTags={
              suggestedEntities.length > 0
                ? suggestedEntities
                : suggestedTags.map((t) => ({ ...t, isChecked: false }))
            }
            setSelectedTags={setSelectedEntities}
          />
          <p>
            <Button
              isRolling={isGettingTags}
              disabled={isGettingTags}
              onClick={(e) => getTags(e)}
            >
              <IconRotate />
            </Button>
          </p>
        </div>
        {showEntityCard && (
          <div className={containerBodyStyle}>
            <CategorySelector selectedCategories={suggestedCategories} />
          </div>
        )}
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
          <Button
            name="status"
            value="published"
            disabled={isLoading}
            isLoading={isLoading}
            isWide
            color="success"
          >
            {label}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
