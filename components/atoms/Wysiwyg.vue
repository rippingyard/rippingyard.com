<template>
  <div class="editor">

    <editor-floating-menu
      :editor="editor"
      v-slot="{ commands, isActive, menu }"
    >
      <div
        :class="{ 'is-active': menu.isActive }"
        :style="`top: ${menu.top}px`"
        class="editor__floating-menu"
      >

        <button
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
          class="menubar__button"
        >
          H2
        </button>

        <button
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
          class="menubar__button"
        >
          H3
        </button>

        <button
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
          class="menubar__button"
        >
          UL
        </button>

        <button
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
          class="menubar__button"
        >
          OL
        </button>

        <button
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
          class="menubar__button"
        >
          QUOTE
        </button>

        <button
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
          class="menubar__button"
        >
          CODE
        </button>

      </div>
    </editor-floating-menu>

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
  </div>
</template>

<style lang="scss">

.editor {
  &__floating-menu {
    position: absolute;
    z-index: 1;
    margin-top: -0.25rem;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s, visibility 0.2s;
    &.is-active {
      opacity: 1;
      visibility: visible;
    }
  }
}

.is-empty {
  &:first-child,
  &:nth-child(2) {
    &:before {
      content: attr(data-empty-text);
      float: left;
      color: $cyan;
      pointer-events: none;
      height: 0;
      // font-style: italic;
    }
    &:hover {
      &:before {
        opacity: 0.6;
      }
    }
  }

}

</style>

<script>
import {
  Editor,
  EditorContent,
  EditorMenuBubble,
  EditorFloatingMenu,
} from 'tiptap'

import {
  Blockquote,
  BulletList,
  CodeBlock,
  HardBreak,
  Heading,
  ListItem,
  OrderedList,
  // TodoItem,
  // TodoList,
  Bold,
  // Code,
  Italic,
  // Link,
  // Strike,
  // Underline,
  History,
  Placeholder,
} from 'tiptap-extensions'

import Wysiwyg from '~/plugins/editor/Wysiwyg'
import Title from '~/plugins/editor/Title'
import Link from '~/plugins/editor/Link'

export default {
  components: {
    EditorContent,
    EditorMenuBubble,
    EditorFloatingMenu,
  },
  props: {
    post: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      editor: null,
      content: this.post ? this.post.content : '',
      linkUrl: null,
      linkMenuIsActive: false,
      keepInBounds: true,
    }
  },
  mounted(context) {

    // console.log(context.content)

    this.editor = new Editor({
      // keepInBounds: true,
      content: this.content,
      // disablePasteRules: true,
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new ListItem(),
        new OrderedList(),
        // new TodoItem(),
        // new TodoList(),
        new Link({
          openOnClick: false,
        }),
        new Bold(),
        // new Code(),
        new Italic(),
        // new Strike(),
        // new Underline(),
        new History(),
        new Title(),
        new Wysiwyg(),
        new Placeholder({
          showOnlyCurrent: false,
          emptyNodeText: node => {
            if (node.type.name === 'title') {
              return '記事タイトル'
            }
            return 'ここに本文を書いていきましょう'
          },
        }),
      ],
      onUpdate: (s) => {
        this.$emit('update', s.getHTML())
      },
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
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