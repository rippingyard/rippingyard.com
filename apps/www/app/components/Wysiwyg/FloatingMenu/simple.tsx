﻿import { Editor, FloatingMenu as TipTapFloatingMenu } from '@tiptap/react';
import dayjs from 'dayjs';
import { FC, useCallback } from 'react';

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
  const { uploadImage } = useUploadImage({ uploadpath });

  // ファイル選択処理をハンドルする新しい関数
  const handleFileButtonClick = useCallback(async () => {
    return new Promise<void>((resolve) => {
      // input要素を新規作成
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';

      // ファイル選択後の処理
      input.onchange = async (e) => {
        const target = e.target as HTMLInputElement;
        if (!target.files || target.files.length < 1) {
          resolve();
          return;
        }

        const file = target.files[0];
        if (!file) {
          resolve();
          return;
        }

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
          resolve();
        }
      };

      // Safariでのキャンセル操作を検知するため
      setTimeout(() => {
        if (document.body.contains(input)) {
          document.body.removeChild(input);
          resolve();
        }
      }, 1000);

      // DOM追加とクリック
      document.body.appendChild(input);
      input.click();
    });
  }, [onError, onLoading, onUploaded, uploadImage]);

  return (
    <TipTapFloatingMenu editor={editor}>
      <div className={containerStyle}>
        {canUploadImage && (
          <button
            className={simpleButtonStyle}
            onClick={(e) => {
              e.preventDefault();
              handleFileButtonClick();
            }}
          >
            <IconImage />
          </button>
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
