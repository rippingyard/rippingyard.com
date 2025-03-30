import { Editor, FloatingMenu as TipTapFloatingMenu } from '@tiptap/react';
import { Dispatch, FC, SetStateAction } from 'react';

import { IconHeading } from '~/assets/icons/Heading';
import { IconHorizontalLine } from '~/assets/icons/HorizontalLine';
import { IconImage } from '~/assets/icons/Image';
import { IconList } from '~/assets/icons/List';
import { IconListOl } from '~/assets/icons/ListOl';
import { IconQuoteRight } from '~/assets/icons/QuoteRight';

import { simpleButtonStyle, containerStyle } from './style.css';

type Props = {
  editor: Editor;
  canUploadImage?: boolean;
  showImageUploader: Dispatch<SetStateAction<boolean>>;
};

export const SimpleFloatingMenu: FC<Props> = ({
  editor,
  canUploadImage = true,
  showImageUploader,
}) => {
  return (
    <TipTapFloatingMenu editor={editor}>
      <div className={containerStyle}>
        {canUploadImage && (
          <button
            className={simpleButtonStyle}
            onClick={(e) => {
              e.preventDefault();
              showImageUploader(true);
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
