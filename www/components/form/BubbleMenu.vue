<template>
  <bubble-menu v-if="props.editor" :editor="props.editor" class="bubblemenu">
    <button :class="{ 'is-active': props.editor.isActive('bold') }"
      @click="props.editor.chain().focus().toggleBold().run()">
      <IconBold />
    </button>
    <button :class="{ 'is-active': props.editor.isActive('italic') }"
      @click="props.editor.chain().focus().toggleItalic().run()">
      <IconItalic />
    </button>
    <button :class="{ 'is-active': props.editor.isActive('highlight') }"
      @click="props.editor.chain().focus().toggleHighlight().run()">
      <IconHighLighter />
    </button>
    <button :class="{ 'is-active': props.editor.isActive('strike') }"
      @click="props.editor.chain().focus().toggleStrike().run()">
      <IconStrikethrough />
    </button>
    <button v-if="props.editor.isActive('link')" @click="props.editor.chain().focus().unsetLink().run()">
      <IconUnlink />
    </button>
    <button v-else :class="{ 'is-active': props.editor.isActive('link') }" @click="setLink">
      <IconLink />
    </button>
  </bubble-menu>
</template>
<script lang="ts" setup>
import { Editor, BubbleMenu } from '@tiptap/vue-3';

const props = defineProps<{
  editor: Editor;
}>();

const setLink = () => {
  if (!props.editor) return;
  if (process.client) {
    const url = window.prompt('URL') || '';
    props.editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run()
  }
};
</script>
<style lang="scss" scoped>
.bubblemenu {
  background: $white;
  filter: drop-shadow(0px 3px 8px $black-transparent-40 );
  // border: 1px solid $gray-black;
  border-radius: 2px;
  // padding: .3rem .4rem;
  display: flex;

  button {
    // display: -webkit-inline-box;
    // display: -ms-inline-flexbox;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 0;
    color: $black;
    padding: 12px 8px;
    // border-radius: 3px;
    min-width: 40px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      background-color: $gray;
    }

    &.is-active {
      background-color: hsla(0, 0%, 100%, .2);
    }
  }
}
</style>
