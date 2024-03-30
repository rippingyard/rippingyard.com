import FloatingMenu from '@tiptap/extension-floating-menu';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import {
  useEditor,
  EditorContent,
  AnyExtension,
  // FloatingMenu as TipTapFloatingMenu,
  // BubbleMenu,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  ComponentPropsWithRef,
  FC,
  // ReactNode,
  // forwardRef,
  // useMemo,
} from 'react';

import { articleStyle } from '~/styles/article.css';

import { BubbleMenu } from './BubbleMenu';
import { FloatingMenu as FloatingMenuComponent } from './FloatingMenu';
import { containerStyle } from './style.css';

type Props = ComponentPropsWithRef<'textarea'> & {
  content: string;
};

export const Wysiwyg: FC<Props> = ({ content }) => {
  const className = [articleStyle, containerStyle].join(' ');

  const extensions: AnyExtension[] = [
    StarterKit,
    Image,
    Link,
    Highlight,
    FloatingMenu.configure({
      tippyOptions: {
        maxWidth: 'none',
      },
      // shouldShow: ({ editor, view, state, oldState }) => {
      //   console.log('Editor!', view, state, oldState)
      //   return editor.isActive('paragraph')
      //
    }),
  ];

  const editor = useEditor({
    extensions,
    content,
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
    <>
      <EditorContent editor={editor} className={className} />
      <FloatingMenuComponent editor={editor} />
      <BubbleMenu editor={editor} />
    </>
  );
};
