import { Node, mergeAttributes } from '@tiptap/core'

export interface CaptionOptions {
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    caption: {
      setCaption: (attributes: {}) => ReturnType,
    }
  }
}

export const Caption = Node.create<CaptionOptions>({
  name: 'caption',

  // priority: 9999,

  // defaultOptions: {
  //   HTMLAttributes: {
  //     class: 'caption'
  //   },
  // },

  addOptions() {
    return {
      ...this.parent?.(),
      class: 'caption',
    }
  },

  content: 'inline*',

  group: 'block',

  defining: true,

  addAttributes() {
    return {
      class: {
        default: 'caption',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div',
        // getAttrs: (element: HTMLElement) => element.className === 'caption' ? {} : false,
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setCaption: (attributes = {}) => ({ commands }) => {
        return commands.setNode('caption', attributes)
      },
    }
  },

})

export default Caption
