<template>
  <div class="editor">
    <bubble-menu :editor="editor" />
    <floating-menu :editor="editor" />
    <editor-content :editor="editor" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'

export default Vue.extend({
  components: {
    EditorContent,
  },
  props: {
    // post: {
    //   type: Object,
    //   default: null,
    // },
    value: {
      type: String,
      default: '',
    },
  },
  data(): {
    editor: any,
  } {
    return {
      editor: null,
    }
  },
  watch: {
    value(value) {
      if (this.editor.getHTML() === value) return
      this.editor.commands.setContent(this.value, false)
    },
  },
  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit,
        Document,
        Paragraph,
        Text,
        Link.configure({
          openOnClick: false,
        }),
        Placeholder.configure({
          placeholder: 'ここに本文を書いていきましょう'
        }),
      ],
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      },
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
})
</script>
<style lang="scss">
.editor {
  min-height: 320px;
  position: relative;
}
</style>
