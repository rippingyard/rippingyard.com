import { Editor, FloatingMenu as TipTapFloatingMenu } from '@tiptap/react';
import { Dispatch, FC, SetStateAction } from 'react';

import { IconCode } from '~/assets/icons/Code';
import { IconHeading } from '~/assets/icons/Heading';
import { IconHorizontalLine } from '~/assets/icons/HorizontalLine';
import { IconImage } from '~/assets/icons/Image';
import { IconList } from '~/assets/icons/List';
import { IconListOl } from '~/assets/icons/ListOl';
import { IconParagraph } from '~/assets/icons/Paragraph';
import { IconQuoteRight } from '~/assets/icons/QuoteRight';

import { containerStyle, labelStyle } from './style.css';

type Props = {
  editor: Editor;
  showImageUploader: Dispatch<SetStateAction<boolean>>;
};

export const FloatingMenu: FC<Props> = ({ editor, showImageUploader }) => {
  return (
    <TipTapFloatingMenu editor={editor}>
      <div className={containerStyle}>
        <button
          onClick={() => editor.chain().focus().setNode('paragraph').run()}
        >
          <IconParagraph /> <span className={labelStyle}>段落</span>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().setNode('heading', { level: 2 }).run()
          }
        >
          <IconHeading /> <span className={labelStyle}>大見出し</span>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().setNode('heading', { level: 3 }).run()
          }
          className={labelStyle}
        >
          <IconHeading /> 中見出し
        </button>
        <button
          onClick={() =>
            editor.chain().focus().setNode('heading', { level: 4 }).run()
          }
          className={labelStyle}
        >
          <IconHeading /> 小見出し
        </button>
        <button onClick={() => showImageUploader(true)}>
          <IconImage /> <span className={labelStyle}>画像</span>
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <IconList /> <span className={labelStyle}>リスト</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <IconListOl /> <span className={labelStyle}>数字リスト</span>
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <IconHorizontalLine /> <span className={labelStyle}>分割線</span>
        </button>
        <button onClick={() => editor.chain().focus().setBlockquote().run()}>
          <IconQuoteRight /> <span className={labelStyle}>引用</span>
        </button>
        <button onClick={() => editor.chain().focus().setCodeBlock().run()}>
          <IconCode /> <span className={labelStyle}>コード</span>
        </button>
      </div>
    </TipTapFloatingMenu>
  );
};
