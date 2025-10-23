import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import { FC, useCallback, useMemo, useState } from 'react';
import { Form, useLocation, useNavigation } from 'react-router';

import { Button } from '~/components/Button';
import { FormTextarea } from '~/components/FormTextarea';
import { Wysiwyg } from '~/components/Wysiwyg';
import { useCachedContent } from '~/hooks/cache/useCachedContent';
import { TimestampType, useDateObject } from '~/hooks/normalize/useDateObject';
import { getMainTitle } from '~/utils/typography';

import type { Post, PostStatus, PostType } from '@rippingyard/schemas';
import { removeMainTitle } from '@rippingyard/utils';

import { SettingModal } from './settingModal';
import { StatusHeader } from './statusHeader';
import {
  bodyStyle,
  containerStyle,
  footerStyle,
  headerStyle,
  headerTitleStyle,
} from './style.css';

type Props = {
  post?: Post;
  action?: string;
  myTags: string[];
};

export const PostEditor: FC<Props> = ({
  post,
  action = '/post/create',
  myTags = [],
}) => {
  const navigation = useNavigation();
  const { pathname } = useLocation();
  const { setCachedContent, getCachedContent } = useCachedContent();
  const cache = getCachedContent(pathname);
  const [isSettingOpened, setIsSettingOpened] = useState(false);

  const [html, setHtml] = useState<string>(
    removeMainTitle(post?.content || cache || '')
  );

  const isLoading = useMemo(
    () => navigation.formAction === action && navigation.state === 'submitting',
    [action, navigation.formAction, navigation.state]
  );

  const content = useMemo(
    () => post?.content || cache || '',
    [cache, post?.content]
  ); //TODO: セットの順番的に、新規投稿の時以外はキャッシュが効かないようにしてある。記事編集時も利用するためには、cache || post?.content || ''とする必要があるが、今は行わない
  const title = useMemo(
    () =>
      getMainTitle(content, {
        alt: '',
      }),
    [content]
  );
  const contentBody = useMemo(() => removeMainTitle(content), [content]);

  const [hasTitle, setHasTitle] = useState(!!title);

  const [type] = useState<PostType>(post?.type ?? 'article');
  const [isPublic, setIsPublic] = useState<boolean>(post?.isPublic ?? true);
  const [status, setStatus] = useState<PostStatus>(post?.status ?? 'published');

  const { seconds, nanoseconds } = Timestamp.now();
  const now: TimestampType = { _seconds: seconds, _nanoseconds: nanoseconds };
  const [publishedAt, setPublishedAt] = useState<TimestampType>(
    post?.publishedAt || now
  );
  const publishdate = useDateObject(publishedAt);
  const publishdateString = dayjs(publishdate).format('YYYY/MM/DD HH:mm');

  const uploadpath = `posts/${dayjs(publishdate).format('YYYY/MM')}/`;

  const onUpdate = useCallback(
    (content: string) => {
      setCachedContent(pathname || '/', content);
      setHtml(content);
    },
    [pathname, setCachedContent]
  );

  const onConfirm = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      console.log('onConfirm!');
      e.preventDefault();
      setIsSettingOpened(true);
    },
    []
  );

  return (
    <Form method="POST" action={action} className={containerStyle}>
      <input type="hidden" name="contentBody" value={html} />
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="isPublic" value={isPublic ? 1 : 0} />
      <input type="hidden" name="status" value={status} />
      <input type="hidden" name="publishedAt" value={publishdateString} />
      <section className={bodyStyle}>
        <header className={headerStyle}>
          {hasTitle && (
            <div className={headerTitleStyle}>
              <FormTextarea
                name="title"
                defaultValue={title}
                isBold
                isHeading
              />
            </div>
          )}
          <StatusHeader
            hasTitle={hasTitle}
            setHasTitle={setHasTitle}
            publishedAt={publishdate}
            onChangeDate={(date) => {
              if (!date) return;
              const { seconds, nanoseconds } = Timestamp.fromDate(date);
              setPublishedAt({
                _seconds: seconds,
                _nanoseconds: nanoseconds,
              });
            }}
          />
        </header>
        <Wysiwyg
          content={contentBody}
          uploadpath={uploadpath}
          onUpdate={onUpdate}
        />
      </section>
      <footer className={footerStyle}>
        {/* <Button
          name="status"
          value="drafted"
          disabled={isLoading}
          isLoading={isLoading}
          isGhost
        >
          下書き保存
        </Button> */}
        <Button
          name="status"
          value="published"
          disabled={isLoading}
          isLoading={isLoading}
          isWide
          color="success"
          onClick={(e) => onConfirm(e)}
        >
          公開設定
        </Button>
      </footer>
      <SettingModal
        content={content}
        tags={post?.tags || []}
        myTags={myTags}
        suggestedTags={post?.suggestedTags || []}
        isOpened={isSettingOpened}
        isLoading={isLoading}
        isUpdate={!!post}
        setStatus={setStatus}
        isPublic={isPublic}
        setIsPublic={setIsPublic}
        onClose={() => setIsSettingOpened(false)}
      />
    </Form>
  );
};
