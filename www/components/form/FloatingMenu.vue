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
    <button :class="{ 'is-active': props.editor.isActive('image') }" @click="$emit('showImageUploader')">
      <IconImage />
    </button>
    <button @click="props.editor.chain().focus().setCaption({}).run()">
      <IconCaption />
    </button>
    <button :class="{ 'is-active': props.editor.isActive('bulletList') }"
      @click="props.editor.chain().focus().toggleBulletList().run()">
      <IconList />
    </button>
    <button :class="{ 'is-active': props.editor.isActive('orderedList') }"
      @click="props.editor.chain().focus().toggleOrderedList().run()">
      <IconListOl />
    </button>
    <button @click="props.editor.chain().focus().setHorizontalRule().run()">
      <IconHorizontalLine />
    </button>
    <button :class="{ 'is-active': props.editor.isActive('blockquote') }"
      @click="props.editor.chain().focus().toggleBlockquote().run()">
      <IconQuoteRight />
    </button>
    <button :class="{ 'is-active': props.editor.isActive('codeBlock') }"
      @click="props.editor.chain().focus().toggleCodeBlock().run()">
      <IconCode />
    </button>
  </floating-menu>
</template>
<script lang="ts" setup>
import { Editor, FloatingMenu } from '@tiptap/vue-3';
const props = defineProps<{
  editor: Editor;
}>();
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
