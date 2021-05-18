<template>
  <div class="editor short">
    <editor-menu-bubble
      v-slot="{ commands, isActive, menu, getMarkAttrs }"
      :editor="editor"
      :keep-in-bounds="keepInBounds"
      @hide="hideLinkMenu"
    >
      <div
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
        class="menububble"
      >
        <form
          v-if="linkMenuIsActive"
          class="menububble__form"
          @submit.prevent="setLinkUrl(commands.link, linkUrl)"
        >
          <fa-icon v-if="isActive.link()" icon="link" />
          <fa-icon v-else icon="link" />
          <input
            ref="linkInput"
            v-model="linkUrl"
            type="text"
            placeholder="https://"
            class="menububble__input"
            @keydown.esc="hideLinkMenu"
          />
          <button
            type="button"
            class="menububble__button"
            @click="setLinkUrl(commands.link, null)"
          >
            <font-awesome-icon icon="trash-alt" />
          </button>
        </form>
        <template v-else>
          <button
            :class="{ 'is-active': isActive.bold() }"
            class="menububble__button"
            @click="commands.bold"
          >
            <fa-icon icon="bold" />
          </button>

          <button
            :class="{ 'is-active': isActive.italic() }"
            class="menububble__button"
            @click="commands.italic"
          >
            <fa-icon icon="italic" />
          </button>

          <button
            :class="{ 'is-active': isActive.link() }"
            class="menububble__button"
            @click="showLinkMenu(getMarkAttrs('link'))"
          >
            <fa-icon icon="link" />
          </button>
        </template>
      </div>
    </editor-menu-bubble>
    <editor-content :editor="editor" />
  </div>
</template>
<script>
// import Fuse from 'fuse.js'
import tippy, { sticky } from 'tippy.js'

import {
  Editor,
  EditorContent,
  EditorMenuBubble,
  // EditorFloatingMenu,
} from 'tiptap'

import {
  // Blockquote,
  // BulletList,
  // CodeBlock,
  HardBreak,
  Heading,
  // ListItem,
  // OrderedList,
  Bold,
  Italic,
  History,
  // Mention,
  Placeholder,
} from 'tiptap-extensions'

import Wysiwyg from '~/plugins/editor/TextArea'
import Link from '~/plugins/editor/Link'

export default {
  components: {
    EditorContent,
    EditorMenuBubble,
    // EditorFloatingMenu,
  },
  props: {
    default: {
      type: String,
      default: '',
    },
    resetCount: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      editor: null,
      // content: this.default || '',
      linkUrl: null,
      linkMenuIsActive: false,
      keepInBounds: true,
      query: null,
      suggestionRange: null,
      filteredUsers: [],
      navigatedUserIndex: 0,
      insertMention: () => {},
    }
  },
  computed: {
    hasResults() {
      return this.filteredUsers.length
    },
    showSuggestions() {
      return this.query || this.hasResults
    },
  },
  watch: {
    default(val) {
      console.log('Update TextArea', val)
      this.content = ''
    },
    resetCount(val) {
      console.log('Reset TextArea!', val)
      if (val > 0) {
        this.editor.clearContent()
        // this.reset = false
      }
    }
  },
  mounted() {
    console.log('content', this.content)
    this.editor = new Editor({
      content: this.content,
      extensions: [
        // new Blockquote(),
        // new BulletList(),
        // new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        // new ListItem(),
        // new OrderedList(),
        new Link({
          openOnClick: false,
        }),
        new Bold(),
        new Italic(),
        new History(),
        // new Title(),
        new Wysiwyg(),

        new Placeholder({
          showOnlyCurrent: false,
          emptyNodeText: () => {
            return 'ここに本文を書いていきましょう'
          },
        }),
      ],
      onUpdate: s => {
        this.$emit('input', s.getHTML())
      },
    })
  },
  beforeDestroy() {
    this.destroyPopup()
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

    // renders a popup with suggestions
    // tiptap provides a virtualNode object for using popper.js (or tippy.js) for popups
    renderPopup(node) {
      if (this.popup) {
        return
      }

      // ref: https://atomiks.github.io/tippyjs/v6/all-props/
      this.popup = tippy('.page', {
        getReferenceClientRect: node.getBoundingClientRect,
        appendTo: () => document.body,
        interactive: true,
        sticky: true, // make sure position of tippy is updated when content changes
        plugins: [sticky],
        content: this.$refs.suggestions,
        trigger: 'mouseenter', // manual
        showOnCreate: true,
        theme: 'dark',
        placement: 'top-start',
        inertia: true,
        duration: [400, 200],
      })
    },

    destroyPopup() {
      if (this.popup) {
        console.log('popup', this.popup)
        this.popup[0].destroy()
        this.popup = null
      }
    },
  },
}
</script>
<style lang="scss">
.editor {
  min-height: 140px !important;
  position: relative;
  &__floating-menu {
    position: absolute;
    z-index: 1;
    margin-top: -3rem;
    visibility: hidden;
    opacity: 0;
    padding: 4px;
    border: 1px solid $gray-black;
    border-radius: 5px;
    transition: opacity 0.2s, visibility 0.2s;
    background-color: $white;
    &.is-active {
      opacity: 1;
      visibility: visible;
    }
    .menubar__button {
      padding: 5px;
      border-radius: 3px;
      line-height: 1;
      &:hover {
        cursor: pointer;
        background-color: $yellow;
      }
    }
  }
}

.is-empty {
  &:first-child,
  &:nth-child(2) {
    &::before {
      content: attr(data-empty-text);
      float: left;
      color: $gray-black;
      pointer-events: none;
      height: 0;
    }
    &:hover {
      &::before {
        opacity: 0.6;
      }
    }
  }
}

.mention {
  background: rgba($black, 0.1);
  color: rgba($black, 0.6);
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  white-space: nowrap;
}

.mention-suggestion {
  color: rgba($black, 0.6);
}

.suggestion-list {
  padding: 0.2rem;
  border: 2px solid rgba($black, 0.1);
  font-size: 0.8rem;
  font-weight: bold;

  &__no-results {
    padding: 0.2rem 0.5rem;
  }

  &__item {
    border-radius: 5px;
    padding: 0.2rem 0.5rem;
    margin-bottom: 0.2rem;
    cursor: pointer;

    &:last-child {
      margin-bottom: 0;
    }

    &.is-selected,
    &:hover {
      background-color: rgba($white, 0.2);
    }

    &.is-empty {
      opacity: 0.5;
    }
  }
}

.tippy-box[data-theme~='dark'] {
  background-color: $black;
  padding: 0;
  font-size: 1rem;
  text-align: inherit;
  color: $white;
  border-radius: 5px;
}
</style>
