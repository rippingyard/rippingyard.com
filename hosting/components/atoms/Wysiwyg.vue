<template>
  <div>
    <Modal v-if="showUploader" :on-close="closeImageUploader">
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
    </Modal>
    <div class="editor">
      <bubble-menu :editor="editor" />
      <floating-menu
        :editor="editor"
        @showImageUploader="showImageUploader()"
      />
      <div>
        <editor-content :editor="editor" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'

import { Editor, EditorContent } from '@tiptap/vue-2'
// import StarterKit from '@tiptap/starter-kit'

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Blockquote from '@tiptap/extension-blockquote'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import CodeBlock from '@tiptap/extension-code-block'
import HardBreak from '@tiptap/extension-hard-break'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Subscript from '@tiptap/extension-subscript'
import Highlight from '@tiptap/extension-highlight'
import TextStyle from '@tiptap/extension-text-style'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import BubbleMenu from '@tiptap/extension-bubble-menu'
import FloatingMenu from '@tiptap/extension-floating-menu'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Placeholder from '@tiptap/extension-placeholder'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'

import Caption from '~/plugins/editor/Caption'
import Item from '~/plugins/editor/Item'
import ItemSuggestion from '~/plugins/suggestions/item'

import { getExt } from '~/plugins/file'

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
    editor: any
    image: any
    uploadedImage: string | null
    showUploader: boolean
  } {
    return {
      editor: null,
      image: null,
      uploadedImage: null,
      showUploader: false,
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
        Document,
        Paragraph,
        Text,
        HardBreak,
        Heading,
        Bold,
        Strike,
        Italic,
        Blockquote,
        ListItem,
        BulletList,
        OrderedList,
        CodeBlock,
        Caption,
        Highlight,
        Subscript,
        TextStyle,
        HorizontalRule,
        Image.configure({
          inline: false,
        }),
        Link.configure({
          openOnClick: false,
        }),
        Placeholder.configure({
          placeholder: 'ここに本文を書いていきましょう',
        }),
        BubbleMenu.configure({
          shouldShow: ({ editor }) => {
            return !editor.isActive('image')
          },
        }),
        FloatingMenu.configure({
          // shouldShow: ({ editor, view, state, oldState }) => {
          //   console.log('Editor!', view, state, oldState)
          //   return editor.isActive('paragraph')
          // },
        }),
        Dropcursor,
        Gapcursor,
        Item.configure({
          HTMLAttributes: {
            class: 'mention',
          },
          suggestion: ItemSuggestion,
        }),
      ],
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      },
    })
  },
  beforeDestroy() {
    this.editor?.destroy()
  },
  methods: {
    async uploadImage() {
      if (this.image) {
        const ext = getExt(this.image)
        if (!ext) return

        const now = dayjs()

        const filename = `posts/${now.format('YYYY/MM')}/${now.unix()}.${ext}`
        const result = await (this as any).$fire.storage
          .ref()
          .child(filename)
          .put(this.image)
        const url = await result.ref.getDownloadURL()

        this.editor.chain().focus().setImage({ src: url }).run()

        this.closeImageUploader()
      }
    },
    updateImage(file: any): void {
      // console.log('Image', file)
      this.image = file
    },
    showImageUploader(): void {
      this.showUploader = true
    },
    closeImageUploader(): void {
      this.showUploader = false
    },
  },
})
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
