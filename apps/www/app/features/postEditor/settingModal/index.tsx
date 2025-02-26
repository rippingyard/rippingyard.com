﻿import axios from 'axios';
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
import { FormRadioButton } from '~/components/FormRadioButton';
import { Heading } from '~/components/Heading';
import { Modal } from '~/components/Modal';
import { CategoryId } from '~/schemas/entity';
import { PostStatus, SuggestedTag } from '~/schemas/post';
import { animationRotateStyle } from '~/styles/animation.css';

import { CategorySelector } from './categorySelector';
import {
  bodyStyle,
  containerBodyStyle,
  containerFootStyle,
  containerStyle,
  headerStyle,
  retrivalErrorStyle,
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
  myTags: string[];
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
  myTags = [],
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
  const [tagRetrivalError, setTagRetrivalError] = useState('');

  const label = useMemo(() => (isUpdate ? '更新する' : '公開する'), [isUpdate]);

  const getTags = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      setIsGettingTags(true);
      setTagRetrivalError('');

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
      setTagRetrivalError(
        'タグの取得に失敗しました。時間を置くか、文字数を減らして試してみてください'
      );
    }
    setIsGettingTags(false);
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
        <div className={containerBodyStyle}>
          <div className={headerStyle}>
            <Heading level="partial">
              <span style={{ marginRight: 8 }}>タグ</span>
              <button disabled={isGettingTags} onClick={(e) => getTags(e)}>
                <IconRotate
                  className={clsx(isGettingTags && animationRotateStyle)}
                />
              </button>
            </Heading>
          </div>
          <div className={bodyStyle}>
            <TagSelector
              tags={[...tags, ...mockedEntities, ...myTags]}
              selectedTags={selectedEntities}
              suggestedTags={
                suggestedEntities.length > 0
                  ? suggestedEntities
                  : suggestedTags.map((t) => ({ ...t, isChecked: false }))
              }
              setSelectedTags={setSelectedEntities}
            />
            {tagRetrivalError && (
              <p className={retrivalErrorStyle}>{tagRetrivalError}</p>
            )}
          </div>
          {showEntityCard && (
            <div className={bodyStyle}>
              <CategorySelector selectedCategories={suggestedCategories} />
            </div>
          )}
          <div className={headerStyle}>
            <Heading level="partial">公開設定</Heading>
          </div>
          <div className={bodyStyle}>
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
          </div>
        </div>
        <div className={containerFootStyle}>
          <Button
            name="status"
            value="published"
            disabled={isLoading}
            isLoading={isLoading}
            isWide
            isSquare
            color="success"
          >
            {label}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
