﻿import { useDropZone } from '@reactuses/core';
import FloatingMenu from '@tiptap/extension-floating-menu';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import { useEditor, EditorContent, AnyExtension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import {
  ComponentPropsWithRef,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { IconLoader } from '~/assets/icons/Loader';
import { ImageUploader } from '~/components/ImageUploader';
import { useImageEditor } from '~/hooks/ui/useImageEditor';
import { articleStyle } from '~/styles/article.css';
import { zIndex } from '~/utils/style';

import { BubbleMenu } from './BubbleMenu';
import { FloatingMenu as FloatingMenuComponent } from './FloatingMenu';
import {
  containerStyle,
  loadingStyle,
  modalStyle,
  wrapperStyle,
} from './style.css';

type Props = ComponentPropsWithRef<'textarea'> & {
  content: string;
  uploadpath?: string;
  onUpdate: (content: string) => void;
};

export const Wysiwyg: FC<Props> = ({ content, uploadpath, onUpdate }) => {
  const dzRef = useRef(null);

  const [showImageUploader, setShowImageUploader] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

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

  if (uploadpath)
    extensions.push(
      useImageEditor({
        uploadpath,
        onLoading: () => setIsLoading(true),
        onLoaded: () => setIsLoading(false),
      })
    );

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

  const isOverDropZone = useDropZone(dzRef);

  useEffect(() => {
    if (!isOverDropZone) return;
    setShowImageUploader(true);
  }, [isOverDropZone]);

  if (!editor) return;

  return (
    <div ref={dzRef} className={wrapperStyle}>
      <EditorContent
        editor={editor}
        className={clsx(articleStyle, containerStyle)}
      />
      <FloatingMenuComponent
        editor={editor}
        canUploadImage={!!uploadpath}
        showImageUploader={setShowImageUploader}
      />
      <BubbleMenu editor={editor} />
      {uploadpath && showImageUploader && (
        <div className={modalStyle}>
          <ImageUploader
            uploadpath={uploadpath}
            onUploaded={onUploadedImage}
            onClose={() => setShowImageUploader(false)}
          />
        </div>
      )}
      {isLoading && (
        <p className={loadingStyle}>
          <IconLoader />
        </p>
      )}
    </div>
  );
};
