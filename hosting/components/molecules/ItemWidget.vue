<template>
  <div>
    <div
      v-if="site === 'youtube'"
      class="wysiwyg"
      v-html="renderWidgets(item.path)"
    />
    <div v-if="site === 'bandcamp' && bcPlayerUrl" class="wysiwyg">
      <iframe class="bc-player" :src="bcPlayerUrl" seamless />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { renderWidgets, getI18nName } from '~/plugins/typography'
import { Item } from '~/types/item'
import { Category } from '~/types/category'
import { itemTypes } from '~/services/item'
import { categories } from '~/services/category'

export default Vue.extend({
  props: {
    item: {
      type: Object,
      default: (): Partial<Item> => {
        return {
          name: {
            ja: '',
          },
          type: 'unknown',
          entities: [],
        }
      },
    },
  },
  computed: {
    itemTypes(): {
      key: string
      label: string
    }[] {
      return itemTypes.filter(t => t.key !== 'bookmark')
    },
    categories(): Category[] {
      return categories
    },
    filteredEntities(): Category[] {
      return categories.filter(c =>
        this.item.entities.find((e: string) => e === c.id)
      )
    },
    typeLabel(): string {
      const type = this.itemTypes.find(t => t.key === this.item?.type)
      return type ? type.label : '未設定'
    },
    name(): string {
      return getI18nName(this.item.name)
    },
    site(): string {
      if (!this.isBookmark) return ''
      return this.item.metadata?.site
        ? this.item.metadata.site.toLowerCase()
        : ''
    },
    permalink(): string {
      return `/item/${(this.item as Partial<Item>).id}`
    },
    isBookmark(): boolean {
      return this.item?.type === 'bookmark' && this.item?.path
    },
    thumbnailImage(): string {
      return `background-image:url(${
        (this.item as Partial<Item>).thumbnailImage
      })`
    },
    bcPlayerUrl(): string {
      // eslint-disable-next-line camelcase
      if (!this.item.metadata?.video?.secure_url) return ''
      const bc = this.parseBCUrl(this.item.metadata.video.secure_url)
      console.log('params', bc)
      return `https://bandcamp.com/EmbeddedPlayer/album=${bc.album}/size=large/bgcol=ffffff/artwork=small/linkcol=0687f5/tracklist=false/transparent=true/`
    },
  },
  methods: {
    renderWidgets(content: string): string {
      return renderWidgets(content)
    },
    parseBCUrl(url: string): any {
      const params: any = {}
      const segments = url
        .split('/')
        .filter(u => u.includes('='))
        .map(u => u.split('='))
      if (!segments) return {}
      for (const segment of segments) {
        params[segment[0]] = segment[1]
      }
      return params
    },
  },
})
</script>
<style lang="scss" scoped>
.card {
  border: 1px solid $gray-black;

  &.no-border {
    border: none;
  }

  .inner {
    .name {
      font-size: 1.2rem;
      font-weight: 800;
      padding: $gap / 4 $gap / 3 $gap / 3;
    }

    .types {
      > li {
        display: inline-block;
        background-color: $black;
        color: $white;
        font-size: 0.8rem;
        line-height: 1.9;
        padding: 3px 8px;
        border-bottom: 1px solid $black;
        border-right: 1px solid $black;
        &.category {
          border: none;
          background: transparent;
          color: $black;
          text-transform: uppercase;
          padding-right: 0;
        }
      }
      &.is-selectable {
        > li {
          background-color: transparent;
          color: $black;
          cursor: pointer;
          &.label {
            cursor: default;
          }
          &:hover {
            background-color: $gray;
          }
          &.selected {
            background-color: $black;
            color: $yellow;
            &.unset {
              color: $gray-black;
            }
          }
        }
      }
    }
  }

  .categories {
    padding: 0 $gap / 3;
    > li {
      display: inline-block;
      background-color: transparent;
      font-size: 0.8rem;
      color: $black;
      line-height: 1.9;
      padding: 0 8px 3px 0;
    }
    &.is-selectable {
      padding: 0;
      > li {
        opacity: 0.6;
        padding: 3px 8px;
        border-top: 1px solid $black;
        border-right: 1px solid $black;
        cursor: pointer;
        &.label {
          cursor: default;
        }
        &:hover {
          opacity: 1;
        }
        &.selected {
          background-color: $black;
          color: $yellow;
          opacity: 1;
          &.unset {
            color: $gray-black;
          }
        }
      }
    }
  }

  @include mobile {
    .name {
      padding: $gap / 2;
    }
  }
}

.bc-player {
  border: 0;
  width: 100%;
  height: 120px;
}
</style>
