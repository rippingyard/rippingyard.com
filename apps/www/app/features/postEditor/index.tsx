import { Form, useLocation, useNavigation } from '@remix-run/react';
import dayjs from 'dayjs';
import { FC, useCallback, useMemo, useState } from 'react';

import { Button } from '~/components/Button';
import { FormTextarea } from '~/components/FormTextarea';
import { Wysiwyg } from '~/components/Wysiwyg';
import { Post, PostType } from '~/schemas/post';
import { getMainTitle, removeMainTitle } from '~/utils/typography';

import { StatusHeader } from './statusHeader';
import {
  bodyStyle,
  containerStyle,
  footerStyle,
  headerStyle,
  headerTitleStyle,
} from './style.css';
import { useCachedContent } from '~/hooks/cache/useCachedContent';

type Props = {
  post?: Post;
  action?: string;
};

export const PostEditor: FC<Props> = ({ post, action = '/post/create' }) => {
  const navigation = useNavigation();
  const { pathname } = useLocation();
  const { setCachedContent, getCachedContent } = useCachedContent();
  const cache = getCachedContent(pathname);

  const [html, setHtml] = useState<string>(
    removeMainTitle(post?.content || cache || '')
  );

  const isLoading = useMemo(
    () => navigation.formAction === action && navigation.state === 'submitting',
    [action, navigation.formAction, navigation.state]
  );

  const content = useMemo(() => post?.content || cache || '', [post?.content]); //TODO: セットの順番的に、新規投稿の時以外はキャッシュが効かないようにしてある。記事編集時も利用するためには、cache || post?.content || ''とする必要があるが、今は行わない
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
  const [isPublic] = useState<boolean>(true);

  const now = dayjs();
  const uploadpath = `posts/${now.format('YYYY/MM')}/`;

  const label = useMemo(() => (post ? '更新' : '公開'), [post]);

  const onUpdate = useCallback((content: string) => {
    setCachedContent(pathname || '/', content);
    setHtml(content);
  }, []);

  return (
    <Form method="POST" action={action} className={containerStyle}>
      <input type="hidden" name="contentBody" value={html} />
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="isPublic" value={isPublic ? 1 : 0} />
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
        <Button
          name="status"
          value="drafted"
          disabled={isLoading}
          isLoading={isLoading}
          isGhost
        >
          下書き保存
        </Button>
        <Button
          name="status"
          value="published"
          disabled={isLoading}
          isLoading={isLoading}
          color="success"
        >
          {label}
        </Button>
      </footer>
    </Form>
  );
};
