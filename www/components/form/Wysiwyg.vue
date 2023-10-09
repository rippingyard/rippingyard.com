<template>
  <div v-if="editor" @click="editor && editor.commands.focus()" class="wrapper">
    <OrganismImageUploader :editor="editor" :show="showUploader" :on-close="closeImageUploader" />
    <div class="editor">
      <FormBubbleMenu :editor="editor" />
      <FormFloatingMenu :editor="editor" @showImageUploader="showImageUploader()" />
      <div class="inner">
        <editor-content :editor="editor" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Editor, EditorContent } from '@tiptap/vue-3';
import { StarterKit } from '@tiptap/starter-kit';

// import Subscript from '@tiptap/extension-subscript'
import { Highlight } from '@tiptap/extension-highlight';
// import TextStyle from '@tiptap/extension-text-style'
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { BubbleMenu } from '@tiptap/extension-bubble-menu';
import { FloatingMenu } from '@tiptap/extension-floating-menu';
import { Mention } from '@tiptap/extension-mention';
import { useTagSuggestion } from '~~/composables/suggestion/useTagSuggestion';
// import Placeholder from '@tiptap/extension-placeholder'

import Caption from '~~/utils/editor/Caption';
// import Item from '~/plugins/editor/Item'
// import ItemSuggestion from '~/plugins/suggestions/item'

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  placeholder?: string
  modelValue: string
}>();

const editor = ref<Editor>();
// const image = ref<File>();
const showUploader = ref(false);

const { suggestion } = useTagSuggestion();

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    extensions: [
      StarterKit,
      Caption,
      Highlight,
      // Subscript,
      // TextStyle,
      Image.configure({
        inline: false,
      }),
      Link.configure({
        openOnClick: false,
      }),
      // Placeholder.configure({
      //   placeholder: 'ここに本文を書いていきましょう',
      // }),
      BubbleMenu.configure({
        shouldShow: ({ editor }) => {
          return !editor.isActive('image');
        },
      }),
      FloatingMenu.configure({
        // shouldShow: ({ editor, view, state, oldState }) => {
        //   console.log('Editor!', view, state, oldState)
        //   return editor.isActive('paragraph')
        // },
      }),
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        suggestion,
      }),
    ],
    onUpdate: () => {
      if (!editor.value) return;
      emit('update:modelValue', editor.value.getHTML());
    },
  });
});

onUnmounted(() => editor.value?.destroy());

const showImageUploader = (): void => {
  showUploader.value = true;
};
const closeImageUploader = (): void => {
  showUploader.value = false;
};
</script>
<style lang="scss" scoped>
.editor {
  min-height: 25vh;
  position: relative;

  >.inner {
    width: 100%;
    height: 100%;
  }
}

.wrapper {
  height: 100%;
  cursor: text;
}

// .expanded {
//   width: 100%;
//   height: 100%;
// }

// .uploader {
//   padding: $gap;
// }

// .console {
//   margin-bottom: 10px;
// }
</style>
