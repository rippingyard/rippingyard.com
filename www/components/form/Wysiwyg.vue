<template>
  <div v-if="editor">
    <BlockModal v-if="showUploader" :on-close="closeImageUploader">
      <div class="inner">
        <div class="uploader">
          <div v-if="image" class="console">
            <AtomButton class="button expanded" @click="uploadImage()">
              アップロード
            </AtomButton>
          </div>
          <FormImageUploader :on-change="updateImage" />
        </div>
      </div>
    </BlockModal>
    <div class="editor">
      <FormBubbleMenu :editor="editor" />
      <FormFloatingMenu :editor="editor" @showImageUploader="showImageUploader()" />
      <div>
        <editor-content :editor="editor" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Editor, EditorContent } from '@tiptap/vue-3';
import { StarterKit } from '@tiptap/starter-kit';
import dayjs from 'dayjs';

// import CodeBlock from '@tiptap/extension-code-block'
// import HardBreak from '@tiptap/extension-hard-break'
// import Subscript from '@tiptap/extension-subscript'
import { Highlight } from '@tiptap/extension-highlight';
// import TextStyle from '@tiptap/extension-text-style'
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { BubbleMenu } from '@tiptap/extension-bubble-menu';
import { FloatingMenu } from '@tiptap/extension-floating-menu';
// import Placeholder from '@tiptap/extension-placeholder'

// import Caption from '~/plugins/editor/Caption'
// import Item from '~/plugins/editor/Item'
// import ItemSuggestion from '~/plugins/suggestions/item'
import { getExt } from '~/utils/file';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  placeholder?: string
  modelValue: string
}>();

const editor = ref<Editor>();
const image = ref<File>();
const showUploader = ref(false);

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    extensions: [
      StarterKit,
      // Caption,
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
      // Item.configure({
      //   HTMLAttributes: {
      //     class: 'mention',
      //   },
      //   suggestion: ItemSuggestion,
      // }),
    ],
    onUpdate: () => {
      if (!editor.value) return;
      emit('update:modelValue', editor.value.getHTML());
    },
  });
});

onUnmounted(() => editor.value?.destroy());


//   data(): {
//     uploadedImage: string | null
//   } {
//     return {
//       uploadedImage: null,
//     }
//   },
//   watch: {
//     value(value) {
//       if (this.editor.getHTML() === value) return
//       this.editor.commands.setContent(this.value, false)
//     },
//   },

const uploadImage = async () => {
  if (!editor.value) return;
  if (image.value) {
    const ext = getExt(image.value);
    if (!ext) return;

    const now = dayjs()

    const filename = `posts/${now.format('YYYY/MM')}/${now.unix()}.${ext}`
    const result = await (this as any).$fire.storage
      .ref()
      .child(filename)
      .put(image.value)
    const url = await result.ref.getDownloadURL();

    editor.value.chain().focus().setImage({ src: url }).run();

    closeImageUploader();
  }
};
const updateImage = (file: File): void => {
  image.value = file;
};

const showImageUploader = (): void => {
  showUploader.value = true;
};
const closeImageUploader = (): void => {
  showUploader.value = false;
};
</script>
<style lang="scss">
.editor {
  min-height: 320px;
  position: relative;
}

.inner {
  width: 100%;
  height: 100%;
}

.uploader {
  padding: $gap;
}

.console {
  margin-bottom: 10px;
}
</style>
