<template>
  <div v-if="editor" @click="editor && editor.commands.focus()" class="wrapper">
    <div class="editor">
      <FormBubbleMenu :editor="editor" />
      <div class="inner">
        <editor-content :editor="editor" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Editor, EditorContent } from '@tiptap/vue-3';
import { StarterKit } from '@tiptap/starter-kit';

import { Highlight } from '@tiptap/extension-highlight';
import { Link } from '@tiptap/extension-link';
import { BubbleMenu } from '@tiptap/extension-bubble-menu';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  placeholder?: string
  modelValue: string
}>();

const editor = ref<Editor>();

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    extensions: [
      StarterKit,
      Highlight,
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
    ],
    onUpdate: () => {
      if (!editor.value) return;
      emit('update:modelValue', editor.value.getHTML());
    },
  });
});

onUnmounted(() => editor.value?.destroy());
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
</style>
