<template>
  <div>
    <div class="editor">
      <editor-floating-menu
        v-slot="{ commands, isActive, menu }"
        :editor="editor"
      >
        <div
          :class="{ 'is-active': menu.isActive }"
          :style="`top: ${menu.top}px`"
          class="editor__floating-menu"
        >
          <button
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            class="menubar__button"
            @click="commands.heading({ level: 2 })"
          >
            <fa-icon icon="heading" class="icon" />
          </button>

          <button
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            class="menubar__button"
            @click="commands.heading({ level: 3 })"
          >
            H3
          </button>

          <button
            :class="{ 'is-active': isActive.bullet_list() }"
            class="menubar__button"
            @click="commands.bullet_list"
          >
            <fa-icon icon="list" class="icon" />
          </button>

          <button
            :class="{ 'is-active': isActive.ordered_list() }"
            class="menubar__button"
            @click="commands.ordered_list"
          >
            <fa-icon icon="list-ol" class="icon" />
          </button>

          <button
            :class="{ 'is-active': isActive.blockquote() }"
            class="menubar__button"
            @click="commands.blockquote"
          >
            <fa-icon icon="quote-right" class="icon" />
          </button>

          <button
            :class="{ 'is-active': isActive.code_block() }"
            class="menubar__button"
            @click="commands.code_block"
          >
            <fa-icon icon="code" class="icon" />
          </button>
        </div>
      </editor-floating-menu>

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

    <div v-show="showSuggestions" ref="suggestions" class="suggestion-list">
      <template v-if="hasResults">
        <div
          v-for="(user, index) in filteredUsers"
          :key="user.id"
          :class="{ 'is-selected': navigatedUserIndex === index }"
          class="suggestion-list__item"
          @click="selectUser(user)"
        >
          {{ user.name }}
        </div>
      </template>
      <div v-else class="suggestion-list__item is-empty">No users found</div>
    </div>
  </div>
</template>
<script>
import Fuse from 'fuse.js'
import tippy, { sticky } from 'tippy.js'

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
  Mention,
  Placeholder,
} from 'tiptap-extensions'

import Wysiwyg from '~/plugins/editor/Wysiwyg'
import Title from '~/plugins/editor/Title'
import Link from '~/plugins/editor/Link'
import { normalize } from '~/services/post'

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
    },
  },
  data() {
    return {
      editor: null,
      content: this.post ? this.post.content : '',
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
  mounted() {
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

        new Mention({
          matcher: {
            char: '#',
            allowSpaces: false,
            startOfLine: false,
          },
          // a list of all suggested items
          items: async () => {
            await new Promise(resolve => {
              setTimeout(resolve, 500)
            })
            return [
              { id: 1, name: 'Sven Adlung' },
              { id: 2, name: 'Patrick Baber' },
              { id: 3, name: 'Nick Hirche' },
              { id: 4, name: 'Philip Isik' },
              { id: 5, name: 'Timo Isik' },
              { id: 6, name: 'Philipp Kühn' },
              { id: 7, name: 'Hans Pagel' },
              { id: 8, name: 'Sebastian Schrama' },
            ]
          },
          // is called when a suggestion starts
          onEnter: ({ items, query, range, command, virtualNode }) => {
            console.log('start!')
            this.query = query
            this.filteredUsers = items
            this.suggestionRange = range
            this.renderPopup(virtualNode)
            // we save the command for inserting a selected mention
            // this allows us to call it inside of our custom popup
            // via keyboard navigation and on click
            this.insertMention = command
          },
          // is called when a suggestion has changed
          onChange: ({ items, query, range, virtualNode }) => {
            console.log('change!!:', query)
            this.query = query
            this.filteredUsers = items
            this.suggestionRange = range
            this.navigatedUserIndex = 0
            this.renderPopup(virtualNode)
          },
          // is called when a suggestion is cancelled
          onExit: () => {
            console.log('canceled')
            // reset all saved values
            this.query = null
            this.filteredUsers = []
            this.suggestionRange = null
            this.navigatedUserIndex = 0
            this.destroyPopup()
          },
          // is called on every keyDown event while a suggestion is active
          onKeyDown: ({ event }) => {
            if (event.key === 'ArrowUp') {
              this.upHandler()
              return true
            }

            if (event.key === 'ArrowDown') {
              this.downHandler()
              return true
            }

            if (event.key === 'Enter') {
              this.enterHandler()
              return true
            }

            return false
          },
          // is called when a suggestion has changed
          // this function is optional because there is basic filtering built-in
          // you can overwrite it if you prefer your own filtering
          // in this example we use fuse.js with support for fuzzy search
          onFilter: async (items, query) => {
            console.log('Filter this:', query, items)
            if (!query) return items

            const tlHandler = this.$fire
              .collection('posts')
              .limit(10)
              .orderBy('createdAt', 'desc')

            const posts = []

            await tlHandler.get().then(qs => {
              qs.forEach(doc => {
                // console.log(doc.id)
                // console.log(doc.data())
                posts.push(normalize(doc.id, doc.data()))
              })
            })

            // console.log(posts)

            const fuse = new Fuse(posts, {
              threshold: 0.2,
              keys: ['content'],
            })

            // console.log('fused', fuse.search(query).map(post => {
            //   console.log('fusing:', post)
            //   return post.item
            // }))

            return fuse.search(query).map(post => post.item)
          },
        }),

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
      onUpdate: s => {
        this.$emit('update', s.getHTML())
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

    // navigate to the previous item
    // if it's the first item, navigate to the last one
    upHandler() {
      this.navigatedUserIndex =
        (this.navigatedUserIndex + this.filteredUsers.length - 1) %
        this.filteredUsers.length
    },

    // navigate to the next item
    // if it's the last item, navigate to the first one
    downHandler() {
      this.navigatedUserIndex =
        (this.navigatedUserIndex + 1) % this.filteredUsers.length
    },

    enterHandler() {
      const user = this.filteredUsers[this.navigatedUserIndex]

      if (user) {
        this.selectUser(user)
      }
    },

    // we have to replace our suggestion text with a mention
    // so it's important to pass also the position of your suggestion text
    selectUser(user) {
      this.insertMention({
        range: this.suggestionRange,
        attrs: {
          id: user.id,
          label: user.id,
        },
      })
      this.editor.focus()
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
  min-height: 320px;
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
