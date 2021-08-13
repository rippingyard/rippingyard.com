<template>
  <bubble-menu v-if="editor" :editor="editor" class="bubblemenu">
    <button
      :class="{ 'is-active': editor.isActive('bold') }"
      @click="editor.chain().focus().toggleBold().run()"
    >
      <fa-icon icon="bold" />
    </button>
    <button
      :class="{ 'is-active': editor.isActive('italic') }"
      @click="editor.chain().focus().toggleItalic().run()"
    >
      <fa-icon icon="italic" />
    </button>
    <button
      :class="{ 'is-active': editor.isActive('strike') }"
      @click="editor.chain().focus().toggleStrike().run()"
    >
      <fa-icon icon="strikethrough" />
    </button>
    <button
      v-if="editor.isActive('link')"
      @click="editor.chain().focus().unsetLink().run()"
    >
      <fa-icon icon="unlink" />
    </button>
    <button
      v-else
      :class="{ 'is-active': editor.isActive('link') }"
      @click="setLink"
    >
      <fa-icon icon="link" />
    </button>
  </bubble-menu>
</template>
<script lang="ts">
import Vue from 'vue'
import { BubbleMenu } from '@tiptap/vue-2'
export default Vue.extend({
  components: {
    BubbleMenu,
  },
  props: {
    editor: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    setLink() {
      const url = window.prompt('URL')
      this.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    },
  },
})
</script>
<style lang="scss" scoped>
.bubblemenu {
  background: $white;
  border: 1px solid $gray-black;
  border-radius: 5px;
  padding: .3rem .4rem;
  button {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: $black;
    padding: 4px 6px;
    border-radius: 3px;
    cursor: pointer;

    &:last-child {
      margin-right:0;
    }
    &:hover {
      background-color: $yellow;
    }
    &.is-active {
      background-color:hsla(0,0%,100%,.2);
    }
  }
}
</style>
