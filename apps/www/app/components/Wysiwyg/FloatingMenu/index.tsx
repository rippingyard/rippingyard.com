import { Editor, FloatingMenu as TipTapFloatingMenu } from '@tiptap/react';
import clsx from 'clsx';
import { Dispatch, FC, SetStateAction } from 'react';

import { IconCode } from '~/assets/icons/Code';
import { IconHeading } from '~/assets/icons/Heading';
import { IconHorizontalLine } from '~/assets/icons/HorizontalLine';
import { IconImage } from '~/assets/icons/Image';
import { IconList } from '~/assets/icons/List';
import { IconListOl } from '~/assets/icons/ListOl';
import { IconParagraph } from '~/assets/icons/Paragraph';
import { IconQuoteRight } from '~/assets/icons/QuoteRight';

import {
  buttonStyle,
  containerStyle,
  hiddenLabelStyle,
  labelStyle as labelNormalStyle,
} from './style.css';

type Props = {
  editor: Editor;
  canUploadImage?: boolean;
  view?: 'normal' | 'simple';
  showImageUploader: Dispatch<SetStateAction<boolean>>;
};

export const FloatingMenu: FC<Props> = ({
  editor,
  canUploadImage = true,
  view = 'normal',
  showImageUploader,
}) => {
  const labelStyle = clsx([
    labelNormalStyle,
    view !== 'normal' && hiddenLabelStyle,
  ]);

  return (
    <TipTapFloatingMenu editor={editor}>
      <div className={containerStyle}>
        <button
          className={buttonStyle}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setNode('paragraph').run();
          }}
        >
          <IconParagraph /> <span className={labelStyle}>段落</span>
        </button>
        <button
          className={buttonStyle}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setNode('heading', { level: 2 }).run();
          }}
        >
          <IconHeading /> <span className={labelStyle}>大見出し</span>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setNode('heading', { level: 3 }).run();
          }}
          className={buttonStyle}
        >
          <IconHeading /> 中見出し
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setNode('heading', { level: 4 }).run();
          }}
          className={buttonStyle}
        >
          <IconHeading /> 小見出し
        </button>
        {canUploadImage && (
          <button
            onClick={(e) => {
              e.preventDefault();
              showImageUploader(true);
            }}
            className={buttonStyle}
          >
            <IconImage /> <span className={labelStyle}>画像</span>
          </button>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={buttonStyle}
        >
          <IconList /> <span className={labelStyle}>リスト</span>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={buttonStyle}
        >
          <IconListOl /> <span className={labelStyle}>数字リスト</span>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setHorizontalRule().run();
          }}
          className={buttonStyle}
        >
          <IconHorizontalLine /> <span className={labelStyle}>分割線</span>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setBlockquote().run();
          }}
          className={buttonStyle}
        >
          <IconQuoteRight /> <span className={labelStyle}>引用</span>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCodeBlock().run();
          }}
          className={buttonStyle}
        >
          <IconCode /> <span className={labelStyle}>コード</span>
        </button>
      </div>
    </TipTapFloatingMenu>
  );
};
