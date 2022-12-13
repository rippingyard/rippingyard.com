<template>
  <div v-if="editor">
    <!-- <Modal v-if="showUploader" :on-close="closeImageUploader">
      <div class="inner">
        <div class="uploader">
          <div v-if="image" class="console">
            <button class="button expanded" @click="uploadImage()">
              アップロード
            </button>
          </div>
          <ImageUploader :on-change="updateImage" />
        </div>
      </div>
    </Modal> -->
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
// import dayjs from 'dayjs'

// import CodeBlock from '@tiptap/extension-code-block'
// import HardBreak from '@tiptap/extension-hard-break'
// import Subscript from '@tiptap/extension-subscript'
import { Highlight } from '@tiptap/extension-highlight';
// import TextStyle from '@tiptap/extension-text-style'
import { Link } from '@tiptap/extension-link';
// import Image from '@tiptap/extension-image'
import { BubbleMenu } from '@tiptap/extension-bubble-menu';
import { FloatingMenu } from '@tiptap/extension-floating-menu';
// import Placeholder from '@tiptap/extension-placeholder'

// import Caption from '~/plugins/editor/Caption'
// import Item from '~/plugins/editor/Item'
// import ItemSuggestion from '~/plugins/suggestions/item'
// import { getExt } from '~/plugins/file';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  placeholder?: string
  modelValue: string
}>();

const editor = ref<Editor>();
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
      // Image.configure({
      //   inline: false,
      // }),
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


// export default Vue.extend({
//   data(): {
//     image: any
//     uploadedImage: string | null
//     showUploader: boolean
//   } {
//     return {
//       editor: null,
//       image: null,
//       uploadedImage: null,
//       showUploader: false,
//     }
//   },
//   watch: {
//     value(value) {
//       if (this.editor.getHTML() === value) return
//       this.editor.commands.setContent(this.value, false)
//     },
//   },
//   methods: {
//     async uploadImage() {
//       if (this.image) {
//         const ext = getExt(this.image)
//         if (!ext) return

//         const now = dayjs()

//         const filename = `posts/${now.format('YYYY/MM')}/${now.unix()}.${ext}`
//         const result = await (this as any).$fire.storage
//           .ref()
//           .child(filename)
//           .put(this.image)
//         const url = await result.ref.getDownloadURL()

//         this.editor.chain().focus().setImage({ src: url }).run()

//         this.closeImageUploader()
//       }
//     },
//     updateImage(file: any): void {
//       // console.log('Image', file)
//       this.image = file
//     },
const showImageUploader = (): void => {
  showUploader.value = true
}
//     closeImageUploader(): void {
//       this.showUploader = false
//     },
//   },
// })
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
