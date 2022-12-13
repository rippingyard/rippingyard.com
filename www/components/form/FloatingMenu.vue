<template>
  <floating-menu v-if="props.editor" class="floatingmenu" :editor="props.editor">
    <button @click="props.editor.chain().focus().setParagraph().run()">
      <IconParagraph />
    </button>
    <span>
      <IconHeading />
    </span>
    <button :class="{ 'is-active': props.editor.isActive('heading', { level: 1 }) }"
      @click="props.editor.chain().focus().toggleHeading({ level: 1 }).run()">
      1
    </button>
    <button :class="{ 'is-active': props.editor.isActive('heading', { level: 2 }) }"
      @click="props.editor.chain().focus().toggleHeading({ level: 2 }).run()">
      2
    </button>
    <button :class="{ 'is-active': props.editor.isActive('heading', { level: 2 }) }"
      @click="props.editor.chain().focus().toggleHeading({ level: 2 }).run()">
      3
    </button>
    <!-- <button
      :class="{ 'is-active': props.editor.isActive('image') }"
      @click="uploadImage()"
    >
      <fa-icon icon="image" />
    </button> -->
    <!-- <button
      @click="props.editor.chain().focus().setCaption().run()"
    >
      <fa-icon icon="closed-captioning" />
    </button> -->
    <button :class="{ 'is-active': props.editor.isActive('bulletList') }"
      @click="props.editor.chain().focus().toggleBulletList().run()">
      <fa-icon icon="list" />
    </button>
    <button :class="{ 'is-active': props.editor.isActive('orderedList') }"
      @click="props.editor.chain().focus().toggleOrderedList().run()">
      <fa-icon icon="list-ol" />
    </button>
    <button @click="props.editor.chain().focus().setHorizontalRule().run()">
      <fa-icon icon="ruler-horizontal" />
    </button>
    <button :class="{ 'is-active': props.editor.isActive('blockquote') }"
      @click="props.editor.chain().focus().toggleBlockquote().run()">
      <fa-icon icon="quote-right" />
    </button>
    <button :class="{ 'is-active': props.editor.isActive('codeBlock') }"
      @click="props.editor.chain().focus().toggleCodeBlock().run()">
      <fa-icon icon="code" />
    </button>
  </floating-menu>
</template>
<script lang="ts" setup>
import { Editor, FloatingMenu } from '@tiptap/vue-3';

const props = defineProps<{
  editor: Editor;
}>();


//   methods: {
//     uploadImage() {
//       this.$emit('showImageUploader')
//     },
//   }
// })
</script>
<style lang="scss" scoped>
.floatingmenu {
  button {
    padding: 5px;
    border-radius: 3px;
    line-height: 1;

    &:hover {
      cursor: pointer;
      background-color: $yellow;
    }
  }
}
</style>
