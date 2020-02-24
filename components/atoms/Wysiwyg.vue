<template>
  <div>
    <editor-menu-bubble
      class="menububble"
      :editor="editor"
      @hide="hideLinkMenu"
      :keep-in-bounds="keepInBounds"
      v-slot="{ commands, isActive, menu, getMarkAttrs }"
    >
      <div
        class="menububble"
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
      >

        <form class="menububble__form" v-if="linkMenuIsActive" @submit.prevent="setLinkUrl(commands.link, linkUrl)">
          <b-icon v-if="isActive.link()" icon="link-variant"></b-icon>
          <b-icon v-else icon="link-variant"></b-icon>
          <input class="menububble__input" type="text" v-model="linkUrl" placeholder="https://" ref="linkInput" @keydown.esc="hideLinkMenu"/>
          <button class="menububble__button" @click="setLinkUrl(commands.link, null)" type="button">
            <b-icon icon="delete"></b-icon>
          </button>
        </form>
        <template v-else>
          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <b-icon icon="format-bold"></b-icon>
          </button>

          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <b-icon icon="format-italic"></b-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            大見出し
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            小見出し
          </button>

          <button
            class="menububble__button"
            @click="showLinkMenu(getMarkAttrs('link'))"
            :class="{ 'is-active': isActive.link() }"
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
      const post = new Post()

      post.create({
        content: this.editor.getHTML(),
        owner: this.$store.state.auth.me.id,
      })

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