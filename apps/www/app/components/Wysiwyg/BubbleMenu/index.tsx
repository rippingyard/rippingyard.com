import { BubbleMenu as TipTapBubbleMenu } from '@tiptap/react';
import { Editor } from '@tiptap/react';
import { FC } from 'react';

import { IconBold } from '~/assets/icons/Bold';
import { IconHighLighter } from '~/assets/icons/HighLighter';
import { IconItalic } from '~/assets/icons/Italic';
import { IconLink } from '~/assets/icons/Link';
import { IconStrikethrough } from '~/assets/icons/Strikethrough';
import { IconUnlink } from '~/assets/icons/Unlink';

import { MenuButton } from './MenuButton';
import { containerStyle } from './style.css';

type Props = {
  editor: Editor;
};

export const BubbleMenu: FC<Props> = ({ editor }) => {
  const setLink = () => {
    if (!editor) return;
    if (typeof window !== 'undefined') {
      const url = window.prompt('URL') || '';
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    }
  };

  return (
    <TipTapBubbleMenu editor={editor} className={containerStyle}>
      <MenuButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
      >
        <IconBold />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
      >
        <IconItalic />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        isActive={editor.isActive('highlight')}
      >
        <IconHighLighter />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive('strike')}
      >
        <IconStrikethrough />
      </MenuButton>
      {editor.isActive('link') && (
        <MenuButton
          onClick={() => editor.chain().focus().unsetLink().run()}
          isActive={false}
        >
          <IconUnlink />
        </MenuButton>
      )}
      {!editor.isActive('link') && (
        <MenuButton onClick={setLink} isActive={false}>
          <IconLink />
        </MenuButton>
      )}
    </TipTapBubbleMenu>
  );
};
