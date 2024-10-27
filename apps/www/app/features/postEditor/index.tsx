import { Form, useLocation, useNavigation } from '@remix-run/react';
import dayjs from 'dayjs';
import { FC, useCallback, useMemo, useState } from 'react';

import { Button } from '~/components/Button';
import { FormTextarea } from '~/components/FormTextarea';
import { Wysiwyg } from '~/components/Wysiwyg';
import { useCachedContent } from '~/hooks/cache/useCachedContent';
import { Post, PostStatus, PostType } from '~/schemas/post';
import { getMainTitle, removeMainTitle } from '~/utils/typography';

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
};

export const PostEditor: FC<Props> = ({ post, action = '/post/create' }) => {
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

  const [type] = useState<PostType>('article');
  const [isPublic, setIsPublic] = useState<boolean>(post?.isPublic ?? true);
  const [status, setStatus] = useState<PostStatus>(post?.status ?? 'published');

  const now = dayjs();
  const uploadpath = `posts/${now.format('YYYY/MM')}/`;

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
            post={post}
            hasTitle={hasTitle}
            setHasTitle={setHasTitle}
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
          color="success"
          onClick={(e) => onConfirm(e)}
        >
          公開設定
        </Button>
      </footer>
      <SettingModal
        content={content}
        tags={post?.tags || []}
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
