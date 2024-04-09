import { Form } from '@remix-run/react';
import dayjs from 'dayjs';
import { FC, useCallback, useState } from 'react';

import { Button } from '~/components/Button';
import { FormTextarea } from '~/components/FormTextarea';
import { Wysiwyg } from '~/components/Wysiwyg';

import {
  bodyStyle,
  containerStyle,
  footerStyle,
  headerStyle,
} from './style.css';

export const PostEditor: FC = () => {
  const [html, setHtml] = useState<string>('');

  const now = dayjs();
  const uploadpath = `posts/${now.format('YYYY/MM')}/`;

  const onUpdate = useCallback((content: string) => {
    setHtml(content);
  }, []);

  return (
    <Form method="POST" action="/post/create" className={containerStyle}>
      <input type="hidden" name="content" value={html} />
      <section className={bodyStyle}>
        <header className={headerStyle}>
          <FormTextarea name="title" defaultValue="" isBold isHeading />
        </header>
        <Wysiwyg content="" uploadpath={uploadpath} onUpdate={onUpdate} />
      </section>
      <footer className={footerStyle}>
        <Button>投稿</Button>
      </footer>
    </Form>
  );
};
