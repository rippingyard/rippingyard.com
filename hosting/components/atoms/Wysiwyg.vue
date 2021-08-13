<template>
  <div>
    <Modal
      v-if="showUploader"
      :on-close="closeImageUploader"
    >
      <div class="inner">
        <div class="uploader">
          <button v-if="image" @click="uploadImage()">アップロード</button>
          <ImageUploader
            :on-change="updateImage"
          />
        </div>
      </div>
    </Modal>
    <div class="editor">
      <bubble-menu :editor="editor" />
      <floating-menu :editor="editor" @showImageUploader="showImageUploader()" />
      <editor-content :editor="editor" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'

import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Placeholder from '@tiptap/extension-placeholder'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'

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
    editor: any,
    image: any,
    uploadedImage: string | null,
    showUploader: boolean,
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
        StarterKit,
        Document,
        Paragraph,
        Text,
        HorizontalRule,
        Image.configure({
          inline: true,
        }),
        Link.configure({
          openOnClick: false,
        }),
        Placeholder.configure({
          placeholder: 'ここに本文を書いていきましょう'
        }),
        Dropcursor,
        Gapcursor,
      ],
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      },
    })
  },
  beforeDestroy() {
    this.editor.destroy()
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
      console.log('Image', file)
      this.image = file
    },
    showImageUploader(): void {
      this.showUploader = true
    },
    closeImageUploader(): void {
      this.showUploader = false
    },
  }
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
</style>
