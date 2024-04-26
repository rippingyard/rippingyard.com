import { Form, useNavigation } from '@remix-run/react';
import dayjs from 'dayjs';
import { FC, useCallback, useMemo, useState } from 'react';

import { Button } from '~/components/Button';
import { FormTextarea } from '~/components/FormTextarea';
import { Wysiwyg } from '~/components/Wysiwyg';
import { Post, PostType } from '~/schemas/post';
import { getTitle, removeTitle } from '~/utils/typography';

import {
  bodyStyle,
  containerStyle,
  footerStyle,
  headerStyle,
} from './style.css';

type Props = {
  post?: Post;
  action?: string;
};

export const PostEditor: FC<Props> = ({ post, action = '/post/create' }) => {
  const [html, setHtml] = useState<string>(removeTitle(post?.content || ''));
  const navigation = useNavigation();

  const isLoading = useMemo(
    () => navigation.state !== 'idle',
    [navigation.state]
  );

  const content = useMemo(() => post?.content || '', [post?.content]);
  const title = getTitle(content, {
    alt: '',
  });
  const contentBody = useMemo(() => removeTitle(content), [content]);

  const [type] = useState<PostType>('article');
  const [isPublic] = useState<boolean>(true);

  const now = dayjs();
  const uploadpath = `posts/${now.format('YYYY/MM')}/`;

  const onUpdate = useCallback((content: string) => {
    setHtml(content);
  }, []);

  return (
    <Form method="POST" action={action} className={containerStyle}>
      <input type="hidden" name="contentBody" value={html} />
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="isPublic" value={isPublic ? 1 : 0} />
      <section className={bodyStyle}>
        <header className={headerStyle}>
          <FormTextarea name="title" defaultValue={title} isBold isHeading />
        </header>
        <Wysiwyg
          content={contentBody}
          uploadpath={uploadpath}
          onUpdate={onUpdate}
        />
      </section>
      <footer className={footerStyle}>
        <Button name="status" value="drafted" isLoading={isLoading}>
          下書き保存
        </Button>
        <Button name="status" value="published" isLoading={isLoading}>
          公開
        </Button>
      </footer>
    </Form>
  );
};
