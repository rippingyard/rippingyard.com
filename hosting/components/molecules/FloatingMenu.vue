<template>
  <floating-menu v-if="editor" class="floatingmenu" :editor="editor">
    <button
      @click="editor.chain().focus().setParagraph().run()"
    >
      <fa-icon icon="paragraph" />
    </button>
    <span><fa-icon icon="heading" class="icon" /></span>
    <button
      :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
    >
      1
    </button>
    <button
      :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
    >
      2
    </button>
    <button
      :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
    >
      3
    </button>
    <button
      :class="{ 'is-active': editor.isActive('image') }"
      @click="uploadImage()"
    >
      <fa-icon icon="image" />
    </button>
    <button
      @click="editor.chain().focus().setCaption().run()"
    >
      <fa-icon icon="closed-captioning" />
    </button>
    <button
      :class="{ 'is-active': editor.isActive('bulletList') }"
      @click="editor.chain().focus().toggleBulletList().run()"
    >
      <fa-icon icon="list" />
    </button>
    <button
      :class="{ 'is-active': editor.isActive('orderedList') }"
      @click="editor.chain().focus().toggleOrderedList().run()"
    >
      <fa-icon icon="list-ol" />
    </button>
    <button
      @click="editor.chain().focus().setHorizontalRule().run()"
    >
      <fa-icon icon="ruler-horizontal" />
    </button>
    <button
      :class="{ 'is-active': editor.isActive('blockquote') }"
      @click="editor.chain().focus().toggleBlockquote().run()"
    >
      <fa-icon icon="quote-right" />
    </button>
    <button
      :class="{ 'is-active': editor.isActive('codeBlock') }"
      @click="editor.chain().focus().toggleCodeBlock().run()"
    >
      <fa-icon icon="code" />
    </button>
  </floating-menu>
</template>
<script lang="ts">
import Vue from 'vue'
import { FloatingMenu } from '@tiptap/vue-2'
export default Vue.extend({
  components: {
    FloatingMenu,
  },
  props: {
    editor: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    uploadImage() {
      this.$emit('showImageUploader')
    },
    // addImage() {
    //   const url = window.prompt('URL')

    //   if (url) {
    //     this.editor.chain().focus().setImage({ src: url }).run()
    //   }
    // },
  }
})
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
