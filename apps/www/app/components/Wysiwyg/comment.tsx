﻿import FloatingMenu from '@tiptap/extension-floating-menu';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useEditor, EditorContent, AnyExtension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import { ComponentPropsWithRef, FC, useCallback, useState } from 'react';

import { articleStyle } from '~/styles/article.css';
import { zIndex } from '~/utils/style';

import { BubbleMenu } from './BubbleMenu';
import { SimpleFloatingMenu } from './FloatingMenu/simple';
import { containerStyle, errorStyle, wrapperStyle } from './style.css';

type Props = ComponentPropsWithRef<'textarea'> & {
  content: string;
  uploadpath?: string;
  onUpdate: (content: string) => void;
};

export const WysiwygComment: FC<Props> = ({
  content,
  uploadpath,
  onUpdate,
}) => {
  const [error, setError] = useState('');

  const extensions: AnyExtension[] = [
    StarterKit,
    Link,
    Highlight,
    FloatingMenu.configure({
      tippyOptions: {
        maxWidth: 'none',
        zIndex: zIndex('COVER'),
      },
      shouldShow: ({ editor, view, state, oldState }) => {
        console.log('Editor!', view, state, oldState);
        return editor.isActive('paragraph');
      },
    }),
  ];

  if (uploadpath) extensions.push(Image);

  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
    immediatelyRender: false,
  });

  const onUploadedImage = useCallback(
    ({ url }: { url: string }) => {
      if (!editor || !url) return;
      editor.chain().focus().setImage({ src: url }).run();
    },
    [editor]
  );

  const onError = useCallback((error: string) => {
    setError(error);
  }, []);

  if (!editor) return;

  return (
    <div className={wrapperStyle}>
      <EditorContent
        editor={editor}
        className={clsx(articleStyle, containerStyle)}
      />
      <SimpleFloatingMenu
        editor={editor}
        canUploadImage={!!uploadpath}
        onUploaded={onUploadedImage}
        onError={onError}
      />
      <BubbleMenu editor={editor} />
      <p onClick={() => onError('')} className={errorStyle}>
        {error}
      </p>
    </div>
  );
};
