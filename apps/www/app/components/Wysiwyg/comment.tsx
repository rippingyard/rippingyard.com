import { useDropZone } from '@reactuses/core';
import FloatingMenu from '@tiptap/extension-floating-menu';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useEditor, EditorContent, AnyExtension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import {
  ComponentPropsWithRef,
  FC,
  useCallback,
  useRef,
  useState,
} from 'react';

import { ImageUploader } from '~/components/ImageUploader';
import { articleStyle } from '~/styles/article.css';
import { zIndex } from '~/utils/style';

import { BubbleMenu } from './BubbleMenu';
import { SimpleFloatingMenu } from './FloatingMenu/simple';
import { containerStyle, modalStyle, wrapperStyle } from './style.css';

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
  const dzRef = useRef(null);

  const [showImageUploader, setShowImageUploader] = useState<boolean>(false);

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

  const isOverDropZone = useDropZone(dzRef, (files) => {
    console.log('files', files);
  });

  if (!editor) return;

  return (
    <div ref={dzRef} className={wrapperStyle}>
      <EditorContent
        editor={editor}
        className={clsx(articleStyle, containerStyle)}
      />
      <SimpleFloatingMenu
        editor={editor}
        canUploadImage={!!uploadpath}
        showImageUploader={setShowImageUploader}
      />
      <BubbleMenu editor={editor} />
      {uploadpath && (showImageUploader || isOverDropZone) && (
        <div className={modalStyle}>
          <ImageUploader
            uploadpath={uploadpath}
            onUploaded={onUploadedImage}
            onClose={() => setShowImageUploader(false)}
          />
        </div>
      )}
    </div>
  );
};
