﻿import clsx from 'clsx';
import {
  FC,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';

import { IconRotate } from '~/assets/icons/Rotate';
import { Button } from '~/components/Button';
import { FormRadioButton } from '~/components/FormRadioButton';
import { Heading } from '~/components/Heading';
import { Modal } from '~/components/Modal';
import { ServerMessage, ServerStatus } from '~/routes/api/entitiesFromText/sse';
import { CategoryId } from '@rippingyard/schemas';
import { PostStatus, SuggestedTag } from '@rippingyard/schemas';
import { animationRotateStyle } from '~/styles/animation.css';

import { CategorySelector } from './categorySelector';
import {
  bodyStyle,
  containerBodyStyle,
  containerFootStyle,
  containerStyle,
  headerStyle,
  retrivalErrorStyle,
  retrivalMessageStyle,
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
  const [tagRetrivalStatus, setTagRetrivalStatus] = useState('');
  const abortControllerRef = useRef<AbortController | null>(null);

  const label = useMemo(() => (isUpdate ? '更新する' : '公開する'), [isUpdate]);

  useEffect(() => {
    // コンポーネントのアンマウント時にリクエストをアボート
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, []);

  const statusLabel = (status?: ServerStatus) => {
    if (!status) return '';
    if (status === 'in_progress') return '処理中';
    if (status === 'completed') return '完了';
    return status;
  };

  // サーバーからのメッセージを処理する関数
  const handleServerMessage = (data: ServerMessage) => {
    // 進捗状況の更新
    if (data.progress) {
      setTagRetrivalStatus(statusLabel(data.status));
      return;
    }

    // エラーの処理
    if (data.error) {
      setTagRetrivalError(data.error);
      setIsGettingTags(false);
      return;
    }

    // 完了した場合の処理
    if (data.completed) {
      if (data.result) {
        setSuggestedCategories(data.result.categories ?? []);
        setSuggestedEntities(data.result.entities ?? []);
        setTagRetrivalStatus('タグの取得が完了しました');
      }
      setIsGettingTags(false);
    }
  };

  const getTags = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      e.preventDefault();
      setIsGettingTags(true);
      setTagRetrivalError('');
      setTagRetrivalStatus('処理を開始しています...');

      // 前のリクエストがあればアボート
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // 新しいAbortControllerを作成
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      // FormDataの作成
      const formData = new FormData();
      formData.append('content', content);

      // SSEエンドポイントにPOSTリクエストを送信
      fetch('/api/entitiesFromText/sse', {
        method: 'POST',
        body: formData,
        signal: abortController.signal,
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          // レスポンスのContent-Typeをチェック
          const contentType = response.headers.get('Content-Type');
          if (!contentType || !contentType.includes('text/event-stream')) {
            throw new Error(`Invalid content type: ${contentType}`);
          }

          // レスポンスのボディが存在することを確認
          if (!response.body) {
            throw new Error('Response body is null');
          }

          // レスポンスのストリームを直接読み込む
          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          // 手動でSSEを処理
          const processStream = async () => {
            let buffer = ''; // 未完成のメッセージを保持するバッファ
            try {
              let processComplete = false;
              while (!processComplete) {
                const { done, value } = await reader.read();
                if (done) {
                  processComplete = true;
                  break;
                }

                // 受信データをデコード
                const chunk = decoder.decode(value, { stream: true });
                buffer += chunk;

                // バッファからメッセージを抽出
                const messages = buffer.split('\n\n');
                // 最後のメッセージは未完成の可能性があるため保持
                buffer = messages.pop() || '';

                for (const message of messages.filter(Boolean)) {
                  // 'data: ' プレフィックスを削除してJSONをパース
                  if (message.startsWith('data: ')) {
                    try {
                      const data = JSON.parse(message.substring(6));
                      handleServerMessage(data);
                    } catch (parseError: unknown) {
                      console.error('JSON parse error:', parseError, message);
                    }
                  }
                }
              }
            } catch (streamError: unknown) {
              // AbortErrorはエラーとして表示しない（ユーザーによる中断）
              const error = streamError as Error;
              if (error.name !== 'AbortError') {
                console.error('Stream reading error:', streamError);
                setTagRetrivalError(
                  'ストリーム読み込み中にエラーが発生しました'
                );
                setIsGettingTags(false);
              }
            }
          };

          // ストリーム処理を開始
          processStream();
        })
        .catch((fetchError: unknown) => {
          // AbortErrorはエラーとして表示しない（ユーザーによる中断）
          const error = fetchError as Error;
          if (error.name !== 'AbortError') {
            console.error('Fetch error:', fetchError);
            setTagRetrivalError(
              'リクエスト中にエラーが発生しました: ' + error.message
            );
            setIsGettingTags(false);
          }
        });
    } catch (e) {
      console.error(e);
      setTagRetrivalError(
        'タグの取得に失敗しました。時間を置くか、文字数を減らして試してみてください'
      );
      setIsGettingTags(false);
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
            {isGettingTags && tagRetrivalStatus && (
              <p className={retrivalMessageStyle}>{tagRetrivalStatus}</p>
            )}
            {tagRetrivalError && (
              <p className={clsx(retrivalMessageStyle, retrivalErrorStyle)}>
                {tagRetrivalError}
              </p>
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
