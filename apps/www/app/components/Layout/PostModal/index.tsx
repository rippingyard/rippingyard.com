import dayjs from 'dayjs';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useFetcher, useNavigate } from 'react-router';

import { Button } from '~/components/Button';
import { Modal } from '~/components/Modal';
import { WysiwygComment } from '~/components/Wysiwyg/comment';
import { useCachedContent } from '~/hooks/cache/useCachedContent';
import { usePostLink } from '~/hooks/link/usePostLink';
import { Post, PostStatus } from '~/schemas/post';

import { bodyStyle, containerStyle, footerStyle } from './style.css';

type Props = {
  post?: Post;
  isOpen: boolean;
  onClose: () => void;
};

export const PostModal: FC<Props> = ({ post, isOpen = false, onClose }) => {
  if (!isOpen) return null;

  const pathname = 'log';

  const { Form, data } = useFetcher();
  const navigate = useNavigate();
  const postLink = usePostLink();

  const { setCachedContent, getCachedContent, clearCachedContent } =
    useCachedContent();
  const cache = getCachedContent(pathname);

  const [html, setHtml] = useState<string>(post?.content || cache || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isPublic] = useState<boolean>(true);
  const [status] = useState<PostStatus>('published');

  const content = useMemo(
    () => post?.content || cache || '',
    [cache, post?.content]
  );

  const now = dayjs();
  const uploadpath = `posts/${now.format('YYYY/MM')}/`;

  const onUpdate = useCallback(
    (content: string) => {
      setCachedContent(pathname || '/', content);
      setHtml(content);
    },
    [pathname, setCachedContent]
  );

  const onSubmit = useCallback(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (!data?.post) return;
    console.log('data.post', data.post);
    clearCachedContent(pathname);

    const permalink = postLink(data.post.id!);
    navigate(permalink);

    onClose();
  }, [clearCachedContent, data, navigate, onClose, postLink]);

  return (
    <Modal isOpened={isOpen} onClose={onClose}>
      <Form
        action="/post/create"
        method="post"
        onSubmit={onSubmit}
        className={containerStyle}
      >
        <input type="hidden" name="contentBody" value={html} />
        <input type="hidden" name="type" value="log" />
        <input type="hidden" name="isPublic" value={isPublic ? 1 : 0} />
        <input type="hidden" name="status" value={status} />
        <section className={bodyStyle}>
          {/*<header className={headerStyle}>
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
          </header> */}
          <WysiwygComment
            content={content}
            uploadpath={uploadpath}
            onUpdate={onUpdate}
          />
        </section>
        <footer className={footerStyle}>
          <Button
            name="status"
            value="published"
            disabled={isLoading}
            isLoading={isLoading}
            // isWide
            color="success"
            // onClick={(e) => onConfirm(e)}
          >
            公開
          </Button>
        </footer>
        {/*<SettingModal
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
        /> */}
      </Form>
    </Modal>
  );
};
