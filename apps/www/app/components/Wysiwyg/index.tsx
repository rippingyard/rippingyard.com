import { useDropZone } from '@reactuses/core';
import FloatingMenu from '@tiptap/extension-floating-menu';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useEditor, EditorContent, AnyExtension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ComponentPropsWithRef, FC, useRef, useState } from 'react';

import { ImageUploader } from '~/components/ImageUploader';
import { articleStyle } from '~/styles/article.css';
import { zIndex } from '~/utils/style';

import { BubbleMenu } from './BubbleMenu';
import { FloatingMenu as FloatingMenuComponent } from './FloatingMenu';
import { containerStyle, modalStyle, wrapperStyle } from './style.css';

type Props = ComponentPropsWithRef<'textarea'> & {
  content: string;
  uploadpath: string;
  onUpdate: (content: string) => void;
};

export const Wysiwyg: FC<Props> = ({ content, uploadpath, onUpdate }) => {
  const className = [articleStyle, containerStyle].join(' ');
  const dzRef = useRef(null);

  const [showImageUploader, setShowImageUploader] = useState<boolean>(false);

  const extensions: AnyExtension[] = [
    StarterKit,
    Image,
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

  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
  });

  const isOverDropZone = useDropZone(dzRef, (files) => {
    console.log('files', files);
  });

  // editor.value = new Editor({
  //   content,
  //   extensions: [
  //     StarterKit,
  //     // // Caption,
  //     // Highlight,
  //     // // Subscript,
  //     // // TextStyle,
  //     // Image.configure({
  //     //   inline: false,
  //     // }),
  //     // Link.configure({
  //     //   openOnClick: false,
  //     // }),
  //     // // Placeholder.configure({
  //     // //   placeholder: 'ここに本文を書いていきましょう',
  //     // // }),
  //     // BubbleMenu.configure({
  //     //   shouldShow: ({ editor }) => {
  //     //     return !editor.isActive('image');
  //     //   },
  //     // }),
  //     // FloatingMenu.configure({
  //     //   // shouldShow: ({ editor, view, state, oldState }) => {
  //     //   //   console.log('Editor!', view, state, oldState)
  //     //   //   return editor.isActive('paragraph')
  //     //   // },
  //     // }),
  //     // Item.configure({
  //     //   HTMLAttributes: {
  //     //     class: 'mention',
  //     //   },
  //     //   suggestion: ItemSuggestion,
  //     // }),
  //   ],
  //   // onUpdate: () => {
  //   //   if (!editor.value) return;
  //   //   emit('update:modelValue', editor.value.getHTML());
  //   // },
  // });

  if (!editor) return;

  return (
    <div ref={dzRef} className={wrapperStyle}>
      <EditorContent editor={editor} className={className} />
      <FloatingMenuComponent
        editor={editor}
        showImageUploader={setShowImageUploader}
      />
      <BubbleMenu editor={editor} />
      {(showImageUploader || isOverDropZone) && (
        <div className={modalStyle}>
          <ImageUploader
            editor={editor}
            uploadpath={uploadpath}
            onClose={() => setShowImageUploader(false)}
          />
        </div>
      )}
    </div>
  );
};
