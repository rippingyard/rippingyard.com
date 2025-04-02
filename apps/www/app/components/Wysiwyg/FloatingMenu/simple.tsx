import { Editor, FloatingMenu as TipTapFloatingMenu } from '@tiptap/react';
import dayjs from 'dayjs';
import { FC, useCallback, useRef } from 'react';

import { IconHeading } from '~/assets/icons/Heading';
import { IconHorizontalLine } from '~/assets/icons/HorizontalLine';
import { IconImage } from '~/assets/icons/Image';
import { IconList } from '~/assets/icons/List';
import { IconListOl } from '~/assets/icons/ListOl';
import { IconQuoteRight } from '~/assets/icons/QuoteRight';
import { useUploadImage } from '~/hooks/save/useUploadImage';
import { resizeImage } from '~/utils/image';

import { simpleButtonStyle, containerStyle } from './style.css';

type Props = {
  editor: Editor;
  canUploadImage?: boolean;
  onUploaded: (params: { url: string }) => void;
  onLoading: (value: boolean) => void;
  onError: (message: string) => void;
};

export const SimpleFloatingMenu: FC<Props> = ({
  editor,
  canUploadImage = true,
  onUploaded,
  onLoading,
  onError,
}) => {
  const now = dayjs();
  const uploadpath = `posts/${now.format('YYYY/MM')}/`;
  const fileInput = useRef<HTMLInputElement | null>(null);
  const { uploadImage } = useUploadImage({ uploadpath });

  const onUploadImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('UPLOAD!', e.target.files);
      e.preventDefault();

      if (!e.target.files || e.target.files.length < 1) return;

      const file = e.target.files[0];
      if (!file) return;

      try {
        onLoading(true);
        const resizedImage = await resizeImage(file);

        const { url } = await uploadImage({ file: resizedImage });

        onUploaded({ url });
      } catch (e) {
        console.error(e);
        onError((e as { message: string }).message);
      } finally {
        onLoading(false);
      }
    },
    [onError, onLoading, onUploaded, uploadImage]
  );

  return (
    <TipTapFloatingMenu editor={editor}>
      <div className={containerStyle}>
        {canUploadImage && (
          <>
            <button
              className={simpleButtonStyle}
              onClick={(e) => {
                e.preventDefault();
                if (!fileInput?.current) return;
                fileInput.current.click();
              }}
            >
              <IconImage />
            </button>
            <input
              type="file"
              name="file"
              ref={fileInput}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={onUploadImage}
            />
          </>
        )}
        <button
          className={simpleButtonStyle}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setNode('heading', { level: 2 }).run();
          }}
        >
          <IconHeading />
        </button>
        <button
          className={simpleButtonStyle}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
        >
          <IconList />
        </button>
        <button
          className={simpleButtonStyle}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
        >
          <IconListOl />
        </button>
        <button
          className={simpleButtonStyle}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setHorizontalRule().run();
          }}
        >
          <IconHorizontalLine />
        </button>
        <button
          className={simpleButtonStyle}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setBlockquote().run();
          }}
        >
          <IconQuoteRight />
        </button>
      </div>
    </TipTapFloatingMenu>
  );
};
