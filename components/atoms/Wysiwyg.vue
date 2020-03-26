<template>
  <div>
    <editor-menu-bubble
      :editor="editor"
      @hide="hideLinkMenu"
      :keep-in-bounds="keepInBounds"
      v-slot="{ commands, isActive, menu, getMarkAttrs }"
    >
      <div
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
        class="menububble"
      >

        <form
          v-if="linkMenuIsActive"
          @submit.prevent="setLinkUrl(commands.link, linkUrl)"
          class="menububble__form"
        >
          <b-icon v-if="isActive.link()" icon="link-variant"></b-icon>
          <b-icon v-else icon="link-variant"></b-icon>
          <input ref="linkInput" v-model="linkUrl" @keydown.esc="hideLinkMenu" type="text" placeholder="https://" class="menububble__input" />
          <button @click="setLinkUrl(commands.link, null)" type="button" class="menububble__button">
            <b-icon icon="delete"></b-icon>
          </button>
        </form>
        <template v-else>
          <button
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
            class="menububble__button"
          >
            <b-icon icon="format-bold"></b-icon>
          </button>

          <button
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
            class="menububble__button"
          >
            <b-icon icon="format-italic"></b-icon>
          </button>

          <button
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
            class="menubar__button"
          >
            大見出し
          </button>

          <button
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
            class="menubar__button"
          >
            小見出し
          </button>

          <button
            @click="showLinkMenu(getMarkAttrs('link'))"
            :class="{ 'is-active': isActive.link() }"
            class="menububble__button"
          >
            <b-icon icon="link-variant"></b-icon>
          </button>
        </template>

      </div>
    </editor-menu-bubble>
    <editor-content :editor="editor" />
    <b-button @click="submit">新規追加</b-button>
  </div>
</template>

<style lang="scss">

</style>

<script>
import {
  Editor,
  EditorContent,
  EditorMenuBubble,
} from 'tiptap'

import {
  Blockquote,
  // BulletList,
  // CodeBlock,
  HardBreak,
  Heading,
  // ListItem,
  // OrderedList,
  // TodoItem,
  // TodoList,
  Bold,
  // Code,
  Italic,
  Link,
  // Strike,
  // Underline,
  History,
} from 'tiptap-extensions'

import Post from '~/models/Post'

export default {
  components: {
    EditorContent,
    EditorMenuBubble,
  },
  data() {
    return {
      editor: null,
      content: this.content,
      linkUrl: null,
      linkMenuIsActive: false,
      keepInBounds: true,
    }
  },
  mounted() {
    this.editor = new Editor({
      keepInBounds: true,
      content: this.content,
      extensions: [
        new Blockquote(),
        // new BulletList(),
        // new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        // new ListItem(),
        // new OrderedList(),
        // new TodoItem(),
        // new TodoList(),
        new Link({ openOnClick: false }),
        new Bold(),
        // new Code(),
        new Italic(),
        // new Strike(),
        // new Underline(),
        new History(),
      ],
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    submit() {

      const postRef = new Post()
      postRef.ref().doc().set(postRef.setting({
        content: this.editor.getHTML(),
        owner: this.$store.state.auth.me,
      }))

      this.$buefy.notification.open({
        duration: 5000,
        message: '記事を投稿しました',
        position: 'is-bottom-right',
        type: 'is-success',
        hasIcon: false
      })

    },
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href
      this.linkMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
    },
    hideLinkMenu() {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },
    setLinkUrl(command, url) {
      command({ href: url })
      this.hideLinkMenu()
    },
  }
}
</script>